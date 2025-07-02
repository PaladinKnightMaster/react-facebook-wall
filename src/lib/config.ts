// Configuration checker for Supabase setup
export const config = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  
  // Check if required environment variables are set
  isConfigured: () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    return !!(url && key && url.includes('supabase.co') && key.startsWith('eyJ'))
  },
  
  // Get configuration status for debugging
  getStatus: () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    return {
      hasUrl: !!url,
      hasKey: !!key,
      urlValid: url ? url.includes('supabase.co') : false,
      keyValid: key ? key.startsWith('eyJ') : false,
      isConfigured: config.isConfigured()
    }
  }
} 