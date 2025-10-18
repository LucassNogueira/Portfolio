/**
 * Smart Blog Sync Script
 * 
 * Automatically detects:
 * - New markdown files in src/content/blog/
 * - Changes to existing markdown files
 * - Updates blog configuration and regenerates JSON
 * 
 * Usage: npm run sync:blog
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');
const GENERATE_SCRIPT = path.join(process.cwd(), 'scripts/generate-blog-data.ts');

interface BlogPostMetadata {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

// Read current configuration from generate-blog-data.ts
function getCurrentConfig(): { posts: BlogPostMetadata[], files: Record<string, string> } {
  const scriptContent = fs.readFileSync(GENERATE_SCRIPT, 'utf-8');
  
  // Extract BLOG_POSTS array
  const postsMatch = scriptContent.match(/const BLOG_POSTS: BlogPostData\[\] = (\[[\s\S]*?\]);/);
  const posts = postsMatch ? eval(postsMatch[1]) : [];
  
  // Extract BLOG_FILES mapping
  const filesMatch = scriptContent.match(/const BLOG_FILES: Record<string, string> = (\{[\s\S]*?\});/);
  const files = filesMatch ? eval('(' + filesMatch[1] + ')') : {};
  
  return { posts, files };
}

// Get all markdown files in blog folder
function getBlogMarkdownFiles(): string[] {
  const files = fs.readdirSync(BLOG_CONTENT_DIR);
  return files.filter(file => file.endsWith('.md') && file !== 'README.md');
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

// Calculate read time based on word count (~200 words per minute)
function calculateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// Generate slug from filename
function generateSlug(filename: string): string {
  return filename.replace('.md', '');
}

// Get today's date in "Month DD, YYYY" format
function getTodaysDate(): string {
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Interactive prompt for new blog post metadata
async function promptForMetadata(filename: string, content: string): Promise<BlogPostMetadata | null> {
  console.log(`\n📝 New blog post detected: ${filename}`);
  console.log('─'.repeat(60));
  
  const slug = generateSlug(filename);
  const readTime = calculateReadTime(content);
  
  // Extract title from first line if it starts with #
  const firstLine = content.split('\n')[0];
  const defaultTitle = firstLine.startsWith('#') ? firstLine.replace(/^#+\s*/, '').trim() : '';
  
  const title = await question(`\nTitle (default: "${defaultTitle}"): `) || defaultTitle;
  if (!title) {
    console.log('❌ Title is required. Skipping this post.');
    return null;
  }
  
  const excerpt = await question('\nExcerpt (2-3 sentences describing the post): ');
  if (!excerpt) {
    console.log('❌ Excerpt is required. Skipping this post.');
    return null;
  }
  
  const category = await question('\nCategory (React/TypeScript/Development/etc.): ') || 'Development';
  const date = await question(`\nDate (default: ${getTodaysDate()}): `) || getTodaysDate();
  
  return {
    id: 0, // Will be assigned later
    title,
    excerpt,
    category,
    date,
    readTime,
    slug
  };
}

// Update the generate-blog-data.ts file
function updateGenerateScript(posts: BlogPostMetadata[], files: Record<string, string>) {
  const scriptTemplate = `/**
 * Build-time script to convert markdown files to JSON
 * This allows us to bundle blog content without needing a database
 */

import fs from 'fs';
import path from 'path';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/blogContent.json');

interface BlogPostData {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  content: string;
}

const BLOG_POSTS: BlogPostData[] = ${JSON.stringify(posts, null, 2)};

const BLOG_FILES: Record<string, string> = ${JSON.stringify(files, null, 2)};

async function generateBlogData() {
  console.log('📝 Generating blog content JSON...\\n');

  const postsWithContent = BLOG_POSTS.map(post => {
    const filename = BLOG_FILES[post.slug];
    if (!filename) {
      console.warn(\`⚠️  No markdown file found for \${post.slug}\`);
      return post;
    }

    try {
      const filePath = path.join(BLOG_CONTENT_DIR, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      console.log(\`✅ Read \${filename} (\${content.length} characters)\`);
      
      return {
        ...post,
        content,
      };
    } catch (error) {
      console.error(\`❌ Error reading \${filename}:\`, error);
      return post;
    }
  });

  // Write to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(postsWithContent, null, 2));
  console.log(\`\\n✨ Generated \${OUTPUT_FILE}\`);
  console.log(\`📊 Total posts: \${postsWithContent.length}\`);
}

generateBlogData().catch(console.error);
`;

  fs.writeFileSync(GENERATE_SCRIPT, scriptTemplate);
}

async function syncBlogPosts() {
  console.log('🔄 Blog Sync Starting...\n');
  console.log('Scanning src/content/blog/ for changes...\n');

  const { posts, files } = getCurrentConfig();
  const markdownFiles = getBlogMarkdownFiles();
  
  let newPosts: BlogPostMetadata[] = [];
  let updatedCount = 0;
  let unchangedCount = 0;

  // Check for new files
  for (const filename of markdownFiles) {
    const slug = generateSlug(filename);
    const existingPost = posts.find((p: BlogPostMetadata) => p.slug === slug);
    
    if (!existingPost) {
      console.log(`\n🆕 New file detected: ${filename}`);
      const content = fs.readFileSync(path.join(BLOG_CONTENT_DIR, filename), 'utf-8');
      const metadata = await promptForMetadata(filename, content);
      
      if (metadata) {
        // Assign new ID
        const maxId = Math.max(0, ...posts.map((p: BlogPostMetadata) => p.id));
        metadata.id = maxId + 1;
        
        newPosts.push(metadata);
        files[slug] = filename;
        console.log(`✅ Added: ${metadata.title}`);
      }
    } else {
      unchangedCount++;
    }
  }

  // Check for removed files
  const existingSlugs = posts.map((p: BlogPostMetadata) => p.slug);
  const currentSlugs = markdownFiles.map(f => generateSlug(f));
  const removedSlugs = existingSlugs.filter((slug: string) => !currentSlugs.includes(slug));
  
  if (removedSlugs.length > 0) {
    console.log('\n🗑️  Removed posts:');
    removedSlugs.forEach((slug: string) => {
      const post = posts.find((p: BlogPostMetadata) => p.slug === slug);
      console.log(`   - ${post?.title || slug}`);
      delete files[slug];
    });
  }

  // Combine and sort posts
  const remainingPosts = posts.filter((p: BlogPostMetadata) => currentSlugs.includes(p.slug));
  const allPosts = [...remainingPosts, ...newPosts].sort((a, b) => a.id - b.id);

  // Summary
  console.log('\n' + '─'.repeat(60));
  console.log('📊 Sync Summary:');
  console.log(`   ✅ New posts: ${newPosts.length}`);
  console.log(`   🗑️  Removed: ${removedSlugs.length}`);
  console.log(`   📝 Unchanged: ${unchangedCount}`);
  console.log(`   📊 Total posts: ${allPosts.length}`);

  if (newPosts.length > 0 || removedSlugs.length > 0) {
    console.log('\n💾 Updating configuration...');
    updateGenerateScript(allPosts, files);
    console.log('✅ Configuration updated');
    
    console.log('\n🔨 Regenerating blog JSON...');
    execSync('npx tsx scripts/generate-blog-data.ts', { stdio: 'inherit' });
    
    console.log('\n✨ Blog sync complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Review changes: git diff scripts/generate-blog-data.ts');
    console.log('   2. Test locally: npm run dev');
    console.log('   3. Commit and deploy: git add -A && git commit -m "Add new blog posts" && git push');
  } else {
    console.log('\n✨ No changes detected. Everything is up to date!');
  }

  rl.close();
}

// Run the sync
syncBlogPosts().catch(error => {
  console.error('\n❌ Error during sync:', error);
  rl.close();
  process.exit(1);
});

