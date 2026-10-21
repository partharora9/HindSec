import React from "react";

export interface ServiceCardItem {
  id: string;
  icon: (isHovered: boolean, isInView: boolean, delay?: number) => React.ReactNode;
  title: string;
  description: string;
}

export interface ServiceWhatIsData {
  heading: string;
  paragraphs: [string, string];
  checklistLabel: string;
  checklist: string[];
}

export interface ServiceDeliveryItem {
  number: number;
  title: string;
  description: string;
}

export interface ServiceDeliveryData {
  heading: React.ReactNode;
  items: ServiceDeliveryItem[];
  photo: {
    src: string;
    alt: string;
    fallbackGradient?: string;
  };
}

export interface ServiceOutcomeItem {
  id: string;
  icon: (isHovered: boolean, isInView: boolean, delay?: number) => React.ReactNode;
  title: React.ReactNode;
  description: string;
}

export interface ServiceHeroData {
  title: string;
  paragraph: React.ReactNode;
  background: React.ReactNode;
}

export interface ServicePageData {
  hero: ServiceHeroData;
  cards: [ServiceCardItem, ServiceCardItem, ServiceCardItem];
  whatIs: ServiceWhatIsData;
  delivery: ServiceDeliveryData;
  outcomes: ServiceOutcomeItem[];
  testimonialAuthor?: {
    name: string;
    role: string;
    className?: string;
  };
}
