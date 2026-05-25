"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Users,
  Building2,
  RefreshCcw,
  BookOpen
} from "lucide-react";
import { getSchoolsByCategoryAction } from "@/controllers/schools";
import { SchoolHero } from "../components/SchoolHero";
import { SchoolCard } from "../components/SchoolCard";
import { ProgramSpotlight } from "../components/ProgramSpotlight";

export default function ElementarySchools() {
  const [schools, setSchools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSchools() {
      const result = await getSchoolsByCategoryAction("ELEMENTARY");
      if (result.success && result.data) {
        setSchools(result.data);
      }
      setIsLoading(false);
    }
    loadSchools();
  }, []);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      <SchoolHero 
        title="ELEMENTARY"
        category="SCHOOLS"
        subtitle="Primary Education"
        description="Building strong foundations for lifelong learning and character development."
        image="/images/newbuilding.webp"
        icon={BookOpen}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-6">
             <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8 md:p-12 mb-8">
                <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-6">
                   <div className="space-y-1">
                      <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">PUBLIC ELEMENTARY LIST</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Directory of Primary Institutions</p>
                   </div>
                   <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <Building2 size={24} />
                   </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isLoading ? (
                       <div className="col-span-full py-20 text-center space-y-4">
                          <RefreshCcw size={40} className="mx-auto text-blue-600 animate-spin" />
                          <p className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Refreshing Registry...</p>
                       </div>
                    ) : schools.length === 0 ? (
                       <div className="col-span-full py-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-3xl">
                          <MapPin size={48} className="mx-auto text-slate-200" strokeWidth={1} />
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No registered elementary schools found</p>
                       </div>
                    ) : (
                       schools.map((school) => (
                         <SchoolCard key={school.id} school={school} />
                       ))
                    )}
                 </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <ProgramSpotlight 
                title="Program Commitment"
                subtitle="Quality Assurance"
                description="Our elementary schools offer comprehensive programs designed to nurture the whole child through:"
                tracks={[
                  { title: "Literacy & Numeracy", desc: "Solid Foundations" },
                  { title: "Values-Based", desc: "Character Growth" },
                  { title: "Cultural Awareness", desc: "National Identity" },
                  { title: "Critical Thinking", desc: "Future Readiness" }
                ]}
             />

             <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Enrolled Population</p>
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <Users size={32} />
                   </div>
                   <div>
                      <p className="text-3xl font-black text-slate-900 leading-none">35K+</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Elementary Learners</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

