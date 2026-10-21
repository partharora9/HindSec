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

export const contactInfo: ContactInfo = {
  email: "hello@domain.com",
  phone: "+1 (123) 456-7890",
  address: "456 Business Ave, New York,  NY 10001",
  addressMapUrl: "https://www.google.com/maps/search/?api=1&query=456+Business+Ave,+New+York,+NY+10001",
  socials: [
    {
      id: "facebook",
      name: "Facebook",
      href: "https://facebook.com",
      ariaLabel: "Follow Securio on Facebook",
    },
    {
      id: "instagram",
      name: "Instagram",
      href: "https://instagram.com",
      ariaLabel: "Follow Securio on Instagram",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      href: "https://linkedin.com",
      ariaLabel: "Follow Securio on LinkedIn",
    },
    {
      id: "x",
      name: "X",
      href: "https://x.com",
      ariaLabel: "Follow Securio on X",
    },
  ],
};
