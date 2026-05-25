import React, { Suspense } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  Newspaper,
  Trophy,
  Users,
  LogOut,
  Building2,
  FileText,
  Star,
  MapPin,
  Shield
} from "lucide-react";
import AdminHeader from "./AdminHeader";
import { getSession } from "@/controllers/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Protect the entire admin area
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Sidebar */}
      <aside className="w-72 bg-[#0F172A] text-white p-8 shadow-[10px_0_40px_rgba(0,0,0,0.05)] hidden md:flex flex-col h-screen sticky top-0 border-r border-white/5 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-4 mb-10 px-2 flex-shrink-0">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-2xl shadow-blue-500/40 border border-blue-400/30">
            <Building2 size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] leading-tight text-slate-400">Division of<br /><span className="text-white text-base tracking-normal">Imus City</span></h2>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard, href: "/dashboard" },
            { id: "carousel", label: "Hero Slider", icon: Layers, href: "/dashboard?tab=carousel" },
            { id: "news", label: "News & Updates", icon: Newspaper, href: "/dashboard?tab=news" },
            { id: "issuances", label: "Issuances", icon: FileText, href: "/dashboard?tab=issuances" },
            { id: "employee", label: "Employee of the Month", icon: Trophy, href: "/dashboard?tab=employee" },
            {id: "leaders", label: "Learning Leaders", icon: Star, href: "/dashboard?tab=leaders" },
            { id: "schools", label: "Educational Network", icon: Building2, href: "/dashboard?tab=schools" },
            { id: "org", label: "Org Charts", icon: Users, href: "/dashboard?tab=org" },
            { id: "transparency", label: "Transparency Seal", icon: Shield, href: "/dashboard?tab=transparency" },
            { id: "contact", label: "Contact Info", icon: MapPin, href: "/dashboard?tab=contact" },
          ].map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex items-center gap-4 text-slate-400 hover:text-white transition-all py-4 px-5 rounded-[1.25rem] hover:bg-white/5 active:scale-[0.98]"
            >
              <div className="p-2 transition-colors group-hover:bg-blue-600/10 rounded-lg">
                <item.icon size={20} className="group-hover:text-blue-400 transition-colors" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest leading-none">{item.label}</span>
            </Link>
          ))}

          <div className="pt-10 mt-10 border-t border-white/5 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-4 text-slate-500 hover:text-rose-400 transition-all py-3 px-5 rounded-xl hover:bg-rose-500/5 text-[10px] font-black uppercase tracking-widest"
            >
              <LogOut size={16} />
              <span>Exit Command Center</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 min-h-screen">
        <Suspense fallback={
          <div className="h-20 bg-white rounded-[2rem] animate-pulse mb-10" />
        }>
          <AdminHeader user={session} />
        </Suspense>

        <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
          {children}
        </div>
      </main>
    </div>
  );
}
