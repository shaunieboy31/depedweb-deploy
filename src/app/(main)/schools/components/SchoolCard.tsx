import React from "react";
import { MapPin, Phone, ChevronRight, School as SchoolIcon } from "lucide-react";

interface School {
  id: number;
  name: string;
  logo: string | null;
  banner: string | null;
  location: string;
  category: string;
  cluster: string | null;
  contact: string | null;
  type: string;
}

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <div className="institutional-card group">
      {/* Banner Section */}
      <div className="h-32 relative overflow-hidden">
        <img 
          src={school.banner || "/images/newbuilding.webp"} 
          alt={school.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <div className="badge-premium bg-blue-600/90 text-white border-white/20 backdrop-blur-sm !text-[7px] !px-2 !py-0.5">
            {school.type}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex-1 flex flex-col relative">
        {/* Overlapping Institutional Logo */}
        <div className="relative -mt-8 ml-3 mb-4 z-10">
          <div className="w-16 h-16 rounded-full bg-white shadow-2xl border border-slate-100 overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <img src={school.logo || "/images/leader-placeholder.webp"} alt="" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">{school.cluster || 'Division Hub'}</span>
            <SchoolIcon size={12} className="text-blue-500 opacity-20" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-2 leading-tight">
            {school.name}
          </h3>
          <div className="flex items-start gap-1.5 text-[8px] font-bold text-slate-400 uppercase tracking-widest italic">
            <MapPin size={10} className="text-blue-400 shrink-0" />
            <span className="line-clamp-1">{school.location}</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Phone size={10} className="text-blue-500" />
            <span className="text-[8px] font-black uppercase tracking-widest">{school.contact || 'N/A'}</span>
          </div>
          <button className="flex items-center gap-1.5 text-[7px] font-black uppercase tracking-widest text-blue-600 group-hover:translate-x-1 transition-transform">
            <span>Profile</span>
            <ChevronRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}
