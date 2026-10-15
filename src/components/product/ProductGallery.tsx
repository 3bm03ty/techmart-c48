"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ProductGalleryProps {
  title: string;
  imageCover: string;
  images: string[];
}

export default function ProductGallery({ title, imageCover, images }: ProductGalleryProps) {
  const galleryImages = [...new Set([imageCover, ...images].filter(Boolean))];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const selectedImage = galleryImages[selectedIndex];

  return (
    <section aria-label={`${title} images`} className="min-w-0 space-y-4">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border bg-white p-8 sm:p-12">
        {selectedImage && !failedImages.includes(selectedImage) ? (
          <Image
            src={selectedImage}
            alt={`${title} — view ${selectedIndex + 1}`}
            fill
            unoptimized
            loading="eager"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-8 sm:p-12"
            onError={() => setFailedImages((previous) => [...previous, selectedImage])}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-neutral-500">
            <ImageOff aria-hidden="true" className="size-10" />
            <p className="text-sm">Image unavailable</p>
          </div>
        )}
        {galleryImages.length > 1 && (
          <span className="absolute right-4 bottom-4 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600" aria-live="polite" aria-atomic="true">
            {selectedIndex + 1} / {galleryImages.length}
          </span>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto p-1" aria-label="Choose a product image">
          {galleryImages.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Show ${title}, view ${index + 1}`}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
              className={`relative size-20 shrink-0 overflow-hidden rounded-xl border bg-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:size-24 ${selectedIndex === index ? "border-primary ring-2 ring-primary" : "border-border hover:border-foreground/40"}`}
            >
              {failedImages.includes(src) ? (
                <ImageOff aria-hidden="true" className="mx-auto size-5 text-neutral-500" />
              ) : (
                <Image src={src} alt="" fill unoptimized sizes="96px" className="object-contain p-2" onError={() => setFailedImages((previous) => [...previous, src])} />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
