"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Heart, X, Trash2, Plus, Minus, ChevronRight } from "lucide-react"
import { useStore } from "@/lib/store"
import Link from "next/link"
import Image from "next/image"

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price)
}

export function FloatingActions() {
    const { cart, favorites, removeFromCart, updateQuantity, toggleFavorite } = useStore()
    const [openDrawer, setOpenDrawer] = useState<"cart" | "favorites" | null>(null)

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
    const favCount = favorites.length

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    const toggleCart = () => setOpenDrawer(prev => prev === "cart" ? null : "cart")
    const toggleFavorites = () => setOpenDrawer(prev => prev === "favorites" ? null : "favorites")
    const closeDrawer = () => setOpenDrawer(null)

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {openDrawer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                        onClick={closeDrawer}
                    />
                )}
            </AnimatePresence>

            {/* Floating Buttons */}
            <div className="fixed top-24 right-5 z-50 flex flex-col gap-3">
                <button
                    onClick={toggleFavorites}
                    className="relative group bg-white border border-border/40 shadow-xl backdrop-blur-md p-3.5 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
                >
                    <Heart className="w-5 h-5" />
                    {favCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            {favCount}
                        </span>
                    )}
                </button>
                <button
                    onClick={toggleCart}
                    className="relative group bg-white border border-border/40 shadow-xl backdrop-blur-md p-3.5 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
                >
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Slide-out Drawer */}
            <AnimatePresence>
                {openDrawer && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col overflow-hidden"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border/40">
                            <h2 className="text-2xl font-bold uppercase tracking-tight text-foreground">
                                {openDrawer === "cart" ? "Your Cart" : "Favorites"}
                            </h2>
                            <button
                                onClick={closeDrawer}
                                className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Drawer Content - Cart */}
                        {openDrawer === "cart" && (
                            <>
                                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                                    {cart.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                                            <ShoppingCart className="w-12 h-12 opacity-20" />
                                            <p>Your cart is empty.</p>
                                        </div>
                                    ) : (
                                        cart.map(item => (
                                            <div key={item.cartItemId} className="flex gap-4 group">
                                                <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden relative shrink-0">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <div>
                                                            <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
                                                            {item.size && <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>}
                                                            {item.thickness && <p className="text-xs text-muted-foreground">Thickness: {item.thickness}"</p>}
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.cartItemId)}
                                                            className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center border border-border rounded-lg bg-background">
                                                            <button
                                                                onClick={() => updateQuantity(item.cartItemId, -1)}
                                                                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-l-lg transition-colors"
                                                            >
                                                                <Minus className="w-3.5 h-3.5" />
                                                            </button>
                                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.cartItemId, 1)}
                                                                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-r-lg transition-colors"
                                                            >
                                                                <Plus className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                        <span className="font-bold text-foreground">{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {cart.length > 0 && (
                                    <div className="p-6 border-t border-border/40 bg-zinc-50">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="text-xl font-bold text-foreground">{formatPrice(cartTotal)}</span>
                                        </div>
                                        <button className="w-full bg-[#1d6fbe] hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg active:scale-[0.98]">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Drawer Content - Favorites */}
                        {openDrawer === "favorites" && (
                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                                {favorites.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                                        <Heart className="w-12 h-12 opacity-20" />
                                        <p>No favorites yet.</p>
                                    </div>
                                ) : (
                                    favorites.map(item => (
                                        <Link
                                            href={`/product/${item.slug}`}
                                            onClick={closeDrawer}
                                            key={item.slug}
                                            className="flex gap-4 p-3 rounded-xl hover:bg-muted transition-colors group border border-transparent hover:border-border/50 relative"
                                        >
                                            <div className="w-20 h-20 rounded-lg bg-white shadow-sm overflow-hidden relative shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.category}</span>
                                                <h3 className="font-semibold text-foreground mt-0.5">{item.name}</h3>
                                                <span className="text-sm font-medium text-foreground mt-1">{formatPrice(item.priceFrom)}</span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    toggleFavorite(item)
                                                }}
                                                className="absolute top-1/2 right-4 -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </Link>
                                    ))
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
