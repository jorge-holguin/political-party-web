"use client";

import { Download, FileText, CheckCircle, Users, Heart, Shield, Star, ClipboardList, Fingerprint, MapPin } from "lucide-react";

const pasos = [
  {
    icon: Download,
    titulo: "Descarga la ficha",
    descripcion: "Descarga el formulario oficial de inscripción en formato PDF"
  },
  {
    icon: ClipboardList,
    titulo: "Completa tus datos",
    descripcion: "Llena todos los campos requeridos con tu información personal"
  },
  {
    icon: Fingerprint,
    titulo: "Firma y huella",
    descripcion: "Firma el documento y coloca tu huella digital como lo requiere el JNE"
  },
  {
    icon: MapPin,
    titulo: "Entrégala presencialmente",
    descripcion: "Acércate a nuestro local partidario o coordina la entrega con tu comité"
  }
];

const requisitos = [
  { titulo: "Ser ciudadano peruano", descripcion: "Mayor de 18 años con DNI vigente" },
  { titulo: "No pertenecer a otro partido", descripcion: "Declaración jurada de no afiliación a otra organización política" },
  { titulo: "Aceptar el ideario", descripcion: "Comprometerse con los principios y valores del partido" },
  { titulo: "Llenar ficha de afiliación", descripcion: "Completar el formulario oficial con datos verídicos" }
];

const beneficios = [
  { icono: Users, titulo: "Participación Activa", descripcion: "Voz y voto en las decisiones del partido" },
  { icono: Heart, titulo: "Comunidad", descripcion: "Forma parte de una red de ciudadanos comprometidos" },
  { icono: Shield, titulo: "Representación", descripcion: "Tus intereses serán defendidos a nivel nacional" },
  { icono: Star, titulo: "Oportunidades", descripcion: "Acceso a formación política y cargos partidarios" }
];

export default function AfiliadosPage() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/images/Ficha_Inscripcion_TCP.pdf";
    link.download = "Ficha_Inscripcion_TCP.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Únete al Partido
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Sé parte del cambio que el Perú necesita. Inscríbete en Todo con el Pueblo
            y construyamos juntos un mejor país.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Card principal - Ficha de inscripción */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
          {/* Header de la card */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 sm:p-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">
                  Ficha de Inscripción Oficial
                </h2>
                <p className="text-gray-300">
                  Documento requerido por el Jurado Nacional de Elecciones
                </p>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 sm:p-8">
            {/* Pasos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {pasos.map((paso, index) => (
                <div key={index} className="text-center group">
                  <div className="relative">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition-colors duration-300">
                      <paso.icon className="h-7 w-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{paso.titulo}</h4>
                  <p className="text-sm text-gray-600">{paso.descripcion}</p>
                </div>
              ))}
            </div>

            {/* Nota JNE */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 text-sm">
                    <strong>Importante:</strong> Según las normas del JNE, la ficha de inscripción debe ser 
                    llenada a mano, firmada y con huella digital del afiliado. Este es un requisito 
                    obligatorio para validar tu inscripción en el partido. No existe un proceso de 
                    pre-afiliación en línea.
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de descarga */}
            <div className="text-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
              >
                <Download className="h-6 w-6" />
                Descargar Ficha de Inscripción
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Archivo PDF • Tamaño aproximado: 26 KB
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                ¿Tienes dudas sobre el proceso de inscripción?{" "}
                <a href="/contacto" className="text-red-600 hover:text-red-700 font-medium">
                  Contáctanos
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Sección de requisitos y beneficios */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Requisitos */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Requisitos para Afiliarse
            </h3>
            <div className="space-y-4">
              {requisitos.map((req, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{req.titulo}</p>
                    <p className="text-sm text-gray-500">{req.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beneficios */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-red-500" />
              Beneficios de ser Afiliado
            </h3>
            <div className="space-y-5">
              {beneficios.map((ben, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
                    <ben.icono className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{ben.titulo}</p>
                    <p className="text-sm text-gray-500">{ben.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">¿Listo para unirte?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Descarga la ficha, complétala y acércate a tu comité más cercano. 
            Juntos construiremos el Perú que todos merecemos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              Descargar Ficha
            </button>
            <a
              href="/comites"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
            >
              <MapPin className="h-5 w-5" />
              Ver Comités
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
