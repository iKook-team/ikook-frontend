"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageSliderModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    initialIndex?: number;
}

export const ImageSliderModal = ({
    isOpen,
    onClose,
    images,
    initialIndex = 0,
}: ImageSliderModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    if (!isOpen) return null;

    const validImages = images.filter((img) => img !== "");
    if (validImages.length === 0) return null;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % validImages.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        onClose();
                    }
                }}
                role="button"
                tabIndex={-1}
                aria-label="Close modal backdrop"
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl h-full max-h-[85vh] bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[110] p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Navigation Buttons */}
                {validImages.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Image Container */}
                <div className="relative flex-1 w-full flex items-center justify-center p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={validImages[currentIndex]}
                                alt={`Gallery image ${currentIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer: Counter & Thumbnails */}
                <div className="bg-black/40 backdrop-blur-md p-4 flex flex-col items-center gap-4">
                    {/* Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto max-w-full p-1 no-scrollbar">
                        {validImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${currentIndex === index ? "ring-2 ring-amber-500 scale-110" : "opacity-50 hover:opacity-100"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Counter */}
                    <div className="text-white/70 text-xs font-medium">
                        {currentIndex + 1} / {validImages.length}
                    </div>
                </div>
            </div>
        </div>
    );
};
