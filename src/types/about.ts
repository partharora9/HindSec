export interface ValueItem {
  id: string;
  title: string;
  description: string;
}

export interface PhilosophyParagraph {
  text: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  alt?: string;
}

export interface AboutContentData {
  hero: {
    label: string;
    heading: string;
    photo: {
      src: string;
      alt: string;
    };
  };
  values: {
    label: string;
    heading: string;
    items: ValueItem[];
  };
  philosophy: {
    label: string;
    heading: string;
    paragraphs: string[];
  };
  team: {
    label: string;
    heading: string;
    members: TeamMember[];
  };
}
