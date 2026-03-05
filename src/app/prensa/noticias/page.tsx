"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ExternalLink, Search, Filter, ChevronDown, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { PrensaSkeleton } from "@/components/SkeletonLoader";

interface Categoria {
  id: string;
  name: string;
  color: string;
}

interface NoticiaItem {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fecha: string;
  slug: string;
  autor: string;
  categorias: string[];
  categoria: string;
}

const ITEMS_PER_PAGE = 12;

export default function TodasNoticiasPage() {
  const [noticias, setNoticias] = useState<NoticiaItem[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticiasRes, metadataRes] = await Promise.all([
          fetch("/api/prensa"),
          fetch("/api/prensa/metadata")
        ]);

        if (noticiasRes.ok) {
          const noticiasData = await noticiasRes.json();
          setNoticias(noticiasData);
        }

        if (metadataRes.ok) {
          const metadataData = await metadataRes.json();
          setCategorias(metadataData.categorias || []);
        }
      } catch (error) {
        console.error("Error fetching prensa data:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  const noticiasFiltradas = noticias.filter((noticia) => {
    const cumpleCategoria = filtroCategoria === "Todas" || noticia.categoria === filtroCategoria;
    const cumpleBusqueda = noticia.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          noticia.resumen.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  // Pagination
  const totalPaginas = Math.ceil(noticiasFiltradas.length / ITEMS_PER_PAGE);
  const noticiasPaginadas = noticiasFiltradas.slice(
    (paginaActual - 1) * ITEMS_PER_PAGE,
    paginaActual * ITEMS_PER_PAGE
  );

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setPaginaActual(1);
  }, [filtroCategoria, busqueda]);

  if (cargando) {
    return <PrensaSkeleton />;
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
            Archivo de Noticias
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Explora todas las noticias y comunicados del partido Todo con el Pueblo.
          </p>
          <p className="text-sm text-red-200 mt-2">
            {noticiasFiltradas.length} noticias encontradas
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar noticias..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-gray-700"
            >
              <Filter className="h-5 w-5" />
              Filtros
              <ChevronDown className={`h-4 w-4 transition-transform ${mostrarFiltros ? "rotate-180" : ""}`} />
            </button>

            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFiltroCategoria("Todas")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filtroCategoria === "Todas"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todas
              </button>
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFiltroCategoria(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filtroCategoria === cat.name
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {mostrarFiltros && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setFiltroCategoria("Todas");
                    setMostrarFiltros(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filtroCategoria === "Todas"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Todas
                </button>
                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFiltroCategoria(cat.name);
                      setMostrarFiltros(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filtroCategoria === cat.name
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* News grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {noticiasPaginadas.map((noticia) => (
            <article
              key={noticia.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-40 overflow-hidden">
                {noticia.imagen ? (
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">{noticia.categoria}</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-900 text-white">
                    {noticia.categoria}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <Calendar className="h-3 w-3" />
                  {formatFecha(noticia.fecha)}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {noticia.titulo}
                </h3>
                <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                  {noticia.resumen}
                </p>
                <a
                  href={`/prensa/${noticia.slug}`}
                  className="inline-flex items-center gap-1 text-red-600 font-medium text-xs hover:gap-2 transition-all"
                >
                  Leer más
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {noticiasFiltradas.length === 0 && (
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

        <div className="text-center mt-4 text-sm text-gray-500">
          Página {paginaActual} de {totalPaginas}
        </div>
      </div>
    </div>
  );
}
