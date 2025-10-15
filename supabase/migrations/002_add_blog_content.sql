-- Add content column to blog_posts table for storing markdown content

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS content TEXT;

-- Add comment explaining the column
COMMENT ON COLUMN blog_posts.content IS 'Full markdown content of the blog post';

