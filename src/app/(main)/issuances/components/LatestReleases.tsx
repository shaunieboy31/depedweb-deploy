import React from "react";
import { 
  FileText, 
  Download, 
  ChevronRight, 
  FolderOpen, 
  Search, 
  FileSearch,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface Issuance {
  id: string | number;
  title: string;
  number: string;
  type: string;
  date: string;
  fileUrl: string | null;
}

interface LatestReleasesProps {
  issuances: Issuance[];
}

export function LatestReleases({ issuances }: LatestReleasesProps) {
  return (
    <section className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl overflow-hidden">
      <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <FolderOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">Latest Releases</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
              Updated as of {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
          <Search size={14} />
          <span>Find a File</span>
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {issuances.length === 0 ? (
          <div className="p-20 text-center space-y-4">
            <FileSearch size={48} className="mx-auto text-slate-200" strokeWidth={1} />
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">No official issuances found in the archive.</p>
          </div>
        ) : (
          issuances.map((doc) => (
            <div key={doc.id} className="p-8 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-8 group">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FileText size={32} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{doc.type}</span>
                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{doc.number}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1">{doc.title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Released: {doc.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {doc.fileUrl ? (
                  <a 
                    href={doc.fileUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </a>
                ) : (
                  <button disabled className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-slate-200 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed">
                    <Download size={16} />
                    <span>No File Linked</span>
                  </button>
                )}
                <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-10 bg-slate-50/50 border-t border-slate-100 text-center">
        <Link href="/issuances/division/memoranda" className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] hover:tracking-[0.5em] transition-all inline-flex items-center gap-3">
          <span>Explore Full Archives</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
