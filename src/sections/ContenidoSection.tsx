"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, X, Loader2, Image as ImageIcon, Video, Filter } from "lucide-react";
import Image from "next/image";

interface MediaItem {
  id: string;
  titulo: string;
  leyenda: string;
  tipo: "Foto" | "Video";
  urlMedia: string;
  thumbnailUrl: string;
  categoria: string; // Primera categoría para compatibilidad
  categorias?: string[]; // Todas las categorías del multi_select
  fecha: string;
}

interface MetadataOption {
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

export default function ContenidoSection() {
  const [contenido, setContenido] = useState<MediaItem[]>([]);
  const [tipos, setTipos] = useState<MetadataOption[]>([]);
  const [categorias, setCategorias] = useState<MetadataOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState<string>("Todos");
  const [selectedCategoria, setSelectedCategoria] = useState<string>("Todas");

  const fetchMetadata = useCallback(async () => {
    try {
      const response = await fetch("/api/contenido/metadata");
      if (response.ok) {
        const data = await response.json();
        setTipos(data.tipos || []);
        setCategorias(data.categorias || []);
      }
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  }, []);

  const fetchContenido = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contenido");
      if (response.ok) {
        const data = await response.json();
        setContenido(data);
      }
    } catch (error) {
      console.error("Error fetching contenido:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetadata();
    fetchContenido();
  }, [fetchMetadata, fetchContenido]);

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

  const contenidoFiltrado = contenido.filter((item) => {
    const matchTipo = selectedTipo === "Todos" || item.tipo === selectedTipo;
    const matchCategoria = selectedCategoria === "Todas" || item.categoria === selectedCategoria;
    return matchTipo && matchCategoria;
  });

  const handleMediaClick = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMedia(null), 300);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("/embed/")) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <section id="contenido" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Galería Multimedia
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestras fotos y videos de eventos, campañas y actividades del partido
          </p>
        </div>

        {/* Filtros */}
        {!loading && contenido.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            {/* Filtro por tipo */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <div className="flex gap-2">
                {/* Botón "Todos" para tipos */}
                <button
                  onClick={() => setSelectedTipo("Todos")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                    selectedTipo === "Todos"
                      ? "bg-red-600 text-white shadow-md scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  Todos
                </button>
                
                {/* Botones dinámicos de tipo */}
                {tipos.map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => setSelectedTipo(tipo.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-sm ${
                      selectedTipo === tipo.name
                        ? "bg-red-600 text-white shadow-md scale-105"
                        : getNotionColorClass(tipo.color)
                    }`}
                  >
                    {tipo.name === "Foto" && <ImageIcon className="h-4 w-4" />}
                    {tipo.name === "Video" && <Video className="h-4 w-4" />}
                    {tipo.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Separador */}
            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>

            {/* Filtro por categoría */}
            {categorias.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {/* Botón "Todas" */}
                <button
                  onClick={() => setSelectedCategoria("Todas")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-sm ${
                    selectedCategoria === "Todas"
                      ? "bg-gray-900 text-white shadow-md scale-105"
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
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-sm ${
                      selectedCategoria === categoria.name
                        ? "bg-gray-900 text-white shadow-md scale-105"
                        : getNotionColorClass(categoria.color)
                    }`}
                  >
                    {categoria.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-red-600 animate-spin" />
          </div>
        ) : contenidoFiltrado.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay contenido disponible</p>
          </div>
        ) : (
          /* Grid de contenido */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contenidoFiltrado.map((item) => {
              const imageSrc = item.tipo === "Video" 
                ? (item.thumbnailUrl || "/images/logos/logo.png")
                : (item.urlMedia || "/images/logos/logo.png");
              
              return (
              <div
                key={item.id}
                onClick={() => handleMediaClick(item)}
                className="group relative bg-gray-100 rounded-xl overflow-hidden cursor-pointer aspect-square shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Imagen o thumbnail */}
                <Image
                  src={imageSrc}
                  alt={item.titulo || "Contenido multimedia"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={imageSrc.includes("cloudinary") || imageSrc.includes("youtube")}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icono de video */}
                {item.tipo === "Video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="h-8 w-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}

                {/* Badge de tipo */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.tipo === "Video" 
                      ? "bg-red-600 text-white" 
                      : "bg-white/90 text-gray-700"
                  }`}>
                    {item.tipo === "Video" ? <Video className="h-3 w-3 inline mr-1" /> : <ImageIcon className="h-3 w-3 inline mr-1" />}
                    {item.tipo}
                  </span>
                </div>

                {/* Info en hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                    {item.titulo}
                  </h3>
                  {item.leyenda && (
                    <p className="text-white/80 text-xs line-clamp-2">
                      {item.leyenda}
                    </p>
                  )}
                  {(item.categorias && item.categorias.length > 0 ? item.categorias : [item.categoria]).some(cat => cat) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(item.categorias && item.categorias.length > 0 ? item.categorias : [item.categoria]).filter(Boolean).map((cat, idx) => (
                        <span key={idx} className="inline-block px-2 py-0.5 bg-white/20 rounded text-xs text-white">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={handleCloseModal}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.tipo === "Video" ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={`${getYouTubeEmbedUrl(selectedMedia.urlMedia)}?autoplay=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative w-full max-h-[80vh] flex items-center justify-center">
                <Image
                  src={selectedMedia.urlMedia || "/images/logos/logo.png"}
                  alt={selectedMedia.titulo || "Imagen"}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                  unoptimized={selectedMedia.urlMedia?.includes("cloudinary")}
                />
              </div>
            )}

            {/* Info del media */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-semibold mb-2">
                {selectedMedia.titulo}
              </h3>
              {selectedMedia.leyenda && (
                <p className="text-white/80 text-sm max-w-2xl mx-auto">
                  {selectedMedia.leyenda}
                </p>
              )}
              <div className="flex flex-col items-center gap-3 mt-3">
                <div className="flex flex-wrap justify-center gap-2">
                  {(selectedMedia.categorias && selectedMedia.categorias.length > 0 ? selectedMedia.categorias : [selectedMedia.categoria]).filter(Boolean).map((cat, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">
                      {cat}
                    </span>
                  ))}
                </div>
                <span className="text-white/60 text-xs">
                  {new Date(selectedMedia.fecha).toLocaleDateString("es-PE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
