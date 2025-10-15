/**
 * Update Script: Add content to existing blog posts
 * 
 * This script will:
 * 1. Read markdown files from src/content/blog
 * 2. Update existing blog posts with their content
 * 
 * Usage: npx tsx supabase/migrations/scripts/update-blog-content.ts
 */

// Load environment variables from .env.local
import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please create a .env.local file with:')
  console.error('  NEXT_PUBLIC_SUPABASE_URL=your-project-url')
  console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateBlogContent() {
  console.log('📝 Updating blog posts with markdown content...\n')

  // Fetch all blog posts from Supabase
  const { data: posts, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id, slug, title')

  if (fetchError) {
    console.error('❌ Error fetching blog posts:', fetchError.message)
    process.exit(1)
  }

  if (!posts || posts.length === 0) {
    console.log('⚠️  No blog posts found in database')
    process.exit(0)
  }

  console.log(`Found ${posts.length} blog posts\n`)

  let updated = 0
  let skipped = 0
  let errors = 0

  for (const post of posts) {
    const markdownPath = join(process.cwd(), 'src', 'content', 'blog', `${post.slug}.md`)
    
    try {
      const content = readFileSync(markdownPath, 'utf-8')
      
      // Update the blog post with content
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ content })
        .eq('id', post.id)

      if (updateError) {
        console.error(`❌ Error updating "${post.title}":`, updateError.message)
        errors++
      } else {
        console.log(`✅ Updated "${post.title}" with content (${content.length} characters)`)
        updated++
      }
    } catch (error) {
      console.warn(`⏭️  Skipped "${post.title}" - markdown file not found at ${markdownPath}`)
      skipped++
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`   ✅ Updated: ${updated}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)
  console.log(`   ❌ Errors: ${errors}`)
  
  if (updated > 0) {
    console.log('\n✨ Blog content updated successfully!')
  }
}

// Run the update
updateBlogContent()

