import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import Script from "next/script";
import ToasterProvider from "@/components/ToasterProvider";
import "./globals.css";

import { getBaseUrl } from "@/lib/seo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const SCHOOL_KEYWORDS = [
  "Pathseekers",
  "Pathseekers School",
  "Pathseekers Beas",
  "Pathseekers Punjab",
  "Pathseekers CBSE School",
  "Pathseekers Dera Baba Jaimal Singh",
  "Pathseekers Amritsar",
  "Pathseekers login",
  "Pathseekers portal",
  "Pathseekers school Beas Punjab admissions",
  "Best CBSE school Beas",
  "Best school in Beas Punjab",
  "CBSE school Beas Punjab",
  "CBSE affiliated school Beas",
  "CBSE school Amritsar district",
  "top school Beas Punjab",
  "co-educational school Beas",
  "RSSB Educational Society school",
  "Dera Baba Jaimal Singh school",
  "school near Beas",
  "boarding school Beas",
  "day school Beas Punjab",
  "Pathseekers affiliation 1630982",
  "CBSE affiliation 1630982",
  "Pathseekers principal Dr Suneeta Jasrai",
  "Pathseekers patron",
  "school Beas Amritsar Punjab India",
  "English medium school Beas",
  "quality education Beas Punjab",
  "holistic education Punjab",
  "Pathseekers nursery to class 12",
  "Pathseekers pre-school primary middle secondary",
  "Pathseekers 25 acre campus",
  "Pathseekers 1002 students",
  "Pathseekers DEAR program",
  "Pathseekers FLN initiative",
  "Pathseekers special education",
  "Pathseekers robotics lab",
  "Pathseekers chemistry lab",
  "Pathseekers physics lab",
  "Pathseekers sports",
  "Pathseekers annual sports meet",
  "Pathseekers virtual tour",
  "admission 2026 Beas school",
  "class 10 class 12 school Beas",
  "CBSE board results 2025 Beas",
];

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: {
    default: "Pathseekers School Beas Punjab | Best CBSE School | Affiliation 1630982",
    template: "%s | Pathseekers School Beas Punjab",
  },
  description:
    "Pathseekers School, Dera Baba Jaimal Singh, Beas, Punjab – Best CBSE affiliated co-educational school (Affiliation No. 1630982). Pathseekers offers world-class education from nursery to Class XII across 25.79 acres. 100% CBSE board pass rate. Pathseekers Beas – Find your path, Create your future.",
  keywords: SCHOOL_KEYWORDS,
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Pathseekers School Beas Punjab | Best CBSE School | Affiliation 1630982",
    description:
      "Pathseekers School, Beas, Punjab – CBSE affiliated (Aff. 1630982). Premium co-educational school from nursery to Class XII. Pathseekers – Find your path, Create your future.",
    url: baseUrl,
    siteName: "Pathseekers School Beas Punjab",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/school/8.jpg",
        width: 1200,
        height: 630,
        alt: "Pathseekers School Beas Punjab Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pathseekers School Beas Punjab | Best CBSE School",
    description:
      "Pathseekers – Best CBSE school in Beas, Punjab. Affiliation No. 1630982. Nursery to Class XII. 25-acre campus.",
    images: ["/school/8.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7DDDhNUg6jYfqTlpcjhcRviMdzzUvxJd2Y-rKmNEqdk",
  },
  category: "education",
  classification: "School",
};

// JSON-LD Structured Data
const schoolJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "School",
      "@id": `${baseUrl}/#school`,
      name: "Pathseekers School",
      alternateName: ["Pathseekers Beas", "Pathseekers", "Pathseekers Punjab"],
      url: baseUrl,
      logo: `${baseUrl}/school/ps_logo.png`,
      image: `${baseUrl}/school/8.jpg`,
      description:
        "Pathseekers School, Dera Baba Jaimal Singh, Beas, Punjab is a premier CBSE affiliated co-educational school (Affiliation No. 1630982) offering education from nursery to Class XII across a 25.79-acre campus. Pathseekers is run by RSSB Educational & Environmental Society.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dera Baba Jaimal Singh",
        addressLocality: "Beas",
        addressRegion: "Punjab",
        postalCode: "143204",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 31.9133,
        longitude: 75.0025,
      },
      telephone: "+91-XXXXX-XXXXX",
      email: "xxx@pathseekers.edu.in",
      foundingDate: "2004",
      numberOfStudents: 1002,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "CBSE Affiliation",
        recognizedBy: {
          "@type": "Organization",
          name: "Central Board of Secondary Education",
          alternateName: "CBSE",
        },
        identifier: "1630982",
      },
      sameAs: [
        baseUrl,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Pathseekers School Beas Punjab",
      description: "Official website of Pathseekers School, Beas, Punjab – Best CBSE school",
      publisher: { "@id": `${baseUrl}/#school` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Pathseekers School Beas",
          item: baseUrl,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${playfair.variable} font-sans min-h-screen bg-[#fafaf9] text-[#1c1917] antialiased flex flex-col`}
      >
        <ToasterProvider />
        {/* JSON-LD Structured Data */}
        <script
          id="school-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
