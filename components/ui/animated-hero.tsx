"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(
        () => ["healthy", "radiant", "confident", "beautiful", "perfect"],
        []
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
    const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 5]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <div className="w-full overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 py-20 lg:py-40 items-center">
                    {/* Text Content */}
                    <div className="flex gap-8 flex-col items-center lg:items-start text-center lg:text-left">
                        <div>
                            <Button variant="secondary" size="sm" className="gap-4">
                                New Patient Special <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter font-regular">
                                <span className="text-primary">Your Smile is</span>
                                <span className="relative flex w-full justify-center lg:justify-start overflow-hidden md:pb-4 md:pt-1">
                                    &nbsp;
                                    {titles.map((title, index) => (
                                        <motion.span
                                            key={index}
                                            className="absolute font-semibold"
                                            initial={{ opacity: 0, y: "-100" }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                            animate={
                                                titleNumber === index
                                                    ? {
                                                        y: 0,
                                                        opacity: 1,
                                                    }
                                                    : {
                                                        y: titleNumber > index ? -150 : 150,
                                                        opacity: 0,
                                                    }
                                            }
                                        >
                                            {title}
                                        </motion.span>
                                    ))}
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
                                Experience world-class dental care with our expert team. From routine checkups to advanced cosmetic procedures, we are dedicated to giving you the smile you deserve.
                            </p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <Button size="lg" className="gap-4" variant="outline">
                                Book Consultation <PhoneCall className="w-4 h-4" />
                            </Button>
                            <Button size="lg" className="gap-4">
                                View Services <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="flex justify-center lg:justify-end relative">
                        {/* Decorative blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
                        <motion.img
                            style={{ scale, rotate }}
                            src="/images/aligner-case.png"
                            alt="Dental Aligner Case"
                            className="w-full max-w-md object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Hero };
