"use client";

import React, { useState, useEffect, useRef } from "react";
import {
   ChevronRight,
   Users,
   Trophy,
   Newspaper,
   Upload,
   Save,
   RefreshCcw,
   Calendar,
   Image as ImageIcon,
   CheckCircle2,
   Trash2,
   PlusCircle,
   Building2,
   Layers,
   FileText,
   FileSearch,
   LogOut,
   Shield,
   Download,
   FileArchive,
   Search as SearchIcon,
   Star,
   SquarePen
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { getNewsAction, updateNewsAction, deleteNewsAction } from "@/controllers/news";
import { getCarouselSlidesAction, createCarouselSlideAction, deleteCarouselSlideAction } from "@/controllers/carousel";
import { getEmployeeHonorsAction, updateEmployeeHonorAction, deleteEmployeeHonorAction } from "@/controllers/employee";
import { getOrgChartsAction, updateOrgChartAction, deleteOrgChartAction } from "@/controllers/org-chart";
import { getIssuancesAction, updateIssuanceAction, deleteIssuanceAction } from "@/controllers/issuances";
import { getLeadersAction, updateLeaderAction, deleteLeaderAction } from "@/controllers/leaders";
import { getSchoolsAction, updateSchoolAction, deleteSchoolAction } from "@/controllers/schools";
import { getContactInfoAction, updateContactInfoAction } from "@/controllers/contact";
import { getTransparencyItemsAction, updateTransparencyItemAction, deleteTransparencyItemAction } from "@/controllers/transparency";
import { logout } from "@/controllers/auth";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Types
type Leader = {
   id: string | number;
   name: string;
   position: string;
   image: string | null;
   startYear?: string;
   endYear?: string;
};
type EmployeeWinner = {
   id: string | number;
   month: string;
   year: string;
   image: string | null;
};

type NewsItem = {
   id: string;
   title: string;
   category: string;
   date: string;
   excerpt: string;
   image: string | null;
};

type OrgChartItem = {
   id: string | number;
   department: string;
   image: string | null;
   sortOrder: number;
};

type CarouselSlide = {
   id: number;
   image: string;
};

type Issuance = {
   id: string | number;
   title: string;
   number: string;
   type: string;
   category: string;
   date: string;
   year?: string;
   fileUrl: string | null;
};

type School = {
   id: string | number;
   name: string;
   logo: string | null;
   banner: string | null;
   location: string;
   category: string;
   cluster: string | null;
   contact: string | null;
   type: string;
};

type ContactData = {
  location: string;
  phone: string;
  email: string;
  officeHours: string;
  facebook?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  website?: string | null;
};

type TransparencyItem = {
  id: number;
  category: string;
  title: string;
  url: string;
  isExternal: boolean;
  year: string | null;
  order: number;
};

interface DashboardClientProps {
  user: {
    username: string;
    role: string;
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
   const searchParams = useSearchParams();
   const router = useRouter();
   const activeTab = (searchParams.get("tab") || "overview") as "overview" | "employee" | "news" | "carousel" | "org" | "issuances" | "leaders" | "schools" | "contact" | "transparency";

   const [news, setNews] = useState<NewsItem[]>([]);
   const [honors, setHonors] = useState<EmployeeWinner[]>([]);
   const [carousel, setCarousel] = useState<CarouselSlide[]>([]);
   const [orgCharts, setOrgCharts] = useState<OrgChartItem[]>([]);
   const [issuances, setIssuances] = useState<Issuance[]>([]);
   const [leaders, setLeaders] = useState<Leader[]>([]);
   const [schools, setSchools] = useState<School[]>([]);
   const [transparencyItems, setTransparencyItems] = useState<TransparencyItem[]>([]);
   const [contactInfo, setContactInfo] = useState<ContactData | null>(null);
   const [issuanceSearch, setIssuanceSearch] = useState("");

   const [isSaved, setIsSaved] = useState(false);
   const [isUpdating, setIsUpdating] = useState(false);
   const [isLoggingOut, setIsLoggingOut] = useState(false);

   // --- REFS FOR FILE UPLOADS ---
   const employeeFileRef = useRef<HTMLInputElement>(null);
   const orgFileRef = useRef<HTMLInputElement>(null);
   const newsFileRef = useRef<HTMLInputElement>(null);
   const issuanceFileRef = useRef<HTMLInputElement>(null);
   const leaderFileRef = useRef<HTMLInputElement>(null);
   const schoolLogoRef = useRef<HTMLInputElement>(null);
   const schoolBannerRef = useRef<HTMLInputElement>(null);

   // --- ALERT DIALOG STATE ---
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
   const [deleteTarget, setDeleteTarget] = useState<{ id: any; type: string } | null>(null);

   const confirmDelete = (id: any, type: string) => {
      setDeleteTarget({ id, type });
      setIsDeleteDialogOpen(true);
   };

   const executeDelete = async () => {
      if (!deleteTarget) return;
      const { id, type } = deleteTarget;
      
      let result;
      switch (type) {
         case 'news': result = await deleteNewsAction(parseInt(id)); break;
         case 'honor': result = await deleteEmployeeHonorAction(id); break;
         case 'org': result = await deleteOrgChartAction(id); break;
         case 'carousel': result = await deleteCarouselSlideAction(id); break;
         case 'issuance': result = await deleteIssuanceAction(id); break;
         case 'leader': result = await deleteLeaderAction(id); break;
         case 'school': result = await deleteSchoolAction(id); break;
         case 'transparency': result = await deleteTransparencyItemAction(id); break;
      }

      if (result?.success) loadData();
      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);
   };

   // --- LOAD & SAVE ---
   async function loadData() {
      const newsResult = await getNewsAction();
      if (newsResult.success && newsResult.data) {
         setNews(newsResult.data.map((n: any) => ({
            id: n.id.toString(),
            title: n.title,
            category: n.category,
            date: n.date,
            excerpt: n.excerpt,
            image: n.image
         })));
      }

      const honorsResult = await getEmployeeHonorsAction();
      if (honorsResult.success && honorsResult.data) {
         setHonors(honorsResult.data);
      }

      const carouselResult = await getCarouselSlidesAction();
      if (carouselResult.success && carouselResult.data) {
         setCarousel(carouselResult.data);
      }

      const orgResult = await getOrgChartsAction();
      if (orgResult.success && orgResult.data) {
         setOrgCharts(orgResult.data);
      }

      const issuanceResult = await getIssuancesAction();
      if (issuanceResult.success && issuanceResult.data) {
         setIssuances(issuanceResult.data);
      }

      const leadersResult = await getLeadersAction();
      if (leadersResult.success && leadersResult.data) {
         setLeaders(leadersResult.data);
      }

      const schoolsResult = await getSchoolsAction();
      if (schoolsResult.success && schoolsResult.data) {
         setSchools(schoolsResult.data);
      }

      const contactResult = await getContactInfoAction();
      if (contactResult.success && contactResult.data) {
         setContactInfo(contactResult.data as ContactData);
      }

      const transparencyResult = await getTransparencyItemsAction();
      if (transparencyResult.success && transparencyResult.data) {
         setTransparencyItems(transparencyResult.data);
      }
   }

   useEffect(() => {
      loadData();
   }, []);

   const handleLogout = async () => {
     setIsLoggingOut(true);
     await logout();
   };

   // --- NEWS ACTIONS ---
   const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
   const [newsUploadFile, setNewsUploadFile] = useState<File | null>(null);

   const handleSaveNews = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingNews) return;
      setIsUpdating(true);

      const formData = new FormData();
      if (editingNews.id !== "new") {
         formData.append("id", editingNews.id);
      }
      formData.append("title", editingNews.title);
      formData.append("category", editingNews.category);
      formData.append("date", editingNews.date);
      formData.append("excerpt", editingNews.excerpt);
      formData.append("oldImagePath", editingNews.image || "");

      if (newsUploadFile) formData.append("image", newsUploadFile);

      const result = await updateNewsAction(formData);
      setIsUpdating(false);

      if (result.success) {
         setIsSaved(true);
         setTimeout(() => setIsSaved(false), 2000);
         setEditingNews(null);
         setNewsUploadFile(null);
         loadData();
      } else {
         alert("Failed: " + result.error);
      }
   };

   const handleDeleteNews = async (id: string) => {
      if (!confirm("Are you sure?")) return;
      const result = await deleteNewsAction(parseInt(id));
      if (result.success) loadData();
   };

   // --- EMPLOYEE HONORS ACTIONS ---
   const [editingHonor, setEditingHonor] = useState<EmployeeWinner | null>(null);
   const [honorFiles, setHonorFiles] = useState<{ [key: string]: File }>({});

   const handleSaveHonor = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingHonor) return;
      setIsUpdating(true);

      const formData = new FormData();
      if (editingHonor.id && editingHonor.id !== "new") {
         formData.append("id", editingHonor.id.toString());
      }
      formData.append("month", editingHonor.month);
      formData.append("year", editingHonor.year);
      formData.append("oldImagePath", editingHonor.image || "");

      const file = honorFiles[editingHonor.id || "new"];
      if (file) formData.append("image", file);

      const result = await updateEmployeeHonorAction(formData);
      setIsUpdating(false);

      if (result.success) {
         setIsSaved(true);
         setTimeout(() => setIsSaved(false), 2000);
         setEditingHonor(null);
         loadData();
      } else {
         alert("Failed: " + result.error);
      }
   };

   const handleDeleteHonor = async (id: number) => {
      if (!confirm("Are you sure?")) return;
      const result = await deleteEmployeeHonorAction(id);
      if (result.success) loadData();
      else alert("Failed deletion");
   };

   // --- ORG CHART ACTIONS ---
   const [editingOrgItem, setEditingOrgItem] = useState<OrgChartItem | null>(null);
   const [orgFile, setOrgFile] = useState<File | null>(null);

   const handleSaveOrgChart = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingOrgItem) return;
      setIsUpdating(true);

      const formData = new FormData();
      if (editingOrgItem.id && editingOrgItem.id !== "new") {
         formData.append("id", editingOrgItem.id.toString());
      }
      formData.append("department", editingOrgItem.department);
      formData.append("sortOrder", editingOrgItem.sortOrder.toString());

      const isPath = editingOrgItem.image && editingOrgItem.image.startsWith("/uploads");
      formData.append("oldImagePath", isPath && editingOrgItem.image ? (editingOrgItem.image as string) : "");

      if (orgFile) formData.append("image", orgFile);

      const res = await updateOrgChartAction(formData);
      setIsUpdating(false);
      if (res.success) {
         setEditingOrgItem(null);
         setOrgFile(null);
         loadData();
      } else {
         alert(res.error);
      }
   };

   const handleDeleteOrgChart = async (id: number) => {
      if (!confirm("Delete this chart?")) return;
      const res = await deleteOrgChartAction(id);
      if (res.success) loadData();
   };

   // --- CAROUSEL ACTIONS ---
   const [isUploadingCarousel, setIsUploadingCarousel] = useState(false);

   const handleUploadCarousel = async (file: File) => {
      setIsUploadingCarousel(true);
      const formData = new FormData();
      formData.append("image", file);

      const result = await createCarouselSlideAction(formData);
      setIsUploadingCarousel(false);

      if (result.success) {
         setIsSaved(true);
         setTimeout(() => setIsSaved(false), 2000);
         loadData();
      } else {
         alert("Upload failed: " + result.error);
      }
   };

   const handleDeleteCarousel = async (id: number) => {
      if (!confirm("Remove this slide?")) return;
      const result = await deleteCarouselSlideAction(id);
      if (result.success) loadData();
      else alert("Delete failed");
   };

   // --- ISSUANCES ACTIONS ---
   const [editingIssuance, setEditingIssuance] = useState<Issuance | null>(null);
   const [issuanceUploadFile, setIssuanceUploadFile] = useState<File | null>(null);

   const handleSaveIssuance = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingIssuance) return;
      setIsUpdating(true);

      const formData = new FormData();
      if (editingIssuance.id && editingIssuance.id !== "new") {
         formData.append("id", editingIssuance.id.toString());
      }
      formData.append("title", editingIssuance.title);
      formData.append("number", editingIssuance.number);
      formData.append("type", editingIssuance.type);
      formData.append("category", editingIssuance.category);
      formData.append("date", editingIssuance.date);
      formData.append("year", editingIssuance.year || "");
      formData.append("oldFileUrl", editingIssuance.fileUrl || "");

      if (issuanceUploadFile) formData.append("file", issuanceUploadFile);

      const result = await updateIssuanceAction(formData);
      setIsUpdating(false);

      if (result.success) {
         setIsSaved(true);
         setTimeout(() => setIsSaved(false), 2000);
         setEditingIssuance(null);
         setIssuanceUploadFile(null);
         loadData();
      } else {
         alert("Failed: " + result.error);
      }
   };

   const handleDeleteIssuance = async (id: number) => {
      if (!confirm("Are you sure?")) return;
      const result = await deleteIssuanceAction(id);
      if (result.success) loadData();
   };

   const filteredIssuances = issuances.filter(item => 
      item.number.toLowerCase().includes(issuanceSearch.toLowerCase()) || 
      item.title.toLowerCase().includes(issuanceSearch.toLowerCase()) ||
      item.type.toLowerCase().includes(issuanceSearch.toLowerCase())
   );

   // --- LEADERS ACTIONS ---
   const [editingLeader, setEditingLeader] = useState<Leader | null>(null);
   const [leaderFile, setLeaderFile] = useState<File | null>(null);

   const handleSaveLeader = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingLeader) return;
      setIsUpdating(true);

      const formData = new FormData();
      if (editingLeader.id && editingLeader.id !== "new") {
         formData.append("id", editingLeader.id.toString());
      }
      formData.append("name", editingLeader.name);
      formData.append("position", editingLeader.position);
      formData.append("startYear", editingLeader.startYear || "");
      formData.append("endYear", editingLeader.endYear || "");
      formData.append("oldImagePath", editingLeader.image || "");

      if (leaderFile) formData.append("image", leaderFile);

      const result = await updateLeaderAction(formData);
      setIsUpdating(false);

      if (result.success) {
         setIsSaved(true);
         setTimeout(() => setIsSaved(false), 2000);
         setEditingLeader(null);
         setLeaderFile(null);
         loadData();
      } else {
         alert("Failed: " + result.error);
      }
   };

   const handleDeleteLeader = async (id: number) => {
      if (!confirm("Remove this leader from archive?")) return;
      const result = await deleteLeaderAction(id);
      if (result.success) loadData();
      else alert("Delete failed");
   };

   // --- SCHOOLS ACTIONS ---
   const [editingSchool, setEditingSchool] = useState<School | null>(null);
   const [schoolLogoFile, setSchoolLogoFile] = useState<File | null>(null);
   const [schoolBannerFile, setSchoolBannerFile] = useState<File | null>(null);

   const handleSaveSchool = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingSchool) return;
      setIsUpdating(true);

      const formData = new FormData();
      if (editingSchool.id && editingSchool.id !== "new") {
         formData.append("id", editingSchool.id.toString());
      }
      formData.append("name", editingSchool.name);
      formData.append("location", editingSchool.location);
      formData.append("category", editingSchool.category);
      formData.append("cluster", editingSchool.cluster || "");
      formData.append("contact", editingSchool.contact || "");
      formData.append("type", editingSchool.type);
      formData.append("oldLogoPath", editingSchool.logo || "");
      formData.append("oldBannerPath", editingSchool.banner || "");

      if (schoolLogoFile) formData.append("logo", schoolLogoFile);
      if (schoolBannerFile) formData.append("banner", schoolBannerFile);

      const result = await updateSchoolAction(formData);
      setIsUpdating(false);

      if (result.success) {
         setIsSaved(true);
         setTimeout(() => setIsSaved(false), 2000);
         setEditingSchool(null);
         setSchoolLogoFile(null);
         setSchoolBannerFile(null);
         loadData();
      } else {
         alert("Failed: " + result.error);
      }
   };

   const handleDeleteSchool = async (id: number) => {
      if (!confirm("Are you sure? This will remove the school and its associated media.")) return;
      const result = await deleteSchoolAction(id);
      if (result.success) loadData();
   };

   // --- CONTACT INFO ACTIONS ---
   const handleSaveContactInfo = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!contactInfo) return;
      setIsUpdating(true);

      const formData = new FormData();
      formData.append("location", contactInfo.location);
      formData.append("phone", contactInfo.phone);
      formData.append("email", contactInfo.email);
      formData.append("officeHours", contactInfo.officeHours);
      formData.append("facebook", contactInfo.facebook || "");
      formData.append("twitter", contactInfo.twitter || "");
      formData.append("youtube", contactInfo.youtube || "");
      formData.append("website", contactInfo.website || "");

      const result = await updateContactInfoAction(formData);
      setIsUpdating(false);

      if (result.success) {
         setIsSaved(true);
         setTimeout(() => setIsSaved(false), 2000);
         loadData();
      } else {
         alert("Failed: " + result.error);
      }
   };


   // --- TRANSPARENCY ACTIONS ---
   const [editingTransparency, setEditingTransparency] = useState<TransparencyItem | null>(null);

   const handleSaveTransparency = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingTransparency) return;
      setIsUpdating(true);

      const formData = new FormData();
      if (editingTransparency.id && editingTransparency.id !== 0) {
         formData.append("id", editingTransparency.id.toString());
      }
      formData.append("category", editingTransparency.category);
      formData.append("title", editingTransparency.title);
      formData.append("url", editingTransparency.url);
      formData.append("isExternal", editingTransparency.isExternal.toString());
      formData.append("year", editingTransparency.year || "");
      formData.append("order", editingTransparency.order.toString());

      const result = await updateTransparencyItemAction(formData);
      setIsUpdating(false);

      if (result.success) {
         setIsSaved(true);
         setTimeout(() => setIsSaved(false), 2000);
         setEditingTransparency(null);
         loadData();
      } else {
         alert("Failed: " + result.error);
      }
   };


   return (
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
         {/* Personalized Admin Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-5">
               <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 ring-4 ring-white">
                  <Shield size={32} />
               </div>
               <div className="space-y-0.5">
                  <div className="flex items-center gap-3">
                     <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Welcome, {user.username}</h2>
                     <Badge className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-blue-100 border-none">{user.role}</Badge>
                  </div>
                  <p className="text-slate-500 font-medium lowercase italic opacity-80">
                     {activeTab === 'overview' && "system health and quick statistics."}
                     {activeTab === 'carousel' && "manage images for the homepage hero slider."}
                     {activeTab === 'news' && "publish and archive institutional news updates."}
                     {activeTab === 'employee' && "recognize division monthly award winners."}
                     {activeTab === 'org' && "update departmental functional structures."}
                     {activeTab === 'issuances' && "recall and update official division publications."}
                     {activeTab === 'leaders' && "manage profiles of SDO Imus City visionary leaders."}
                     {activeTab === 'schools' && "manage profiles of SDO Imus City schools."}
                     {activeTab === 'transparency' && "manage compliance documents and transparency seal links."}
                     {activeTab === 'contact' && "update official contact information and social media links."}
                  </p>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               {isSaved && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 animate-in zoom-in-95">
                     <CheckCircle2 size={16} />
                     <span className="text-xs font-bold uppercase tracking-widest">Changes Synced</span>
                  </div>
               )}
               <button 
                 onClick={handleLogout}
                 disabled={isLoggingOut}
                 className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
               >
                 {isLoggingOut ? <RefreshCcw size={14} className="animate-spin" /> : <LogOut size={14} />}
                 <span>{isLoggingOut ? "Sign Out..." : "Sign Out"}</span>
               </button>
            </div>
         </div>

         <div className="w-full">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                        <Building2 size={200} />
                     </div>
                     <div className="relative z-10 space-y-10">
                        <div className="space-y-4 max-w-2xl">
                           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Division Console Status</h3>
                           <p className="text-slate-500 leading-relaxed font-medium">
                                Greetings, {user.username}. You are currently managing the central command center. All updates performed here are synchronized in real-time across the division's public web portal.
                           </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                           <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 text-center space-y-2">
                              <span className="block text-4xl font-black text-blue-700">{carousel.length}</span>
                              <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Main Slides</span>
                           </div>
                           <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-center space-y-2">
                              <span className="block text-4xl font-black text-emerald-700">{news.length}</span>
                              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Articles</span>
                           </div>
                           <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 text-center space-y-2">
                              <span className="block text-4xl font-black text-indigo-700">{issuances.length}</span>
                              <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Issuances</span>
                           </div>
                           <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-200 text-center space-y-2">
                              <span className="block text-4xl font-black text-slate-700">{orgCharts.length}</span>
                              <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Org Charts</span>
                           </div>
                           <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 text-center space-y-2">
                              <span className="block text-4xl font-black text-amber-700">{leaders.length}</span>
                              <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest">Leaders</span>
                           </div>
                           <div className="p-8 bg-rose-50 rounded-[2rem] border border-rose-100 text-center space-y-2">
                              <span className="block text-4xl font-black text-rose-700">{schools.length}</span>
                              <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest">Schools</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* ISSUANCES MANAGER */}
            {activeTab === "issuances" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  {!editingIssuance ? (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Official Issuances</h3>
                              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Recall by Number or Title</p>
                           </div>
                           <div className="flex items-center gap-4 flex-1 max-w-xl">
                              <div className="relative flex-1 group">
                                 <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                                 <input 
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                                    placeholder="Enter Memoranda Number or Title to recall..." 
                                    value={issuanceSearch}
                                    onChange={(e) => setIssuanceSearch(e.target.value)}
                                 />
                              </div>
                              <button
                                 onClick={() => setEditingIssuance({ id: "new", title: "", number: "", type: "DIVISION MEMORANDA", category: "DIVISION", date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), year: new Date().getFullYear().toString(), fileUrl: null })}
                                 className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                              >
                                 <PlusCircle size={16} />
                                 <span>New</span>
                              </button>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           {filteredIssuances.length === 0 ? (
                              <div className="p-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                 <FileSearch size={48} className="mx-auto text-slate-200" strokeWidth={1} />
                                 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">No matching memoranda found in archive</p>
                              </div>
                           ) : (
                              filteredIssuances.map(item => (
                                 <div key={item.id} className="group flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-100 transition-all">
                                    <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                       <FileText size={24} />
                                    </div>
                                    <div className="flex-1">
                                       <div className="flex items-center gap-3">
                                          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{item.type}</span>
                                          <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                          <span className="text-[10px] font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm uppercase tracking-widest">{item.number}</span>
                                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-100/50 rounded text-blue-700 text-[9px] font-black uppercase tracking-widest border border-blue-200">
                                            <span>Series</span>
                                            <span>{item.year || 'N/A'}</span>
                                          </div>
                                       </div>
                                       <h4 className="font-black text-slate-800 uppercase tracking-tight text-sm line-clamp-1 mt-1">{item.title}</h4>
                                       <div className="flex items-center gap-3 mt-1">
                                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.category} SCOPE</span>
                                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">•</span>
                                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                       {item.fileUrl && (
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <a href={item.fileUrl} target="_blank" rel="noreferrer" className="p-3 bg-white text-emerald-600 rounded-xl border border-emerald-50 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                                                   <Download size={16} />
                                                </a>
                                             </TooltipTrigger>
                                             <TooltipContent className="bg-slate-900 text-white border-none text-[10px] font-black uppercase tracking-widest mb-2">View Document</TooltipContent>
                                          </Tooltip>
                                       )}
                                       <Tooltip>
                                          <TooltipTrigger asChild>
                                             <button onClick={() => setEditingIssuance(item)} className="p-3 bg-white text-blue-600 rounded-xl border border-blue-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm"><SquarePen size={16} /></button>
                                          </TooltipTrigger>
                                          <TooltipContent className="bg-slate-900 text-white border-none text-[10px] font-black uppercase tracking-widest mb-2">Edit Entry</TooltipContent>
                                       </Tooltip>
                                       <Tooltip>
                                          <TooltipTrigger asChild>
                                             <button onClick={() => confirmDelete(item.id, 'issuance')} className="p-3 bg-white text-rose-500 rounded-xl border border-rose-50 hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                                          </TooltipTrigger>
                                          <TooltipContent className="bg-slate-900 text-white border-none text-[10px] font-black uppercase tracking-widest mb-2 text-rose-400">Delete Permanently</TooltipContent>
                                       </Tooltip>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <button onClick={() => setEditingIssuance(null)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                              <ChevronRight size={14} className="rotate-180" /> Back to Archive
                           </button>
                           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Updating Memorandum Archive</h3>
                        </div>

                        <form onSubmit={handleSaveIssuance} className="space-y-10">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Document Title</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={editingIssuance.title || ""} onChange={e => setEditingIssuance({ ...editingIssuance, title: e.target.value })} placeholder="e.g. GUIDELINES ON SCHOOL YEAR CONCLUSION" />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reference No.</label>
                                       <input required className="w-full p-4 bg-white rounded-xl border-2 border-blue-100 text-[11px] font-black uppercase ring-4 ring-blue-50" value={editingIssuance.number || ""} onChange={e => setEditingIssuance({ ...editingIssuance, number: e.target.value.toUpperCase() })} placeholder="e.g. SDOIC-2024-001" />
                                       <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic opacity-60">Primary Recall Key</p>
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Release Date</label>
                                       <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black uppercase" value={editingIssuance.date || ""} onChange={e => setEditingIssuance({ ...editingIssuance, date: e.target.value })} />
                                    </div>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Document Type</label>
                                       <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black uppercase" value={editingIssuance.type} onChange={e => setEditingIssuance({ ...editingIssuance, type: e.target.value })}>
                                          <option value="DIVISION MEMORANDA">DIVISION MEMORANDA</option>
                                          <option value="DEPED MEMORANDA">DEPED MEMORANDA</option>
                                          <option value="DIVISION ADVISORIES">DIVISION ADVISORIES</option>
                                          <option value="DIVISION BULLETIN">DIVISION BULLETIN</option>
                                          <option value="NOTICE OF MEETING">NOTICE OF MEETING</option>
                                          <option value="NOTICE OF DISTRIBUTION">NOTICE OF DISTRIBUTION</option>
                                       </select>
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Series Year</label>
                                       <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black uppercase" value={editingIssuance.year || ""} onChange={e => setEditingIssuance({ ...editingIssuance, year: e.target.value })} placeholder="e.g. 2024" />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Archival Category</label>
                                       <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black uppercase" value={editingIssuance.category} onChange={e => setEditingIssuance({ ...editingIssuance, category: e.target.value })}>
                                          <option value="DIVISION">DIVISION</option>
                                          <option value="REGIONAL">REGIONAL</option>
                                          <option value="NATIONAL">NATIONAL</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-6">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Document File (PDF preferred)</label>
                                 <div className="relative h-full bg-slate-50 rounded-[2.5rem] overflow-hidden border-2 border-dashed border-slate-200 group flex flex-col items-center justify-center p-10 text-center">
                                    <FileArchive size={64} className="text-slate-200 mb-4" />
                                    {issuanceUploadFile ? (
                                       <div className="space-y-2">
                                          <p className="text-sm font-black text-blue-600 uppercase">{issuanceUploadFile.name}</p>
                                          <button type="button" onClick={() => setIssuanceUploadFile(null)} className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Remove File</button>
                                       </div>
                                    ) : (
                                       <div className="space-y-2">
                                          {editingIssuance.fileUrl && <p className="text-[9px] font-black text-emerald-600 uppercase mb-4 tracking-widest flex items-center gap-2 justify-center"><CheckCircle2 size={12} /> Current File Linked</p>}
                                          <button type="button" onClick={() => issuanceFileRef.current?.click()} className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl hover:bg-slate-900 hover:text-white transition-all"><Upload size={16} /> Select Document</button>
                                          <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mt-4 italic">Max file size: 10MB</p>
                                       </div>
                                    )}
                                    <input type="file" ref={issuanceFileRef} className="hidden" accept=".pdf,.doc,.docx" onChange={e => {
                                       const file = e.target.files?.[0];
                                       if (file) setIssuanceUploadFile(file);
                                    }} />
                                 </div>
                              </div>
                           </div>

                           <button type="submit" disabled={isUpdating} className="w-full py-6 bg-blue-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-4 shadow-xl shadow-blue-100 disabled:opacity-50">
                              {isUpdating ? <RefreshCcw className="animate-spin" /> : <Save size={22} />} <span>Sync to Digital Archive</span>
                           </button>
                        </form>
                     </div>
                  )}
               </div>
            )}

            {/* CAROUSEL MANAGER */}
            {activeTab === "carousel" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Main Hero Slider</h3>
                           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Home Page Visuals</p>
                        </div>
                        <button
                           onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e: any) => {
                                 const file = e.target.files?.[0];
                                 if (file) handleUploadCarousel(file);
                              };
                              input.click();
                           }}
                           disabled={isUploadingCarousel}
                           className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
                        >
                           {isUploadingCarousel ? <RefreshCcw size={14} className="animate-spin" /> : <PlusCircle size={14} />}
                           <span>Add New Slide</span>
                        </button>
                     </div>

                     {carousel.length === 0 ? (
                        <div className="p-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-[2rem]">
                           <ImageIcon size={48} className="mx-auto text-slate-200" strokeWidth={1} />
                           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No slides uploaded (5-6 recommended)</p>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {carousel.map(slide => (
                              <div key={slide.id} className="relative aspect-video rounded-2xl overflow-hidden group shadow-lg border border-slate-100">
                                 <img src={slide.image} className="w-full h-full object-cover" alt="" />
                                 <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <button
                                       onClick={() => handleDeleteCarousel(slide.id)}
                                       className="p-4 bg-white text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-xl"
                                    >
                                       <Trash2 size={20} />
                                    </button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            )}

            {/* EMPLOYEE MANAGER */}
            {activeTab === "employee" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  {!editingHonor ? (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Employee of the Month</h3>
                              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Monthly Award Winners</p>
                           </div>
                           <button
                              onClick={() => setEditingHonor({ id: "new", month: "", year: "2024", image: null })}
                              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                           >
                              <PlusCircle size={16} />
                              <span>Add Honoree</span>
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {honors.length === 0 ? (
                              <div className="col-span-full p-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                 <Trophy size={48} className="mx-auto text-slate-200" strokeWidth={1} />
                                 <p className="text-slate-400 text-xs font-bold uppercase">No records found</p>
                              </div>
                           ) : (
                              honors.map(winner => (
                                 <div key={winner.id} className="group relative bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xl transition-all h-[360px] flex flex-col">
                                    <div className="relative flex-1 rounded-2xl overflow-hidden mb-6 bg-white border border-slate-200 shadow-inner">
                                       <img src={winner.image || "/images/leader-placeholder.webp"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                                    </div>
                                    <div className="space-y-1">
                                       <h4 className="font-black text-slate-900 uppercase tracking-tight text-lg">{winner.month}</h4>
                                       <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{winner.year}</p>
                                    </div>
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                       <button onClick={() => setEditingHonor(winner)} className="p-3 bg-white text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-xl"><SquarePen size={16} /></button>
                                       <button onClick={() => handleDeleteHonor(winner.id as number)} className="p-3 bg-white text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-xl"><Trash2 size={16} /></button>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <button onClick={() => setEditingHonor(null)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                              <ChevronRight size={14} className="rotate-180" /> Back to List
                           </button>
                           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Record Award Winner</h3>
                        </div>

                        <form onSubmit={handleSaveHonor} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           <div className="space-y-6">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Award Month</label>
                                 <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={editingHonor.month} onChange={e => setEditingHonor({ ...editingHonor, month: e.target.value })} placeholder="e.g. JANUARY" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Award Year</label>
                                 <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold" value={editingHonor.year} onChange={e => setEditingHonor({ ...editingHonor, year: e.target.value })} />
                              </div>
                              <button type="submit" disabled={isUpdating} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3">
                                 {isUpdating ? <RefreshCcw className="animate-spin" /> : <Save size={18} />} Deploy Record
                              </button>
                           </div>

                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Honoree Photo</label>
                              <div className="relative aspect-square md:aspect-auto md:h-full bg-slate-50 rounded-[2.5rem] overflow-hidden border-2 border-dashed border-slate-200 group">
                                 {editingHonor.image ? <img src={editingHonor.image} className="w-full h-full object-cover" alt="" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-300"><ImageIcon size={64} /></div>}
                                 <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button type="button" onClick={() => employeeFileRef.current?.click()} className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"><Upload size={14} /> Upload Image</button>
                                 </div>
                                 <input type="file" ref={employeeFileRef} className="hidden" onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                       setEditingHonor({ ...editingHonor, image: URL.createObjectURL(file) });
                                       setHonorFiles({ ...honorFiles, [editingHonor.id || 'new']: file });
                                    }
                                 }} />
                              </div>
                           </div>
                        </form>
                     </div>
                  )}
               </div>
            )}

            {/* NEWS MANAGER */}
            {activeTab === "news" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  {!editingNews ? (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Institutional News</h3>
                              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Division Updates & Articles</p>
                           </div>
                           <button
                              onClick={() => setEditingNews({ id: "new", title: "", category: "GENERAL NEWS", date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), excerpt: "", image: null })}
                              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
                           >
                              <PlusCircle size={16} />
                              <span>Create Story</span>
                           </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           {news.length === 0 ? (
                              <div className="p-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                 <Newspaper size={48} className="mx-auto text-slate-200" strokeWidth={1} />
                                 <p className="text-slate-400 text-xs font-bold uppercase">No articles drafted</p>
                              </div>
                           ) : (
                              news.map(item => (
                                 <div key={item.id} className="group flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-100 transition-all">
                                    <div className="w-20 h-14 rounded-lg overflow-hidden bg-white border border-slate-100">
                                       <img src={item.image || "/images/news-placeholder.jpg"} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                       <h4 className="font-bold text-slate-800 uppercase tracking-tight text-sm line-clamp-1">{item.title}</h4>
                                       <div className="flex items-center gap-3">
                                          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{item.category}</span>
                                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                       <button onClick={() => setEditingNews(item)} className="p-3 bg-white text-blue-600 rounded-xl border border-blue-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm"><SquarePen size={16} /></button>
                                       <button onClick={() => handleDeleteNews(item.id)} className="p-3 bg-white text-rose-500 rounded-xl border border-rose-50 hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <button onClick={() => setEditingNews(null)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                              <ChevronRight size={14} className="rotate-180" /> Back to Catalog
                           </button>
                           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Article Editor</h3>
                        </div>

                        <form onSubmit={handleSaveNews} className="space-y-10">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Headline</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={editingNews.title} onChange={e => setEditingNews({ ...editingNews, title: e.target.value })} />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category Tag</label>
                                       <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black uppercase" value={editingNews.category} onChange={e => setEditingNews({ ...editingNews, category: e.target.value.toUpperCase() })} />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Publish Date</label>
                                       <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black uppercase" value={editingNews.date} onChange={e => setEditingNews({ ...editingNews, date: e.target.value })} />
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Feature Illustration</label>
                                 <div className="relative aspect-video bg-slate-50 rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-200 group">
                                    {editingNews.image ? <img src={editingNews.image} className="w-full h-full object-cover" alt="" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-300"><ImageIcon size={64} /></div>}
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <button type="button" onClick={() => newsFileRef.current?.click()} className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"><Upload size={14} /> Replace Image</button>
                                    </div>
                                    <input type="file" ref={newsFileRef} className="hidden" onChange={e => {
                                       const file = e.target.files?.[0];
                                       if (file) {
                                          setEditingNews({ ...editingNews, image: URL.createObjectURL(file) });
                                          setNewsUploadFile(file);
                                       }
                                    }} />
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Story Excerpt (Lead)</label>
                              <textarea required rows={4} className="w-full p-6 bg-slate-50 rounded-3xl border border-slate-100 text-sm font-medium leading-relaxed" value={editingNews.excerpt} onChange={e => setEditingNews({ ...editingNews, excerpt: e.target.value })} />
                           </div>

                           <button type="submit" disabled={isUpdating} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50">
                              {isUpdating ? <RefreshCcw className="animate-spin" /> : <PlusCircle size={20} />} Sync to Live Server
                           </button>
                        </form>
                     </div>
                  )}
               </div>
            )}

            {/* ORG CHART MANAGER */}
            {activeTab === "org" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  {!editingOrgItem ? (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Organizational Hierarchy</h3>
                              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Departmental Functional Charts</p>
                           </div>
                           <button
                              onClick={() => setEditingOrgItem({ id: "new", department: "", sortOrder: 0, image: null })}
                              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                           >
                              <PlusCircle size={16} />
                              <span>New Department</span>
                           </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           {orgCharts.length === 0 ? (
                              <div className="p-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                 <Users size={48} className="mx-auto text-slate-200" strokeWidth={1} />
                                 <p className="text-slate-400 text-xs font-bold uppercase">No departments listed</p>
                              </div>
                           ) : (
                              orgCharts.map(ch => (
                                 <div key={ch.id} className="group flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-100 transition-all">
                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-white border border-slate-100">
                                       <img src={ch.image || "/images/leader-placeholder.webp"} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                       <h4 className="font-bold text-slate-800 uppercase tracking-tight text-sm">{ch.department}</h4>
                                       <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Order: {ch.sortOrder}</p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                       <button onClick={() => setEditingOrgItem(ch)} className="p-3 bg-white text-blue-600 rounded-xl border border-blue-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm"><SquarePen size={16} /></button>
                                       <button onClick={() => handleDeleteOrgChart(ch.id as number)} className="p-3 bg-white text-rose-500 rounded-xl border border-rose-50 hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <button onClick={() => setEditingOrgItem(null)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                              <ChevronRight size={14} className="rotate-180" /> Back to List
                           </button>
                           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Functional Chart Update</h3>
                        </div>

                        <form onSubmit={handleSaveOrgChart} className="space-y-10">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Department Name</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={editingOrgItem.department} onChange={e => setEditingOrgItem({ ...editingOrgItem, department: e.target.value })} />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Order</label>
                                    <input type="number" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold" value={editingOrgItem.sortOrder} onChange={e => setEditingOrgItem({ ...editingOrgItem, sortOrder: parseInt(e.target.value) })} />
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Functional Chart Image</label>
                                 <div className="relative aspect-video bg-slate-50 rounded-[2.5rem] overflow-hidden border-2 border-dashed border-slate-200 group">
                                    {editingOrgItem.image ? <img src={editingOrgItem.image} className="w-full h-full object-contain bg-white" alt="" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-300"><ImageIcon size={64} /></div>}
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <button type="button" onClick={() => orgFileRef.current?.click()} className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"><Upload size={14} /> Upload Chart</button>
                                    </div>
                                    <input type="file" ref={orgFileRef} className="hidden" onChange={e => {
                                       const file = e.target.files?.[0];
                                       if (file) {
                                          setEditingOrgItem({ ...editingOrgItem, image: URL.createObjectURL(file) });
                                          setOrgFile(file);
                                       }
                                    }} />
                                 </div>
                              </div>
                           </div>

                           <button type="submit" disabled={isUpdating} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50">
                              {isUpdating ? <RefreshCcw className="animate-spin" /> : <Save size={20} />} <span>Deploy Functional Chart</span>
                           </button>
                        </form>
                      </div>
                   )}
                </div>
             )}

            {/* SCHOOLS MANAGER */}
            {activeTab === "schools" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  {!editingSchool ? (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Educational Network</h3>
                              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Directory of Learning Centers</p>
                           </div>
                           <button
                              onClick={() => setEditingSchool({ id: "new", name: "", location: "", category: "ELEMENTARY", type: "PUBLIC", cluster: "", contact: "", logo: null, banner: null })}
                              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
                           >
                              <PlusCircle size={16} />
                              <span>Register School</span>
                           </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           {schools.length === 0 ? (
                              <div className="p-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                 <Building2 size={48} className="mx-auto text-slate-200" strokeWidth={1} />
                                 <p className="text-slate-400 text-xs font-bold uppercase">No educational institutions registered</p>
                              </div>
                           ) : (
                              schools.map(sch => (
                                 <div key={sch.id} className="group flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-100 transition-all">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-100 shadow-sm">
                                       <img src={sch.logo || "/images/leader-placeholder.webp"} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                       <div className="flex items-center gap-3">
                                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${sch.type === 'PRIVATE' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                             {sch.type}
                                          </span>
                                          <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{sch.category}</span>
                                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">• {sch.cluster || 'NO CLUSTER'}</span>
                                       </div>
                                       <h4 className="font-black text-slate-800 uppercase tracking-tight text-sm mt-1">{sch.name}</h4>
                                       <p className="text-[10px] font-medium text-slate-400 line-clamp-1">{sch.location}</p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                       <button onClick={() => setEditingSchool(sch)} className="p-3 bg-white text-blue-600 rounded-xl border border-blue-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm"><SquarePen size={16} /></button>
                                       <button onClick={() => handleDeleteSchool(sch.id as number)} className="p-3 bg-white text-rose-500 rounded-xl border border-rose-50 hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <button onClick={() => setEditingSchool(null)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                              <ChevronRight size={14} className="rotate-180" /> Back to Directory
                           </button>
                           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Institutional Profile Update</h3>
                        </div>

                        <form onSubmit={handleSaveSchool} className="space-y-12">
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                              
                              {/* Left Column - Details (Spans 7) */}
                              <div className="lg:col-span-7 space-y-8">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Official School Name</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-none outline-none" 
                                       value={editingSchool.name} onChange={e => setEditingSchool({ ...editingSchool, name: e.target.value })} placeholder="e.g. Imus Central Elementary School" />
                                 </div>

                                 <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Institution Type</label>
                                       <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black uppercase border-none outline-none" 
                                          value={editingSchool.type} onChange={e => setEditingSchool({ ...editingSchool, type: e.target.value })}>
                                          <option value="PUBLIC">PUBLIC</option>
                                          <option value="PRIVATE">PRIVATE</option>
                                       </select>
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Academic Level</label>
                                       <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black uppercase border-none outline-none" 
                                          value={editingSchool.category} onChange={e => setEditingSchool({ ...editingSchool, category: e.target.value })}>
                                          <option value="ELEMENTARY">ELEMENTARY</option>
                                          <option value="JHS">JUNIOR HIGH</option>
                                          <option value="SHS">SENIOR HIGH</option>
                                          <option value="INTEGRATED">INTEGRATED</option>
                                       </select>
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Assigned Cluster</label>
                                       <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-none outline-none" 
                                          value={editingSchool.cluster || ""} onChange={e => setEditingSchool({ ...editingSchool, cluster: e.target.value.toUpperCase() })} placeholder="e.g. CLUSTER I" />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Contact Details</label>
                                       <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-none outline-none" 
                                          value={editingSchool.contact || ""} onChange={e => setEditingSchool({ ...editingSchool, contact: e.target.value })} placeholder="e.g. (046) 123-4567" />
                                    </div>
                                 </div>

                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Precise Location Address</label>
                                    <textarea required rows={3} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-medium leading-relaxed resize-none border-none outline-none" 
                                       value={editingSchool.location} onChange={e => setEditingSchool({ ...editingSchool, location: e.target.value })} placeholder="Enter formal address..." />
                                 </div>
                              </div>

                              {/* Right Column - Media (Spans 5) */}
                              <div className="lg:col-span-5 space-y-8">
                                 {/* Logo Selector */}
                                 <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">School Logo / Profile (1:1)</label>
                                    <div className="relative aspect-square w-40 bg-slate-50 rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 group mx-auto md:mx-0 ring-4 ring-offset-4 ring-blue-50">
                                       {editingSchool.logo ? <img src={editingSchool.logo} className="w-full h-full object-cover" alt="" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-300"><Building2 size={40} /></div>}
                                       <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                          <button type="button" onClick={() => schoolLogoRef.current?.click()} className="p-3 bg-white text-slate-900 rounded-xl font-bold uppercase shadow-xl"><Upload size={18} /></button>
                                       </div>
                                       <input type="file" ref={schoolLogoRef} className="hidden" accept="image/*" onChange={e => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                             setEditingSchool({ ...editingSchool, logo: URL.createObjectURL(file) });
                                             setSchoolLogoFile(file);
                                          }
                                       }} />
                                    </div>
                                 </div>

                                 {/* Banner Selector */}
                                 <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">Feature Banner / Preview (16:9)</label>
                                    <div className="relative aspect-video bg-slate-50 rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-200 group ring-4 ring-offset-4 ring-indigo-50">
                                       {editingSchool.banner ? <img src={editingSchool.banner} className="w-full h-full object-cover" alt="" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-300"><ImageIcon size={48} /></div>}
                                       <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                          <button type="button" onClick={() => schoolBannerRef.current?.click()} className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3"><Upload size={14} /> Select Banner</button>
                                       </div>
                                       <input type="file" ref={schoolBannerRef} className="hidden" accept="image/*" onChange={e => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                             setEditingSchool({ ...editingSchool, banner: URL.createObjectURL(file) });
                                             setSchoolBannerFile(file);
                                          }
                                       }} />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <button type="submit" disabled={isUpdating} className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-black transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-200 disabled:opacity-50">
                              {isUpdating ? <RefreshCcw className="animate-spin" /> : <Save size={20} />} <span>Sync School Profile</span>
                           </button>
                        </form>
                     </div>
                  )}
               </div>
            )}
            {activeTab === "leaders" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  {!editingLeader ? (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Learning Leaders Archive</h3>
                              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Management of Visionary Leadership Profiles</p>
                           </div>
                           <button
                              onClick={() => setEditingLeader({ id: "new", name: "", position: "", image: null, startYear: "", endYear: "" })}
                              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
                           >
                              <PlusCircle size={16} />
                              <span>Add New Leader</span>
                           </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           {leaders.length === 0 ? (
                              <div className="p-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                 <Star size={48} className="mx-auto text-slate-200" strokeWidth={1} />
                                 <p className="text-slate-400 text-xs font-bold uppercase">No leaders archived yet</p>
                              </div>
                           ) : (
                              leaders.map(le => (
                                 <div key={le.id} className="group flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-100 transition-all">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white border-2 border-slate-100 shadow-sm">
                                       <img src={le.image || "/images/leader-placeholder.webp"} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                       <h4 className="font-black text-slate-800 uppercase tracking-tight text-sm">{le.name}</h4>
                                       <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">{le.position}</p>
                                       {le.startYear && (
                                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                             Tenure: {le.startYear} — {le.endYear || 'Present'}
                                          </p>
                                       )}
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                       <button onClick={() => setEditingLeader(le)} className="p-3 bg-white text-blue-600 rounded-xl border border-blue-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm"><SquarePen size={16} /></button>
                                       <button onClick={() => handleDeleteLeader(le.id as number)} className="p-3 bg-white text-rose-500 rounded-xl border border-rose-50 hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <button onClick={() => setEditingLeader(null)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                              <ChevronRight size={14} className="rotate-180" /> Back to Archive
                           </button>
                           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Leader Profile Update</h3>
                        </div>

                        <form onSubmit={handleSaveLeader} className="space-y-10">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">FullName & Honorifics</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={editingLeader.name} onChange={e => setEditingLeader({ ...editingLeader, name: e.target.value })} placeholder="e.g. Dr. Lualhati O. Cadavedo" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Position / Title</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold italic" value={editingLeader.position} onChange={e => setEditingLeader({ ...editingLeader, position: e.target.value })} placeholder="e.g. Former OIC Division Superintendent" />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Start Year</label>
                                       <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={editingLeader.startYear || ""} onChange={e => setEditingLeader({ ...editingLeader, startYear: e.target.value })} placeholder="e.g. 2013" />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">End Year</label>
                                       <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={editingLeader.endYear || ""} onChange={e => setEditingLeader({ ...editingLeader, endYear: e.target.value })} placeholder="e.g. 2016 (or 'Present')" />
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profile Picture</label>
                                 <div className="relative aspect-square w-48 bg-slate-50 rounded-full overflow-hidden border-4 border-dashed border-slate-200 group mx-auto">
                                    {editingLeader.image ? <img src={editingLeader.image} className="w-full h-full object-cover" alt="" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-300"><ImageIcon size={48} /></div>}
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <button type="button" onClick={() => leaderFileRef.current?.click()} className="p-3 bg-white text-slate-900 rounded-full font-bold uppercase shadow-xl"><Upload size={18} /></button>
                                    </div>
                                    <input type="file" ref={leaderFileRef} className="hidden" accept="image/*" onChange={e => {
                                       const file = e.target.files?.[0];
                                       if (file) {
                                          setEditingLeader({ ...editingLeader, image: URL.createObjectURL(file) });
                                          setLeaderFile(file);
                                       }
                                    }} />
                                 </div>
                                 <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest mt-4">1:1 Aspect Ratio Recommended</p>
                              </div>
                           </div>

                           <button type="submit" disabled={isUpdating} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50">
                              {isUpdating ? <RefreshCcw className="animate-spin" /> : <Save size={20} />} <span>Sync Leadership Profile</span>
                           </button>
                        </form>
                     </div>
                  )}
               </div>
            )}
            {activeTab === "transparency" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  {!editingTransparency ? (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Transparency Seal Items</h3>
                              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Document Links and Compliance Registry</p>
                           </div>
                           <button
                              onClick={() => setEditingTransparency({ id: 0, category: "1.A", title: "", url: "", isExternal: true, year: "", order: 0 })}
                              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
                           >
                              <PlusCircle size={16} />
                              <span>Add New Item</span>
                           </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           {transparencyItems.length === 0 ? (
                              <div className="p-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                 <Shield size={48} className="mx-auto text-slate-200" strokeWidth={1} />
                                 <p className="text-slate-400 text-xs font-bold uppercase">No transparency items found</p>
                              </div>
                           ) : (
                              transparencyItems
                                .sort((a, b) => {
                                   // Sort by Category first
                                   if (a.category !== b.category) {
                                      return a.category.localeCompare(b.category);
                                   }
                                   // Then by Year Descending
                                   if (a.year && b.year) {
                                      return parseInt(b.year) - parseInt(a.year);
                                   }
                                   if (a.year && !b.year) return -1;
                                   if (!a.year && b.year) return 1;
                                   // Then by Order
                                   return a.order - b.order;
                                })
                                .map(item => (
                                 <div key={item.id} className="group flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-100 transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                       <FileText size={20} />
                                    </div>
                                    <div className="flex-1">
                                       <div className="flex items-center gap-3">
                                          <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest bg-white">{item.category}</Badge>
                                          {item.year && <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">• {item.year}</span>}
                                       </div>
                                       <h4 className="font-black text-slate-800 uppercase tracking-tight text-sm mt-1">{item.title}</h4>
                                       <p className="text-[10px] font-medium text-slate-400 line-clamp-1">{item.url}</p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                       <button onClick={() => setEditingTransparency(item)} className="p-3 bg-white text-blue-600 rounded-xl border border-blue-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm"><SquarePen size={16} /></button>
                                       <button onClick={() => confirmDelete(item.id, 'transparency')} className="p-3 bg-white text-rose-500 rounded-xl border border-rose-50 hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                           <button onClick={() => setEditingTransparency(null)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                              <ChevronRight size={14} className="rotate-180" /> Back to List
                           </button>
                           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Document Item Update</h3>
                        </div>

                        <form onSubmit={handleSaveTransparency} className="space-y-10">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Document Title</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" 
                                       value={editingTransparency.title} onChange={e => setEditingTransparency({ ...editingTransparency, title: e.target.value })} placeholder="e.g. FY 2023 Annual Report" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Link URL</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium" 
                                       value={editingTransparency.url} onChange={e => setEditingTransparency({ ...editingTransparency, url: e.target.value })} placeholder="https://..." />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section Category</label>
                                       <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black uppercase" 
                                          value={editingTransparency.category} onChange={e => setEditingTransparency({ ...editingTransparency, category: e.target.value.toUpperCase() })} placeholder="e.g. 1.A, 2.B, 5.A" />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Report Year (Optional)</label>
                                       <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" 
                                          value={editingTransparency.year || ""} onChange={e => setEditingTransparency({ ...editingTransparency, year: e.target.value })} placeholder="e.g. 2023" />
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort Order</label>
                                    <input type="number" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" 
                                       value={editingTransparency.order} onChange={e => setEditingTransparency({ ...editingTransparency, order: parseInt(e.target.value) })} />
                                 </div>
                                 <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 mt-8">
                                    <input type="checkbox" id="isExternal" className="w-5 h-5 rounded border-slate-300" 
                                       checked={editingTransparency.isExternal} onChange={e => setEditingTransparency({ ...editingTransparency, isExternal: e.target.checked })} />
                                    <label htmlFor="isExternal" className="text-xs font-black uppercase tracking-widest text-slate-700 cursor-pointer">Opens in New Tab (External Link)</label>
                                 </div>
                              </div>
                           </div>

                           <button type="submit" disabled={isUpdating} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50">
                              {isUpdating ? <RefreshCcw className="animate-spin" /> : <Save size={20} />} <span>Sync Transparency Link</span>
                           </button>
                        </form>
                     </div>
                  )}
               </div>
            )}
            {activeTab === "contact" && (
               <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                     <div className="space-y-1">
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Contact Information</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Global Office Contact Details</p>
                     </div>

                     {contactInfo ? (
                        <form onSubmit={handleSaveContactInfo} className="space-y-10">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                 <h4 className="font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Primary Details</h4>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Headquarters Location</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={contactInfo.location} onChange={e => setContactInfo({ ...contactInfo, location: e.target.value })} placeholder="e.g. Toclong I-C, Imus City..." />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call Details</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={contactInfo.phone} onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })} placeholder="e.g. (046) 419-8450 local 204" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Support</label>
                                    <input required type="email" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={contactInfo.email} onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })} placeholder="e.g. sgod.imus@deped.gov.ph" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Office Hours</label>
                                    <input required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={contactInfo.officeHours} onChange={e => setContactInfo({ ...contactInfo, officeHours: e.target.value })} placeholder="e.g. Mon - Fri: 8:00 AM - 5:00 PM" />
                                 </div>
                              </div>

                              <div className="space-y-6">
                                 <h4 className="font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Social Links (Optional)</h4>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Facebook URL</label>
                                    <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={contactInfo.facebook || ""} onChange={e => setContactInfo({ ...contactInfo, facebook: e.target.value })} placeholder="https://facebook.com/..." />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Twitter URL</label>
                                    <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={contactInfo.twitter || ""} onChange={e => setContactInfo({ ...contactInfo, twitter: e.target.value })} placeholder="https://twitter.com/..." />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">YouTube Channel URL</label>
                                    <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={contactInfo.youtube || ""} onChange={e => setContactInfo({ ...contactInfo, youtube: e.target.value })} placeholder="https://youtube.com/..." />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Website URL</label>
                                    <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-black" value={contactInfo.website || ""} onChange={e => setContactInfo({ ...contactInfo, website: e.target.value })} placeholder="https://..." />
                                 </div>
                              </div>
                           </div>

                           <button type="submit" disabled={isUpdating} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50">
                              {isUpdating ? <RefreshCcw className="animate-spin" /> : <Save size={20} />} <span>Sync Contact Information</span>
                           </button>
                        </form>
                     ) : (
                        <div className="p-10 flex justify-center">
                           <RefreshCcw className="animate-spin text-blue-600" size={32} />
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>

         <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="bg-white rounded-[2rem] border-none shadow-2xl p-8">
               <AlertDialogHeader className="space-y-4">
                  <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-2">
                     <Trash2 size={32} />
                  </div>
                  <AlertDialogTitle className="text-2xl font-black text-slate-900 uppercase tracking-tight">Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-500 font-medium">
                     This action is permanent and cannot be undone. Are you absolutely certain you want to remove this record from the division archive?
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter className="mt-8 gap-4">
                  <AlertDialogCancel className="rounded-xl border-slate-200 text-xs font-black uppercase tracking-widest py-6">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={executeDelete} className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-black uppercase tracking-widest py-6">Proceed with Deletion</AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   );
}
