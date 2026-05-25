"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ChevronDown, 
  Layers, 
  FileImage,
  X,
  Maximize2,
  ChevronRight
} from "lucide-react";
import { getOrgChartsAction } from "@/controllers/org-chart";

type Department = {
  id: string | number;
  department: string;
  image: string | null;
};

export default function OrganizationalStructure() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [openIds, setOpenIds] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getOrgChartsAction();
      if (res.success && res.data) {
        setDepartments(res.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const toggleExpand = (id: string | number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSidebarClick = (id: string | number) => {
    if (!openIds.includes(id)) setOpenIds((prev) => [...prev, id]);
    setTimeout(() => {
      const el = document.getElementById(id.toString());
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  if (loading) {
    return (
      <div className="w-full bg-[#f8fafc] min-h-screen flex items-center justify-center">
         <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
               <Layers size={24} className="animate-spin" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Organizational Framework...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 text-white">
          <Image
            src="/images/newbuilding.webp"
            alt="SDO Imus Building"
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032977] via-transparent to-transparent opacity-70" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            Institutional Directory
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl uppercase">
            S.D.O. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Charts
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
             Comprehensive organizational hierarchy and functional structures of the Imus City Schools Division.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {departments.length === 0 ? (
          <div className="py-32 text-center space-y-8 bg-white rounded-[3rem] border border-slate-200 shadow-sm">
             <div className="p-8 bg-slate-50 w-fit mx-auto rounded-full text-slate-200">
                <FileImage size={80} strokeWidth={0.5} />
             </div>
             <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Directory Under Construction</h2>
                <p className="text-slate-500 font-medium max-w-md mx-auto italic lowercase">The division is currently updating the departmental organizational charts. Please check back later.</p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
            
            {/* Interactive Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-8 sticky top-24">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#4279D2] rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 shadow-sm">
                  <Layers size={14} />
                  <span>Interactive Map</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none pt-2">Our Framework</h2>
                <div className="h-1.5 w-20 bg-[#4279D2]" />
              </div>
              
              <nav className="bg-white rounded-[2.5rem] p-4 shadow-xl border border-slate-100 ring-1 ring-slate-100">
                <ul className="space-y-2">
                  {departments.map((d) => {
                    const isActive = openIds.includes(d.id);
                    return (
                      <li key={d.id}>
                        <button
                          onClick={() => handleSidebarClick(d.id)}
                          className={`flex items-center justify-between w-full h-full p-4 rounded-2xl text-left transition-all duration-300 group border ${
                            isActive 
                              ? "bg-blue-600 border-blue-500 shadow-lg shadow-blue-200 text-white" 
                              : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-600 hover:text-[#4279D2]"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full transition-colors shrink-0 ${
                              isActive ? "bg-white animate-pulse" : "bg-slate-200 group-hover:bg-[#4279D2]"
                            }`} />
                            <span className="text-[11px] font-black uppercase tracking-widest leading-tight">
                              {d.department}
                            </span>
                          </div>
                          <ChevronRight size={14} className={`transition-transform duration-300 ${
                            isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Chart Detail Sections */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {departments.map((d) => {
                const isOpen = openIds.includes(d.id);
                return (
                  <section
                    key={d.id}
                    id={d.id.toString()}
                    className={`group bg-white rounded-[3rem] border border-slate-200 transition-all duration-700 overflow-hidden relative shadow-sm ${
                      isOpen ? 'shadow-2xl ring-2 ring-blue-100 z-10' : 'hover:shadow-xl'
                    }`}
                  >
                    <button
                      onClick={() => toggleExpand(d.id)}
                      className={`w-full p-8 md:p-12 flex items-center justify-between text-left transition-colors ${
                        isOpen ? 'bg-blue-50/30' : 'hover:bg-slate-50/20'
                      }`}
                    >
                      <div className="space-y-2">
                        <h3 className={`text-xl md:text-2xl font-black transition-colors leading-tight uppercase tracking-tight ${
                          isOpen ? 'text-[#4279D2]' : 'text-slate-900'
                        }`}>
                          {d.department}
                        </h3>
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${d.image ? 'bg-green-500 shadow-[0_0_8px_rgb(34,197,94,0.5)]' : 'bg-slate-300'}`} />
                           <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                             {d.image ? 'Chart Available' : 'Update pending'}
                           </span>
                        </div>
                      </div>
                      <div className={`p-4 rounded-full transition-all shrink-0 ml-4 ${
                        isOpen ? 'bg-[#4279D2] text-white rotate-180 shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}>
                        <ChevronDown size={28} />
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] px-8 md:px-12 ${
                        isOpen ? "grid-rows-[1fr] border-t border-slate-100 pb-16 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                           <div className="flex items-center justify-between px-2 pt-12 pb-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none">
                                Functional Organizational Layout
                              </p>
                              <button 
                                onClick={() => d.image && setSelectedImage(d.image)}
                                className="flex items-center gap-2 text-[10px] font-black text-[#4279D2] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                              >
                                <Maximize2 size={12} />
                                <span>Click to View</span>
                              </button>
                           </div>

                           {/* Image Display */}
                           <div 
                             className="relative group/chart cursor-zoom-in" 
                             onClick={() => d.image && setSelectedImage(d.image)}
                           >
                              {d.image ? (
                                <div className="rounded-[2.5rem] overflow-hidden bg-white border border-slate-200 shadow-2xl relative">
                                   <img 
                                     src={d.image} 
                                     alt={d.department} 
                                     className="w-full h-auto object-contain" 
                                   />
                                </div>
                              ) : (
                                 <div className="rounded-[2.5rem] aspect-[16/10] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-6 text-slate-400 py-24">
                                    <FileImage size={100} strokeWidth={0.5} className="opacity-40 animate-pulse" />
                                    <div className="space-y-2 text-center">
                                       <p className="font-black uppercase tracking-widest text-[10px]">No Chart Available</p>
                                       <p className="text-xs font-medium italic px-6">Detailed organizational hierarchy for this unit is currently being processed by the division.</p>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                      </div>
                    </section>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* LIGHTBOX MODAL - Optimized for Full Visibility */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] overflow-y-auto custom-scrollbar p-6 md:p-12 animate-in fade-in duration-300">
          <div 
            onClick={() => setSelectedImage(null)} 
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-2xl" 
          />
          
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center gap-10 animate-in zoom-in-95 duration-500 pb-32">
            
            {/* Sticky/Floating Close Control */}
            <div className="sticky top-0 z-20 pt-4 drop-shadow-2xl">
               <button 
                 onClick={() => setSelectedImage(null)}
                 className="p-4 px-8 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl border border-rose-400 group"
               >
                 <X size={20} className="group-hover:rotate-90 transition-transform" />
                 <span>Close Chart View</span>
               </button>
            </div>

            {/* Immersive Image Display */}
            <div className="w-full bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10">
               <img 
                 src={selectedImage} 
                 alt="Department Chart Full View" 
                 className="w-full h-auto block"
               />
            </div>

            {/* Navigation Hint */}
            <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] pt-8">
               End of Chart Hierarchy
            </div>
          </div>
        </div>
      )}

      {/* Footer Decoration */}
      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent" />
    </div>
  );
}
