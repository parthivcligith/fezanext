"use client"

import { useState, use } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Dialog as ZoomDialog,
    DialogContent as ZoomDialogContent,
    DialogTrigger as ZoomDialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Heart, Minus, Plus, Share2, Star, Truck, ShieldCheck, CreditCard, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProductBySlug } from "@/lib/products"
import { useStore } from "@/lib/store"

const IMAGES = [
    "/images/comfy3.png",
    "/images/comfy4.jpeg",
    "/images/comfy5.png",
    "/images/comfy6.png",
    "/images/comfy7.png"
]

const PRICE_LIST = [
    { id: 1, size: { length: 72, width: 36, thickness: 4 }, price: 8600 },
    { id: 2, size: { length: 72, width: 36, thickness: 5 }, price: 9600 },
    { id: 3, size: { length: 72, width: 36, thickness: 6 }, price: 10700 },
    { id: 4, size: { length: 72, width: 36, thickness: 7 }, price: 12100 },
    { id: 5, size: { length: 72, width: 36, thickness: 8 }, price: 13500 },
    { id: 6, size: { length: 72, width: 36, thickness: 9 }, price: 14600 },
    { id: 7, size: { length: 72, width: 36, thickness: 10 }, price: 15600 },
    { id: 8, size: { length: 72, width: 48, thickness: 4 }, price: 10600 },
    { id: 9, size: { length: 72, width: 48, thickness: 5 }, price: 12000 },
    { id: 10, size: { length: 72, width: 48, thickness: 6 }, price: 13400 },
    { id: 11, size: { length: 72, width: 48, thickness: 7 }, price: 15200 },
    { id: 12, size: { length: 72, width: 48, thickness: 8 }, price: 16900 },
    { id: 13, size: { length: 72, width: 48, thickness: 9 }, price: 18300 },
    { id: 14, size: { length: 72, width: 48, thickness: 10 }, price: 19600 },
    { id: 15, size: { length: 72, width: 60, thickness: 4 }, price: 12700 },
    { id: 16, size: { length: 72, width: 60, thickness: 5 }, price: 14400 },
    { id: 17, size: { length: 72, width: 60, thickness: 6 }, price: 16100 },
    { id: 18, size: { length: 72, width: 60, thickness: 7 }, price: 18200 },
    { id: 19, size: { length: 72, width: 60, thickness: 8 }, price: 20300 },
    { id: 20, size: { length: 72, width: 60, thickness: 9 }, price: 22100 },
    { id: 21, size: { length: 72, width: 60, thickness: 10 }, price: 23700 },
    { id: 22, size: { length: 72, width: 72, thickness: 4 }, price: 14700 },
    { id: 23, size: { length: 72, width: 72, thickness: 5 }, price: 16700 },
    { id: 24, size: { length: 72, width: 72, thickness: 6 }, price: 18800 },
    { id: 25, size: { length: 72, width: 72, thickness: 7 }, price: 21200 },
    { id: 26, size: { length: 72, width: 72, thickness: 8 }, price: 23700 },
    { id: 27, size: { length: 72, width: 72, thickness: 9 }, price: 25800 },
    { id: 28, size: { length: 72, width: 72, thickness: 10 }, price: 27700 },
    { id: 29, size: { length: 75, width: 36, thickness: 4 }, price: 8800 },
    { id: 30, size: { length: 75, width: 36, thickness: 5 }, price: 9800 },
    { id: 31, size: { length: 75, width: 36, thickness: 6 }, price: 10900 },
    { id: 32, size: { length: 75, width: 36, thickness: 7 }, price: 12400 },
    { id: 33, size: { length: 75, width: 36, thickness: 8 }, price: 13900 },
    { id: 34, size: { length: 75, width: 36, thickness: 9 }, price: 15000 },
    { id: 35, size: { length: 75, width: 36, thickness: 10 }, price: 16000 },
    { id: 36, size: { length: 75, width: 48, thickness: 4 }, price: 10800 },
    { id: 37, size: { length: 75, width: 48, thickness: 5 }, price: 12300 },
    { id: 38, size: { length: 75, width: 48, thickness: 6 }, price: 13700 },
    { id: 39, size: { length: 75, width: 48, thickness: 7 }, price: 15500 },
    { id: 40, size: { length: 75, width: 48, thickness: 8 }, price: 17400 },
    { id: 41, size: { length: 75, width: 48, thickness: 9 }, price: 18800 },
    { id: 42, size: { length: 75, width: 48, thickness: 10 }, price: 20200 },
    { id: 43, size: { length: 75, width: 60, thickness: 4 }, price: 12900 },
    { id: 44, size: { length: 75, width: 60, thickness: 5 }, price: 14700 },
    { id: 45, size: { length: 75, width: 60, thickness: 6 }, price: 16500 },
    { id: 46, size: { length: 75, width: 60, thickness: 7 }, price: 18700 },
    { id: 47, size: { length: 75, width: 60, thickness: 8 }, price: 20900 },
    { id: 48, size: { length: 75, width: 60, thickness: 9 }, price: 22700 },
    { id: 49, size: { length: 75, width: 60, thickness: 10 }, price: 24400 },
    { id: 50, size: { length: 75, width: 72, thickness: 4 }, price: 15000 },
    { id: 51, size: { length: 75, width: 72, thickness: 5 }, price: 17100 },
    { id: 52, size: { length: 75, width: 72, thickness: 6 }, price: 19300 },
    { id: 53, size: { length: 75, width: 72, thickness: 7 }, price: 21800 },
    { id: 54, size: { length: 75, width: 72, thickness: 8 }, price: 24300 },
    { id: 55, size: { length: 75, width: 72, thickness: 9 }, price: 26500 },
    { id: 56, size: { length: 75, width: 72, thickness: 10 }, price: 28600 },
    { id: 57, size: { length: 78, width: 72, thickness: 4 }, price: 15600 },
    { id: 58, size: { length: 78, width: 72, thickness: 5 }, price: 17800 },
    { id: 59, size: { length: 78, width: 72, thickness: 6 }, price: 20100 },
    { id: 60, size: { length: 78, width: 72, thickness: 7 }, price: 22700 },
    { id: 61, size: { length: 78, width: 72, thickness: 8 }, price: 25300 },
    { id: 62, size: { length: 78, width: 72, thickness: 9 }, price: 27600 },
    { id: 63, size: { length: 78, width: 72, thickness: 10 }, price: 30700 },
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const product = getProductBySlug(slug)

    const [mainImage, setMainImage] = useState(IMAGES[0])
    const [selectedSize, setSelectedSize] = useState("72 x 36")
    const [selectedThickness, setSelectedThickness] = useState(5)
    const [selectedCustomTop, setSelectedCustomTop] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)

    const { addToCart, toggleFavorite, isFavorite } = useStore()

    const CUSTOM_TOP_IMAGES: Record<string, string> = {
        "Pillow Top": "/images/comfy pillowtop.png",
        "Euro Top": "/images/euro top.png",
    }

    const COLOR_IMAGES: Record<string, string> = {
        "Off White": "/images/comfy3.png",
        "All Black": "/images/comfyblack.png",
        "Olive Green": "/images/comfyolivegreen.png",
        "Charcoal Grey": "/images/comfy grey.png",
    }

    const displayedImage = selectedColor
        ? COLOR_IMAGES[selectedColor]
        : selectedCustomTop
            ? CUSTOM_TOP_IMAGES[selectedCustomTop]
            : mainImage

    const handleCustomTopSelect = (top: string) => {
        setSelectedCustomTop(prev => prev === top ? null : top)
    }

    const handlePrevious = () => {
        const currentIndex = IMAGES.indexOf(mainImage)
        const nextIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length
        setMainImage(IMAGES[nextIndex])
    }

    const handleNext = () => {
        const currentIndex = IMAGES.indexOf(mainImage)
        const nextIndex = (currentIndex + 1) % IMAGES.length
        setMainImage(IMAGES[nextIndex])
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    }

    const calculatePrice = () => {
        const [length, width] = selectedSize.split(" x ").map(Number);
        const item = PRICE_LIST.find(p =>
            p.size.length === length &&
            p.size.width === width &&
            p.size.thickness === selectedThickness
        );

        if (!item) return null;

        const discount = 0.35;
        const finalPrice = Math.round(item.price * (1 - discount));

        return {
            mrp: item.price,
            final: finalPrice
        };
    }

    const priceData = calculatePrice();

    // Fallback data if slug is not found
    const productName = product?.name ?? "Orthopedic Mattress"
    const productBadge = product?.badge ?? "Bestseller"
    const productDescription = product?.description ?? "Specially designed with firm support for spinal alignment and relief from back and neck pain."
    const productDelivery = product?.deliveryInfo ?? "Free shipping on all orders over ₹5,000. We offer a 100-night trial period for all mattresses."
    const productRating = product?.rating ?? 4.8
    const productReviewCount = product?.reviewCount ?? 50
    const productReviews = product?.reviews ?? []

    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column - Images */}
                    <div className="space-y-6">
                        <div className="relative aspect-square bg-muted rounded-3xl overflow-hidden border border-border/10 shadow-sm">
                            <ZoomDialog>
                                <ZoomDialogTrigger asChild>
                                    <div className="relative w-full h-full cursor-zoom-in">
                                        <Image
                                            src={displayedImage}
                                            alt={productName}
                                            fill
                                            className="object-contain p-8 hover:scale-105 transition-transform duration-500"
                                            priority
                                        />
                                    </div>
                                </ZoomDialogTrigger>
                                <ZoomDialogContent className="max-w-[80vh] w-full p-0 border-none bg-transparent shadow-none">
                                    <DialogTitle className="sr-only">Product Image Zoom</DialogTitle>
                                    <div className="relative aspect-square w-full bg-white rounded-3xl overflow-hidden shadow-2xl group">
                                        <Image
                                            src={displayedImage}
                                            alt={`${productName} - Full View`}
                                            fill
                                            quality={100}
                                            className="object-contain p-8"
                                        />
                                        <button
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
                                            onClick={handlePrevious}
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
                                            onClick={handleNext}
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>
                                </ZoomDialogContent>
                            </ZoomDialog>
                            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                    {productBadge}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {IMAGES.map((src, i) => (
                                <div
                                    key={i}
                                    className={`relative aspect-square bg-muted rounded-xl overflow-hidden border cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all ${mainImage === src ? 'ring-2 ring-primary border-primary' : 'border-border/10'}`}
                                    onClick={() => setMainImage(src)}
                                >
                                    <Image
                                        src={src}
                                        alt={`View ${i + 1}`}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 whitespace-nowrap">
                                {productName}
                            </h1>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center text-yellow-400">
                                    <Star className="fill-current w-5 h-5" />
                                    <Star className="fill-current w-5 h-5" />
                                    <Star className="fill-current w-5 h-5" />
                                    <Star className="fill-current w-5 h-5" />
                                    <Star className="fill-current w-5 h-5 text-yellow-400/30" strokeWidth={0} />
                                    <span className="ml-2 text-foreground font-medium text-lg">{productRating}</span>
                                </div>
                                <span className="text-muted-foreground text-sm border-l pl-4 border-border">
                                    {productReviewCount} Reviews
                                </span>
                                <span className="text-green-600 text-sm font-medium ml-auto">
                                    In Stock
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-foreground">
                                {priceData ? (
                                    <>
                                        {formatPrice(priceData.final)}
                                        <span className="text-lg text-muted-foreground line-through ml-3 font-normal">
                                            {formatPrice(priceData.mrp)}
                                        </span>
                                        <span className="text-lg text-green-600 ml-3 font-medium">
                                            (35% OFF)
                                        </span>
                                    </>
                                ) : (
                                    "Price Unavailable"
                                )}
                            </div>
                        </div>

                        <Separator className="mb-8" />

                        {/* Selectors */}
                        <div className="space-y-8 mb-8">
                            {/* Size Selector */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-medium text-foreground">Select Size (Inches)</span>

                                    {/* Size Guide Modal */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="link" className="text-primary p-0 h-auto font-medium underline-offset-4">
                                                Size Guide
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Mattress Size Guide</DialogTitle>
                                                <DialogDescription>
                                                    Find the perfect fit for your bed frame.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="mt-4 space-y-6">
                                                <div>
                                                    <h4 className="font-medium mb-3">Conversion Table</h4>
                                                    <div className="rounded-md border">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Dimension in CMs</TableHead>
                                                                    <TableHead>Dimension in Inches</TableHead>
                                                                    <TableHead>Dimension in Feet</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {[
                                                                    { cm: 11, in: 4.5, ft: 0.38 },
                                                                    { cm: 13, in: 5, ft: 0.42 },
                                                                    { cm: 15, in: 6, ft: 0.5 },
                                                                    { cm: 18, in: 7, ft: 0.58 },
                                                                    { cm: 20, in: 8, ft: 0.66 },
                                                                    { cm: 23, in: 9, ft: 0.75 },
                                                                    { cm: 25, in: 10, ft: 0.83 },
                                                                    { cm: 31, in: 12, ft: 1 },
                                                                    { cm: 76, in: 30, ft: 2.5 },
                                                                    { cm: 91, in: 36, ft: 3 },
                                                                    { cm: 107, in: 42, ft: 3.5 },
                                                                    { cm: 122, in: 48, ft: 4 },
                                                                    { cm: 152, in: 60, ft: 5 },
                                                                    { cm: 168, in: 66, ft: 5.5 },
                                                                    { cm: 183, in: 72, ft: 6 },
                                                                    { cm: 191, in: 75, ft: 6.25 },
                                                                    { cm: 198, in: 78, ft: 6.5 },
                                                                    { cm: 213, in: 84, ft: 7 },
                                                                ].map((row, i) => (
                                                                    <TableRow key={i}>
                                                                        <TableCell>{row.cm}</TableCell>
                                                                        <TableCell>{row.in}</TableCell>
                                                                        <TableCell>{row.ft}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground text-center">
                                                    **1 Inch = 2.54CM | **1 Feet = 12 Inches
                                                </p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {[
                                        "72 x 36", "72 x 48", "72 x 60", "72 x 72",
                                        "75 x 36", "75 x 48", "75 x 60", "75 x 72",
                                        "78 x 72"
                                    ].map((size) => (
                                        <Button
                                            key={size}
                                            variant="outline"
                                            onClick={() => setSelectedSize(size)}
                                            className={`text-xs sm:text-sm h-12 min-w-[4rem] transition-colors hover:border-primary hover:text-primary ${selectedSize === size ? 'border-primary bg-primary/5 text-primary' : ''}`}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Thickness Selector */}
                            <div>
                                <span className="font-medium text-foreground mb-4 block">Select Thickness</span>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { in: 4, mm: 101 },
                                        { in: 5, mm: 127 },
                                        { in: 6, mm: 152 },
                                        { in: 7, mm: 178 },
                                        { in: 8, mm: 203 },
                                        { in: 9, mm: 229 },
                                        { in: 10, mm: 254 }
                                    ].map((t) => (
                                        <Button
                                            key={t.in}
                                            variant="outline"
                                            onClick={() => setSelectedThickness(t.in)}
                                            className={`h-12 px-3 transition-colors hover:border-primary hover:text-primary ${selectedThickness === t.in ? 'border-primary bg-primary/5 text-primary' : ''}`}
                                        >
                                            {t.in}" <span className="hidden sm:inline ml-1">({t.mm}mm)</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Tops Selector */}
                            <div>
                                <span className="font-medium text-foreground mb-4 block">Custom Tops:</span>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { name: "Euro Top", image: "/images/euro top.png" },
                                        { name: "Pillow Top", image: "/images/comfy pillowtop.png" }
                                    ].map((top) => (
                                        <button
                                            key={top.name}
                                            onClick={() => handleCustomTopSelect(top.name)}
                                            title={top.name}
                                            className={`group flex flex-col items-center gap-2 transition-all duration-200 cursor-pointer`}
                                        >
                                            <div
                                                className={`relative w-20 h-20 rounded-xl overflow-hidden shadow-sm transition-all duration-200 ${selectedCustomTop === top.name
                                                    ? "ring-2 ring-offset-2 ring-primary border-primary scale-110"
                                                    : "border border-border/40 hover:border-primary/50 hover:scale-105"
                                                    }`}
                                            >
                                                <Image
                                                    src={top.image}
                                                    alt={top.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {selectedCustomTop === top.name && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                        <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`text-xs font-medium transition-colors ${selectedCustomTop === top.name ? "text-primary" : "text-muted-foreground"}`}>
                                                {top.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {selectedCustomTop && (
                                    <p className="text-xs text-primary mt-2 font-medium">
                                        ✓ {selectedCustomTop} selected — preview shown in image gallery
                                    </p>
                                )}
                            </div>

                            {/* Colour Selector */}
                            <div>
                                <span className="font-medium text-foreground mb-4 block">Choose Colour:</span>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { name: "Off White", image: "/images/offwhite.png" },
                                        { name: "Charcoal Grey", image: "/images/charcolgrey.png" },
                                        { name: "Olive Green", image: "/images/olivegreen.png" },
                                        { name: "All Black", image: "/images/allblack.png" },
                                    ].map((colour) => (
                                        <button
                                            key={colour.name}
                                            onClick={() => setSelectedColor(prev => prev === colour.name ? null : colour.name)}
                                            title={colour.name}
                                            className={`group flex flex-col items-center gap-2 transition-all duration-200 cursor-pointer`}
                                        >
                                            <div
                                                className={`relative w-14 h-14 rounded-full overflow-hidden border-3 transition-all duration-200 shadow-sm ${selectedColor === colour.name
                                                    ? "ring-2 ring-offset-2 ring-primary border-primary scale-110"
                                                    : "border-border/40 hover:border-primary/50 hover:scale-105"
                                                    }`}
                                                style={{ borderWidth: "2px" }}
                                            >
                                                <Image
                                                    src={colour.image}
                                                    alt={colour.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {selectedColor === colour.name && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                        <svg className="w-5 h-5 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`text-xs font-medium transition-colors ${selectedColor === colour.name ? "text-primary" : "text-muted-foreground"
                                                }`}>
                                                {colour.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {selectedColor && (
                                    <p className="text-xs text-primary mt-2 font-medium">
                                        ✓ {selectedColor} selected
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border rounded-md h-12 w-32 shrink-0">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-10 h-full flex items-center justify-center hover:bg-muted text-muted-foreground"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <div className="flex-1 text-center font-medium">{quantity}</div>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-10 h-full flex items-center justify-center hover:bg-muted text-muted-foreground"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <Button
                                onClick={() => addToCart({
                                    slug,
                                    name: productName,
                                    image: displayedImage,
                                    price: priceData?.final ?? 0,
                                    quantity,
                                    size: selectedSize,
                                    thickness: selectedThickness
                                })}
                                className="h-12 flex-1 text-base font-semibold"
                                size="lg"
                            >
                                Add to Cart
                            </Button>
                            <Button className="h-12 flex-1 bg-black hover:bg-black/90 text-white text-base font-semibold" size="lg">
                                Buy Now
                            </Button>
                            <Button
                                onClick={() => toggleFavorite({
                                    slug,
                                    name: productName,
                                    image: displayedImage,
                                    priceFrom: priceData?.final ?? 0,
                                    category: "Mattress"
                                })}
                                variant="outline"
                                size="icon"
                                className={`h-12 w-12 shrink-0 ${isFavorite(slug) ? 'bg-red-50 border-red-200' : ''}`}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite(slug) ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                        </div>

                        {/* Info Accordion */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm text-primary">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">Free Delivery</div>
                                        <div className="text-xs text-muted-foreground">2-4 working days</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm text-primary">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">Warranty</div>
                                        <div className="text-xs text-muted-foreground">7 years assured</div>
                                    </div>
                                </div>
                            </div>

                            <Accordion type="single" collapsible className="w-full" defaultValue="description">
                                <AccordionItem value="description">
                                    <AccordionTrigger>Description</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed">
                                        {productDescription}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="delivery">
                                    <AccordionTrigger>Delivery & Returns</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {productDelivery}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mt-24 border-t pt-16">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <h3 className="text-2xl font-bold mb-6">Rating & Reviews</h3>
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-6xl font-bold">{productRating}</span>
                                <div className="flex flex-col">
                                    <div className="flex text-yellow-400 mb-1">
                                        <Star className="fill-current w-4 h-4" />
                                        <Star className="fill-current w-4 h-4" />
                                        <Star className="fill-current w-4 h-4" />
                                        <Star className="fill-current w-4 h-4" />
                                        <Star className="fill-current w-4 h-4 text-yellow-400/30" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Based on {productReviewCount} reviews</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center gap-4 text-sm">
                                        <span className="w-3">{rating}</span>
                                        <Star className="w-4 h-4 text-muted-foreground" />
                                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 rounded-full"
                                                style={{ width: rating === 5 ? '70%' : rating === 4 ? '20%' : '5%' }}
                                            />
                                        </div>
                                        <span className="w-8 text-right text-muted-foreground">
                                            {rating === 5 ? '70%' : rating === 4 ? '20%' : '5%'}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border rounded-xl p-6 bg-muted/30">
                                <h4 className="font-semibold mb-2">Review this product</h4>
                                <p className="text-sm text-muted-foreground mb-4">Share your thoughts with other customers</p>
                                <Button variant="outline" className="w-full">
                                    Write a customer review
                                </Button>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-8">
                            <h3 className="text-xl font-semibold">Customer Reviews ({productReviews.length})</h3>

                            {productReviews.map((review, i) => (
                                <div key={i} className="border-b pb-8 last:border-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                {review.name.charAt(0)}
                                            </div>
                                            <span className="font-medium">{review.name}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{review.date}</span>
                                    </div>
                                    <div className="flex text-yellow-400 mb-2">
                                        {[...Array(5)].map((_, j) => (
                                            <Star
                                                key={j}
                                                className={`w-3 h-3 ${j < review.rating ? 'fill-current' : 'text-muted-foreground'}`}
                                            />
                                        ))}
                                    </div>
                                    <h5 className="font-medium mb-1">{review.title}</h5>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
