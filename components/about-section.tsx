"use client"

import { motion } from "framer-motion"

export function AboutSection() {
    return (
        <section
            id="about"
            className="relative py-24 bg-background overflow-hidden"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium tracking-wide">
                            WHO WE ARE
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                            Redefining Sleep Excellence
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Welcome to Feza Mattresses, where your comfort is our priority. Founded with a passion for quality sleep, we are more than just a mattress retailer — we are your partner in achieving restful, rejuvenating sleep every night.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Our philosophy is built on the belief that quality sleep should be accessible, luxurious, and empowering. With a curated collection of premium mattresses and a team dedicated to understanding your sleep needs, we deliver comfort solutions tailored to your unique preferences. From memory foam to orthopedic support, we are committed to transforming how you sleep and wake up refreshed.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 gap-6"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</h3>
                            <p className="text-base font-medium text-muted-foreground">Years in Sleep Science</p>
                        </div>
                        <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">50k+</h3>
                            <p className="text-base font-medium text-muted-foreground">Happy Customers</p>
                        </div>
                        <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</h3>
                            <p className="text-base font-medium text-muted-foreground">Premium Materials</p>
                        </div>
                        <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">4.8</h3>
                            <p className="text-base font-medium text-muted-foreground">Customer Rating</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
