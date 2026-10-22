import { contactInfo as centralContactInfo } from "@/content/siteContent";

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  ariaLabel: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  addressMapUrl: string;
  socials: SocialLink[];
}

export const contactInfo: ContactInfo = centralContactInfo;
export default contactInfo;
