"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Star, SlidersHorizontal, Search, ChevronRight, ShoppingCart, Heart } from "lucide-react"
import { ORTHO_PRODUCTS } from "@/lib/products"
import { useStore } from "@/lib/store"

// ── All 9 products (4 ortho + 5 others) with gallery metadata ─────────────────
const ALL_PRODUCTS = [
    {
        slug: "comfy-ortho-mattress",
        name: "Comfy Ortho Mattress",
        category: "Orthopedic",
        badge: "Bestseller",
        badgeColor: "bg-black text-white",
        rating: 4.8,
        reviewCount: 50,
        image: "/images/comfy3.png",
        materials: ["Rb"],
        priceFrom: 5590,
    },
    {
        slug: "orthopedic-mattress",
        name: "Orthopedic Mattress",
        category: "Orthopedic",
        badge: "New In",
        badgeColor: "bg-[#1d6fbe] text-white",
        rating: 4.7,
        reviewCount: 38,
        image: "/images/comfy5.png",
        materials: ["Rb"],
        priceFrom: 5590,
    },
    {
        slug: "semi-ortho-mattress",
        name: "Semi Ortho Mattress",
        category: "Orthopedic",
        badge: "Popular",
        badgeColor: "bg-[#d32f2f] text-white",
        rating: 4.6,
        reviewCount: 42,
        image: "/images/comfy6.png",
        materials: ["Rb"],
        priceFrom: 5590,
    },
    {
        slug: "ortho-care-mattress",
        name: "Ortho Care Mattress",
        category: "Orthopedic",
        badge: "Premium",
        badgeColor: "bg-black text-white",
        rating: 4.9,
        reviewCount: 29,
        image: "/images/comfy7.png",
        materials: ["Rb"],
        priceFrom: 5590,
    },
    {
        slug: "pure-rest-mattress",
        name: "Pure Rest Mattress",
        category: "Natural",
        badge: "Natural",
        badgeColor: "bg-[#1d6fbe] text-white",
        rating: 4.8,
        reviewCount: 34,
        image: "/images/comfy3.png",
        materials: ["Ltx", "PU", "Rb"],
        priceFrom: 6890,
    },
    {
        slug: "pure-rest-o-mattress",
        name: "Pure Rest O Mattress",
        category: "Natural",
        badge: "Pure & Firm",
        badgeColor: "bg-[#d32f2f] text-white",
        rating: 4.7,
        reviewCount: 27,
        image: "/images/comfy4.jpeg",
        materials: ["Ltx", "Rb"],
        priceFrom: 6200,
    },
    {
        slug: "prime-spring-mattress",
        name: "Prime Spring Mattress",
        category: "Spring",
        badge: "Hotel Grade",
        badgeColor: "bg-black text-white",
        rating: 4.9,
        reviewCount: 46,
        image: "/images/comfy5.png",
        materials: ["Mmry", "Pkt"],
        priceFrom: 8200,
    },
    {
        slug: "polarcloud-mattress",
        name: "PolarCloud Mattress",
        category: "Memory Foam",
        badge: "Cloud Comfort",
        badgeColor: "bg-[#1d6fbe] text-white",
        rating: 4.8,
        reviewCount: 39,
        image: "/images/comfy6.png",
        materials: ["Mmry", "PU", "Rb"],
        priceFrom: 7200,
    },
    {
        slug: "polarcloud-o-mattress",
        name: "PolarCloud O Mattress",
        category: "Memory Foam",
        badge: "Ortho Cloud",
        badgeColor: "bg-[#d32f2f] text-white",
        rating: 4.9,
        reviewCount: 31,
        image: "/images/comfy7.png",
        materials: ["Mmry", "PU", "Rb"],
        priceFrom: 7800,
    },
]

const CATEGORIES = ["All", "Orthopedic", "Natural", "Spring", "Memory Foam"]

const MATERIAL_LABELS: Record<string, string> = {
    Rb: "Ortho Foam",
    PU: "Comfort Foam",
    Ltx: "Latex",
    Mmry: "Memory Foam",
    Pkt: "Pocket Spring",
    Ep: "Support Layer",
}

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price)

export default function CollectionsPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("relevance")
    const { addToCart, toggleFavorite, isFavorite } = useStore()

    const filtered = useMemo(() => {
        let list = ALL_PRODUCTS.filter((p) => {
            const matchCat = activeCategory === "All" || p.category === activeCategory
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
            return matchCat && matchSearch
        })
        if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating)
        if (sortBy === "reviews") list = [...list].sort((a, b) => b.reviewCount - a.reviewCount)
        if (sortBy === "price-asc") list = [...list].sort((a, b) => a.priceFrom - b.priceFrom)
        if (sortBy === "price-desc") list = [...list].sort((a, b) => b.priceFrom - a.priceFrom)
        return list
    }, [activeCategory, search, sortBy])

    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            {/* ── Page Header ── */}
            <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-foreground font-medium">Collections</span>
                </nav>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-2">
                            All Products
                        </h1>
                        <p className="text-muted-foreground">{filtered.length} mattresses available</p>
                    </div>

                    {/* Search + Sort */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search mattresses…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 w-52"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <SlidersHorizontal className="w-4 h-4" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                            >
                                <option value="relevance">Sort: Relevance</option>
                                <option value="rating">Sort: Top Rated</option>
                                <option value="reviews">Sort: Most Reviewed</option>
                                <option value="price-asc">Sort: Price ↑</option>
                                <option value="price-desc">Sort: Price ↓</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Category pill filters ── */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${activeCategory === cat
                                ? "bg-foreground text-background border-foreground"
                                : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── Product Grid ── */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-muted-foreground">
                        <p className="text-lg">No mattresses found for &quot;{search}&quot;</p>
                        <button onClick={() => { setSearch(""); setActiveCategory("All") }} className="mt-4 text-primary underline text-sm">Clear filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
                        {filtered.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/product/${product.slug}`}
                                className="group block rounded-2xl border border-border/50 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Badge */}
                                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${product.badgeColor}`}>
                                        {product.badge}
                                    </span>
                                    {/* Quick action buttons */}
                                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                toggleFavorite(product)
                                            }}
                                            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                        >
                                            <Heart className={`w-4 h-4 ${isFavorite(product.slug) ? "fill-red-500 text-red-500" : ""}`} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                addToCart({
                                                    slug: product.slug,
                                                    name: product.name,
                                                    image: product.image,
                                                    price: product.priceFrom,
                                                    quantity: 1,
                                                })
                                            }}
                                            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {/* Category tag */}
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        {product.category}
                                    </span>
                                    <h3 className="font-semibold text-foreground text-lg mt-1 mb-2 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>

                                    {/* Materials */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {product.materials.map((m) => (
                                            <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60">
                                                {MATERIAL_LABELS[m] ?? m}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1.5 mb-4">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? "fill-current" : "text-muted-foreground/30"}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground font-medium">{product.rating} ({product.reviewCount})</span>
                                    </div>

                                    {/* Price + CTA */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-muted-foreground">Starting from</span>
                                            <p className="text-lg font-bold text-foreground">{formatPrice(product.priceFrom)}</p>
                                        </div>
                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                                            View
                                            <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    )
}
