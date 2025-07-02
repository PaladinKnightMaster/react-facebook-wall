'use client'

import { useState, useEffect } from 'react'
import { WallInput } from './WallInput'
import { WallPost } from './WallPost'

interface Post {
  id: string
  author: string
  message: string
  timestamp: string
  createdAt: number // For sorting
}

const initialPosts: Post[] = [
  {
    id: '1',
    author: 'Anna',
    message: 'Hey Greg, did you debug your coffee maker yet? Last cup tasted like JavaScript errors.',
    timestamp: '2 hours ago',
    createdAt: Date.now() - 7200000 // 2 hours ago
  },
  {
    id: '2',
    author: 'Adelaida',
    message: 'Greg, saw your last coding session—pretty sure you broke Stack Overflow again! 🔥',
    timestamp: '3 hours ago',
    createdAt: Date.now() - 10800000 // 3 hours ago
  },
  {
    id: '3',
    author: 'Juho',
    message: 'Greg, are you still coding in pajamas, or have you upgraded to full-time sweatpants mode?',
    timestamp: '5 hours ago',
    createdAt: Date.now() - 18000000 // 5 hours ago
  },
  {
    id: '4',
    author: 'Maija',
    message: 'Greg, rumor has it your computer has more stickers than code running on it. Confirm?',
    timestamp: '1 day ago',
    createdAt: Date.now() - 86400000 // 1 day ago
  },
  {
    id: '5',
    author: 'Alex',
    message: 'Yo Greg, just pulled an all-nighter on the assignment. Turns out sleep deprivation doesn\'t improve coding skills. Weird!',
    timestamp: '2 days ago',
    createdAt: Date.now() - 172800000 // 2 days ago
  },
  {
    id: '6',
    author: 'Sheryl',
    message: 'Greg, when are we gonna deploy your latest dance moves to production? #AgileDancer',
    timestamp: '3 days ago',
    createdAt: Date.now() - 259200000 // 3 days ago
  }
]

interface WallProps {
  userName: string
}

export function Wall({ userName }: WallProps) {
  const [posts, setPosts] = useState<Post[]>([])

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('facebook-wall-posts')
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts)
        setPosts(parsedPosts.sort((a: Post, b: Post) => b.createdAt - a.createdAt))
      } catch (error) {
        console.error('Error loading posts from localStorage:', error)
        setPosts(initialPosts.sort((a, b) => b.createdAt - a.createdAt))
      }
    } else {
      // First time - use initial posts
      setPosts(initialPosts.sort((a, b) => b.createdAt - a.createdAt))
      localStorage.setItem('facebook-wall-posts', JSON.stringify(initialPosts))
    }
  }, [])

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('facebook-wall-posts', JSON.stringify(posts))
    }
  }, [posts])

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

  const handleNewPost = (message: string) => {
    const now = Date.now()
    const newPost: Post = {
      id: now.toString(),
      author: userName,
      message: message,
      timestamp: 'just now',
      createdAt: now
    }
    
    // Add new post to the beginning (newest first)
    const updatedPosts = [newPost, ...posts]
    setPosts(updatedPosts)
  }

  // Update timestamps every minute for relative time
  useEffect(() => {
    const interval = setInterval(() => {
      setPosts(currentPosts => 
        currentPosts.map(post => ({
          ...post,
          timestamp: formatTimestamp(post.createdAt)
        }))
      )
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      {/* User Name */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{userName}</h2>
      
      {/* Wall Title */}
      <h3 className="text-lg font-medium text-gray-700 mb-4">Wall</h3>
      
      <WallInput onPost={handleNewPost} userName={userName} />
      
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