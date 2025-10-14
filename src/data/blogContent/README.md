# Blog Content

This directory contains the full markdown content for all blog posts.

## Blog Posts

### 1. nuqs + React Hooks: The Modal State Combo That'll Change Your Life
**File**: `nuqs-modal-state-hooks.md`  
**Slug**: `nuqs-modal-state-hooks`  
**Topics**: URL state management, modal state, nuqs, React hooks, deep linking  
**Code Examples**: ✅ Multiple TypeScript examples  
**Fun Factor**: 🎉 Conversational, practical, with real-world scenarios

### 2. makeMockApiCall: Your New Best Friend for Frontend Development
**File**: `make-mock-api-call-utility.md`  
**Slug**: `make-mock-api-call-utility`  
**Topics**: Mock APIs, TypeScript utilities, testing, frontend development  
**Code Examples**: ✅ Full utility implementation with configs  
**Fun Factor**: 🚀 Humorous, practical, with advanced patterns

### 3. Toast Notifications Done Right: Call Me From Anywhere 📞
**File**: `toast-notifications-everywhere.md`  
**Slug**: `toast-notifications-everywhere`  
**Topics**: Toast notifications, Sonner, Material-UI, global utilities  
**Code Examples**: ✅ Complete toast system with MUI styling  
**Fun Factor**: 🍞 Light-hearted, emoji-rich, super practical

## Structure

Each blog post:
- Has a matching entry in `src/data/blogPosts.ts`
- Contains multiple code examples with syntax highlighting
- Includes real-world use cases
- Has a conversational, fun tone (30% more fun than typical tech blogs)
- Provides practical, copy-paste-ready code

## Usage

To display full blog posts, you'll want to:

1. Create a `[slug]` dynamic route in `app/blog/[slug]/page.tsx`
2. Read the markdown file based on the slug
3. Use a markdown parser (like `react-markdown` or `@next/mdx`)
4. Apply syntax highlighting (like `rehype-highlight` or `prism`)

Example implementation:

```typescript
// app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const content = fs.readFileSync(
    path.join(process.cwd(), 'src/data/blogContent', `${params.slug}.md`),
    'utf-8'
  );

  return (
    <article>
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
```

## Adding New Posts

1. Create a new `.md` file in this directory
2. Add an entry to `src/data/blogPosts.ts`
3. Follow the existing format for consistency
4. Include code examples, emojis, and personality!

