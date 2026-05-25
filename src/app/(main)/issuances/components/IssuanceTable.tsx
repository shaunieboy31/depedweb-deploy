import React from "react";
import { FileDown, CalendarDays, Inbox } from "lucide-react";

interface Issuance {
  id: number;
  title: string;
  number: string;
  type: string;
  year: string | null;
  fileUrl: string | null;
  date: string;
}

interface IssuanceTableProps {
  documents: Issuance[];
  typeLabel: string;
  searchTerm: string;
  onClearSearch: () => void;
}

export function IssuanceTable({ 
  documents, 
  typeLabel, 
  searchTerm, 
  onClearSearch 
}: IssuanceTableProps) {
  if (documents.length === 0) {
    return (
      <div className="p-32 text-center space-y-6 bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl">
        <Inbox size={64} className="mx-auto text-slate-200" strokeWidth={1} />
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 uppercase">
            {searchTerm ? "No results found" : "Archive Empty"}
          </h2>
          <p className="text-slate-400 font-medium">
            {searchTerm 
              ? `No matches found for "${searchTerm}". Try different keywords.` 
              : "Official documents have not been added to this category yet."}
          </p>
          {searchTerm && (
            <button 
              onClick={onClearSearch}
              className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden min-h-[400px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#032977] text-white">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] first:pl-10 whitespace-nowrap">{typeLabel} #</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Series</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Title</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">File</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] last:pr-10 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((doc: any) => (
              <tr key={doc.id} className="group hover:bg-slate-50 transition-all duration-300">
                <td className="px-8 py-8 first:pl-10">
                  <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 uppercase whitespace-nowrap shadow-sm">
                    {doc.number}
                  </span>
                </td>
                <td className="px-8 py-8">
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase tracking-widest whitespace-nowrap">
                    s. {doc.year || "----"}
                  </span>
                </td>
                <td className="px-8 py-8 w-full">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-snug uppercase tracking-tight line-clamp-2">
                    {doc.title}
                  </h3>
                </td>
                <td className="px-8 py-8">
                  {doc.fileUrl ? (
                    <a 
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 active:scale-95 whitespace-nowrap"
                    >
                      <FileDown size={14} />
                      <span>Download PDF</span>
                    </a>
                  ) : (
                    <button disabled className="flex items-center gap-3 px-6 py-3 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed whitespace-nowrap">
                      <FileDown size={14} />
                      <span>No File</span>
                    </button>
                  )}
                </td>
                <td className="px-8 py-8 last:pr-10 text-right">
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{doc.date}</span>
                     <div className="flex items-center gap-1 text-[8px] text-slate-300 uppercase font-bold mt-1">
                        <CalendarDays size={8} />
                        <span>Verified Record</span>
                     </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
