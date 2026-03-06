"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ExternalLink, Play, Search, Filter, ChevronDown, Image as ImageIcon, Video, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PrensaSkeleton } from "@/components/SkeletonLoader";
import MediaModal, { MediaItem } from "@/components/MediaModal";

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

interface ContenidoItem {
  id: string;
  titulo: string;
  leyenda: string;
  tipo: "Foto" | "Video";
  urlMedia: string;
  thumbnailUrl: string;
  fecha: string;
  categoria: string;
  categorias: string[];
}

const FALLBACK_IMAGE = "/images/contenido-no-disponible.jpg";

export default function PrensaPage() {
  const [noticias, setNoticias] = useState<NoticiaItem[]>([]);
  const [multimedia, setMultimedia] = useState<ContenidoItem[]>([]);
  const [categoriasNoticias, setCategoriasNoticias] = useState<Categoria[]>([]);
  const [categoriasContenido, setCategoriasContenido] = useState<Categoria[]>([]);
  const [tiposContenido, setTiposContenido] = useState<Categoria[]>([]);
  const [filtroCategoriaNoticia, setFiltroCategoriaNoticia] = useState("Todas");
  const [filtroCategoriaContenido, setFiltroCategoriaContenido] = useState("Todas");
  const [filtroTipoContenido, setFiltroTipoContenido] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const noticiasCarouselRef = useRef<HTMLDivElement>(null);
  const multimediaCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticiasRes, prensaMetadataRes, contenidoRes, contenidoMetadataRes] = await Promise.all([
          fetch("/api/prensa"),
          fetch("/api/prensa/metadata"),
          fetch("/api/contenido"),
          fetch("/api/contenido/metadata")
        ]);

        if (noticiasRes.ok) {
          const noticiasData = await noticiasRes.json();
          setNoticias(noticiasData);
        }

        if (prensaMetadataRes.ok) {
          const metadataData = await prensaMetadataRes.json();
          setCategoriasNoticias(metadataData.categorias || []);
        }

        if (contenidoRes.ok) {
          const contenidoData = await contenidoRes.json();
          setMultimedia(contenidoData);
        }

        if (contenidoMetadataRes.ok) {
          const contenidoMetadata = await contenidoMetadataRes.json();
          setTiposContenido(contenidoMetadata.tipos || []);
          setCategoriasContenido(contenidoMetadata.categorias || []);
        }
      } catch (error) {
        console.error("Error fetching prensa data:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleMediaClick = (item: ContenidoItem) => {
    setSelectedMedia({
      id: item.id,
      titulo: item.titulo,
      descripcion: item.leyenda,
      tipo: item.tipo === "Video" ? "Video" : "Foto",
      urlMedia: item.urlMedia,
      thumbnailUrl: item.thumbnailUrl,
      fecha: item.fecha,
      categoria: item.categoria,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };

  const noticiasFiltradas = noticias.filter((noticia) => {
    const cumpleCategoria = filtroCategoriaNoticia === "Todas" || noticia.categoria === filtroCategoriaNoticia;
    const cumpleBusqueda = noticia.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          noticia.resumen.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  const multimediaFiltrado = multimedia.filter((item) => {
    const cumpleTipo = filtroTipoContenido === "Todos" || item.tipo === filtroTipoContenido;
    const cumpleCategoria = filtroCategoriaContenido === "Todas" || item.categoria === filtroCategoriaContenido;
    return cumpleTipo && cumpleCategoria;
  });

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (cargando) {
    return <PrensaSkeleton />;
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

            {/* Categorías de noticias en desktop */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFiltroCategoriaNoticia("Todas")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filtroCategoriaNoticia === "Todas"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todas
              </button>
              {categoriasNoticias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFiltroCategoriaNoticia(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filtroCategoriaNoticia === cat.name
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros móvil expandidos - Noticias */}
          {mostrarFiltros && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setFiltroCategoriaNoticia("Todas");
                    setMostrarFiltros(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filtroCategoriaNoticia === "Todas"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Todas
                </button>
                {categoriasNoticias.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFiltroCategoriaNoticia(cat.name);
                      setMostrarFiltros(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filtroCategoriaNoticia === cat.name
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

        {/* Carrusel de noticias */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Últimas Noticias</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel(noticiasCarouselRef, "left")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => scrollCarousel(noticiasCarouselRef, "right")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
              <Link
                href="/prensa/noticias"
                className="ml-4 text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {noticiasFiltradas.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-500">
                Intenta con otros términos de búsqueda o cambia los filtros
              </p>
            </div>
          ) : (
            <div
              ref={noticiasCarouselRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {noticiasFiltradas.map((noticia) => (
                <article
                  key={noticia.id}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group snap-start"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={noticia.imagen || FALLBACK_IMAGE}
                      alt={noticia.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = FALLBACK_IMAGE;
                      }}
                      unoptimized
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white">
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
          )}
        </div>

        {/* Sección Multimedia */}
        {multimedia.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Galería Multimedia</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explora nuestras fotos y videos de eventos, campañas y actividades del partido
              </p>
            </div>

            {/* Filtros de Multimedia */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
              {/* Filtro por Tipo */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <div className="flex gap-2">
                  <button
                    onClick={() => setFiltroTipoContenido("Todos")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      filtroTipoContenido === "Todos"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Todos
                  </button>
                  {tiposContenido.map((tipo) => (
                    <button
                      key={tipo.id}
                      onClick={() => setFiltroTipoContenido(tipo.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                        filtroTipoContenido === tipo.name
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tipo.name === "Foto" && <ImageIcon className="h-3 w-3" />}
                      {tipo.name === "Video" && <Video className="h-3 w-3" />}
                      {tipo.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Separador */}
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>

              {/* Filtro por Categoría de Contenido */}
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setFiltroCategoriaContenido("Todas")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      filtroCategoriaContenido === "Todas"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Todas
                  </button>
                  {categoriasContenido.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFiltroCategoriaContenido(cat.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        filtroCategoriaContenido === cat.name
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-600" />
                <Video className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollCarousel(multimediaCarouselRef, "left")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scrollCarousel(multimediaCarouselRef, "right")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
                <Link
                  href="/prensa/multimedia"
                  className="ml-4 text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                >
                  Ver todo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div
              ref={multimediaCarouselRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {multimediaFiltrado.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMediaClick(item)}
                  className="flex-shrink-0 relative bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] snap-start w-80 aspect-video"
                >
                  <Image
                    src={item.thumbnailUrl || item.urlMedia || FALLBACK_IMAGE}
                    alt={item.titulo}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = FALLBACK_IMAGE;
                    }}
                    unoptimized
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Video play icon */}
                  {item.tipo === "Video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="h-6 w-6 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}

                  {/* Badge */}
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

                  {/* Title on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-semibold text-sm line-clamp-2">
                      {item.titulo}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <MediaModal
        isOpen={isModalOpen}
        media={selectedMedia}
        onClose={handleCloseModal}
        fallbackImage={FALLBACK_IMAGE}
      />
    </div>
  );
}
