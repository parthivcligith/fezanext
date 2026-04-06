import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SaleBanner } from "@/components/sale-banner"
import { ServicesSection } from "@/components/services-section"
import { Footer } from "@/components/footer"

import { VelocityScroll } from "@/components/ui/scroll-based-velocity"

import { ZoomParallax } from "@/components/ui/zoom-parallax"

import { Gallery4 } from "@/components/ui/gallery4";
import { Contact2 } from "@/components/ui/contact-2"

const parallaxImages = [
  {
    src: "/images/comfy6.png",
    alt: "Premium mattress collection",
    title: "FEZA MATTRESSES",
    subtitle: "Sleep in luxury",
  },
  {
    src: "https://images.unsplash.com/photo-1540932239986-310128078ceb?q=80&w=1280&auto=format&fit=crop",
    alt: "Comfortable bed setup",
  },
  {
    src: "https://images.unsplash.com/photo-1577259873294-b60c3a15061f?q=80&w=1280&auto=format&fit=crop",
    alt: "Luxury pillow and bedding",
  },
  {
    src: "https://images.unsplash.com/photo-1540932239986-310128078ceb?q=80&w=1280&auto=format&fit=crop",
    alt: "Peaceful sleep environment",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1280&auto=format&fit=crop",
    alt: "Modern bedroom design",
  },
  {
    src: "https://images.unsplash.com/photo-1505692952047-643ca63fc455?q=80&w=1280&auto=format&fit=crop",
    alt: "Quality sleep accessories",
  },
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1280&auto=format&fit=crop",
    alt: "Premium mattress comfort",
  },
];

const mattressProducts = [
  {
    id: "comfy-ortho-mattress",
    title: "Comfy Ortho Mattress",
    description: "Specially designed with firm support for spinal alignment and relief from back and neck pain. Features high-density bonded foam for natural spinal shape.",
    href: "/product/comfy-ortho-mattress",
    image: "/images/comfy3.png",
    price: 5590,
  },
  {
    id: "orthopedic-mattress",
    title: "Orthopedic Mattress",
    description: "Engineered with advanced multi-layer bonded foam for superior back support across all sleeping positions. Therapeutic-grade firmness for pain-free mornings.",
    href: "/product/orthopedic-mattress",
    image: "/images/comfy5.png",
    price: 5590,
  },
  {
    id: "semi-ortho-mattress",
    title: "Semi Ortho Mattress",
    description: "The perfect balance between plush comfort and orthopedic support. Medium-firm profile that cradles your body while maintaining optimal spinal alignment.",
    href: "/product/semi-ortho-mattress",
    image: "/images/comfy6.png",
    price: 5590,
  },
  {
    id: "ortho-care-mattress",
    title: "Ortho Care Mattress",
    description: "Our most advanced orthopedic solution with zonal support for lumbar, shoulder and hip regions. Premium anti-microbial fabric cover for ultimate care.",
    href: "/product/ortho-care-mattress",
    image: "/images/comfy7.png",
    price: 5590,
  },
  {
    id: "pure-rest-mattress",
    title: "Pure Rest Mattress",
    description: "A premium triple-layer system: natural Latex for pressure relief, PU Comfort Foam for ease, and a firm Ortho Foam base for spinal alignment. (Ltx + PU + Rb)",
    href: "/product/pure-rest-mattress",
    image: "/images/comfy3.png",
    price: 6890,
  },
  {
    id: "pure-rest-o-mattress",
    title: "Pure Rest O Mattress",
    description: "Natural Latex comfort meets firm Ortho Foam support in this dual-layer powerhouse — ideal for those who want maximum back support with a natural feel. (Ltx + Rb)",
    href: "/product/pure-rest-o-mattress",
    image: "/images/comfy4.jpeg",
    price: 6200,
  },
  {
    id: "prime-spring-mattress",
    title: "Prime Spring Mattress",
    description: "Individually wrapped Pocket Springs with Memory Foam for a hotel-grade hybrid experience — zero motion transfer and personalized body-conform comfort. (Mmry + Pkt)",
    href: "/product/prime-spring-mattress",
    image: "/images/comfy5.png",
    price: 8200,
  },
  {
    id: "polarcloud-mattress",
    title: "PolarCloud Mattress",
    description: "Three progressive layers — Memory Foam, PU Comfort Foam, and Ortho Foam — for sleepers who want total comfort and total support in one mattress. (Mmry + PU + Rb)",
    href: "/product/polarcloud-mattress",
    image: "/images/comfy6.png",
    price: 7200,
  },
  {
    id: "polarcloud-o-mattress",
    title: "PolarCloud O Mattress",
    description: "The orthopedic variant of PolarCloud with an enhanced high-density Ortho Foam base — cloud-like Memory Foam comfort with clinical-level spinal support. (Mmry + PU + Rb)",
    href: "/product/polarcloud-o-mattress",
    image: "/images/comfy7.png",
    price: 7800,
  },
];

import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="py-10 bg-background overflow-hidden">
        <VelocityScroll
          text="FEZA MATTRESSES PREMIUM SLEEP COMFORT"
          default_velocity={1}
          className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground/10 drop-shadow-sm md:text-7xl md:leading-[5rem]"
        />
      </div>
      <AboutSection />

      <Gallery4
        title="Our Mattress Collections"
        description="Explore our premium collection of mattresses designed for every sleep preference and budget."
        items={mattressProducts}
      />
      <SaleBanner />
      <ZoomParallax images={parallaxImages} />
      <Contact2
        title="Get in Touch"
        description="Have questions about our mattresses? Visit our showroom or reach out — we'd love to help you find your perfect sleep solution."
        phone="096056 00614"
        email="fezamattresses@gmail.com"
        web={{ label: "fezamattresses.com", url: "#" }}
      />
      <Footer />
    </main>
  )
}
