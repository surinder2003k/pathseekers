import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics & Curriculum | Pathseekers School Beas | CBSE Syllabus Nursery to Class XII",
  description:
    "Explore the academic curriculum at Pathseekers School, Beas, Punjab. CBSE syllabus from nursery to Class XII covering Science, Commerce, Arts. Discover FLN initiative, DEAR reading program, Special Education Cell, STEM labs, robotics, and innovative teaching methodologies at Pathseekers Beas.",
  keywords: [
    "Pathseekers academics",
    "Pathseekers curriculum",
    "Pathseekers CBSE syllabus",
    "Pathseekers subjects",
    "CBSE school curriculum Beas",
    "Pathseekers Science Commerce",
    "Pathseekers FLN initiative",
    "Pathseekers DEAR program",
    "Pathseekers special education",
    "Pathseekers STEM education",
    "Pathseekers robotics lab",
    "Pathseekers NEP 2020",
    "Pathseekers nursery primary middle secondary",
    "Pathseekers Class 10 12 board preparation",
    "best CBSE curriculum Beas Punjab",
    "Pathseekers academic excellence",
    "Pathseekers board results 100 percent",
    "Pathseekers coding classes",
    "Pathseekers foundational literacy numeracy",
    "Pathseekers experiential learning",
  ],
  openGraph: {
    title: "Academics & Curriculum | Pathseekers School Beas Punjab",
    description:
      "CBSE curriculum from Nursery to Class XII at Pathseekers School Beas. FLN, DEAR, Special Education, STEM labs, robotics, and 100% board pass rate.",
    url: "https://pathseekers.edu.in/academics",
    images: [{ url: "/school/chemistry1.jpg", width: 1200, height: 630, alt: "Pathseekers School Science Lab" }],
  },
  alternates: {
    canonical: "https://pathseekers.edu.in/academics",
  },
};

export default function AcademicsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
