"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "Products", href: "/collections" },
  { name: "Collections", href: "/#services" },
  { name: "Testimonials", href: "/#stories" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full max-w-5xl border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl
            before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-white/5 before:pointer-events-none
            relative overflow-hidden ${isOpen ? "rounded-3xl before:rounded-3xl" : "rounded-full before:rounded-full"}`}
        >
          <div className={`absolute inset-0 ring-1 ring-inset ring-white/40 pointer-events-none ${isOpen ? "rounded-3xl" : "rounded-full"}`} />

          <div className="relative px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.a
                href="/"
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <img src="/images/feza-logo.png" alt="Feza Mattresses" className="h-10 w-auto" />
              </motion.a>

              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="hidden md:block"
              >
                <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-5 py-2 h-9 text-sm rounded-full">
                  Shop Now
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pb-4"
              >
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full mt-2">
                    Shop Now
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.nav>
      </div>
    </>
  )
}
