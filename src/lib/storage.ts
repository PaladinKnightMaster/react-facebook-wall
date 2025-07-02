export const STORAGE_KEY = 'facebook-wall-posts'

export interface StoredPost {
  id: string
  author: string
  message: string
  timestamp: string
  createdAt: number
}

export const StorageManager = {
  // Get posts from localStorage
  getPosts: (): StoredPost[] => {
    try {
      if (typeof window === 'undefined') return []
      
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return []
      
      const posts = JSON.parse(stored)
      return Array.isArray(posts) ? posts : []
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return []
    }
  },

  // Save posts to localStorage
  savePosts: (posts: StoredPost[]): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
      return true
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      return false
    }
  },

  // Clear all posts
  clearPosts: (): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  },

  // Get storage info
  getStorageInfo: () => {
    try {
      if (typeof window === 'undefined') return { supported: false }
      
      const posts = StorageManager.getPosts()
      const dataSize = new Blob([JSON.stringify(posts)]).size
      
      return {
        supported: true,
        postCount: posts.length,
        dataSize: `${(dataSize / 1024).toFixed(2)} KB`
      }
    } catch (error) {
      return { 
        supported: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
} 