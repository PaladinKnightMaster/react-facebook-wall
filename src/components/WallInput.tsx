'use client'

import { useState } from 'react'
import { Button } from './ui/button'

interface WallInputProps {
  onPost: (message: string) => void
  userName: string
}

export function WallInput({ onPost, userName }: WallInputProps) {
  const [message, setMessage] = useState('')
  const maxLength = 280

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && message.length <= maxLength) {
      onPost(message.trim())
      setMessage('')
    }
  }

  const remainingChars = maxLength - message.length
  const isOverLimit = remainingChars < 0
  const isNearLimit = remainingChars <= 20 && remainingChars >= 0

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
          placeholder={`What's on your mind, ${userName}?`}
          className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 bg-white text-gray-900"
          rows={3}
          maxLength={maxLength + 50} // Allow typing over limit to show error
        />
        
        {/* Character Counter */}
        <div className="mt-2 text-right">
          <span 
            className={`text-sm font-medium ${
              isOverLimit 
                ? 'text-red-600' 
                : isNearLimit 
                  ? 'text-orange-600' 
                  : 'text-gray-600'
            }`}
          >
            {remainingChars} characters remaining
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Posting as: <strong>{userName}</strong>
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={!message.trim() || isOverLimit}
          className={`px-6 py-2 rounded transition-colors ${
            !message.trim() || isOverLimit
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          Share
        </Button>
      </div>
    </form>
  )
} 