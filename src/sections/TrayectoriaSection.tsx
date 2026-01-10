"use client";

import { Briefcase, Calendar } from "lucide-react";

const trayectoria = [
  {
    año: "2024",
    cargo: "Secretario General",
    institucion: "Partido Todo con el Pueblo (TCP)",
    descripcion: "Lidera el proceso de consolidación e inscripción del partido político.",
  },
  {
    año: "2022",
    cargo: "Ministro de Transportes y Comunicaciones",
    institucion: "Gobierno del Perú",
    descripcion: "Dirigió el ministerio desde marzo hasta mayo de 2022.",
  },
  {
    año: "2021",
    cargo: "Secretario General",
    institucion: "Ministerio de Transportes y Comunicaciones",
    descripcion: "Coordinó las funciones administrativas del ministerio desde noviembre de 2021.",
  },
  {
    año: "2019",
    cargo: "Analista Legal",
    institucion: "Municipalidad de Miraflores",
    descripcion: "Asesoría legal y análisis normativo municipal.",
  },
  {
    año: "2017",
    cargo: "Especialista en Resoluciones",
    institucion: "SUCAMEC",
    descripcion: "Especialista en la Superintendencia Nacional de Control de Servicios de Seguridad.",
  },
  {
    año: "2016",
    cargo: "Abogado - Asesoría Legal",
    institucion: "Municipalidad Metropolitana de Lima",
    descripcion: "Asesor legal en el equipo jurídico de la municipalidad.",
  },
  {
    año: "2007",
    cargo: "Jefe de Asesoría Jurídica",
    institucion: "Municipalidad Distrital de Lajas",
    descripcion: "Responsable de la unidad de asesoría jurídica.",
  },
  {
    año: "2003",
    cargo: "Jefe de Abastecimiento",
    institucion: "Municipalidad Provincial de Cutervo",
    descripcion: "Gestión de servicios auxiliares y abastecimiento.",
  },
];

export default function TrayectoriaSection() {
  return (
    <section id="trayectoria" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trayectoria Profesional
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Más de 20 años de experiencia en el sector público
          </p>
        </div>

        <div className="relative">
          {/* Línea central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-600 via-red-400 to-gray-200 dark:to-gray-700 hidden md:block"></div>

          <div className="space-y-8">
            {trayectoria.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-4 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Contenido */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-red-600 md:border-l-0 md:border-none hover:shadow-xl transition-shadow duration-300">
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      <Calendar className="h-4 w-4 text-red-600" />
                      <span className="text-red-600 font-bold">{item.año}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {item.cargo}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                      {item.institucion}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.descripcion}
                    </p>
                  </div>
                </div>

                {/* Punto central */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-red-600 rounded-full shadow-lg z-10">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>

                {/* Espacio vacío */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
