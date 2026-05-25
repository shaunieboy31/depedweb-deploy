import React from "react";
import { 
  ShieldCheck, 
  Globe, 
  Layers,
  Sparkles,
  Info
} from "lucide-react";
import { getIssuancesAction } from "@/controllers/issuances";
import { IssuanceHero } from "./components/IssuanceHero";
import { IssuanceCategoryCard } from "./components/IssuanceCategoryCard";
import { LatestReleases } from "./components/LatestReleases";

export default async function IssuancesPage() {
  const result = await getIssuancesAction();
  const issuances = result.success ? (result.data || []).slice(0, 5) : [];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
      
      <IssuanceHero />

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-20 space-y-12">
        
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <IssuanceCategoryCard 
              title="Division"
              description="Memorandums and advisories from the local SDO office."
              href="/issuances/division/memoranda"
              icon={ShieldCheck}
              colorClass="bg-blue-600"
              shadowClass="shadow-blue-500/20"
           />
           <IssuanceCategoryCard 
              title="Regional"
              description="Directives and communications from the Regional Office."
              href="/issuances/regional"
              icon={Layers}
              colorClass="bg-emerald-600"
              shadowClass="shadow-emerald-500/20"
           />
           <IssuanceCategoryCard 
              title="National"
              description="Official orders and guidelines from the DepEd Central Office."
              href="/issuances/national"
              icon={Globe}
              colorClass="bg-slate-900"
              shadowClass="shadow-slate-500/20"
           />
        </div>

        <LatestReleases issuances={issuances} />

        {/* Support Section */}
        <div className="bg-blue-900 rounded-[3.5rem] p-8 md:p-10 text-white relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000">
              <Info size={150} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center border border-blue-400/30">
                    <Sparkles size={32} />
                  </div>
                 <h2 className="text-4xl font-black uppercase tracking-tighter leading-tight">Need help finding <br /> a specific file?</h2>
                 <p className="text-blue-200 font-medium">
                    If you cannot find the memorandum you are looking for, you can contact our records section directly for assistance.
                 </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                 <div className="flex-1 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Office Hotline</p>
                    <p className="text-xl font-bold">(046) 434-8450</p>
                 </div>
                 <div className="flex-1 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Records Email</p>
                    <p className="text-xl font-bold text-wrap break-all">records.imus@deped.gov.ph</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent pt-16" />
    </div>
  );
}
