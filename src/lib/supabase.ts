import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a dummy client if env vars are missing (for build time)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
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

