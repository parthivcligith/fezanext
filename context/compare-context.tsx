"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface CompareItem {
  id: string;
  uniqueId: string;
  slug: string;
  name: string;
  image: string;
  finalPrice: number;
  features?: string[];
  selectedOptions: {
    size: string;
    thickness: number;
    top: string | null;
    color: string | null;
  };
}

interface CompareContextType {
  compareList: CompareItem[];
  toggleCompare: (item: Omit<CompareItem, "uniqueId">) => void;
  updateItemOptions: (uniqueId: string, optionType: keyof CompareItem["selectedOptions"], value: any) => void;
  removeItem: (uniqueId: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<CompareItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("compareList");
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse compare list", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("compareList", JSON.stringify(compareList));
    }
  }, [compareList, isInitialized]);

  const toggleCompare = (itemData: Omit<CompareItem, "uniqueId">) => {
    const { id, selectedOptions } = itemData;
    const uniqueId = `${id}-${selectedOptions.size}-${selectedOptions.thickness}-${selectedOptions.top || "none"}-${selectedOptions.color || "none"}`;

    const exists = compareList.some((item) => item.uniqueId === uniqueId);

    if (exists) {
      setCompareList((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
      toast.success("Removed from compare");
    } else {
      if (compareList.length >= 2) {
        toast.error("You can only compare up to 2 items");
        return;
      }
      setCompareList((prev) => [...prev, { ...itemData, uniqueId }]);
      toast.success("Added to compare");
    }
  };

  const updateItemOptions = (uniqueId: string, optionType: keyof CompareItem["selectedOptions"], value: any) => {
    setCompareList((prev) =>
      prev.map((item) => {
        if (item.uniqueId === uniqueId) {
          const updatedOptions = { ...item.selectedOptions, [optionType]: value };
          return {
            ...item,
            selectedOptions: updatedOptions,
            // Price is updated in the component view using getFinalPrice
          };
        }
        return item;
      })
    );
  };

  const removeItem = (uniqueId: string) => {
    setCompareList((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{ compareList, toggleCompare, updateItemOptions, removeItem, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
