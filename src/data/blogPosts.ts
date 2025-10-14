import { BlogPost } from '@/types'

export const blogPosts: BlogPost[] = [
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
