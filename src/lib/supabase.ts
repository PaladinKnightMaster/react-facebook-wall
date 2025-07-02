import { createClient } from '@supabase/supabase-js'

// These will be set via environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
    try {
      const { error } = await supabase.from('wall_posts').select('count').limit(1)
      return !error
    } catch {
      return false
    }
  }
} 