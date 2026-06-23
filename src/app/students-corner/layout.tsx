import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students Corner & Notice Board | Pathseekers School Beas | CBSE Resources Punjab",
  description:
    "Access the Students Corner at Pathseekers School, Beas, Punjab. View active notices, CBSE board exam updates, holiday homework, academic calendar, downloadable syllabus, student achievements, co-curricular awards, and campus resources. Pathseekers student hub for Class I to XII.",
  keywords: [
    "Pathseekers students corner",
    "Pathseekers notice board",
    "Pathseekers student resources",
    "Pathseekers homework",
    "Pathseekers CBSE syllabus download",
    "Pathseekers academic calendar",
    "Pathseekers student achievements",
    "Pathseekers co-curricular awards",
    "CBSE school notices Beas",
    "Pathseekers holiday homework",
    "Pathseekers exam schedule",
    "Pathseekers Class 10 12 resources",
    "Pathseekers student awards",
    "Pathseekers competitions",
    "Pathseekers chess championship",
    "Pathseekers science fair",
    "Pathseekers debate competition",
    "Pathseekers olympiad results",
    "best CBSE school student portal Beas",
    "Pathseekers Beas student corner",
  ],
  openGraph: {
    title: "Students Corner & Notice Board | Pathseekers School Beas",
    description:
      "Student notices, homework, downloadable resources, achievements, and co-curricular awards at Pathseekers School Beas Punjab.",
    url: "https://pathseekers.edu.in/students-corner",
    images: [{ url: "/school/robotics2.jpg", width: 1200, height: 630, alt: "Pathseekers Students Corner" }],
  },
  alternates: {
    canonical: "https://pathseekers.edu.in/students-corner",
  },
};

export default function StudentsCornerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
