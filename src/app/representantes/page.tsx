"use client";

import { useState } from "react";
import { Users, Award, MapPin, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";

interface Representante {
  id: number;
  nombre: string;
  cargo: string;
  region: string;
  foto: string;
  email: string;
  telefono: string;
  biografia: string;
  logros: string[];
}

const representantes: Representante[] = [
  {
    id: 1,
    nombre: "Dr. Nicolás Bustamante Coronado",
    cargo: "Secretario General Nacional",
    region: "Lima",
    foto: "/images/representantes/secretario-general.jpg",
    email: "secretaria.general@todoconelpueblo.pe",
    telefono: "+51 999 999 999",
    biografia: "Abogado de profesión con más de 30 años de experiencia en el servicio público. Ha dedicado su vida a la defensa de los derechos de los ciudadanos y al fortalecimiento de las instituciones democráticas.",
    logros: [
      "Fundador del partido Todo con el Pueblo",
      "Ex congresista de la República",
      "Promotor de leyes en favor de la educación",
      "Defensor de los derechos laborales"
    ]
  },
  {
    id: 2,
    nombre: "Ing. María Elena Torres",
    cargo: "Sub Secretaria General",
    region: "Arequipa",
    foto: "/images/representantes/sub-secretaria.jpg",
    email: "sub.secretaria@todoconelpueblo.pe",
    telefono: "+51 999 888 777",
    biografia: "Ingeniera civil con maestría en gestión pública. Ha liderado proyectos de desarrollo en diversas regiones del país, siempre con un enfoque en el bienestar de las comunidades.",
    logros: [
      "Gestión de proyectos de infraestructura regional",
      "Promotora del desarrollo sostenible",
      "Líder en programas de inclusión social"
    ]
  },
  {
    id: 3,
    nombre: "Dr. Carlos Mendoza Ríos",
    cargo: "Secretario de Organización",
    region: "Cusco",
    foto: "/images/representantes/sec-organizacion.jpg",
    email: "organizacion@todoconelpueblo.pe",
    telefono: "+51 999 777 666",
    biografia: "Sociólogo especializado en movimientos sociales y organización comunitaria. Ha trabajado durante décadas en el fortalecimiento de las bases del partido.",
    logros: [
      "Expansión del partido a nivel nacional",
      "Formación de más de 100 comités provinciales",
      "Capacitación de líderes locales"
    ]
  },
  {
    id: 4,
    nombre: "Lic. Ana Patricia Vega",
    cargo: "Secretaria de la Mujer",
    region: "La Libertad",
    foto: "/images/representantes/sec-mujer.jpg",
    email: "mujer@todoconelpueblo.pe",
    telefono: "+51 999 666 555",
    biografia: "Licenciada en trabajo social y activista por los derechos de la mujer. Ha impulsado políticas de igualdad y programas de empoderamiento femenino.",
    logros: [
      "Creación del programa 'Mujeres Líderes'",
      "Impulso de políticas contra la violencia de género",
      "Promoción de la participación política femenina"
    ]
  },
  {
    id: 5,
    nombre: "Ing. Roberto Quispe Mamani",
    cargo: "Secretario de Economía",
    region: "Puno",
    foto: "/images/representantes/sec-economia.jpg",
    email: "economia@todoconelpueblo.pe",
    telefono: "+51 999 555 444",
    biografia: "Economista con especialización en finanzas públicas. Ha asesorado a múltiples gobiernos regionales en la gestión eficiente de recursos.",
    logros: [
      "Diseño de políticas de desarrollo económico",
      "Promoción de la economía popular",
      "Asesoría en gestión presupuestal"
    ]
  },
  {
    id: 6,
    nombre: "Prof. Luis Alberto Fernández",
    cargo: "Secretario de Educación y Cultura",
    region: "Lambayeque",
    foto: "/images/representantes/sec-educacion.jpg",
    email: "educacion@todoconelpueblo.pe",
    telefono: "+51 999 444 333",
    biografia: "Profesor de vocación con más de 25 años en la docencia. Defensor de la educación pública de calidad y la preservación cultural.",
    logros: [
      "Propuestas de reforma educativa",
      "Programas de alfabetización",
      "Promoción de la cultura regional"
    ]
  }
];

export default function RepresentantesPage() {
  const [expandido, setExpandido] = useState<number | null>(null);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros Representantes
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Conoce a los líderes que trabajan incansablemente por el bienestar 
            del pueblo peruano.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <Users className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">25</p>
            <p className="text-sm text-gray-500">Regiones con representantes</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <Award className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">50+</p>
            <p className="text-sm text-gray-500">Años de experiencia combinada</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <MapPin className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">196</p>
            <p className="text-sm text-gray-500">Provincias representadas</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <Users className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">45%</p>
            <p className="text-sm text-gray-500">Participación femenina</p>
          </div>
        </div>

        {/* Secretario General destacado */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-8 text-white flex flex-col justify-center">
              <span className="text-red-200 text-sm font-medium mb-2">SECRETARIO GENERAL</span>
              <h2 className="text-3xl font-bold mb-4">{representantes[0].nombre}</h2>
              <p className="text-red-100 mb-6">{representantes[0].biografia}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-red-200" />
                  <span>{representantes[0].region}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-red-200" />
                  <span>{representantes[0].email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-200" />
                  <span>{representantes[0].telefono}</span>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-red-600" />
                Logros Destacados
              </h3>
              <ul className="space-y-3">
                {representantes[0].logros.map((logro, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{logro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Grid de representantes */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Comité Ejecutivo Nacional</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {representantes.slice(1).map((rep) => (
            <div
              key={rep.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  {rep.cargo}
                </span>
                <h4 className="text-xl font-bold text-gray-900 mt-3 mb-2">{rep.nombre}</h4>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <MapPin className="h-4 w-4" />
                  {rep.region}
                </div>
                
                <button
                  onClick={() => setExpandido(expandido === rep.id ? null : rep.id)}
                  className="w-full flex items-center justify-between py-2 text-red-600 font-medium"
                >
                  <span>Ver más información</span>
                  {expandido === rep.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {expandido === rep.id && (
                  <div className="pt-4 border-t border-gray-100 mt-2 space-y-4">
                    <p className="text-sm text-gray-600">{rep.biografia}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a href={`mailto:${rep.email}`} className="text-red-600 hover:underline">
                          {rep.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{rep.telefono}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Logros:</p>
                      <ul className="space-y-1">
                        {rep.logros.map((logro, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-red-600">•</span>
                            {logro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">¿Quieres ser parte de nuestro equipo?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Si tienes vocación de servicio y quieres contribuir al desarrollo del Perú, 
            te invitamos a formar parte de nuestra organización.
          </p>
          <a
            href="/pages/afiliados"
            className="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Únete al Partido
          </a>
        </div>
      </div>
    </div>
  );
}
