import React from "react";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  FileDown, 
  ArrowLeft, 
  Info, 
  Inbox
} from "lucide-react";
import Link from "next/link";
import { getIssuancesAction } from "@/controllers/issuances";
import PublicArchiveClient from "@/app/(main)/issuances/PublicArchiveClient";

export default async function DivisionAdvisories() {
  const result = await getIssuancesAction("DIVISION", "DIVISION ADVISORIES");
  const documents = result.success ? result.data || [] : [];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      {/* Institutional Hero - Standardized Background */}
      <section className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="SDO Imus"
            fill
            className="object-cover object-center brightness-[0.35]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#032977]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full space-y-12 mt-12">
           <Link href="/issuances" className="inline-flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
              <ArrowLeft size={14} />
              <span>Back to Archive Hub</span>
           </Link>

           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-widest">
                 <Info size={12} />
                 <span>Public Notifications</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                 DIVISION <span className="text-amber-400 underline decoration-amber-500/30 underline-offset-8">ADVISORIES</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-lg font-medium max-w-2xl">
                 Official announcements and timely notifications regarding division-wide activities, weather protocols, and event updates.
              </p>
           </div>
            </div>
         </section>

      <PublicArchiveClient 
        initialDocuments={documents} 
        typeLabel="Advisory" 
        categoryLabel="Advisories" 
      />
    </div>
  );
}
