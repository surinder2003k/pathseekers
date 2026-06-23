import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Pathseekers School Beas | Admission Enquiry & Directions Punjab",
  description:
    "Contact Pathseekers School, Dera Baba Jaimal Singh, Beas, Amritsar, Punjab – 143204. Get admission enquiry details, fee structure, transport enquiry, school timings, and directions to Pathseekers campus. Call, email, or visit Pathseekers – the best CBSE school in Beas, Punjab.",
  keywords: [
    "Pathseekers contact",
    "Pathseekers phone number",
    "Pathseekers email",
    "Pathseekers address",
    "Pathseekers admission enquiry",
    "Pathseekers School contact Beas",
    "contact CBSE school Beas Punjab",
    "Pathseekers fee structure",
    "Pathseekers transport enquiry",
    "Pathseekers school timings",
    "Pathseekers directions",
    "Pathseekers Beas location",
    "Pathseekers Dera Baba Jaimal Singh address",
    "Pathseekers Amritsar district",
    "Pathseekers Punjab 143204",
    "Pathseekers admission 2026-27",
    "Pathseekers enquiry form",
    "Pathseekers school map",
    "best CBSE school near me Beas",
    "Pathseekers prospectus request",
  ],
  openGraph: {
    title: "Contact Pathseekers School Beas | Admission Enquiry & Directions",
    description:
      "Contact Pathseekers School, Beas, Punjab for admission enquiry, fee details, transport. CBSE Affiliation 1630982.",
    url: "https://pathseekers.edu.in/contact",
    images: [{ url: "/school/8.jpg", width: 1200, height: 630, alt: "Contact Pathseekers School Beas" }],
  },
  alternates: {
    canonical: "https://pathseekers.edu.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
