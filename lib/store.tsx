"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
    cartItemId: string; // unique ID for specific variation
    slug: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size?: string;
    thickness?: number;
    top?: string | null;
}

export type FavoriteItem = {
    slug: string;
    name: string;
    image: string;
    priceFrom: number;
    category: string;
}

type StoreContextType = {
    cart: CartItem[];
    favorites: FavoriteItem[];
    addToCart: (item: Omit<CartItem, "cartItemId">) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, delta: number) => void;
    toggleFavorite: (product: FavoriteItem) => void;
    isFavorite: (slug: string) => boolean;
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [favorites, setFavorites] = useState<FavoriteItem[]>([])
    const [mounted, setMounted] = useState(false)

    // Load from local storage
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem("feza_cart")
            const storedFavs = localStorage.getItem("feza_favs")
            if (storedCart) setCart(JSON.parse(storedCart))
            if (storedFavs) setFavorites(JSON.parse(storedFavs))
        } catch (e) {
            console.error("Failed to load store", e)
        }
        setMounted(true)
    }, [])

    // Save strictly on change
    useEffect(() => {
        if (!mounted) return
        localStorage.setItem("feza_cart", JSON.stringify(cart))
        localStorage.setItem("feza_favs", JSON.stringify(favorites))
    }, [cart, favorites, mounted])

    const addToCart = (item: Omit<CartItem, "cartItemId">) => {
        setCart(prev => {
            const cartItemId = `${item.slug}-${item.size || 'default'}-${item.thickness || 'unspecified'}-${item.top || 'standard'}`
            const existing = prev.find(p => p.cartItemId === cartItemId)
            if (existing) {
                return prev.map(p => p.cartItemId === cartItemId ? { ...p, quantity: p.quantity + item.quantity } : p)
            }
            return [...prev, { ...item, cartItemId }]
        })
    }

    const removeFromCart = (cartItemId: string) => {
        setCart(prev => prev.filter(p => p.cartItemId !== cartItemId))
    }

    const updateQuantity = (cartItemId: string, delta: number) => {
        setCart(prev => prev.map(p => {
            if (p.cartItemId === cartItemId) {
                const newQ = Math.max(1, p.quantity + delta)
                return { ...p, quantity: newQ }
            }
            return p
        }))
    }

    const toggleFavorite = (product: FavoriteItem) => {
        setFavorites(prev => {
            if (prev.some(p => p.slug === product.slug)) {
                return prev.filter(p => p.slug !== product.slug)
            }
            return [...prev, product]
        })
    }

    const isFavorite = (slug: string) => mounted && favorites.some(p => p.slug === slug)

    return (
        <StoreContext.Provider value={{
            cart, favorites, addToCart, removeFromCart, updateQuantity, toggleFavorite, isFavorite
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export function useStore() {
    const ctx = useContext(StoreContext)
    if (!ctx) throw new Error("useStore must be used within StoreProvider")
    return ctx
}
