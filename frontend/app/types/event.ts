export interface Event {
  id: number;
  title: string;
  slug: string;
  date: string;
  location: string;
  excerpt: string;
  content: string;
  featured_image: string;
}

export type Events = Event[];
