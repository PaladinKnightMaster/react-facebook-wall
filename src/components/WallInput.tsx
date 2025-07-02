'use client'

import { useState } from 'react'
import { Button } from './ui/button'

interface WallInputProps {
  onPost: (message: string) => void
}

export function WallInput({ onPost }: WallInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onPost(message.trim())
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div 
        className="border-2 border-dashed border-black rounded p-4 mb-3 relative"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            #a3d5ff,
            #a3d5ff 8px,
            #d1ebff 8px,
            #d1ebff 16px
          )`
        }}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 bg-white"
          rows={3}
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Share
        </Button>
      </div>
    </form>
  )
} 