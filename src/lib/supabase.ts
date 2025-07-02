import { createClient } from '@supabase/supabase-js'

// These will be set via environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create client if we have valid environment variables
const hasValidConfig = supabaseUrl.includes('supabase.co') && supabaseAnonKey.length > 50

export const supabase = hasValidConfig 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface WallPost {
  id: string
  author: string
  message: string
  created_at: string
  updated_at?: string
}

// Database functions
export const supabaseApi = {
  // Get all posts ordered by newest first
  async getPosts(): Promise<WallPost[]> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }

    const { data, error } = await supabase
      .from('wall_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
      throw error
    }

    return data || []
  },

  // Create a new post
  async createPost(author: string, message: string): Promise<WallPost> {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }

    const { data, error } = await supabase
      .from('wall_posts')
      .insert([
        {
          author,
          message,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating post:', error)
      throw error
    }

    return data
  },

  // Subscribe to real-time changes
  subscribeToChanges(callback: (posts: WallPost[]) => void) {
    if (!supabase) {
      return () => {} // Return empty cleanup function
    }

    const channel = supabase
      .channel('wall_posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wall_posts'
        },
        async () => {
          // Refetch all posts when any change happens
          try {
            const posts = await this.getPosts()
            callback(posts)
          } catch (error) {
            console.error('Error in real-time subscription:', error)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },

  // Check connection status
  async testConnection(): Promise<boolean> {
    if (!supabase) {
      return false
    }

    try {
      const { error } = await supabase.from('wall_posts').select('count').limit(1)
      return !error
    } catch {
      return false
    }
  }
} 