interface WallPostProps {
  author: string
  message: string
  timestamp?: string
}

export function WallPost({ author, message, timestamp }: WallPostProps) {
  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <div className="flex items-start gap-2">
        <h3 className="font-bold text-gray-900 text-base">{author}</h3>
        {timestamp && (
          <span className="text-gray-500 text-sm">{timestamp}</span>
        )}
      </div>
      <p className="text-gray-800 text-base mt-1 leading-relaxed">
        {message}
      </p>
    </div>
  )
} 