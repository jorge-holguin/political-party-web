"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Phone, Mail, Users, Building2 } from "lucide-react";
import PeruMap from "@/components/PeruMap";
import { comitesPorDepartamento } from "@/data/documentos";

const departamentosInfo: Record<string, string> = {
  amazonas: "Amazonas",
  ancash: "Áncash",
  apurimac: "Apurímac",
  arequipa: "Arequipa",
  ayacucho: "Ayacucho",
  cajamarca: "Cajamarca",
  callao: "Callao",
  cusco: "Cusco",
  huancavelica: "Huancavelica",
  huanuco: "Huánuco",
  ica: "Ica",
  junin: "Junín",
  lalibertad: "La Libertad",
  lambayeque: "Lambayeque",
  lima: "Lima",
  loreto: "Loreto",
  madrededios: "Madre de Dios",
  moquegua: "Moquegua",
  pasco: "Pasco",
  piura: "Piura",
  puno: "Puno",
  sanmartin: "San Martín",
  tacna: "Tacna",
  tumbes: "Tumbes",
  ucayali: "Ucayali",
};

export default function ComitesPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [departmentName, setDepartmentName] = useState<string>("");

  const handleDepartmentClick = (departmentId: string, name: string) => {
    setSelectedDepartment(departmentId);
    setDepartmentName(name);
  };

  const comites = selectedDepartment ? comitesPorDepartamento[selectedDepartment] || [] : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver al inicio</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logos/logo.png"
                alt="TCP"
                width={40}
                height={40}
                className="rounded-lg object-contain"
              />
              <span className="font-bold text-red-600 hidden sm:block">TCP</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Comités Regionales
          </h1>
          <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto">
            Conoce nuestros comités a nivel nacional. Haz clic en un departamento para ver su información.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Mapa */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 order-2 lg:order-1">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-red-600" />
                Selecciona un Departamento
              </h2>
              <PeruMap 
                onDepartmentClick={handleDepartmentClick}
                selectedDepartment={selectedDepartment}
              />
              <p className="text-sm text-gray-500 text-center mt-4">
                Haz clic en cualquier departamento para ver los comités disponibles
              </p>
            </div>

            {/* Panel de información */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 order-1 lg:order-2 min-h-[500px]">
              {selectedDepartment ? (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{departmentName}</h2>
                      <p className="text-gray-500">
                        {comites.length} {comites.length === 1 ? "comité" : "comités"} registrados
                      </p>
                    </div>
                  </div>

                  {comites.length > 0 ? (
                    <div className="space-y-6">
                      {comites.map((comite, index) => (
                        <div 
                          key={index}
                          className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-100"
                        >
                          <h3 className="font-bold text-gray-900 mb-3">{comite.nombre}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="h-4 w-4 text-red-500" />
                              <span><strong>Presidente:</strong> {comite.presidente}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4 text-red-500" />
                              <span>{comite.direccion}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="h-4 w-4 text-red-500" />
                              <span>{comite.telefono}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="h-4 w-4 text-red-500" />
                              <a href={`mailto:${comite.email}`} className="hover:text-red-600">
                                {comite.email}
                              </a>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <span className="inline-flex items-center gap-1 text-sm text-red-600 font-medium">
                              <Users className="h-4 w-4" />
                              {comite.miembros} miembros activos
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Building2 className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Sin comités registrados
                      </h3>
                      <p className="text-gray-500 max-w-xs">
                        Aún no hay comités registrados en {departmentName}. 
                        ¡Sé el primero en formar uno!
                      </p>
                      <Link
                        href="/afiliados"
                        className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Afíliate ahora
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <MapPin className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Explora nuestros comités
                  </h3>
                  <p className="text-gray-500 max-w-sm">
                    Selecciona un departamento en el mapa para ver la información 
                    de los comités en esa región.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Departamentos", value: "25", icon: MapPin },
              { label: "Comités Activos", value: "8", icon: Building2 },
              { label: "Miembros Totales", value: "790+", icon: Users },
              { label: "Provincias", value: "196", icon: MapPin },
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-5 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <stat.icon className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Quieres formar un comité en tu región?
          </h2>
          <p className="text-gray-400 mb-6">
            Únete a TCP y ayuda a expandir nuestra presencia en todo el Perú.
          </p>
          <Link
            href="/afiliados"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Conviértete en afiliado
          </Link>
        </div>
      </section>
    </main>
  );
}
