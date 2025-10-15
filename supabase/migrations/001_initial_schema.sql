-- Create tables for portfolio data

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  project_number INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  image_path TEXT NOT NULL,
  creation TEXT NOT NULL,
  tech TEXT NOT NULL,
  hosted_url TEXT NOT NULL,
  github_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experience table
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT[] NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_project_number ON projects(project_number);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_experiences_display_order ON experiences(display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access for experiences" ON experiences FOR SELECT USING (true);

-- Create policies to allow public insert access (for migration script)
-- Note: In production, you may want to remove these and manage data via dashboard
CREATE POLICY "Public insert access for projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for blog_posts" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for skills" ON skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for experiences" ON experiences FOR INSERT WITH CHECK (true);

-- Storage policies for portfolio-images bucket
-- Note: These policies allow public read access and public uploads
-- You can make uploads more restrictive later if needed

-- Allow public to read all files in portfolio-images bucket
CREATE POLICY "Public read access for images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Allow public to upload files to portfolio-images bucket (for migration)
CREATE POLICY "Public upload access for images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images');

