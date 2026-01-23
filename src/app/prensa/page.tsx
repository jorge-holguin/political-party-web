"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, ExternalLink, Play, Search, Filter, ChevronDown } from "lucide-react";

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

const colorMap: Record<string, string> = {
  brown: "bg-amber-600",
  gray: "bg-gray-600",
  blue: "bg-blue-600",
  pink: "bg-pink-600",
  green: "bg-green-600",
  red: "bg-red-600",
  yellow: "bg-yellow-600",
  purple: "bg-purple-600",
};

export default function PrensaPage() {
  const [noticias, setNoticias] = useState<NoticiaItem[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [cargando, setCargando] = useState(true);

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

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (cargando) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sala de Prensa
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Mantente informado sobre las últimas noticias, comunicados y actividades 
            del partido Todo con el Pueblo.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Barra de búsqueda y filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
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
            
            {/* Botón de filtros en móvil */}
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-gray-700"
            >
              <Filter className="h-5 w-5" />
              Filtros
              <ChevronDown className={`h-4 w-4 transition-transform ${mostrarFiltros ? "rotate-180" : ""}`} />
            </button>

            {/* Categorías en desktop */}
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

          {/* Filtros móvil expandidos */}
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

        {/* Noticia destacada */}
        {noticiasFiltradas.length > 0 && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto bg-gradient-to-br from-red-600 to-red-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                        {noticiasFiltradas[0].categoria}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold">
                        Noticia Destacada
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4" />
                    {formatFecha(noticiasFiltradas[0].fecha)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {noticiasFiltradas[0].titulo}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {noticiasFiltradas[0].resumen}
                  </p>
                  <a
                    href={`/prensa/${noticiasFiltradas[0].slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
                  >
                    Leer más
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid de noticias */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticiasFiltradas.slice(1).map((noticia) => (
            <article
              key={noticia.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
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
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white`}>
                    {noticia.categoria}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4" />
                  {formatFecha(noticia.fecha)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {noticia.titulo}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {noticia.resumen}
                </p>
                <a
                  href={`/prensa/${noticia.slug}`}
                  className="inline-flex items-center gap-1 text-red-600 font-medium text-sm hover:gap-2 transition-all"
                >
                  Leer más
                  <ExternalLink className="h-4 w-4" />
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

        {/* Paginación */}
        {noticiasFiltradas.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                Anterior
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">2</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">3</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
