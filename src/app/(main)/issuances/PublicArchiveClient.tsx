"use client";

import React, { useState, useMemo } from "react";
import { IssuanceFilters } from "./components/IssuanceFilters";
import { IssuanceTable } from "./components/IssuanceTable";

interface PublicArchiveClientProps {
  initialDocuments: any[];
  categoryLabel?: string;
  typeLabel?: string;
}

type SortOption = "newest" | "oldest" | "number-desc" | "number-asc";

export default function PublicArchiveClient({ 
  initialDocuments, 
  categoryLabel = "Archive",
  typeLabel = "Document"
}: PublicArchiveClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOption>("newest");

  const filteredAndSortedDocuments = useMemo(() => {
    const filtered = initialDocuments.filter((doc) => {
      const searchStr = `${doc.title} ${doc.number} ${doc.year || ""}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });

    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

    return [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          if (a.year !== b.year) return (b.year || "").localeCompare(a.year || "");
          return collator.compare(b.number, a.number);
        case "oldest":
          if (a.year !== b.year) return (a.year || "").localeCompare(b.year || "");
          return collator.compare(a.number, b.number);
        case "number-desc":
          return collator.compare(b.number, a.number);
        case "number-asc":
          return collator.compare(a.number, b.number);
        default:
          return 0;
      }
    });
  }, [initialDocuments, searchTerm, sortOrder]);

  return (
    <div className="w-full space-y-8">
      <IssuanceFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        categoryLabel={categoryLabel}
        resultsCount={filteredAndSortedDocuments.length}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-20 pb-20">
        <IssuanceTable 
          documents={filteredAndSortedDocuments}
          typeLabel={typeLabel}
          searchTerm={searchTerm}
          onClearSearch={() => setSearchTerm("")}
        />
      </div>
    </div>
  );
}
