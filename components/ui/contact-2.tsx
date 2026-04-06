import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Contact2Props {
    title?: string;
    description?: string;
    phone?: string;
    email?: string;
    web?: { label: string; url: string };
}

export const Contact2 = ({
    title = "Contact Us",
    description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
    phone = "+971 4 321 9876",
    email = "info@shanusdental.ae",
    web = { label: "shanusdental.ae", url: "https://shanusdental.ae" },
}: Contact2Props) => {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply animate-blob" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000" />
            </div>

            <div className="w-full px-4 md:px-8 relative z-10">
                <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4">
                    {/* Column 1: Contact Info */}
                    <div className="flex flex-col justify-between gap-10">
                        <div className="text-center lg:text-left">
                            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl text-foreground">
                                {title}
                            </h1>
                            <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
                        </div>
                        <div className="w-full bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-sm">
                            <h3 className="mb-4 text-xl font-semibold text-foreground">
                                Contact Details
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-muted-foreground text-sm">
                                    <span className="font-semibold text-foreground min-w-[60px]">Address:</span>
                                    <a
                                        href="https://maps.app.goo.gl/8oFZwEoDPw4K4rTr9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
                                    >
                                        Mannam - Thathappily Road, North Paravur, Mannam, Kerala 683520
                                    </a>
                                </li>
                                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                                    <span className="font-semibold text-foreground min-w-[60px]">Phone:</span>
                                    <a href="tel:+919605600614" className="hover:text-primary transition-colors">{phone}</a>
                                </li>
                                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                                    <span className="font-semibold text-foreground min-w-[60px]">Email:</span>
                                    <a href={`mailto:${email}`} className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4 truncate">
                                        {email}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Contact Form */}
                    <div className="flex flex-col gap-6 rounded-2xl border bg-white/80 backdrop-blur-md p-8 shadow-lg">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="firstname" className="text-sm font-medium">First Name</Label>
                                <Input type="text" id="firstname" placeholder="Tim" className="bg-white/50" />
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="lastname" className="text-sm font-medium">Last Name</Label>
                                <Input type="text" id="lastname" placeholder="Cook" className="bg-white/50" />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <Input type="email" id="email" placeholder="tim@example.com" className="bg-white/50" />
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                            <Input type="text" id="subject" placeholder="How can we help?" className="bg-white/50" />
                        </div>
                        <div className="grid w-full gap-2">
                            <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                            <Textarea placeholder="Type your message here..." id="message" className="min-h-[150px] bg-white/50 resize-none" />
                        </div>
                        <Button className="w-full h-12 text-base font-medium shadow-md hover:shadow-lg transition-all mt-2">
                            Send Message
                        </Button>
                    </div>

                    {/* Column 3: About Us */}
                    <div className="flex flex-col gap-6">
                        <div className="h-full rounded-2xl border bg-white/60 backdrop-blur-sm p-8 shadow-md flex flex-col justify-center">
                            <h3 className="mb-4 text-2xl font-bold text-foreground">Why Choose Feza?</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                At Feza Mattresses, we craft every mattress with premium materials and decades of expertise — so you wake up feeling your best, every single day.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Premium ortho &amp; memory foam layers</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-muted-foreground">7-year warranty on all mattresses</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Free delivery across Kerala</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-muted-foreground">100-night trial — love it or return it</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Map */}
                    <div className="flex flex-col gap-6 h-full min-h-[400px] xl:min-h-0">
                        <div className="h-full w-full rounded-2xl border bg-white/60 backdrop-blur-sm shadow-md overflow-hidden relative">
                            <iframe
                                src="https://maps.google.com/maps?q=Mannam+-+Thathappily+Road,+North+Paravur,+Mannam,+Kerala+683520&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '100%' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                                title="Feza Mattresses Location"
                            />
                            <a
                                href="https://maps.app.goo.gl/8oFZwEoDPw4K4rTr9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-3 right-3 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors z-10"
                            >
                                Open in Maps ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
