"use client"

import { motion, AnimatePresence } from "framer-motion"

// ── Curtain reveal + page fade-up transition ──────────────────────────────────
// template.tsx re-mounts on every route change in the App Router,
// making it the correct place for per-page enter/exit animations.

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* ── Front curtain: brand black ── */}
            <motion.div
                className="fixed inset-0 z-[200] pointer-events-none origin-top"
                style={{ backgroundColor: "#000000" }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                    duration: 0.65,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.05,
                }}
            />

            {/* ── Back curtain: brand red ── */}
            <motion.div
                className="fixed inset-0 z-[199] pointer-events-none origin-top"
                style={{ backgroundColor: "#d32f2f" }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                    duration: 0.65,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.0,
                }}
            />

            {/* ── Page content fades up as curtains lift ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.55,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.45,
                }}
            >
                {children}
            </motion.div>
        </>
    )
}
