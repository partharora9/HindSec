# Service Architecture & Maintenance Guide

This document explains the architecture of the service offerings in this repository and provides instructions for adding, editing, or removing services and categories.

---

## 1. Architecture Overview (Single Source of Truth)

All service categories and individual service modules are defined in **one data file**:

- **Location:** [`src/data/services.ts`](file:///c:/Users/parth/Documents/VAPTwebsite/src/data/services.ts)

Nothing is hardcoded across components or page routes. When you modify this file:
1. **Dynamic Pages** (`/services/[category]`): Pre-render automatically using `generateStaticParams()`.
2. **Overview Page** (`/services`): Renders all 6 categories, summaries, module counts, and preview chips.
3. **Desktop Header Mega-Menu**: Renders all 6 categories with their sub-services.
4. **Mobile Navigation**: Accordion dynamically renders categories and child services.
5. **Footer Links**: Footer lists all category links dynamically.
6. **Sitemap** (`sitemap.xml`): Automatically includes all category URLs with appropriate priority and change frequencies.
7. **SEO & Structured Data**: JSON-LD `Service`, `OfferCatalog`, and `BreadcrumbList` schemas are generated automatically.

---

## 2. Data Schema Reference

### Category Schema (`ServiceCategory`)
```typescript
export interface ServiceCategory {
  slug: string;             // URL-friendly identifier (e.g. "ai-security-products")
  title: string;            // Display title (e.g. "AI Security Product Development")
  tagline: string;          // One-line value proposition displayed in hero & cards
  summary: string;          // Concise, professional overview (British spelling)
  icon: string;             // Name of Lucide icon (e.g. "ShieldAlert", "Cpu", "Bot")
  services: ServiceItem[];  // Array of 8 modular service capabilities
  whoItIsFor: {
    heading: string;        // Section heading (e.g. "Who It's For")
    audiences: {            // 3 target buyer/team profiles
      title: string;
      description: string;
    }[];
  };
  howWeWork: {
    heading: string;        // Section heading (e.g. "How We Work")
    steps: {                // 4-5 step engineering methodology
      number: number;
      title: string;
      description: string;
    }[];
  };
  cta: {                    // Category-specific call-to-action block
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
  };
}
```

### Service Module Schema (`ServiceItem`)
```typescript
export interface ServiceItem {
  slug: string;             // URL anchor slug (e.g. "ai-based-security-analytics")
  title: string;            // Module title
  shortDescription: string; // 1-2 line outcome-focused description
  icon: string;             // Lucide icon name (e.g. "Activity", "ShieldCheck")
}
```

---

## 3. How to Add a New Service Category

1. Open [`src/data/services.ts`](file:///c:/Users/parth/Documents/VAPTwebsite/src/data/services.ts).
2. Append a new object to the `serviceCategories` array conforming to `ServiceCategory`:
   ```typescript
   {
     slug: "new-category-slug",
     title: "New Category Title",
     tagline: "One-line value proposition here.",
     summary: "Outcome-focused summary of the service offering.",
     icon: "Cpu", // or another Lucide icon supported in ServiceIcon.tsx
     services: [
       {
         slug: "module-one",
         title: "Module One",
         shortDescription: "Concise description of the capability.",
         icon: "Zap",
       },
       // ... other services
     ],
     whoItIsFor: {
       heading: "Who It's For",
       audiences: [
         { title: "Target Audience", description: "Who benefits from this capability." }
       ],
     },
     howWeWork: {
       heading: "How We Work",
       steps: [
         { number: 1, title: "Phase 1", description: "Step description." }
       ],
     },
     cta: {
       title: "Schedule a Consultation",
       description: "Speak with our architects.",
       primaryButtonText: "Book a Consultation",
       primaryButtonHref: "/contact?service=new-category-slug",
     },
   }
   ```
3. If using an icon not yet registered, open [`src/components/services/ServiceIcon.tsx`](file:///c:/Users/parth/Documents/VAPTwebsite/src/components/services/ServiceIcon.tsx) and import it from `lucide-react`.
4. Run `npx tsc --noEmit` to verify type compliance. The new category page (`/services/new-category-slug`), navigation menus, overview cards, and sitemap update automatically.

---

## 4. How to Edit an Existing Service or Category

1. Open [`src/data/services.ts`](file:///c:/Users/parth/Documents/VAPTwebsite/src/data/services.ts).
2. Find the category by its `slug` or title.
3. Modify the desired fields (e.g., `tagline`, `summary`, or individual `services[i].shortDescription`).
4. Keep copy concise, outcome-focused, and adhere to British spelling (`Customisation`, `Optimisation`, `Organisation`).

---

## 5. How to Remove a Service or Category

1. Open [`src/data/services.ts`](file:///c:/Users/parth/Documents/VAPTwebsite/src/data/services.ts).
2. Remove the service module from the category's `services` array, or delete the category object from `serviceCategories`.
3. If removing an entire category, consider adding a 301 redirect in `next.config.ts` if the URL was previously indexed.

---

## 6. Icon Registry

Icons are rendered dynamically by [`src/components/services/ServiceIcon.tsx`](file:///c:/Users/parth/Documents/VAPTwebsite/src/components/services/ServiceIcon.tsx). Over 40 cybersecurity and AI icons from `lucide-react` are pre-mapped, including:
- `ShieldAlert`, `ShieldCheck`, `Shield`, `Activity`, `Bot`, `Radar`, `FileCode`
- `Cpu`, `Wrench`, `Building2`, `Code2`, `Sliders`, `BookOpenCheck`, `ListChecks`
- `Gauge`, `Zap`, `Server`, `FileSearch`, `Layers`, `BookOpen`, `FileText`
- `MessageSquare`, `CheckSquare`, `Search`, `Headphones`, `Database`, `Workflow`
- `HardDrive`, `Cloud`, `TrendingDown`, `GitBranch`, `Cable`, `Terminal`, `Unlock`
- `EyeOff`, `FileLock2`, `KeyRound`, `CheckCheck`

---

## 7. Quality & Validation Commands

To verify changes before committing:
```bash
# Verify TypeScript types:
npx tsc --noEmit

# Test production build & static prerendering:
npm run build
```
