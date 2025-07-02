'use client'

import { useState, useEffect, useCallback } from 'react'
import { WallInput } from './WallInput'
import { WallPost } from './WallPost'
import { supabaseApi, WallPost as SupabaseWallPost } from '@/lib/supabase'
import { StorageManager } from '@/lib/storage'

interface Post {
  id: string
  author: string
  message: string
  timestamp: string
  createdAt: number
}

const initialPosts: Post[] = [
  {
    id: '1',
    author: 'Anna',
    message: 'Hey Greg, did you debug your coffee maker yet? Last cup tasted like JavaScript errors.',
    timestamp: '2 hours ago',
    createdAt: Date.now() - 7200000
  },
  {
    id: '2',
    author: 'Adelaida',
    message: 'Greg, saw your last coding session—pretty sure you broke Stack Overflow again! 🔥',
    timestamp: '3 hours ago',
    createdAt: Date.now() - 10800000
  },
  {
    id: '3',
    author: 'Juho',
    message: 'Greg, are you still coding in pajamas, or have you upgraded to full-time sweatpants mode?',
    timestamp: '5 hours ago',
    createdAt: Date.now() - 18000000
  },
  {
    id: '4',
    author: 'Maija',
    message: 'Greg, rumor has it your computer has more stickers than code running on it. Confirm?',
    timestamp: '1 day ago',
    createdAt: Date.now() - 86400000
  },
  {
    id: '5',
    author: 'Alex',
    message: 'Yo Greg, just pulled an all-nighter on the assignment. Turns out sleep deprivation doesn\'t improve coding skills. Weird!',
    timestamp: '2 days ago',
    createdAt: Date.now() - 172800000
  },
  {
    id: '6',
    author: 'Sheryl',
    message: 'Greg, when are we gonna deploy your latest dance moves to production? #AgileDancer',
    timestamp: '3 days ago',
    createdAt: Date.now() - 259200000
  }
]

interface WallProps {
  userName: string
}

export function Wall({ userName }: WallProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [useSupabase, setUseSupabase] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Convert Supabase post to local post format - memoized to avoid dependency issues
  const convertSupabasePost = useCallback((supabasePost: SupabaseWallPost): Post => ({
    id: supabasePost.id,
    author: supabasePost.author,
    message: supabasePost.message,
    timestamp: formatTimestamp(new Date(supabasePost.created_at).getTime()),
    createdAt: new Date(supabasePost.created_at).getTime()
  }), [])

  const formatTimestamp = (createdAt: number): string => {
    const now = Date.now()
    const diffMs = now - createdAt
    const diffMinutes = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMinutes < 1) return 'just now'
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    
    return new Date(createdAt).toLocaleDateString()
  }

  // Load posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // First, try to connect to Supabase
        const isConnected = await supabaseApi.testConnection()
        
        if (isConnected) {
          console.log('✅ Connected to Supabase')
          setUseSupabase(true)
          
          // Load posts from Supabase
          const supabasePosts = await supabaseApi.getPosts()
          const convertedPosts = supabasePosts.map(convertSupabasePost)
          setPosts(convertedPosts)
        } else {
          throw new Error('Supabase connection failed')
        }
      } catch (error) {
        console.log('⚠️ Falling back to localStorage:', error)
        setUseSupabase(false)
        
        // Fallback to localStorage
        const savedPosts = StorageManager.getPosts()
        if (savedPosts.length > 0) {
          const convertedPosts = savedPosts.map(post => ({
            ...post,
            timestamp: formatTimestamp(post.createdAt)
          })).sort((a, b) => b.createdAt - a.createdAt)
          setPosts(convertedPosts)
        } else {
          // Use initial posts if no saved data
          setPosts(initialPosts.sort((a, b) => b.createdAt - a.createdAt))
          StorageManager.savePosts(initialPosts.map(post => ({
            id: post.id,
            author: post.author,
            message: post.message,
            timestamp: post.timestamp,
            createdAt: post.createdAt
          })))
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [convertSupabasePost])

  // Set up real-time subscription for Supabase
  useEffect(() => {
    if (!useSupabase) return

    const unsubscribe = supabaseApi.subscribeToChanges((supabasePosts) => {
      const convertedPosts = supabasePosts.map(convertSupabasePost)
      
      // Update posts only if the list is different to avoid unnecessary re-renders
      // and prevent duplicates from real-time updates
      setPosts(currentPosts => {
        // Check if we need to update by comparing IDs
        const currentIds = new Set(currentPosts.map(p => p.id))
        const newIds = new Set(convertedPosts.map(p => p.id))
        
        // If the sets are different, update
        if (currentIds.size !== newIds.size || 
            [...currentIds].some(id => !newIds.has(id)) || 
            [...newIds].some(id => !currentIds.has(id))) {
          return convertedPosts
        }
        
        // No changes needed
        return currentPosts
      })
    })

    return unsubscribe
  }, [useSupabase, convertSupabasePost])

  // Update timestamps periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPosts(currentPosts => 
        currentPosts.map(post => ({
          ...post,
          timestamp: formatTimestamp(post.createdAt)
        }))
      )
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const handleNewPost = async (message: string) => {
    try {
      setError(null)

      if (useSupabase) {
        // Create post in Supabase
        const newSupabasePost = await supabaseApi.createPost(userName, message)
        
        // Immediately convert and add to local state for instant UI update
        const newPost = convertSupabasePost(newSupabasePost)
        const updatedPosts = [newPost, ...posts]
        setPosts(updatedPosts)
        
        // Real-time subscription will also update, but this ensures immediate feedback
      } else {
        // Create post locally
        const now = Date.now()
        const newPost: Post = {
          id: now.toString(),
          author: userName,
          message: message,
          timestamp: 'just now',
          createdAt: now
        }
        
        const updatedPosts = [newPost, ...posts]
        setPosts(updatedPosts)
        
        // Save to localStorage
        StorageManager.savePosts(updatedPosts.map(post => ({
          id: post.id,
          author: post.author,
          message: post.message,
          timestamp: post.timestamp,
          createdAt: post.createdAt
        })))
      }
    } catch (error) {
      console.error('Error creating post:', error)
      setError('Failed to post message. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{userName}</h2>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Wall</h3>
        <div className="text-center text-gray-500 py-8">
          Loading posts...
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* User Name */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{userName}</h2>
      
      {/* Wall Title */}
      <h3 className="text-lg font-medium text-gray-700 mb-4">Wall</h3>

      {/* Connection Status */}
      <div className="mb-4 text-sm">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          useSupabase 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {useSupabase ? '🟢 Connected to Database' : '🟡 Using Local Storage'}
        </span>
      </div>
      
      <WallInput onPost={handleNewPost} userName={userName} />

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
          {error}
        </div>
      )}
      
      {/* Posts Counter */}
      <div className="mb-4 text-sm text-gray-600">
        {posts.length} post{posts.length !== 1 ? 's' : ''}
      </div>
      
      <div className="space-y-0">
        {posts.map((post) => (
          <WallPost
            key={post.id}
            author={post.author}
            message={post.message}
            timestamp={post.timestamp}
          />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No posts yet. Be the first to share something!
        </div>
      )}
    </div>
  )
} 