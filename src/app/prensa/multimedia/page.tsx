"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Play, Image as ImageIcon, Video, Search, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import VideoEmbed from "@/components/VideoEmbed";

interface MultimediaItem {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: "foto" | "video";
  url: string;
  thumbnail: string;
  fecha: string;
  categoria: string;
}

const ITEMS_PER_PAGE = 16;

export default function MultimediaPage() {
  const [items, setItems] = useState<MultimediaItem[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "foto" | "video">("todos");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [selectedItem, setSelectedItem] = useState<MultimediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/prensa/multimedia");
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        }
      } catch (error) {
        console.error("Error fetching multimedia:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  const itemsFiltrados = items.filter((item) => {
    const cumpleTipo = filtroTipo === "todos" || item.tipo === filtroTipo;
    const cumpleBusqueda = item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          item.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleTipo && cumpleBusqueda;
  });

  // Pagination
  const totalPaginas = Math.ceil(itemsFiltrados.length / ITEMS_PER_PAGE);
  const itemsPaginados = itemsFiltrados.slice(
    (paginaActual - 1) * ITEMS_PER_PAGE,
    paginaActual * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setPaginaActual(1);
  }, [filtroTipo, busqueda]);

  const openModal = (item: MultimediaItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedItem(null), 300);
  };

  if (cargando) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-8 w-48 bg-white/20 rounded animate-pulse mb-4" />
            <div className="h-12 w-96 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            href="/prensa"
            className="inline-flex items-center gap-2 text-red-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Prensa
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Galería Multimedia
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Fotos y videos de las actividades del partido Todo con el Pueblo.
          </p>
          <p className="text-sm text-red-200 mt-2">
            {itemsFiltrados.length} elementos encontrados
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar multimedia..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltroTipo("todos")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  filtroTipo === "todos"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFiltroTipo("foto")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  filtroTipo === "foto"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                Fotos
              </button>
              <button
                onClick={() => setFiltroTipo("video")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  filtroTipo === "video"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Video className="h-4 w-4" />
                Videos
              </button>
            </div>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsPaginados.map((item) => (
            <button
              key={item.id}
              onClick={() => openModal(item)}
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group text-left"
            >
              <img
                src={item.thumbnail || item.url}
                alt={item.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {item.titulo}
                  </p>
                </div>
              </div>
              {item.tipo === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 text-red-600 ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.tipo === "video" 
                    ? "bg-red-600 text-white" 
                    : "bg-blue-600 text-white"
                }`}>
                  {item.tipo === "video" ? <Video className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                </span>
              </div>
            </button>
          ))}
        </div>

        {itemsFiltrados.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-500">
              Intenta con otros términos de búsqueda o cambia los filtros
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPaginas > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
                disabled={paginaActual === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                let pageNum;
                if (totalPaginas <= 5) {
                  pageNum = i + 1;
                } else if (paginaActual <= 3) {
                  pageNum = i + 1;
                } else if (paginaActual >= totalPaginas - 2) {
                  pageNum = totalPaginas - 4 + i;
                } else {
                  pageNum = paginaActual - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPaginaActual(pageNum)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      paginaActual === pageNum
                        ? "bg-red-600 text-white"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
                disabled={paginaActual === totalPaginas}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {totalPaginas > 0 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            Página {paginaActual} de {totalPaginas}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>

              {selectedItem.tipo === "video" ? (
                <div className="p-4">
                  <VideoEmbed url={selectedItem.url} title={selectedItem.titulo} />
                </div>
              ) : (
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.titulo}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedItem.titulo}
              </h3>
              {selectedItem.descripcion && (
                <p className="text-gray-600">
                  {selectedItem.descripcion}
                </p>
              )}
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span className={`px-2 py-1 rounded-full ${
                  selectedItem.tipo === "video" 
                    ? "bg-red-100 text-red-700" 
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {selectedItem.tipo === "video" ? "Video" : "Foto"}
                </span>
                <span>{new Date(selectedItem.fecha).toLocaleDateString("es-PE")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
