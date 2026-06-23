import Link from "next/link";
import { 
  Users, 
  BookOpen, 
  Activity, 
  TrendingUp, 
  PlusCircle, 
  ArrowUpRight, 
  BadgeCheck, 
  FolderLock, 
  Settings,
  Flame
} from "lucide-react";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import AutoPublishButton from "@/components/admin/AutoPublishButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboard() {
  // Get counts
  const totalAdmins = await db.adminUser.count();
  const totalStudents = await db.student.count();
  const totalBlogs = await db.blogPost.count();
  
  // Get total article views
  const blogs = await db.blogPost.findMany();
  const totalViews = blogs.reduce((sum: number, b: any) => sum + (b.views || 0), 0);

  // Get recent activity logs
  const logs = await db.editorialLog.findMany({ take: 5 });

  const stats = [
    { label: "Total Students", value: totalStudents, change: "Enrolled in CBSE", icon: Users, color: "text-blue-450 bg-blue-500/10" },
    { label: "Admin Users", value: totalAdmins, change: "Access Verified", icon: FolderLock, color: "text-purple-450 bg-purple-500/10" },
    { label: "Blog Articles", value: totalBlogs, change: "Total Published", icon: BookOpen, color: "text-emerald-450 bg-emerald-500/10" },
    { label: "Total Views", value: totalViews, change: "Article Reach", icon: TrendingUp, color: "text-amber-450 bg-amber-500/10" },
  ];

  return (
    <div className="space-y-8 text-slate-250">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Manage students, blog posts, and auto-publish settings for Pathseekers School.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <AutoPublishButton defaultCategory="Education" />
          <Link
            href="/admin/create"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-primary-800 to-primary-600 hover:from-primary-750 hover:to-primary-550 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow shadow-primary-900/40 border border-primary-700/30"
          >
            <PlusCircle className="w-4 h-4" />
            Write New Blog
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900/60 backdrop-blur border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden group hover:border-primary-800 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">{stat.label}</span>
                <span className="text-3xl font-serif font-bold text-white block mt-1.5">{stat.value}</span>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.color} shrink-0`}>
                <stat.icon className="w-5.5 h-5.5" />
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5 text-primary-500" />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Logs + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity Logs */}
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-primary-500" />
              <h3 className="font-serif text-lg font-bold text-white">Recent Activity</h3>
            </div>
            <Link href="/admin/manager" className="text-[10px] font-bold uppercase tracking-wider text-primary-550 hover:underline">
              View All Logs
            </Link>
          </div>

          <div className="space-y-4">
            {logs.map((log: any) => (
              <div key={log.id} className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/50 flex gap-4 items-start">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${
                  log.level === "ERROR" ? "bg-rose-500 animate-pulse" :
                  log.level === "SUCCESS" ? "bg-emerald-500" : "bg-primary-500"
                }`}></div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span>{log.level}</span>
                    <span>{formatDate(log.timestamp)}</span>
                  </div>
                  <p className="text-xs text-slate-350 leading-relaxed font-semibold">{log.message}</p>
                </div>
              </div>
            ))}
            
            {logs.length === 0 && (
              <div className="text-center py-10">
                <p className="text-xs text-slate-500 font-semibold">No activity logs yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links Sidebar */}
        <div className="bg-slate-900/60 backdrop-blur border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4">Quick Links</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Jump to different sections of the admin panel.
            </p>
            
            <div className="space-y-3">
              {[
                { label: "Student Records", href: "/admin/students", icon: Users },
                { label: "All Blog Posts", href: "/admin/stories", icon: BookOpen },
                { label: "Auto Publish Settings", href: "/admin/manager", icon: Settings },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="flex items-center justify-between p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/40 hover:border-slate-750 transition-all hover:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="w-4 h-4 text-primary-400 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">{link.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-950 to-primary-900/50 p-4.5 rounded-xl border border-primary-850/30 flex gap-4 items-center mt-6">
            <Flame className="w-6 h-6 text-primary-300 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Auto-Publish Active</h4>
              <p className="text-[10px] text-primary-200 leading-relaxed mt-0.5 font-medium">Daily AI blog generation runs at 8 AM IST.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
