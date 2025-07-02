'use client'

import { useState } from 'react'
import { WallInput } from './WallInput'
import { WallPost } from './WallPost'

interface Post {
  id: string
  author: string
  message: string
  timestamp: string
}

const initialPosts: Post[] = [
  {
    id: '1',
    author: 'Anna',
    message: 'Hey Greg, did you debug your coffee maker yet? Last cup tasted like JavaScript errors.',
    timestamp: ''
  },
  {
    id: '2',
    author: 'Adelaida',
    message: 'Greg, saw your last coding session—pretty sure you broke Stack Overflow again! 🔥',
    timestamp: ''
  },
  {
    id: '3',
    author: 'Juho',
    message: 'Greg, are you still coding in pajamas, or have you upgraded to full-time sweatpants mode?',
    timestamp: ''
  },
  {
    id: '4',
    author: 'Maija',
    message: 'Greg, rumor has it your computer has more stickers than code running on it. Confirm?',
    timestamp: ''
  },
  {
    id: '5',
    author: 'Alex',
    message: 'Yo Greg, just pulled an all-nighter on the assignment. Turns out sleep deprivation doesn\'t improve coding skills. Weird!',
    timestamp: ''
  },
  {
    id: '6',
    author: 'Sheryl',
    message: 'Greg, when are we gonna deploy your latest dance moves to production? #AgileDancer',
    timestamp: ''
  }
]

interface WallProps {
  userName: string
}

export function Wall({ userName }: WallProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const handleNewPost = (message: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: 'You',
      message,
      timestamp: new Date().toLocaleTimeString()
    }
    setPosts([newPost, ...posts])
  }

  return (
    <div className="w-full">
      {/* User Name */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{userName}</h2>
      
      {/* Wall Title */}
      <h3 className="text-lg font-medium text-gray-700 mb-4">Wall</h3>
      
      <WallInput onPost={handleNewPost} />
      
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
    </div>
  )
} 