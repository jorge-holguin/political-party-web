'use client';

import { Download, FileText, CheckCircle, Users, ClipboardList, Fingerprint } from 'lucide-react';

export default function InscribeteSection() {
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
      icon: Users,
      titulo: "Entrégala",
      descripcion: "Acércate a nuestro local partidario o coordina la entrega"
    }
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/images/Ficha_Inscripcion_TCP.pdf';
    link.download = 'Ficha_Inscripcion_TCP.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="inscribete" className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Únete al Partido
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto mb-6"></div>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Sé parte del cambio que el Perú necesita. Inscríbete en Todo con el Pueblo
          </p>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 sm:p-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white">
                  Ficha de Inscripción Oficial
                </h3>
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
                    obligatorio para validar tu inscripción en el partido.
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
                ¿Tienes dudas sobre el proceso de inscripción?{' '}
                <a href="#contacto" className="text-red-600 hover:text-red-700 font-medium">
                  Contáctanos
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
