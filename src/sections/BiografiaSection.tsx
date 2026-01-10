"use client";

import Image from "next/image";
import { GraduationCap, Briefcase, Award, Building } from "lucide-react";

export default function BiografiaSection() {
  return (
    <section id="biografia" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Biografía
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Trayectoria profesional y compromiso con el Perú
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-gray-50 dark:from-red-900/20 dark:to-gray-800 rounded-2xl p-8 mb-12 shadow-lg border border-red-100 dark:border-red-900/30">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-red-600 dark:text-red-400">Dr. Nicolás Bustamante Coronado</strong> nació el 10 de septiembre de 1965 en Lajas, provincia de Chota, Cajamarca. Es abogado de profesión, graduado de la Universidad Católica Los Ángeles de Chimbote, con una Maestría en Derecho por la Universidad Nacional de Trujillo.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Se encuentra inscrito en el <strong className="text-gray-900 dark:text-white">Colegio de Abogados de Lambayeque</strong> desde 2006. Fue <strong className="text-red-600 dark:text-red-400">Ministro de Transportes y Comunicaciones</strong> del Perú desde el 4 de marzo hasta el 22 de mayo de 2022.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              Actualmente es el <strong className="text-red-600 dark:text-red-400">Secretario General del partido Todo con el Pueblo (TCP)</strong>, liderando el proceso de consolidación del partido y la recolección de firmas para su inscripción oficial.
            </p>
          </div>
        </div>

        {/* Timeline de Trayectoria */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formación Académica */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-red-600">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Formación Académica</h3>
            </div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Abogado - Universidad Católica Los Ángeles de Chimbote</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Maestría en Derecho - Universidad Nacional de Trujillo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Colegiado en el Colegio de Abogados de Lambayeque (2006)</span>
              </li>
            </ul>
          </div>

          {/* Experiencia en Sector Público */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-gray-900 dark:border-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sector Público</h3>
            </div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 flex-shrink-0"></span>
                <span>2003: Jefe de Abastecimiento - Municipalidad Provincial de Cutervo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 flex-shrink-0"></span>
                <span>2007: Asesoría Jurídica - Municipalidad Distrital de Lajas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 flex-shrink-0"></span>
                <span>2016: Asesor Legal - Municipalidad Metropolitana de Lima</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 flex-shrink-0"></span>
                <span>2017: Especialista en Resoluciones - SUCAMEC</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 flex-shrink-0"></span>
                <span>2019: Analista Legal - Municipalidad de Miraflores</span>
              </li>
            </ul>
          </div>

          {/* Cargo Ministerial */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg overflow-hidden md:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/images/hero/bustamante_mtc.jpg"
                  alt="Dr. Bustamante en el MTC"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Ministro de Transportes y Comunicaciones</h3>
                    <p className="text-red-200">Marzo - Mayo 2022</p>
                  </div>
                </div>
                <p className="text-red-100 leading-relaxed">
                  Previamente se desempeñó como Secretario General del Ministerio de Transportes y Comunicaciones desde noviembre de 2021. 
                  Durante su gestión ministerial, trabajó en la mejora de la infraestructura vial y las comunicaciones del país.
                </p>
              </div>
            </div>
          </div>

          {/* Liderazgo Político */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-red-600 md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Secretario General - Todo con el Pueblo (TCP)</h3>
                <p className="text-gray-500 dark:text-gray-400">Febrero 2024 - Actualidad</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Lidera el proceso de consolidación del partido político Todo con el Pueblo, encargándose de la recolección de firmas 
              para la inscripción oficial del partido. Su visión se centra en construir un movimiento político que represente 
              genuinamente los intereses del pueblo peruano, promoviendo la justicia social y el desarrollo económico inclusivo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
