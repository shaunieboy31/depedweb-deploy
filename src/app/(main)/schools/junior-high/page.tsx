"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  MapPin, 
  Users,
  Briefcase,
  RefreshCcw,
} from "lucide-react";
import { getSchoolsByCategoryAction } from "@/controllers/schools";
import { SchoolHero } from "../components/SchoolHero";
import { SchoolCard } from "../components/SchoolCard";
import { ProgramSpotlight } from "../components/ProgramSpotlight";

export default function JuniorHighSchools() {
  const [schools, setSchools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSchools() {
      const result = await getSchoolsByCategoryAction("JHS");
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
        title="JUNIOR HIGH"
        category="SCHOOL"
        subtitle="Intermediate Education"
        description="Equipping Grades 7–10 learners with the core competencies and values for future success."
        image="/images/newbuilding.webp"
        icon={Building2}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-6">
             <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8 md:p-12 mb-8">
                <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-6">
                   <div className="space-y-1">
                      <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">PUBLIC JHS REGISTRY</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grades 7 to 10 Directory</p>
                   </div>
                   <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <Briefcase size={24} />
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
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No registered junior high schools found</p>
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
                title="Curriculum Focus"
                subtitle="Future Ready"
                description="The Junior High School program is meticulously structured for transitional success:"
                tracks={[
                  { title: "Core Subjects", desc: "Foundational mastery" },
                  { title: "21st Century Skills", desc: "Dynamic learning" },
                  { title: "Career Pathing", desc: "Ready for SHS" },
                  { title: "Character", desc: "Values-based growth" }
                ]}
             />

             <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Enrolled Population</p>
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <Users size={32} />
                   </div>
                   <div>
                      <p className="text-3xl font-black text-slate-900 leading-none">15K+</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JHS Learners</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

