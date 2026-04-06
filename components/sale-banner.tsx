"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"



export function SaleBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1])

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-[#e8ecef] via-[#f0f3f5] to-[#e8ecef]"
    >
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 0.06, x: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <span className="text-[12rem] sm:text-[18rem] lg:text-[22rem] font-extrabold text-foreground tracking-tighter">
          SALE
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight uppercase tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Premium
              <br />
              Collections
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover our exclusive premium mattress collections designed for ultimate comfort and support. Each mattress is handcrafted with the finest materials, featuring advanced technology for temperature regulation, spinal support, and durability. Experience luxury sleep at an exceptional value.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link href="/collections">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 font-medium px-6 py-5 text-sm rounded-full group"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Implant Image with Features */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Features removed as requested */}

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div style={{ y: parallaxY, scale }}>
                {/* Shadow beneath implant */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/15 rounded-full blur-xl" />

                <Image
                  src="/images/heaven.png"
                  alt="Premium Mattress Collection"
                  width={600}
                  height={900}
                  className="relative z-10 object-contain drop-shadow-2xl rounded-2xl"
                  style={{
                    maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)"
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute -top-12 -right-4 lg:-top-24 lg:-right-4 z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="relative"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                {/* Badge */}
                <div className="w-32 h-32 sm:w-56 sm:h-56 rounded-full bg-background/90 backdrop-blur-md border border-border/30 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <span className="block text-xs sm:text-sm font-medium text-foreground/70">Save</span>
                    <span className="block text-3xl sm:text-5xl font-bold text-primary">20%</span>
                    <span className="block text-xs sm:text-sm font-medium text-foreground/70">This Month</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
