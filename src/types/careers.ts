export interface JobRole {
  id: string;
  slug: string;
  title: string;
  location: string;
  description: string;
  department?: string;
  datePosted?: string;
}
