import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Pathseekers School Beas | Campus, Labs, Sports & Events",
  description:
    "Browse the official photo gallery of Pathseekers School, Beas, Punjab. View images of our 25-acre campus, hi-tech science labs, robotics lab, sports facilities, annual events, cultural festivals, and CBSE board activities. Pathseekers School campus gallery – Dera Baba Jaimal Singh, Beas, Amritsar district.",
  keywords: [
    "Pathseekers gallery",
    "Pathseekers photos",
    "Pathseekers images",
    "Pathseekers School photos Beas",
    "Pathseekers campus images",
    "Pathseekers school building",
    "Pathseekers science lab photos",
    "Pathseekers robotics lab images",
    "Pathseekers sports photos",
    "Pathseekers annual day photos",
    "Pathseekers events gallery",
    "CBSE school photos Beas Punjab",
    "Pathseekers infrastructure images",
    "Pathseekers virtual tour",
    "best school campus Beas",
    "Pathseekers Beas campus photos",
    "Pathseekers playground sports meet",
    "Pathseekers chemistry lab photos",
    "Pathseekers school assembly",
  ],
  openGraph: {
    title: "Photo Gallery | Pathseekers School Beas Punjab",
    description:
      "Official photo gallery of Pathseekers School Beas. Campus, labs, sports, events, and cultural activities.",
    url: "https://pathseekers.edu.in/gallery",
    images: [{ url: "/school/8.jpg", width: 1200, height: 630, alt: "Pathseekers School Campus Gallery" }],
  },
  alternates: {
    canonical: "https://pathseekers.edu.in/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
