/**
 * Migration Script: Upload Images and Data to Supabase
 * 
 * This script will:
 * 1. Upload all images from /public/images to Supabase Storage
 * 2. Populate database tables with existing data
 * 
 * Run this script once after setting up your Supabase project
 * 
 * Usage: npm run migrate:supabase
 */

// Load environment variables from .env.local
import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

// Import existing data
const projectsData = [
  {
    project: 1,
    title: "PogDog",
    img: "/images/1.png",
    creation: "PogDog was created in a 10 day sprint during my time at DevMountain coding boot-camp.",
    tech: "Javascript, HTML, CSS, Express, Node.JS, and Axios.",
    hosted: "https://pogdog.vercel.app/",
    github: "https://github.com/LucassNogueira/pogdog",
  },
  {
    project: 5,
    title: "FStop",
    img: "/images/fstop.png",
    creation: "Built a Formula1 companion app that users are able to register/login and select favorite drivers,tracks,teams, and compare drivers stats.",
    tech: "ReactJS, FirebaseDB, TailwindCSS, Firebase Hosting, Sweetalert2, Axios.",
    hosted: "https://fstop-nextjs.vercel.app/",
    github: "https://github.com/LucassNogueira/Fstop",
  },
  {
    project: 2,
    title: "Beautiful Photos",
    img: "/images/beautifulphotos.png",
    creation: "Beautiful photos is a online image gallery of what makes you happy. no descriptions, no like button. Simply a photo that makes you happy.",
    tech: "ReactJS, CSS, FirebaseDB,Framer Motion, Netlify.",
    hosted: "https://beautifulphotos.vercel.app/",
    github: "https://github.com/LucassNogueira/ReactImageGal",
  },
  {
    project: 3,
    title: "Expense Tracker ",
    img: "/images/expense.png",
    creation: "Built a simple intuitive expense tracker to stay on top of your money coming in and out!",
    tech: "ReactJS, CSS, MongoDB, Morgan, Netlify, Express.",
    hosted: "https://expencetrackerln.netlify.app/",
    github: "https://github.com/LucassNogueira/MERNexpenceTracker",
  },
  {
    project: 4,
    title: "E-Commerce Project",
    img: "/images/onlineStore.png",
    creation: "This online store was built to further my knowledge on how E-Commerce applications are set up and created.",
    tech: "ReactJS, Commerce.JS, Stripe, Netlify, MaterialUI.",
    hosted: "https://onlinestorefront.netlify.app/",
    github: "https://github.com/LucassNogueira/OnlineStore",
  },
]

const blogPostsData = [
  {
    id: 1,
    title: "nuqs + React Hooks: Managing Modal State Without Losing Your Mind",
    excerpt: "I was prop drilling modal state through 5 components and slowly dying inside. Then I found nuqs. Now modal state lives in the URL and I can open modals from literally anywhere. Deep linking works, refresh works, back button works. It's wild.",
    category: "React",
    date: "Jan 15 2025",
    readTime: "6 min read",
    slug: "nuqs-modal-state-hooks"
  },
  {
    id: 2,
    title: "Building Features Before the Backend Exists (makeMockApiCall)",
    excerpt: "Backend says the API won't be ready for 2 weeks. Cool, I'll just build it anyway with mock data. Swap in the real API when it's ready. This is how I ship features without waiting around doing nothing.",
    category: "TypeScript",
    date: "Aug 22 2024",
    readTime: "7 min read",
    slug: "make-mock-api-call-utility"
  },
  {
    id: 3,
    title: "Toast Notifications: Just Call It From Anywhere",
    excerpt: "Made a toast utility you can import and call from any component, hook, or utility function. No context, no providers, no prop drilling. Just toast.success('it worked') and you're done. This is how it should've always been.",
    category: "React",
    date: "Mar 10 2024",
    readTime: "5 min read",
    slug: "toast-notifications-everywhere"
  }
]

const skillsData = [
  { name: "Frontend", skills: ["React", "Next.js", "TypeScript", "JavaScript", "Material-UI", "TanStack", "HTML5", "CSS3"] },
  { name: "Backend", skills: ["Node.js", "Express", "PostgreSQL", "TypeScript", "BFF Pattern", "REST APIs", "Event-Driven Microservices"] },
  { name: "Tools", skills: ["GitHub", "Postman", "Axios", "date-fns", "Git", "VS Code"] }
]

const experiencesData = [
  {
    title: "Frontend Leaning Full Stack Engineer",
    company: "Veryable",
    period: "April 2022 - Present",
    description: [
      "Architected and led migration of core business logic (time, pricing, scheduling) to TypeScript and date-fns, establishing single source of truth for all payouts",
      "Drove end-to-end feature delivery from PRD to production, aligning React/Next.js frontends, TypeScript BFFs, and event-driven microservices",
      "Spearheaded modernization of high-friction operational workflows (bulk Op posting, shift management) into reliable, scalable React components",
      "Built end-to-end attendance and pay automation (NOVA) unifying check-in/out codes, geofencing, NoahFace kiosks, and automatic hour calculation",
      "Implemented payment policies and resolution flows that cut dispute volume and handling time in half",
      "Designed clear, single day scheduling view (WFM ShiftWorks) that became operational source of truth for supervisors"
    ],
    display_order: 1
  },
  {
    title: "Owner Operator",
    company: "Café Sicilia / Panchos Mexican Buffet Restaurants",
    period: "August 2014 - December 2021",
    description: [
      "Opened two new locations that reached profitability ~50% faster than prior launches",
      "Increased dine-in sales by ~15% via menu redesign and targeted promotions",
      "Revamped take-out strategy with family/date-night packages that outperformed prior years during pandemic",
      "Directed cross-functional teams and marketing campaigns, improving catering sales and overall brand presence"
    ],
    display_order: 2
  }
]

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

const IMAGES_BUCKET = 'portfolio-images'

async function createStorageBucket() {
  console.log('\n📦 Checking storage bucket...')
  
  // Try to access the bucket directly (anon key can't list all buckets)
  const { data, error } = await supabase.storage.from(IMAGES_BUCKET).list()
  
  if (error) {
    console.log('\n⚠️  Storage bucket does not exist or is not accessible!')
    console.log('Please create it manually in Supabase Dashboard:')
    console.log('1. Go to Storage in your Supabase dashboard')
    console.log('2. Click "Create a new bucket"')
    console.log(`3. Name it: ${IMAGES_BUCKET}`)
    console.log('4. Make it PUBLIC')
    console.log('5. Re-run this script')
    console.log('')
    console.log('Error details:', error.message)
    throw new Error('Storage bucket not found. Please create it in the dashboard first.')
  } else {
    console.log('✅ Storage bucket exists and is accessible')
  }
}

async function uploadImages() {
  console.log('\n📸 Uploading images to Supabase Storage...')
  
  const imagesDir = join(process.cwd(), 'public', 'images')
  const files = readdirSync(imagesDir)
  
  let uploaded = 0
  let skipped = 0
  
  for (const file of files) {
    const filePath = join(imagesDir, file)
    const stat = statSync(filePath)
    
    // Skip directories and non-image files
    if (stat.isDirectory() || !file.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
      continue
    }
    
    const fileBuffer = readFileSync(filePath)
    const storagePath = `images/${file}`
    
    // Check if file already exists
    const { data: existingFile } = await supabase.storage
      .from(IMAGES_BUCKET)
      .list('images', { search: file })
    
    if (existingFile && existingFile.length > 0) {
      console.log(`⏭️  Skipped ${file} (already exists)`)
      skipped++
      continue
    }
    
    const { error } = await supabase.storage
      .from(IMAGES_BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: `image/${file.split('.').pop()}`,
        upsert: false
      })
    
    if (error) {
      console.error(`❌ Error uploading ${file}:`, error.message)
    } else {
      console.log(`✅ Uploaded ${file}`)
      uploaded++
    }
  }
  
  console.log(`\n📊 Images: ${uploaded} uploaded, ${skipped} skipped`)
}

async function populateProjects() {
  console.log('\n🚀 Populating projects table...')
  
  for (const project of projectsData) {
    const { error } = await supabase.from('projects').insert({
      project_number: project.project,
      title: project.title,
      image_path: project.img,
      creation: project.creation,
      tech: project.tech,
      hosted_url: project.hosted,
      github_url: project.github
    })
    
    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        console.log(`⏭️  Skipped "${project.title}" (already exists)`)
      } else {
        console.error(`❌ Error inserting "${project.title}":`, error.message)
      }
    } else {
      console.log(`✅ Inserted project: ${project.title}`)
    }
  }
}

async function populateBlogPosts() {
  console.log('\n📝 Populating blog posts table with content...')
  
  for (const post of blogPostsData) {
    // Read markdown content from file
    const markdownPath = join(process.cwd(), 'src', 'content', 'blog', `${post.slug}.md`)
    let content = ''
    
    try {
      content = readFileSync(markdownPath, 'utf-8')
      console.log(`📖 Read markdown content for "${post.title}"`)
    } catch (error) {
      console.warn(`⚠️  Could not read markdown file for "${post.title}" at ${markdownPath}`)
      content = '' // Use empty string if file doesn't exist
    }
    
    const { error } = await supabase.from('blog_posts').insert({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      read_time: post.readTime,
      slug: post.slug,
      content: content
    })
    
    if (error) {
      if (error.code === '23505') {
        console.log(`⏭️  Skipped "${post.title}" (already exists)`)
      } else {
        console.error(`❌ Error inserting "${post.title}":`, error.message)
      }
    } else {
      console.log(`✅ Inserted blog post with content: ${post.title}`)
    }
  }
}

async function populateSkills() {
  console.log('\n🛠️  Populating skills table...')
  
  for (const category of skillsData) {
    for (const skill of category.skills) {
      const { error } = await supabase.from('skills').insert({
        name: skill,
        category: category.name
      })
      
      if (error) {
        console.error(`❌ Error inserting skill "${skill}":`, error.message)
      } else {
        console.log(`✅ Inserted skill: ${skill} (${category.name})`)
      }
    }
  }
}

async function populateExperiences() {
  console.log('\n💼 Populating experiences table...')
  
  for (const exp of experiencesData) {
    const { error } = await supabase.from('experiences').insert({
      title: exp.title,
      company: exp.company,
      period: exp.period,
      description: exp.description,
      display_order: exp.display_order
    })
    
    if (error) {
      console.error(`❌ Error inserting "${exp.title}":`, error.message)
    } else {
      console.log(`✅ Inserted experience: ${exp.title} at ${exp.company}`)
    }
  }
}

async function runMigration() {
  console.log('🚀 Starting Supabase migration...')
  console.log('📍 Project URL:', supabaseUrl)
  
  try {
    await createStorageBucket()
    await uploadImages()
    await populateProjects()
    await populateBlogPosts()
    await populateSkills()
    await populateExperiences()
    
    console.log('\n✨ Migration completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Run the SQL migration in the SQL Editor:')
    console.log('   supabase/migrations/001_initial_schema.sql')
    console.log('3. Verify your data in the Table Editor')
    console.log('4. Update your components to use Supabase data')
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
runMigration()

