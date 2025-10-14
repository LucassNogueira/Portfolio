# Lucas Nogueira - Professional Portfolio

A modern, professional portfolio website built with Next.js, TypeScript, and Material-UI. Features a clean, minimalist design with smooth scrolling navigation and responsive layout.

## 🚀 Features

- **Modern Design**: Clean, professional layout with excellent typography and spacing
- **Dual Navigation System**: 
  - **Home Page**: Smooth scrolling navigation between sections for a single-page experience
  - **Dedicated Pages**: Each section also has its own dedicated page with expanded content
  - Smart navigation automatically switches between smooth scrolling and page navigation
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Contact Form**: Built with React Hook Form and Jotai for state management
- **Project Showcase**: Clean grid layout with tech stack tags
- **Blog Section**: Writing showcase with article cards
- **Resume Section**: Skills categories and experience timeline
- **About Me Section**: Personal story, values, and professional focus
- **Smooth Animations**: Hover effects and smooth transitions
- **Back Navigation**: Easy return to home page from dedicated pages

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Material-UI (MUI)
- **State Management**: Jotai
- **Forms**: React Hook Form
- **Smooth Scrolling**: react-scroll
- **Icons**: Material-UI Icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main home page with all sections
│   ├── about/
│   │   └── page.tsx       # Dedicated About page
│   ├── projects/
│   │   └── page.tsx       # Dedicated Projects page (shows ALL projects)
│   ├── blog/
│   │   └── page.tsx       # Dedicated Blog page (shows ALL posts)
│   ├── resume/
│   │   └── page.tsx       # Dedicated Resume page
│   └── contact/
│       └── page.tsx       # Dedicated Contact page
├── components/            # React components
│   ├── Home.tsx          # Hero section
│   ├── About.tsx         # About Me section
│   ├── Projects.tsx      # Projects showcase (top 3)
│   ├── Blog.tsx          # Writing/blog section (top 4)
│   ├── Resume.tsx        # Skills and experience
│   ├── Contact.tsx       # Contact form
│   ├── Footer.tsx        # Footer
│   └── Header.tsx        # Smart navigation header
├── data/                 # Static data
│   ├── projects.ts       # Project data
│   ├── blogPosts.ts      # Blog post data
│   ├── skills.ts         # Skills categories
│   └── experience.ts     # Work experience data
├── lib/                  # Utilities
│   └── atoms.ts          # Jotai atoms
└── types/                # TypeScript interfaces
    └── index.ts          # Type definitions
```

## 🧭 Navigation System

The portfolio features a **smart dual-navigation system**:

### On the Home Page (`/`)
- Clicking navigation links uses **smooth scrolling** to jump between sections
- Provides a seamless single-page experience
- All sections are visible on one page

### On Dedicated Pages (`/about`, `/projects`, etc.)
- Clicking navigation links performs **regular page navigation**
- Each page shows the same component PLUS additional content
- **"Back to Home" button** at the top of each page for easy navigation
- Dedicated pages show expanded content (e.g., ALL projects instead of just top 3)

### Adding More Content to Dedicated Pages

Each dedicated page includes comments showing where you can add more detailed content:

**About Page**: Add education, certifications, hobbies, photo gallery, career timeline, awards
**Projects Page**: Add project case studies, detailed descriptions, challenges/solutions, metrics, testimonials
**Blog Page**: Add search, filtering, pagination, full articles, comments, related posts
**Resume Page**: Add detailed job descriptions, project highlights, education details, certifications, volunteer work
**Contact Page**: Add FAQ, office hours, meeting scheduler, map, social feeds, testimonials

## 🎨 Design Features

- **Professional Color Scheme**: Blue primary colors with clean grays
- **Typography**: Poppins font family for modern, readable text
- **Spacing**: Consistent, generous spacing throughout
- **Cards**: Subtle shadows and hover effects
- **Buttons**: Rounded corners with smooth transitions
- **Forms**: Clean, accessible form design with validation

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile (xs): < 600px
- Tablet (sm): 600px - 960px
- Desktop (md): 960px - 1280px
- Large Desktop (lg): > 1280px

## Deployment

This project is configured for deployment on Vercel, Netlify, or any other platform that supports Next.js.

## Contact

- **Email**: Howdy@lucasnogueira.dev
- **Location**: Grand Prairie, TX
- **GitHub**: [@LucassNogueira](https://github.com/LucassNogueira)
- **LinkedIn**: [Lucas Nogueira](https://www.linkedin.com/in/lucas-nogueira-34aa41228/)

## Professional Profile

Lucas Nogueira is a Web Engineer at Veryable in Dallas, TX, specializing in React, Next.js, and TypeScript. He architects scalable solutions for marketplace and workforce management systems, with expertise in:

- End-to-end feature delivery from PRD to production
- TypeScript migration and system modernization
- React/Next.js frontend development
- Event-driven microservices and BFF patterns
- Payment automation and scheduling systems

Prior to software engineering, Lucas was an owner-operator of successful restaurant locations, bringing a unique perspective on operational efficiency and user experience to his development work.
