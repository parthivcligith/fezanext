"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useRef, useEffect, useCallback } from "react";

export interface Gallery4Item {
    id: string;
    title: string;
    description: string;
    href: string;
    image: string;
    price?: number;
}

export interface Gallery4Props {
    title?: string;
    description?: string;
    items: Gallery4Item[];
}

const data = [
    {
        id: "shadcn-ui",
        title: "shadcn/ui: Building a Modern Component Library",
        description:
            "Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization.",
        href: "https://ui.shadcn.com",
        image:
            "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
];

import { useStore } from "@/lib/store";

const Gallery4 = ({
    title = "Case Studies",
    description = "Discover how leading companies and developers are leveraging modern web technologies.",
    items = data,
}: Gallery4Props) => {
    const { addToCart, toggleFavorite, isFavorite } = useStore();
    // 5 sets so we always have content visible when scrolling backwards
    const repeatedItems = [...items, ...items, ...items, ...items, ...items];

    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(0);          // current translateX in px
    const velRef = useRef(0);          // current velocity (px/frame)
    const rafRef = useRef<number>(0);
    const mouseXRef = useRef<number | null>(null); // null = not hovering
    const isDraggingRef = useRef(false);
    const dragStartXRef = useRef(0);
    const dragStartPosRef = useRef(0);

    // Base auto-scroll speed (px/frame). Negative = left.
    const BASE_SPEED = -0.6;

    const getTrackWidth = useCallback(() => {
        if (!trackRef.current) return 0;
        // The total scrollable width of one "cycle" = full track / number of repetitions
        return trackRef.current.scrollWidth / 5;
    }, []);

    const clampPos = useCallback((pos: number) => {
        const cycleW = getTrackWidth();
        if (cycleW === 0) return pos;
        // Keep pos within [-cycleW, 0] for seamless loop
        return ((pos % cycleW) - cycleW) % cycleW;
    }, [getTrackWidth]);

    const animate = useCallback(() => {
        if (!trackRef.current) {
            rafRef.current = requestAnimationFrame(animate);
            return;
        }

        const cycleW = getTrackWidth();

        if (isDraggingRef.current) {
            // During drag, position is set directly — just render
        } else if (mouseXRef.current !== null && containerRef.current) {
            // Mouse controlling the scroll
            const rect = containerRef.current.getBoundingClientRect();
            const rel = (mouseXRef.current - rect.left) / rect.width; // 0..1
            // Dead zone in the centre (0.45–0.55) = stop
            // Left half (0..0.45) = scroll left (negative), speed increases toward edge
            // Right half (0.55..1) = scroll right (positive), speed increases toward edge
            let target = 0;
            if (rel < 0.45) {
                target = BASE_SPEED * (1 + (0.45 - rel) / 0.45 * 5);  // up to 6× base speed leftward
            } else if (rel > 0.55) {
                target = Math.abs(BASE_SPEED) * ((rel - 0.55) / 0.45 * 6); // rightward
            }
            // Smoothly interpolate velocity
            velRef.current += (target - velRef.current) * 0.12;
            posRef.current += velRef.current;
        } else {
            // Auto-scroll: blend back to base speed smoothly
            velRef.current += (BASE_SPEED - velRef.current) * 0.05;
            posRef.current += velRef.current;
        }

        // Seamless loop
        if (cycleW > 0) {
            posRef.current = ((posRef.current % cycleW) + cycleW) % cycleW;
            // Normalise so we always see content
            if (posRef.current > 0) posRef.current -= cycleW;
        }

        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        rafRef.current = requestAnimationFrame(animate);
    }, [getTrackWidth, BASE_SPEED]);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [animate]);

    // Mouse enter/leave
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDraggingRef.current) return;
        mouseXRef.current = e.clientX;
    };
    const handleMouseLeave = () => {
        mouseXRef.current = null;
    };

    // Drag-to-scroll (mouse down)
    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        dragStartXRef.current = e.clientX;
        dragStartPosRef.current = posRef.current;
        mouseXRef.current = null;
        document.body.style.userSelect = "none";
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;
            const delta = e.clientX - dragStartXRef.current;
            posRef.current = dragStartPosRef.current + delta;
        };
        const onMouseUp = () => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            document.body.style.userSelect = "";
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <section id="services" className="py-32">
            <div className="container mx-auto">
                <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
                            {title}
                        </h2>
                        <p className="max-w-lg text-muted-foreground">{description}</p>
                    </div>
                </div>
            </div>

            {/* Marquee track */}
            <div
                ref={containerRef}
                className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
            >
                <div
                    ref={trackRef}
                    className="flex gap-5 w-max will-change-transform"
                    style={{ transform: "translateX(0px)" }}
                >
                    {repeatedItems.map((item, index) => (
                        <Link
                            key={`${item.id}-${index}`}
                            href={item.href}
                            className="w-[320px] lg:w-[360px] flex-shrink-0 block group"
                            draggable={false}
                            onClick={(e) => {
                                // If the user was dragging, prevent navigation
                                if (Math.abs(posRef.current - dragStartPosRef.current) > 5) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <div className="relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    draggable={false}
                                    className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90" />

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                                    <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                                        {item.title}
                                    </div>
                                    <div className="mb-4 line-clamp-2 text-sm opacity-90 md:mb-6 lg:mb-4">
                                        {item.description}
                                    </div>

                                    {/* CTA row — visible on hover */}
                                    <div className="flex items-center gap-3 w-full translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 relative z-10">
                                        <span className="flex-1 bg-white text-black inline-flex items-center justify-center rounded-md text-sm font-semibold h-10 px-4 py-2 pointer-events-none">
                                            View Product →
                                        </span>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                addToCart({
                                                    slug: item.id,
                                                    name: item.title,
                                                    image: item.image,
                                                    price: item.price ?? 5590,
                                                    quantity: 1,
                                                });
                                            }}
                                            className="bg-white/20 hover:bg-white/30 text-white inline-flex items-center justify-center rounded-md h-10 w-10 p-0 transition-colors pointer-events-auto"
                                            title="Add to Cart"
                                        >
                                            <ShoppingCart className="h-4 w-4" />
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleFavorite({
                                                    slug: item.id,
                                                    name: item.title,
                                                    image: item.image,
                                                    priceFrom: item.price ?? 5590,
                                                    category: "Mattress"
                                                });
                                            }}
                                            className={`hover:bg-white/30 text-white inline-flex items-center justify-center rounded-md h-10 w-10 p-0 transition-colors pointer-events-auto ${isFavorite(item.id) ? 'bg-red-500/80 hover:bg-red-500' : 'bg-white/20'}`}
                                            title="Add to Favorites"
                                        >
                                            <Heart className={`h-4 w-4 ${isFavorite(item.id) ? 'fill-white' : ''}`} />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Hover ring */}
                                <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 group-hover:ring-white/30 transition-all duration-300 pointer-events-none" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Hint text */}
            <p className="text-center text-xs text-muted-foreground mt-6 select-none">
                ← Move mouse left or right to control scroll · Click any card to explore ·  Drag to browse →
            </p>
        </section>
    );
};

export { Gallery4 };
