import React from "react";
import { SchoolService } from "@/services/school.service";
import { Building2, GraduationCap, MapPin, Target, Users } from "lucide-react";

export async function SchoolStats() {
  const stats = await SchoolService.getSchoolStats();

  const statItems = [
    { label: "Total Schools", value: stats.total, icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Public Schools", value: stats.public, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Private Schools", value: stats.private, icon: Target, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Elementary", value: stats.elementary, icon: GraduationCap, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Junior High", value: stats.juniorHigh, icon: MapPin, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Senior High", value: stats.seniorHigh, icon: Building2, color: "text-cyan-600", bg: "bg-cyan-50" },
  ];

  return (
    <div className="w-full bg-slate-50 py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-4">
           <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
             Division <span className="text-blue-600">Overview</span>
           </h2>
           <p className="text-slate-500 font-medium max-w-2xl mx-auto">
             A quick glance at the educational landscape within the Schools Division Office of Imus City.
           </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statItems.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className={item.color} size={28} />
              </div>
              <span className="text-3xl font-black text-slate-900 mb-1">{item.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
