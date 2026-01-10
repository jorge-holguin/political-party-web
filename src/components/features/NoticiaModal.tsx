'use client';

import { Noticia } from '@/types';

interface NoticiaModalProps {
  noticia: Noticia | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NoticiaModal({ noticia, isOpen, onClose }: NoticiaModalProps) {
  if (!isOpen || !noticia) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header image */}
          <div className="relative h-64 md:h-96">
            <img
              src={noticia.imagen}
              alt={noticia.titulo}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm mb-2">
                {noticia.categoria}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{noticia.titulo}</h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {noticia.autor.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{noticia.autor}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(noticia.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: noticia.contenido }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
