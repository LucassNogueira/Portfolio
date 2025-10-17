import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Log environment variables in development to help debug
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Supabase URL exists:', !!supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseAnonKey)
}

// Create a dummy client if env vars are missing (for build time)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Important for edge runtime
      },
    })
  : null as any

// Storage bucket name for images
export const IMAGES_BUCKET = 'portfolio-images'

// Helper function to get public URL for an image
export function getImageUrl(path: string): string {
  if (!supabase) {
    return '' // Return empty string during build if Supabase is not available
  }
  const { data } = supabase.storage.from(IMAGES_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

