import Link from "next/link";
import Image from "next/image";
import { Shield, FileText, Download, ExternalLink, CheckCircle, Scale, Lock, Eye, BookOpen, Building, BadgeCheck, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Legal & CBSE Documents | Pathseekers",
  description: "Access CBSE affiliation details, mandatory disclosures, compliance documents, privacy policy, and terms of use for Pathseekers School, Beas.",
};

const AFFILIATION_DETAILS = [
  { label: "Affiliation Number", value: "1630982" },
  { label: "School Code", value: "40643" },
  { label: "Affiliated To", value: "Central Board of Secondary Education (CBSE), New Delhi" },
  { label: "Affiliation Status", value: "Provisional → Regular (Upgraded)" },
  { label: "Valid From", value: "April 2018" },
  { label: "Valid Until", value: "March 2028" },
  { label: "Category", value: "Co-Educational, English Medium" },
  { label: "Classes", value: "Nursery to Class XII (Science & Commerce)" },
];

const IMPORTANT_DOCUMENTS = [
  {
    title: "Mandatory Public Disclosure",
    description: "CBSE-mandated disclosure of school details including infrastructure, faculty qualifications, fee structure, and academic performance.",
    icon: FileText,
    href: "https://www.pathseekers.edu.in",
    external: true,
  },
  {
    title: "Self-Certification & Compliance",
    description: "Annual self-certification submitted to CBSE confirming adherence to affiliation bylaws, safety norms, and infrastructure standards.",
    icon: BadgeCheck,
    href: "#",
  },
  {
    title: "Transfer Certificate (TC) Format",
    description: "Standard CBSE Transfer Certificate format used when a student transfers out of Pathseekers to another CBSE or state-board school.",
    icon: FileText,
    href: "#",
  },
  {
    title: "Fee Structure 2026–27",
    description: "Complete fee schedule for all classes including tuition, transport, laboratory, and activity charges for the current academic session.",
    icon: FileText,
    href: "#",
  },
  {
    title: "School Infrastructure Report",
    description: "Detailed report on campus area, building safety certificate, fire safety compliance, number of classrooms, labs, and play areas.",
    icon: Building,
    href: "#",
  },
  {
    title: "Faculty Qualification Details",
    description: "List of all teaching staff with their educational qualifications, teaching experience, and CBSE training certifications.",
    icon: BookOpen,
    href: "#",
  },
];

const CBSE_COMPLIANCE_ITEMS = [
  "School follows the CBSE curriculum framework and NCERT syllabus for all classes.",
  "No capitation fee or donation is charged at the time of admission or thereafter.",
  "The school does not run any pre-primary classes as a feeder for admissions.",
  "All classrooms are equipped as per CBSE norms with adequate lighting, ventilation, and ICT facilities.",
  "Student-teacher ratio is maintained at 30:1 or better across all sections.",
  "The school conducts regular fire drills and has valid fire safety and building safety certificates.",
  "Annual academic calendar, examination schedule, and PTM dates are shared with parents at the start of each session.",
  "The school has a functional CBSE-mandated grievance redressal mechanism for parents and students.",
  "Sexual Harassment Committee (Internal Complaints Committee) is constituted as per UGC/CBSE directives.",
  "Library, laboratories, and sports infrastructure meet or exceed CBSE affiliation requirements.",
];

export default function LegalPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/chemistry1.jpg"
            alt="Legal Documents"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-8 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/80 via-accent-cream/60 to-white"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-primary-200 rounded-full shadow-sm mb-6">
            <Shield className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">Transparency &amp; Compliance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6">
            Legal &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">CBSE</span> Documents
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            We believe in full transparency. Access our affiliation details, mandatory disclosures, compliance certifications, and institutional policies here.
          </p>
        </div>
      </section>

      {/* CBSE Affiliation Details */}
      <section id="cbse-docs" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Official Recognition</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">CBSE Affiliation Details</h2>
          </div>

          <div className="bg-[#fafaf9] rounded-3xl border border-stone-200/50 shadow-sm overflow-hidden">
            <div className="p-8 sm:p-10 bg-gradient-to-r from-primary-900 to-primary-800 text-white flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <BadgeCheck className="w-7 h-7 text-primary-200" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">CBSE Affiliation No: 1630982</h3>
                <p className="text-primary-200 text-sm mt-1">Central Board of Secondary Education, New Delhi</p>
              </div>
            </div>
            <div className="divide-y divide-stone-200/50">
              {AFFILIATION_DETAILS.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between px-8 sm:px-10 py-4">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{item.label}</span>
                  <span className="text-sm font-semibold text-stone-900 mt-1 sm:mt-0">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Documents */}
      <section className="py-24 bg-[#fafaf9] border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Downloads</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Important Documents</h2>
            <p className="text-stone-500 mt-3 max-w-xl mx-auto text-sm">
              As mandated by CBSE, the following documents are available for public access. View the complete{" "}
              <a
                href="https://www.pathseekers.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary-700 hover:text-primary-600 underline underline-offset-2 transition-colors"
              >
                official CBSE disclosures on the Pathseekers School portal
              </a>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {IMPORTANT_DOCUMENTS.map((doc, idx) => (
              <a
                key={idx}
                href={doc.href}
                target={(doc as any).external ? "_blank" : undefined}
                rel={(doc as any).external ? "noopener noreferrer" : undefined}
                className="bg-white p-8 rounded-2xl border border-stone-200/50 shadow-sm flex flex-col justify-between glow-hover group"
              >
                <div>
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-200 transition-colors">
                    <doc.icon className="w-6 h-6 text-primary-700" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 group-hover:text-primary-800 transition-colors">{doc.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{doc.description}</p>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-primary-700 group-hover:text-primary-600 transition-colors">
                  {(doc as any).external ? (
                    <><ExternalLink className="w-3.5 h-3.5" /> View on Official Site</>
                  ) : (
                    <><Download className="w-3.5 h-3.5" /> Download PDF</>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CBSE Compliance */}
      <section className="py-24 bg-white border-t border-stone-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Regulatory Adherence</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">CBSE Compliance</h2>
            <p className="text-stone-500 mt-3 max-w-xl mx-auto text-sm">
              Pathseekers adheres to all CBSE affiliation bylaws and regulatory requirements. Key compliance highlights:
            </p>
          </div>

          <div className="space-y-3">
            {CBSE_COMPLIANCE_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-[#fafaf9] p-5 rounded-xl border border-stone-200/50 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm text-stone-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy-policy" className="py-24 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary-300 uppercase tracking-widest block mb-2">Data Protection</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">Privacy Policy</h2>
          </div>

          <div className="space-y-8 text-stone-300 text-sm leading-relaxed">
            <div className="p-8 bg-stone-800 rounded-2xl border border-stone-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-primary-400" />
                <h3 className="font-serif text-lg font-bold text-white">Information We Collect</h3>
              </div>
              <p>
                When you interact with our website or submit enquiry forms, we may collect personal information including your name, email address, phone number, and any additional details you voluntarily provide. For students and parents, we collect necessary information for admission processing, academic records, and campus safety systems.
              </p>
            </div>

            <div className="p-8 bg-stone-800 rounded-2xl border border-stone-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-5 h-5 text-primary-400" />
                <h3 className="font-serif text-lg font-bold text-white">How We Use Your Data</h3>
              </div>
              <p>
                Personal data is used exclusively for educational administration, communication with parents and guardians, admission processing, and improving our services. We do not sell, rent, or share personal information with any third parties for commercial purposes. Student photographs and achievements may be published on the school website and social media pages for institutional publicity unless parents opt out in writing.
              </p>
            </div>

            <div className="p-8 bg-stone-800 rounded-2xl border border-stone-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-primary-400" />
                <h3 className="font-serif text-lg font-bold text-white">Data Security</h3>
              </div>
              <p>
                We implement industry-standard security measures including encrypted data storage, secure server infrastructure, and restricted access protocols. All student academic records are maintained confidentially and shared only with authorised personnel. CCTV footage is stored securely and accessible only to designated security staff and school administration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms of Use */}
      <section id="terms" className="py-24 bg-[#fafaf9] border-t border-stone-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Website Usage</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Terms of Use</h2>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/50 shadow-sm space-y-6 text-sm text-stone-600 leading-relaxed">
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-2">1. Acceptance of Terms</h3>
              <p>By accessing and using the Pathseekers School website (pathseekers.edu.in), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please discontinue use of the website immediately.</p>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-2">2. Intellectual Property</h3>
              <p>All content on this website — including text, images, logos, graphics, videos, and the Pathseekers brand identity — is the intellectual property of Pathseekers School and is protected under Indian copyright and trademark law. Reproduction, distribution, or commercial use without prior written consent is strictly prohibited.</p>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-2">3. Accuracy of Information</h3>
              <p>While we make every effort to ensure the accuracy of information on this website, Pathseekers School does not guarantee that all content is error-free or up-to-date at all times. Fee structures, admission dates, and academic schedules are subject to change, and the latest information should always be confirmed with the school office directly.</p>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-2">4. User Conduct</h3>
              <p>Users must not attempt to gain unauthorised access to any part of the website, server, or connected systems. Any misuse — including posting defamatory, obscene, or misleading content through contact forms — may result in legal action under the Information Technology Act, 2000.</p>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-2">5. Governing Law</h3>
              <p>These terms are governed by the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Amritsar, Punjab.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right to Information */}
      <section className="py-24 bg-white border-t border-stone-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Public Accountability</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Right to Information</h2>
          </div>

          <div className="bg-[#fafaf9] p-8 sm:p-10 rounded-3xl border border-stone-200/50 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                <Info className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Information Officer</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  In compliance with the Right to Information Act, 2005 and CBSE directives, Pathseekers has designated the following officer for RTI-related queries:
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/50 space-y-3 mb-6">
              {[
                { label: "Designated Officer", value: "Mr. Sukhwinder Pal, Administrative Head" },
                { label: "Email", value: "xxx@pathseekers.edu.in" },
                { label: "Phone", value: "+91-XXXXX-XXXXX (Mon–Sat, 9 AM – 3 PM)" },
                { label: "Address", value: "Pathseekers School, GT Road, Beas, Amritsar, Punjab 143204" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider w-40 shrink-0">{item.label}</span>
                  <span className="text-sm text-stone-800 font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              All RTI requests must be submitted in writing (by post or email) with applicable fees as prescribed under the Act. The school endeavours to respond to all legitimate information requests within 30 working days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-10 sm:p-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Need More Information?</h2>
            <p className="text-primary-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              If you have questions about our CBSE affiliation, compliance policies, or require certified copies of any document, please reach out to our administrative office.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-900 font-bold rounded-full shadow-md hover:bg-stone-50 transition-all text-center tracking-wide"
              >
                Contact Administration
              </Link>
              <a
                href="https://www.pathseekers.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:bg-white/10 font-bold rounded-full transition-all text-center tracking-wide inline-flex items-center justify-center gap-2"
              >
                Visit Official Pathseekers Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
