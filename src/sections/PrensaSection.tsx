"use client";

import { useState, useRef, useEffect } from "react";
import { X, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fecha: string;
  autor: string;
  categoria: string;
}

const noticiasEjemplo: Noticia[] = [
  {
    id: "1",
    titulo: "Todo con el Pueblo avanza en la recolección de firmas",
    resumen: "El partido político liderado por el Dr. Nicolás Bustamante continúa su proceso de inscripción con gran respaldo popular en diversas regiones del país.",
    contenido: "El partido Todo con el Pueblo (TCP) ha logrado significativos avances en su proceso de recolección de firmas para su inscripción oficial ante el Jurado Nacional de Elecciones. El Secretario General, Dr. Nicolás Bustamante Coronado, ha encabezado diversas jornadas de trabajo en las regiones de Lambayeque, Cajamarca y Lima, donde el respaldo ciudadano ha sido notable.",
    imagen: "/images/logos/logo.png",
    fecha: "2024-12-15",
    autor: "Prensa TCP",
    categoria: "Institucional",
  },
  {
    id: "2",
    titulo: "Dr. Bustamante presenta propuestas para el desarrollo nacional",
    resumen: "El líder del partido expuso su visión para impulsar el crecimiento económico inclusivo y la justicia social en el Perú.",
    contenido: "Durante una conferencia de prensa realizada en Lima, el Dr. Nicolás Bustamante Coronado presentó las líneas principales del plan de gobierno que propone Todo con el Pueblo. Entre los ejes principales destacan: la reforma del sistema de transportes, mejora de la infraestructura vial, fortalecimiento de la educación pública y políticas de inclusión social.",
    imagen: "/images/logos/logo.png",
    fecha: "2024-12-10",
    autor: "Prensa TCP",
    categoria: "Propuestas",
  },
  {
    id: "3",
    titulo: "TCP inaugura nuevos locales partidarios en provincias",
    resumen: "Con el objetivo de acercar el partido a más ciudadanos, se inauguraron locales en Chiclayo y Trujillo.",
    contenido: "Todo con el Pueblo continúa expandiendo su presencia a nivel nacional con la inauguración de nuevos locales partidarios. Estas sedes servirán como punto de encuentro para los simpatizantes y como centros de capacitación política para los futuros cuadros del partido.",
    imagen: "/images/logos/logo.png",
    fecha: "2024-12-05",
    autor: "Prensa TCP",
    categoria: "Organización",
  },
  {
    id: "4",
    titulo: "Convocatoria para voluntarios del partido",
    resumen: "TCP hace un llamado a los ciudadanos comprometidos con el cambio para sumarse como voluntarios.",
    contenido: "El partido Todo con el Pueblo hace un llamado a todos los ciudadanos que deseen contribuir al cambio político del país. Se buscan voluntarios para diversas áreas: comunicaciones, organización territorial, capacitación y fiscalización electoral.",
    imagen: "/images/logos/logo.png",
    fecha: "2024-11-28",
    autor: "Prensa TCP",
    categoria: "Convocatoria",
  },
];

export default function PrensaSection() {
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

        {/* Carrusel draggable */}
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
            {noticiasEjemplo.map((noticia) => (
              <div
                key={noticia.id}
                className="flex-none w-80 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] select-none"
                onClick={() => handleNoticiaClick(noticia)}
              >
                <div className="relative h-48 bg-gradient-to-br from-red-500 to-red-700">
                  <Image
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    fill
                    className="object-contain p-8 opacity-30"
                    draggable={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                      {noticia.categoria}
                    </span>
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
                src={selectedNoticia.imagen}
                alt={selectedNoticia.titulo}
                fill
                className="object-contain p-12 opacity-30"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-white/90 text-red-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {selectedNoticia.categoria}
                </span>
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
