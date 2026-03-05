"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import VideoEmbed from "@/components/VideoEmbed";

export interface MediaItem {
  id: string;
  titulo: string;
  descripcion?: string;
  leyenda?: string;
  tipo: string;
  urlMedia?: string;
  url?: string;
  thumbnailUrl?: string;
  thumbnail?: string;
  fecha: string;
  categoria?: string;
  categorias?: string[];
}

interface MediaModalProps {
  readonly isOpen: boolean;
  readonly media: MediaItem | null;
  readonly onClose: () => void;
  readonly fallbackImage?: string;
}

function getYouTubeEmbedUrl(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = regExp.exec(url);
  if (match?.[2]?.length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url;
}

function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

export default function MediaModal({ 
  isOpen, 
  media, 
  onClose, 
  fallbackImage = "/images/contenido-no-disponible.jpg" 
}: MediaModalProps) {
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !media) return null;

  const mediaUrl = media.urlMedia || media.url || "";
  const isVideo = media.tipo === "Video" || media.tipo === "video";
  const categories = media.categorias?.length 
    ? media.categorias 
    : media.categoria 
      ? [media.categoria] 
      : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
        aria-label="Cerrar modal"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      <div
        className="relative max-w-5xl w-full max-h-[90vh] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
            {isYouTubeUrl(mediaUrl) ? (
              <iframe
                src={`${getYouTubeEmbedUrl(mediaUrl)}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={media.titulo}
              />
            ) : (
              <VideoEmbed url={mediaUrl} title={media.titulo} />
            )}
          </div>
        ) : (
          <div className="relative w-full max-h-[80vh] flex items-center justify-center">
            <Image
              src={mediaUrl || fallbackImage}
              alt={media.titulo || "Imagen"}
              width={1200}
              height={800}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              unoptimized={mediaUrl?.includes("cloudinary") || mediaUrl?.includes("notion")}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage;
              }}
            />
          </div>
        )}

        {/* Media Info */}
        <div className="mt-4 text-center">
          <h3 id="modal-title" className="text-white text-xl font-semibold mb-2">
            {media.titulo}
          </h3>
          {(media.leyenda || media.descripcion) && (
            <p className="text-white/80 text-sm max-w-2xl mx-auto">
              {media.leyenda || media.descripcion}
            </p>
          )}
          <div className="flex flex-col items-center gap-3 mt-3">
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {categories.filter(Boolean).map((cat) => (
                  <span 
                    key={cat} 
                    className="px-3 py-1 bg-white/10 rounded-full text-xs text-white"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
            {media.fecha && (
              <span className="text-white/60 text-xs">
                {new Date(media.fecha).toLocaleDateString("es-PE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
