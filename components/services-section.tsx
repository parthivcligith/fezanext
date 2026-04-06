"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Memory Foam Mattress",
    description: "Pressure-relieving memory foam technology that molds to your body, providing personalized comfort and support.",
    image: "/mattress-memory-foam.jpg",
  },
  {
    title: "Orthopedic Support",
    description: "Specially designed with firm support for spinal alignment and relief from back and neck pain.",
    image: "/mattress-orthopedic.jpg",
  },
  {
    title: "Gel-Infused Cooling",
    description: "Advanced cooling gel technology keeps you cool throughout the night for uninterrupted sleep.",
    image: "/mattress-cooling-gel.jpg",
  },
  {
    title: "Natural Latex",
    description: "100% natural latex construction for eco-friendly, durable, and hypoallergenic comfort.",
    image: "/mattress-latex.jpg",
  },
  {
    title: "Hybrid Comfort",
    description: "Perfect blend of springs and foam for the ultimate balance of support and softness.",
    image: "/mattress-hybrid.jpg",
  },
  {
    title: "Premium Pillow-Top",
    description: "Luxurious quilted surface with extra cushioning for cloud-like comfort and elegance.",
    image: "/mattress-pillow-top.jpg",
  },
  {
    title: "Adjustable Air Beds",
    description: "Customizable firmness levels for couples with different comfort preferences.",
    image: "/mattress-adjustable.jpg",
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="services" className="py-24 bg-secondary/30">
      <div className="w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            Our Mattress Collections
          </h2>
        </motion.div>

        {/* Services Horizontal Scroll */}
        <div className="overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          <div className="flex gap-6 px-4 sm:px-6 lg:px-8 min-w-max">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 w-[300px] sm:w-[350px] flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">{service.description}</p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-semibold text-foreground hover:text-foreground/80 group/btn"
                  >
                    View Product
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
