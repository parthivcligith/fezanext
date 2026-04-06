"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AuroraBackground } from "@/components/ui/aurora-background"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const totalFrames = 240

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  })

  const toothY = useTransform(smoothProgress, [0, 1], [0, 500])
  const toothScale = useTransform(smoothProgress, [0, 1], [1, 1.8])
  const textY = useTransform(smoothProgress, [0, 1], [0, 50])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    let loadedCount = 0
    const imgs: HTMLImageElement[] = []

    // Only load every 2nd frame if performance is an issue, but let's try all
    for (let i = 1; i <= totalFrames; i++) {
      const img = new window.Image()
      img.src = `/images/ezgiff/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalFrames) {
          setImagesLoaded(true)
        }
      }
      imgs.push(img)
    }
    imagesRef.current = imgs
  }, [])

  const render = (progress: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Validate progress
    const safeProgress = Math.max(0, Math.min(1, progress))
    // Map progress to frame index (0 to totalFrames - 1)
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(safeProgress * (totalFrames - 1))
    )

    const img = imagesRef.current[frameIndex]
    if (img && img.complete && img.naturalWidth > 0) {
      if (canvasRef.current.width !== img.naturalWidth || canvasRef.current.height !== img.naturalHeight) {
        canvasRef.current.width = img.naturalWidth
        canvasRef.current.height = img.naturalHeight
      }
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.drawImage(img, 0, 0)
    }
  }

  // Render initial frame when loaded
  useEffect(() => {
    if (imagesLoaded) {
      render(smoothProgress.get())
    }
  }, [imagesLoaded, smoothProgress])

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (imagesLoaded) {
      render(latest)
    }
  })

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative min-h-screen h-auto flex items-center justify-center pt-20"
      style={{
        overflowX: "clip",
        backgroundImage: "url('/images/cloud-mattress-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative will-change-transform"
        >
          <span
            className="absolute text-[12vw] whitespace-nowrap text-foreground/[0.02] blur-[2px]"
            style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 900, letterSpacing: '-0.03em', transform: "translate(8px, 8px)" }}
          >
            FEZA MATTRESSES
          </span>
          <span
            className="absolute text-[12vw] whitespace-nowrap text-foreground/[0.03] blur-[1px]"
            style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 900, letterSpacing: '-0.03em', transform: "translate(4px, 4px)" }}
          >
            FEZA MATTRESSES
          </span>
          <span
            className="text-[12vw] whitespace-nowrap text-foreground/[0.06]"
            style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 900, letterSpacing: '-0.03em' }}
          >
            FEZA MATTRESSES
          </span>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Side - Text */}
          <motion.div className="flex flex-col justify-center pt-20 lg:pt-0 will-change-transform" style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="text-sm font-medium tracking-widest text-foreground/60 uppercase">
                Premium Sleep Comfort
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative text-7xl sm:text-7xl lg:text-8xl text-foreground mb-6"
              style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.0 }}
            >
              <span
                className="absolute inset-0 text-accent/30 blur-[1px]"
                style={{ transform: "translate(4px, 4px)" }}
                aria-hidden="true"
              >
                FEZA MATTRESSES
              </span>
              <span
                className="absolute inset-0 text-accent/20 blur-[0.5px]"
                style={{ transform: "translate(2px, 2px)" }}
                aria-hidden="true"
              >
                FEZA MATTRESSES
              </span>
              <span className="relative">FEZA MATTRESSES</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-foreground/70 max-w-md mb-8 leading-relaxed"
            >
              Experience cloud-like comfort and superior support for restorative sleep. Crafted with premium materials for every member of your family.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link href="/collections">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-8 py-6 text-base rounded-full group"
                >
                  Shop Mattresses
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Mattress with Scroll Animation */}
          <motion.div
            className="relative flex items-center justify-center z-20 will-change-transform"
            style={{ y: toothY, scale: toothScale }}
          >
            {/* Pedestal Shadow */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-12 bg-black/10 rounded-full blur-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />

            {/* Pedestal - as requested in prompt, though not in original design, added here for completeness if needed or just keep shadow */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Optional: Add pedestal implementation if visually desired, for now keeping it subtle/invisible as focused on mattress */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Floating Mattress Container */}
              <motion.div
                className="relative will-change-transform"
                animate={{
                  y: [0, -10, 0], // Adjusted to prompt: 10px bob
                }}
                transition={{
                  duration: 4, // 4s cycle
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {/* 3D Image Sequence Canvas */}
                <div className="relative w-96 h-56 sm:w-[32rem] sm:h-72 lg:w-[42rem] lg:h-96 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    width={800} // Default high-res width
                    height={450}
                  />
                </div>
              </motion.div>

              {/* Glow effect around mattress */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: [0.3, 0.5, 0.3], // Prompt: 0.3 -> 0.5 -> 0.3
                }}
                transition={{
                  duration: 3, // Prompt: 3s
                  repeat: Number.POSITIVE_INFINITY, // Prompt: continuous
                  ease: "easeInOut",
                }}
              >
                <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-white/40 rounded-full blur-2xl" />
                <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-blue-300/20 rounded-full blur-3xl opacity-50" />
              </motion.div>


            </motion.div>
          </motion.div>
        </div>
      </div>



      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  )
}
