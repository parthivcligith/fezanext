"use client";

import React, { useState } from "react";
import { useCompare, CompareItem } from "@/context/compare-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFinalPrice } from "@/lib/prices";
import { useRazorpay } from "@/hooks/use-razorpay";
import { X, Scale, Trash2, ShieldCheck, Plus, Eye, Zap, Check, ChevronRight, Info } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SIZES = ["72 x 36", "72 x 48", "72 x 60", "72 x 72", "75 x 36", "75 x 48", "75 x 60", "75 x 72", "78 x 72"];
const THICKNESSES = [4, 5, 6, 7, 8, 9, 10];
const TOPS = ["Standard", "Euro Top", "Pillow Top"];

export function FloatingCompare() {
  const { compareList, removeItem, clearCompare, updateItemOptions } = useCompare();
  const { initiatePayment } = useRazorpay();
  const [isOpen, setIsOpen] = useState(false);
  const [showDiffOnly, setShowDiffOnly] = useState(false);

  // Lock scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (compareList.length === 0) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const isDifferent = (key: keyof CompareItem["selectedOptions"]) => {
    if (compareList.length < 2) return false;
    const firstValue = compareList[0].selectedOptions[key];
    return compareList.some(item => item.selectedOptions[key] !== firstValue);
  };

  const shouldShowRow = (key: keyof CompareItem["selectedOptions"]) => {
    if (!showDiffOnly) return true;
    return isDifferent(key);
  };

  return (
    <LayoutGroup>
      {/* Floating Button in Stack */}
      <div className="fixed top-[245px] right-5 z-[60]">
        <motion.button
          layoutId="compare-trigger"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group bg-white/90 border border-white shadow-2xl backdrop-blur-xl p-4 rounded-[22px] hover:bg-primary hover:text-white transition-all duration-500 active:scale-95 flex items-center justify-center ring-1 ring-black/5"
        >
          <Scale className="w-5 h-5" />
          {compareList.length > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
            >
              {compareList.length}
            </motion.span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-zinc-950/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 250 }}
              className="fixed top-0 right-0 h-[100dvh] w-full max-w-6xl bg-[#FBFBFD] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[101] flex flex-col overflow-hidden"
            >
              {/* Header: Luxury Controls */}
              <div className="bg-white/70 p-8 border-b backdrop-blur-xl flex items-center justify-between gap-8 z-50">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-xl shadow-zinc-900/20">
                    <Scale className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Comparison</h2>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center space-x-2 bg-zinc-100/80 px-3 py-1.5 rounded-full border border-zinc-200/50">
                        <Switch 
                          id="diff-toggle" 
                          checked={showDiffOnly} 
                          onCheckedChange={setShowDiffOnly} 
                          className="data-[state=checked]:bg-primary"
                        />
                        <Label htmlFor="diff-toggle" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 cursor-pointer">
                          Differences only
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCompare}
                    className="rounded-full text-zinc-400 hover:text-destructive hover:bg-destructive/5 font-bold transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear List
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-12 w-12 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar bg-white relative">
                {/* GLOBAL TOGGLE (Fixed on top of scroll) */}
                <div className="md:hidden p-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                        <Switch 
                          id="mobile-diff-toggle" 
                          checked={showDiffOnly} 
                          onCheckedChange={setShowDiffOnly} 
                        />
                        <Label htmlFor="mobile-diff-toggle" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                          Hide matches
                        </Label>
                    </div>
                    <div className="flex gap-1">
                       {compareList.map((_, i) => (
                         <div key={i} className={cn("h-1.5 w-1.5 rounded-full", i === 0 ? "bg-primary w-4" : "bg-zinc-200")} />
                       ))}
                    </div>
                </div>

                <div className="min-w-full">
                  {/* MOBILE VIEW: SWIPEABLE CARDS */}
                  <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-20">
                    {compareList.map((item, idx) => {
                      const currentPrice = getFinalPrice(item.selectedOptions.size, item.selectedOptions.thickness, item.slug, item.selectedOptions.top);
                      return (
                        <div key={`mobile-card-${item.uniqueId}`} className="w-[100vw] shrink-0 snap-center p-6 space-y-8">
                           {/* Product Overview (Card Type) */}
                           <div className="bg-zinc-50 rounded-[40px] p-8 border border-zinc-100 space-y-6">
                              <div className="flex justify-between items-start">
                                 <div className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                    Product {idx + 1}
                                 </div>
                                 <button onClick={() => removeItem(item.uniqueId)} className="p-2 bg-white rounded-full shadow-sm text-zinc-400">
                                    <X className="h-4 w-4" />
                                 </button>
                              </div>
                              <div className="flex flex-col items-center gap-4">
                                <div className="relative h-48 w-48 bg-white rounded-3xl shadow-inner border border-zinc-100 flex items-center justify-center">
                                  <Image src={item.image} alt={item.name} width={140} height={140} className="object-contain" />
                                </div>
                                <div className="text-center">
                                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{item.name}</h3>
                                  <p className="text-3xl font-black text-primary mt-1">{formatPrice(currentPrice)}</p>
                                </div>
                              </div>
                           </div>

                           {/* Config Section */}
                           <div className="space-y-8">
                             {shouldShowRow("size") && (
                               <div className="space-y-4">
                                 <div className="flex items-center gap-2">
                                    <Scale className="h-4 w-4 text-zinc-400" />
                                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Dimensions</span>
                                 </div>
                                 <div className="flex overflow-x-auto gap-2 no-scrollbar -mx-6 px-6">
                                    {SIZES.map(s => (
                                      <button 
                                        key={s} 
                                        onClick={() => updateItemOptions(item.uniqueId, "size", s)}
                                        className={cn(
                                          "px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all",
                                          item.selectedOptions.size === s 
                                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                                            : "bg-white border-zinc-200 text-zinc-500"
                                        )}
                                      >
                                        {s}"
                                      </button>
                                    ))}
                                 </div>
                               </div>
                             )}

                             <div className="grid grid-cols-1 gap-8">
                               {shouldShowRow("thickness") && (
                                 <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                       <Zap className="h-4 w-4 text-zinc-400" />
                                       <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Thickness</span>
                                    </div>
                                    <div className="flex gap-2">
                                       {THICKNESSES.map(t => (
                                         <button 
                                           key={t} 
                                           onClick={() => updateItemOptions(item.uniqueId, "thickness", t)}
                                           className={cn(
                                             "flex-1 h-12 rounded-2xl text-xs font-bold border transition-all",
                                             item.selectedOptions.thickness === t 
                                               ? "bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-900/10" 
                                               : "bg-white border-zinc-200 text-zinc-500"
                                           )}
                                         >
                                           {t}"
                                         </button>
                                       ))}
                                    </div>
                                 </div>
                               )}
                               
                               {shouldShowRow("top") && (
                                 <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                       <Eye className="h-4 w-4 text-zinc-400" />
                                       <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Comfort Top</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                       {TOPS.map(t => (
                                         <button 
                                           key={t} 
                                           onClick={() => updateItemOptions(item.uniqueId, "top", t === "Standard" ? null : t)}
                                           className={cn(
                                             "h-12 rounded-2xl text-xs font-bold border transition-all px-4 truncate",
                                             (item.selectedOptions.top || "Standard") === t 
                                               ? "bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-900/10" 
                                               : "bg-white border-zinc-200 text-zinc-500"
                                           )}
                                         >
                                           {t}
                                         </button>
                                       ))}
                                    </div>
                                 </div>
                               )}
                             </div>
                           </div>

                           {/* Features List */}
                           <div className="bg-zinc-50 rounded-[32px] p-6 space-y-4">
                              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Included Benefits</span>
                              <div className="space-y-3">
                                {(item.features || ["Pressure relief", "Spinal alignment", "Breathable"]).map((f, i) => (
                                  <div key={i} className="flex gap-3 items-center">
                                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                      <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-bold text-zinc-600">{f}</span>
                                  </div>
                                ))}
                              </div>
                           </div>

                           <Button className="w-full h-16 rounded-[22px] bg-zinc-900 text-white font-black text-lg shadow-xl shadow-zinc-900/20 active:scale-95">
                              Buy this model
                           </Button>
                        </div>
                      );
                    })}
                  </div>

                  {/* DESKTOP VIEW: TRADITIONAL GRID (Hidden on Mobile) */}
                  <div className="hidden md:block">
                    {/* PRODUCT CARDS (Unified Sticky Shelf) */}
                    <div className="grid grid-cols-[240px_1fr_1fr] border-b sticky top-0 z-40 bg-zinc-50/80 backdrop-blur-xl">
                      <div className="p-8 border-r border-zinc-200/50 flex items-center">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 leading-relaxed">
                          Model Comparison <br/>& Live Pricing
                         </p>
                      </div>
                      {compareList.map((item) => {
                        const currentPrice = getFinalPrice(item.selectedOptions.size, item.selectedOptions.thickness, item.slug, item.selectedOptions.top);
                        return (
                          <motion.div 
                            layout
                            key={`card-${item.uniqueId}`} 
                            className="p-8 border-r border-zinc-200/50 last:border-r-0 relative group flex items-center gap-6"
                          >
                            <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-white shadow-sm border border-zinc-100 flex items-center justify-center shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="object-contain group-hover:scale-110 transition-transform duration-500"
                              />
                              <button
                                onClick={() => removeItem(item.uniqueId)}
                                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-zinc-950/5 text-zinc-400 hover:bg-destructive hover:text-white transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-base font-bold text-zinc-900 leading-tight">{item.name}</h3>
                              <motion.p 
                                key={currentPrice}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xl font-black text-primary tracking-tighter"
                              >
                                {formatPrice(currentPrice)}
                              </motion.p>
                            </div>
                          </motion.div>
                        );
                      })}
                      {compareList.length === 1 && (
                         <div className="p-8 flex items-center justify-center gap-4 bg-zinc-100/30">
                            <Plus className="h-5 w-5 text-zinc-300" />
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                              Add product
                            </p>
                         </div>
                      )}
                    </div>

                    {/* CONTENT AREA WITH PADDING */}
                    <div className="p-10 space-y-12">

                  {/* SECTION: CONFIGURATION */}
                  <motion.div layout className="bg-white rounded-[40px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-zinc-100 space-y-10">
                    <div className="flex items-center justify-between border-b border-zinc-50 pb-8">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Configuration</h4>
                          <p className="text-lg font-bold text-zinc-900">Personalize your comfort</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                          <Zap className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="space-y-12">
                      {/* Dimensions Row */}
                      <AnimatePresence mode="popLayout">
                        {shouldShowRow("size") && (
                          <motion.div 
                            key="row-size"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-[200px_1fr_1fr] gap-10 items-start"
                          >
                            <div className="space-y-1 pt-4">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Dimensions</span>
                              <p className="text-sm font-bold text-zinc-800">Mattress Size</p>
                              <p className="text-[10px] text-zinc-400 italic">Select the width and length to fit your bed frame perfectly.</p>
                            </div>
                            {compareList.map((item) => (
                              <div key={`sz-${item.uniqueId}`} className="pt-2">
                                <Select 
                                  value={item.selectedOptions.size} 
                                  onValueChange={(val) => updateItemOptions(item.uniqueId, "size", val)}
                                >
                                  <SelectTrigger className="h-14 w-full rounded-2xl bg-zinc-50/50 border-zinc-200/60 hover:border-primary hover:bg-white transition-all shadow-none text-sm font-bold">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-2xl shadow-2xl border-zinc-100 z-[110]">
                                    {SIZES.map(s => <SelectItem key={s} value={s} className="rounded-xl font-bold py-3 text-sm cursor-pointer">{s} Inches</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              </div>
                            ))}
                          </motion.div>
                        )}

                        {/* Thickness Pills Row */}
                        {shouldShowRow("thickness") && (
                          <motion.div 
                            key="row-thickness"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-[200px_1fr_1fr] gap-10 items-start"
                          >
                            <div className="space-y-1 pt-4">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Density</span>
                              <p className="text-sm font-bold text-zinc-800">Core Thickness</p>
                              <p className="text-[10px] text-zinc-400 italic">Taller profiles offer enhanced weight absorption and deep comfort.</p>
                            </div>
                            {compareList.map((item) => (
                              <div key={`tk-${item.uniqueId}`} className="flex flex-wrap gap-2 pt-2">
                                {THICKNESSES.map((t) => (
                                  <button
                                    key={t}
                                    onClick={() => updateItemOptions(item.uniqueId, "thickness", t)}
                                    className={cn(
                                      "px-4 py-2.5 rounded-xl text-xs font-black transition-all border",
                                      item.selectedOptions.thickness === t 
                                        ? "bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-900/10" 
                                        : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400"
                                    )}
                                  >
                                    {t}"
                                  </button>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}

                        {/* Top Type Pills Row */}
                        {shouldShowRow("top") && (
                          <motion.div 
                            key="row-top"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-[200px_1fr_1fr] gap-10 items-start"
                          >
                            <div className="space-y-1 pt-4">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Comfort</span>
                              <p className="text-sm font-bold text-zinc-800">Top Construction</p>
                              <p className="text-[10px] text-zinc-400 italic">Affects the initial feel and responsiveness of the top layer.</p>
                            </div>
                            {compareList.map((item) => (
                              <div key={`tp-${item.uniqueId}`} className="flex flex-wrap gap-2 pt-2">
                                {TOPS.map((t) => (
                                  <button
                                    key={t}
                                    onClick={() => updateItemOptions(item.uniqueId, "top", t === "Standard" ? null : t)}
                                    className={cn(
                                      "px-5 py-2.5 rounded-xl text-xs font-black transition-all border",
                                      (item.selectedOptions.top || "Standard") === t 
                                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                                        : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400"
                                    )}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* SECTION: BENEFITS */}
                  <div className="bg-white rounded-[40px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-zinc-100 space-y-8">
                    <div className="flex items-center justify-between border-b border-zinc-50 pb-8">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Clinical Results</h4>
                          <p className="text-lg font-bold text-zinc-900">Health & Wellness Benefits</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                          <Check className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr_1fr] gap-10">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Medical Analysis</span>
                        <p className="text-sm font-bold text-zinc-800">Standard Ortho Package</p>
                      </div>
                      {compareList.map((item) => (
                        <div key={`feat-${item.uniqueId}`} className="space-y-4">
                          {(item.features || ["7-Zone pressure relief", "Spinal alignment foam", "Breathable cover"]).map((f, i) => (
                            <div key={i} className="flex items-center gap-3 bg-zinc-50/50 p-3 rounded-2xl border border-zinc-100/50">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                              </div>
                              <span className="text-xs font-bold text-zinc-700">{f}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                      {compareList.length === 1 && <div className="bg-transparent" />}
                    </div>
                  </div>

                  {/* CTA ROW */}
                  <div className="grid grid-cols-[240px_1fr_1fr] gap-6 items-end pb-12">
                     <div className="pb-8 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-zinc-400">
                           <Info className="h-4 w-4" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Help Center</span>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium">Need medical advice on your selection? <br/><button className="text-primary font-bold hover:underline">Chat with an expert</button></p>
                     </div>
                     {compareList.map((item) => (
                       <div key={`act-${item.uniqueId}`} className="space-y-4">
                          <Button 
                            onClick={() => initiatePayment({ 
                                amount: getFinalPrice(item.selectedOptions.size, item.selectedOptions.thickness, item.slug, item.selectedOptions.top),
                                description: `Purchase for ${item.name} (${item.selectedOptions.size}, ${item.selectedOptions.thickness}")`
                            })}
                            className="w-full h-16 rounded-[22px] bg-zinc-900 hover:bg-zinc-800 text-white font-black text-lg transition-all shadow-xl shadow-zinc-900/20 active:scale-95 group"
                          >
                            Secure Purchase
                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          <Button variant="ghost" className="w-full text-zinc-400 font-bold hover:text-zinc-900 transition-colors h-12">
                            Download Technical Data Sheet
                          </Button>
                       </div>
                     ))}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
