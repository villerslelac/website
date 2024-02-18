export interface Post {
  id: number;
  status: 'published' | 'draft' | 'archived';
  title: string;
  slug: string;
  date_published: string;
  featured: boolean;
  excerpt: string;
  content: string;
  tag: Tag;
  featured_image: string;
}

export type Posts = Post[];

export interface Tag {
  id: number;
  name: string;
  color: string;
}
