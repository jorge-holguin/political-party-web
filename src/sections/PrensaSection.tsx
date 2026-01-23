"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Calendar, User, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";

interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fecha: string;
  autor: string;
  categoria: string; // Primera categoría para compatibilidad
  categorias?: string[]; // Todas las categorías del multi_select
}

interface CategoriaOption {
  id: string;
  name: string;
  color: string;
}

// Función para obtener clases de color dinámicas de Notion
const getNotionColorClass = (color: string) => {
  const colorMap: { [key: string]: string } = {
    default: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    gray: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    brown: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    orange: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    yellow: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    green: "bg-green-100 text-green-700 hover:bg-green-200",
    blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    pink: "bg-pink-100 text-pink-700 hover:bg-pink-200",
    red: "bg-red-100 text-red-700 hover:bg-red-200",
  };
  return colorMap[color] || colorMap.default;
};

export default function PrensaSection() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [categorias, setCategorias] = useState<CategoriaOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedCategoria, setSelectedCategoria] = useState<string>("Todas");
  const carouselRef = useRef<HTMLDivElement>(null);

  const fetchMetadata = useCallback(async () => {
    try {
      const response = await fetch("/api/prensa/metadata");
      if (response.ok) {
        const data = await response.json();
        setCategorias(data.categorias || []);
      }
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  }, []);

  const fetchNoticias = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/prensa");
      if (response.ok) {
        const data = await response.json();
        setNoticias(data);
      }
    } catch (error) {
      console.error("Error fetching noticias:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetadata();
    fetchNoticias();
  }, [fetchMetadata, fetchNoticias]);

  const noticiasFiltradas = selectedCategoria === "Todas" 
    ? noticias 
    : noticias.filter((n) => n.categoria === selectedCategoria);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 350;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleNoticiaClick = (noticia: Noticia) => {
    if (!isDragging) {
      setSelectedNoticia(noticia);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedNoticia(null), 300);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section id="prensa" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Prensa y Noticias
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente informado sobre nuestras actividades, propuestas y eventos
          </p>
        </div>

        {/* Filtros de categoría */}
        {!loading && categorias.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {/* Botón "Todas" */}
            <button
              onClick={() => setSelectedCategoria("Todas")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                selectedCategoria === "Todas"
                  ? "bg-red-600 text-white shadow-md scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Todas
            </button>
            
            {/* Botones dinámicos de categorías */}
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setSelectedCategoria(categoria.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                  selectedCategoria === categoria.name
                    ? "bg-red-600 text-white shadow-md scale-105"
                    : getNotionColorClass(categoria.color)
                }`}
              >
                {categoria.name}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-red-600 animate-spin" />
          </div>
        ) : noticiasFiltradas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay noticias disponibles</p>
          </div>
        ) : (
          /* Carrusel draggable */
          <div className="relative group">
            {/* Botones de navegación */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100 -translate-x-4"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100 translate-x-4"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>

            {/* Carrusel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 pb-4 cursor-grab active:cursor-grabbing scrollbar-hide scroll-smooth"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {noticiasFiltradas.map((noticia) => (
                <div
                  key={noticia.id}
                  className="flex-none w-80 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] select-none"
                  onClick={() => handleNoticiaClick(noticia)}
                >
                  <div className="relative h-48 bg-gradient-to-br from-red-500 to-red-700 overflow-hidden">
                    <Image
                      src={noticia.imagen || "/images/logos/logo.png"}
                      alt={noticia.titulo || "Noticia"}
                      fill
                      sizes="320px"
                      className="object-cover opacity-80"
                      draggable={false}
                      unoptimized={noticia.imagen.includes("cloudinary") || noticia.imagen.includes("http")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {(noticia.categorias && noticia.categorias.length > 0 ? noticia.categorias : [noticia.categoria]).map((cat, idx) => (
                        <span key={idx} className="bg-white/90 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {noticia.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {noticia.resumen}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(noticia.fecha).toLocaleDateString("es-PE")}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-600 font-medium">
                        <span>Leer más</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              ← Arrastra para ver más noticias →
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedNoticia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 bg-gradient-to-br from-red-500 to-red-700">
              <Image
                src={selectedNoticia.imagen || "/images/logos/logo.png"}
                alt={selectedNoticia.titulo || "Noticia"}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain p-12 opacity-30"
                unoptimized={selectedNoticia.imagen?.includes("cloudinary") || selectedNoticia.imagen?.includes("http")}
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {(selectedNoticia.categorias && selectedNoticia.categorias.length > 0 ? selectedNoticia.categorias : [selectedNoticia.categoria]).map((cat, idx) => (
                    <span key={idx} className="inline-block bg-white/90 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  {selectedNoticia.titulo}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{selectedNoticia.autor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(selectedNoticia.fecha).toLocaleDateString("es-PE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {selectedNoticia.contenido}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleCloseModal}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
