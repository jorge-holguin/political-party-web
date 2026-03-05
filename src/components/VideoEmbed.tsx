"use client";

import { useState } from "react";

interface VideoEmbedProps {
  readonly url: string;
  readonly title?: string;
  readonly className?: string;
}

type VideoType = "youtube" | "tiktok" | "facebook" | "unknown";

function getVideoType(url: string): VideoType {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  if (url.includes("tiktok.com")) {
    return "tiktok";
  }
  if (url.includes("facebook.com") || url.includes("fb.watch")) {
    return "facebook";
  }
  return "unknown";
}

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = regExp.exec(url);
  return match?.[2]?.length === 11 ? match[2] : null;
}

export default function VideoEmbed({ url, title = "Video", className = "" }: VideoEmbedProps) {
  const [loading, setLoading] = useState(true);
  const videoType = getVideoType(url);

  const handleLoad = () => setLoading(false);

  if (videoType === "youtube") {
    const videoId = getYouTubeId(url);
    if (!videoId) return <p className="text-red-500">Invalid YouTube URL</p>;

    return (
      <div className={`relative w-full aspect-video ${className}`}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
          onLoad={handleLoad}
        />
      </div>
    );
  }

  // TikTok blocks iframe embedding via CSP - show external link with branding
  if (videoType === "tiktok") {
    return (
      <div className={`relative w-full aspect-video ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl flex flex-col items-center justify-center p-6">
          <div className="mb-4">
            <svg className="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </div>
          <p className="text-white/80 text-sm mb-4 text-center">
            Este video está disponible en TikTok
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ver en TikTok
          </a>
        </div>
      </div>
    );
  }

  // Facebook blocks iframe embedding - show external link with branding
  if (videoType === "facebook") {
    return (
      <div className={`relative w-full aspect-video ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-xl flex flex-col items-center justify-center p-6">
          <div className="mb-4">
            <svg className="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <p className="text-white/80 text-sm mb-4 text-center">
            Este video está disponible en Facebook
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ver en Facebook
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 bg-gray-100 rounded-lg text-center ${className}`}>
      <p className="text-gray-600 mb-2">Video no soportado</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-600 hover:underline"
      >
        Abrir en nueva pestaña
      </a>
    </div>
  );
}

export function getVideoEmbed(url: string): React.ReactElement {
  return <VideoEmbed url={url} />;
}
