"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  PenTool,
  Settings,
  FolderLock,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Compass,
  Activity,
  ExternalLink,
  Shield,
} from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/stories", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/create", label: "Write Article", icon: PenTool },
  { href: "/admin/manager", label: "Auto Publish", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Listen for logout events from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "admin_auth_state" && e.newValue?.startsWith("logged_out_")) {
        window.location.href = "/login";
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      // Notify other tabs
      localStorage.setItem("admin_auth_state", "logged_out_" + Date.now());
      window.location.href = "/login";
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-slate-100 font-sans overflow-hidden">

      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 76 : 256 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="shrink-0 h-screen bg-[#111827]/80 backdrop-blur-md border-r border-slate-800/60 flex flex-col justify-between py-5 px-3 relative z-40"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-8 w-7 h-7 rounded-full bg-primary-700 text-white border border-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors shadow-lg z-50"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        <div className="space-y-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 px-2 group">
            <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md border border-slate-200 group-hover:scale-105 transition-transform overflow-hidden">
              <Image 
                src="/school/ps_logo.png" 
                alt="Pathseekers Logo" 
                fill 
                sizes="40px"
                className="object-contain p-0.5" 
              />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
              >
                <span className="block font-serif text-sm font-bold tracking-tight text-white leading-none">
                  Pathseekers
                </span>
                <span className="block text-[9px] text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5" />
                  Admin Workspace
                </span>
              </motion.div>
            )}
          </Link>

          {/* Divider */}
          <div className="h-px bg-slate-800/60 mx-1" />

          {/* Navigation */}
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-primary-800/70 text-white shadow-inner border border-primary-700/30"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon
                    className={`w-4 h-4 shrink-0 ${isActive ? "text-primary-300" : "text-slate-500"}`}
                  />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="h-px bg-slate-800/60 mx-1" />

          {/* View Site link */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 transition-all`}
            title={collapsed ? "View Site" : undefined}
          >
            <ExternalLink className="w-4 h-4 shrink-0 text-slate-500" />
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
                View Public Site
              </motion.span>
            )}
          </Link>
        </div>

        {/* User profile + Logout */}
        <div className="pt-4 border-t border-slate-800/60 space-y-2">
          {/* User info */}
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800/40"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-700 to-primary-500 rounded-full flex items-center justify-center text-white font-serif font-bold text-xs shrink-0">
                  S
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[11px] font-bold text-slate-200 truncate leading-none">
                    Sunny
                  </span>
                  <span className="block text-[9px] text-primary-400 font-semibold tracking-wider uppercase mt-0.5">
                    Administrator
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all`}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
                Sign Out
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#0a0f1e] relative z-30">
        {/* Top header bar */}
        <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-[#0a0f1e]/80 backdrop-blur-md px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {ADMIN_NAV.find((n) =>
                n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)
              )?.label || "Admin Workspace"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              System Online
            </span>
            <Link href="/blog" target="_blank" className="text-primary-400 hover:text-primary-300 transition-colors">
              Live Blog →
            </Link>
          </div>
        </header>

        {/* Ambient lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/8 rounded-full blur-[160px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto p-8 md:p-10 space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
