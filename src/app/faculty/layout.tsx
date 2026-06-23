import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty & Staff | Pathseekers School Beas | Experienced CBSE Teachers Punjab",
  description:
    "Meet the experienced and qualified faculty of Pathseekers School, Beas, Punjab. 78+ dedicated teachers across Science, Mathematics, Humanities, Languages, and Administrative departments. Our CBSE-trained educators bring academic excellence and holistic development to every student at Pathseekers.",
  keywords: [
    "Pathseekers faculty",
    "Pathseekers teachers",
    "Pathseekers staff",
    "Pathseekers School teachers Beas",
    "CBSE school teachers Beas Punjab",
    "Pathseekers science teachers",
    "Pathseekers mathematics department",
    "Pathseekers humanities teachers",
    "Pathseekers principal Dr Suneeta Jasrai",
    "Pathseekers qualified educators",
    "best school teachers Beas",
    "Pathseekers teaching methodology",
    "Pathseekers department heads",
    "experienced teachers Beas Punjab",
    "Pathseekers school staff directory",
    "CBSE trained teachers Punjab",
    "Pathseekers 78 teachers",
    "Pathseekers academic mentors",
  ],
  openGraph: {
    title: "Faculty & Staff | Pathseekers School Beas Punjab",
    description:
      "78+ qualified and dedicated teachers at Pathseekers School Beas. Meet our Science, Maths, Humanities, and Administrative staff.",
    url: "https://pathseekers.edu.in/faculty",
    images: [{ url: "/school/8.jpg", width: 1200, height: 630, alt: "Pathseekers Faculty & Staff" }],
  },
  alternates: {
    canonical: "https://pathseekers.edu.in/faculty",
  },
};

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
