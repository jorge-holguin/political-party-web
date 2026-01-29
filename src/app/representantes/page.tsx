"use client";

import { useState, useEffect } from "react";
import { Users, Award, Calendar, CheckCircle } from "lucide-react";

interface Directivo {
  id: string;
  nombreCompleto: string;
  cargo: string;
  afiliado: boolean;
  inicioCargo: string | null;
  numeroRegistro: number | null;
}

export default function RepresentantesPage() {
  const [directivos, setDirectivos] = useState<Directivo[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDirectivos = async () => {
      try {
        const response = await fetch("/api/representantes");
        if (response.ok) {
          const data = await response.json();
          setDirectivos(data);
        }
      } catch (error) {
        console.error("Error fetching directivos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchDirectivos();
  }, []);

  const formatFecha = (fecha: string | null) => {
    if (!fecha) return "---";
    return new Date(fecha).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Encontrar el Secretario General Nacional
  const secretarioGeneral = directivos.find(
    (d) => d.cargo?.toLowerCase().includes("secretario general nacional")
  );
  const otrosDirectivos = directivos.filter(
    (d) => d.id !== secretarioGeneral?.id
  );

  if (cargando) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando directivos...</p>
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
            Nuestros Representantes
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Conoce a los líderes que trabajan incansablemente por el bienestar 
            del pueblo peruano.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Secretario General destacado */}
        {secretarioGeneral && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-3">
                    {secretarioGeneral.cargo}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {secretarioGeneral.nombreCompleto}
                  </h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-6 text-red-100">
                    {secretarioGeneral.inicioCargo && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Desde {formatFecha(secretarioGeneral.inicioCargo)}</span>
                      </div>
                    )}
                    {secretarioGeneral.afiliado && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <span>Afiliado activo</span>
                      </div>
                    )}
                    {secretarioGeneral.numeroRegistro && (
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        <span>Registro N° {String(secretarioGeneral.numeroRegistro).padStart(3, "0")}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid de otros directivos */}
        {otrosDirectivos.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Comité Ejecutivo Nacional</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otrosDirectivos.map((directivo) => (
                <div
                  key={directivo.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="h-7 w-7 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2">
                          {directivo.cargo || "Directivo"}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 truncate">
                          {directivo.nombreCompleto}
                        </h4>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                      {directivo.inicioCargo && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Inicio: {formatFecha(directivo.inicioCargo)}</span>
                        </div>
                      )}
                      {directivo.afiliado && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Afiliado activo</span>
                        </div>
                      )}
                      {directivo.numeroRegistro && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Award className="h-4 w-4 text-gray-400" />
                          <span>Registro N° {String(directivo.numeroRegistro).padStart(3, "0")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {directivos.length === 0 && !cargando && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay directivos registrados
            </h3>
            <p className="text-gray-500">
              La información de los directivos se actualizará próximamente.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">¿Quieres ser parte de nuestro equipo?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Si tienes vocación de servicio y quieres contribuir al desarrollo del Perú, 
            te invitamos a formar parte de nuestra organización.
          </p>
          <a
            href="/afiliados"
            className="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Únete al Partido
          </a>
        </div>
      </div>
    </div>
  );
}
