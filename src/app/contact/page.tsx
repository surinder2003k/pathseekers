"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, ExternalLink, BookOpen, Users, GraduationCap, FileText, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SUBJECT_OPTIONS = [
  "General Enquiry",
  "Admission Enquiry",
  "Fee Related",
  "Transport Enquiry",
  "Academic Query",
  "Complaint / Feedback",
  "Alumni Registration",
  "Media / Press",
  "Other",
];

const QUICK_LINKS = [
  { label: "School Gallery", href: "/gallery", icon: GraduationCap },
  { label: "About Pathseekers", href: "/about", icon: BookOpen },
  { label: "Faculty & Staff", href: "/faculty", icon: Users },
  { label: "CBSE & Legal Documents", href: "/legal", icon: FileText },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message. Please try again later.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/6.jpg"
            alt="Contact Pathseekers"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-10 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/80 via-accent-cream/60 to-white"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-primary-200 rounded-full shadow-sm mb-6">
            <Mail className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">Get in Touch</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6">
            We&apos;d Love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Hear</span> From You
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Have a question about admissions, academics, or campus life? Reach out to us — our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Reach Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="bg-[#fafaf9] p-8 rounded-3xl border border-stone-200/50 shadow-sm text-center glow-hover">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-7 h-7 text-primary-700" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Our Address</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Dera Baba Jaimal Singh, Beas,<br />
                Distt. Amritsar, Punjab-143204<br />
                India
              </p>
            </div>

            {/* Phone */}
            <div className="bg-[#fafaf9] p-8 rounded-3xl border border-stone-200/50 shadow-sm text-center glow-hover">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Phone className="w-7 h-7 text-primary-700" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Phone</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                <a href="tel:+919876500000" className="hover:text-primary-700 transition-colors">+91-XXXXX-XXXXX</a><br />
                <span className="text-xs text-stone-400">Monday – Saturday, 8 AM – 4 PM</span>
              </p>
            </div>

            {/* Email */}
            <div className="bg-[#fafaf9] p-8 rounded-3xl border border-stone-200/50 shadow-sm text-center glow-hover">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Mail className="w-7 h-7 text-primary-700" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Email</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                <a href="mailto:xxx@pathseekers.edu.in" className="hover:text-primary-700 transition-colors">xxx@pathseekers.edu.in</a><br />
                <a href="mailto:xxx@pathseekers.edu.in" className="hover:text-primary-700 transition-colors text-xs text-stone-400">xxx@pathseekers.edu.in</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-[#fafaf9] border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Send a Message</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-8">Contact Form</h2>

              {submitted ? (
                <div className="bg-white p-10 rounded-3xl border border-emerald-200 shadow-sm text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. Our team will get back to you within 24–48 business hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-6 text-sm text-primary-700 font-bold hover:text-primary-600 transition-colors"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form action="/api/contact" method="POST" onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-stone-200/50 shadow-sm space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Harpreet Singh"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#fafaf9] text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                    />
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#fafaf9] text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91-XXXXX-XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#fafaf9] text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#fafaf9] text-sm text-stone-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                      >
                        <option value="">Select a subject…</option>
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here…"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#fafaf9] text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl mb-4 text-center">
                      <p className="text-sm font-semibold text-rose-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="glow-button w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary-800 to-primary-600 text-white rounded-full font-bold shadow-lg hover:shadow-primary-300 hover:scale-105 transition-all tracking-wide flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {submitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map Placeholder & Hours */}
            <div className="space-y-8">
              {/* Map */}
              <div>
                <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Location</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-8">Find Us</h2>
                <div className="bg-white rounded-3xl border border-stone-200/50 shadow-sm overflow-hidden">
                  <div className="relative h-72 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-cream flex flex-col items-center justify-center text-center p-8">
                    <MapPin className="w-12 h-12 text-primary-600 mb-4" />
                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Pathseekers School, Beas</h3>
                    <p className="text-xs text-stone-500 mb-4">GT Road, Beas, Amritsar, Punjab 143204</p>
                    <a
                      href="https://www.google.com/maps/search/Pathseekers+School+Beas+GT+Road+Amritsar+Punjab+143204"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-800 to-primary-600 text-white rounded-full text-sm font-bold shadow hover:shadow-primary-300 hover:scale-105 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-white p-8 rounded-3xl border border-stone-200/50 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-700" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">Operating Hours</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Monday – Friday", time: "8:00 AM – 3:30 PM", active: true },
                    { day: "Saturday", time: "8:00 AM – 1:00 PM", active: true },
                    { day: "Sunday", time: "Closed", active: false },
                    { day: "Office (Mon–Sat)", time: "8:00 AM – 4:00 PM", active: true },
                  ].map((slot, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2.5 border-b border-stone-100 last:border-0">
                      <span className="text-sm font-medium text-stone-700">{slot.day}</span>
                      <span className={`text-sm font-bold ${slot.active ? "text-emerald-600" : "text-stone-400"}`}>
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white border-t border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Explore More</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Quick Links</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_LINKS.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="bg-[#fafaf9] p-6 rounded-2xl border border-stone-200/50 shadow-sm flex items-center gap-4 group glow-hover"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary-200 transition-colors">
                  <link.icon className="w-5 h-5 text-primary-700" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-bold text-stone-900 group-hover:text-primary-800 transition-colors">{link.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-primary-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
