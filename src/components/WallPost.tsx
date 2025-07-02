interface WallPostProps {
  author: string
  message: string
  timestamp?: string
}

export function WallPost({ author, message, timestamp }: WallPostProps) {
  return (
    <div className="border-b border-gray-300 pb-4 mb-4 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-gray-900 text-base hover:text-blue-600 cursor-pointer transition-colors">
          {author}
        </h3>
        {timestamp && (
          <span className="text-gray-500 text-sm ml-2 flex-shrink-0">
            {timestamp}
          </span>
        )}
      </div>
      <div className="message-content">
        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap break-words">
          {message}
        </p>
      </div>
    </div>
  )
} 