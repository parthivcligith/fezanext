"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface Image {
    src: string;
    alt?: string;
    title?: string;
    subtitle?: string;
}

interface ZoomParallaxProps {
    /** Array of images to be displayed in the parallax effect max 7 images */
    images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 3]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 3.5]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 4.5]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 5]);

    const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

    return (
        <div id="stories" ref={container} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen overflow-hidden bg-background">
                {images.map(({ src, alt, title, subtitle }, index) => {
                    const scale = scales[index % scales.length];

                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1
                                ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]"
                                : ""
                                } ${index === 2
                                    ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]"
                                    : ""
                                } ${index === 3
                                    ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]"
                                    : ""
                                } ${index === 4
                                    ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]"
                                    : ""
                                } ${index === 5
                                    ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]"
                                    : ""
                                } ${index === 6
                                    ? "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]"
                                    : ""
                                } `}
                        >
                            <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src={src || "/placeholder.svg"}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                                {(title || subtitle) && (
                                    <motion.div
                                        style={{ scale: contentScale }}
                                        className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center transition-colors"
                                    >
                                        {title && (
                                            <div className="relative mb-2 md:mb-4">
                                                <h3
                                                    className="relative text-xl sm:text-3xl md:text-5xl font-medium tracking-tight text-white drop-shadow-md"
                                                    style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                                                >
                                                    {/* Depth shadow layers */}
                                                    <span
                                                        className="absolute inset-0 text-white/30 blur-[1px]"
                                                        style={{ transform: "translate(2px, 2px)" }}
                                                        aria-hidden="true"
                                                    >
                                                        {title}
                                                    </span>
                                                    <span
                                                        className="absolute inset-0 text-white/20 blur-[0.5px]"
                                                        style={{ transform: "translate(1px, 1px)" }}
                                                        aria-hidden="true"
                                                    >
                                                        {title}
                                                    </span>
                                                    {/* Main text */}
                                                    <span className="relative">{title}</span>
                                                </h3>
                                            </div>
                                        )}
                                        {subtitle && (
                                            <p className="mt-1 md:mt-2 text-xs sm:text-sm md:text-xl font-medium text-white/90 drop-shadow-sm max-w-[200px] md:max-w-md leading-tight">
                                                {subtitle}
                                            </p>
                                        )}
                                        <button className="mt-3 md:mt-6 px-4 py-1.5 md:px-6 md:py-3 text-xs md:text-base bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg">
                                            Book Appointment
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
