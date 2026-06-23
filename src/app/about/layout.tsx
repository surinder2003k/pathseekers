import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pathseekers School Beas | History, Vision & Campus | CBSE School Punjab",
  description:
    "Learn about Pathseekers School, Dera Baba Jaimal Singh, Beas, Punjab. Established in 2004, Pathseekers is a premier CBSE affiliated co-educational school (Affiliation No. 1630982) spread across 25.79 acres offering education from nursery to Class XII. Discover our history, vision, mission, core values, and world-class campus infrastructure in Beas, Amritsar district, Punjab.",
  keywords: [
    "Pathseekers about",
    "Pathseekers School history",
    "Pathseekers Beas about us",
    "about Pathseekers School Beas Punjab",
    "Pathseekers vision mission",
    "Pathseekers core values",
    "CBSE school Beas history",
    "Pathseekers campus 25 acres",
    "Pathseekers Dera Baba Jaimal Singh",
    "Pathseekers RSSB Educational Society",
    "Pathseekers co-educational school",
    "Pathseekers nursery to class 12",
    "best school Beas Punjab about",
    "Pathseekers affiliation 1630982",
    "Pathseekers School Amritsar district",
    "pathseekers.edu.in about",
    "Pathseekers holistic education",
    "Pathseekers value based education",
    "top CBSE school Beas Punjab",
    "Pathseekers school infrastructure",
  ],
  openGraph: {
    title: "About Pathseekers School Beas | History, Vision & Campus",
    description:
      "Pathseekers School, Beas, Punjab – CBSE affiliated (Aff. 1630982). Learn about our 25-acre campus, holistic education philosophy, and 20+ year legacy of nurturing students from nursery to Class XII.",
    url: "https://pathseekers.edu.in/about",
    images: [{ url: "/school/8.jpg", width: 1200, height: 630, alt: "Pathseekers School Beas Campus" }],
  },
  alternates: {
    canonical: "https://pathseekers.edu.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
