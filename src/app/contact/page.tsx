import type { Metadata } from "next";
import React, { Suspense } from "react";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Securio",
  description:
    "Reach out today to discuss your cybersecurity assessment, penetration testing, or endpoint security needs. Securio is ready to partner with you.",
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#f0f1f3] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#2b50ae] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ContactPageClient />
    </Suspense>
  );
}
