'use client';

import { useState } from 'react';
import { Noticia } from '@/types';

interface NoticiaCardProps {
  noticia: Noticia;
  onClick: (noticia: Noticia) => void;
}

export default function NoticiaCard({ noticia, onClick }: NoticiaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
      onClick={() => onClick(noticia)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
          {noticia.categoria}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {noticia.titulo}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {noticia.resumen}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{noticia.autor}</span>
          <span>{new Date(noticia.fecha).toLocaleDateString('es-ES')}</span>
        </div>
      </div>
    </div>
  );
}
