"use client"

import Image from "next/image"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter, Send, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <a href="/">
                  <Image
                    src="/images/feza-logo.png"
                    alt="Feza Mattresses"
                    width={150}
                    height={50}
                    className="bg-black/90 p-2 rounded-md"
                  />
                </a>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Experience cloud-like comfort and superior support with Feza Mattresses. Quality sleep is our passion.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-primary transition-colors block">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors block">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/#doctors" className="text-muted-foreground hover:text-primary transition-colors block">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors block">
                    Customer Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors block">
                    Contact Us
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                  <a
                    href="https://maps.app.goo.gl/8oFZwEoDPw4K4rTr9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Mannam - Thathappily Road, North Paravur,<br />Mannam, Kerala 683520
                  </a>
                </li>
                <li className="flex items-center space-x-3 text-muted-foreground">
                  <Phone className="h-5 w-5 shrink-0" />
                  <a href="tel:+919605600614" className="hover:text-primary transition-colors">096056 00614</a>
                </li>
                <li className="flex items-center space-x-3 text-muted-foreground">
                  <Mail className="h-5 w-5 shrink-0" />
                  <a href="mailto:fezamattresses@gmail.com" className="hover:text-primary transition-colors">fezamattresses@gmail.com</a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-semibold text-lg mb-6">Newsletter</h4>
              <p className="text-muted-foreground mb-4">
                Subscribe to get sleep tips, new products, and exclusive offers.
              </p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background"
                />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 Feza Mattresses. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
