"use client";

import Image from "next/image";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              Partido Todo con el Pueblo
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl leading-tight">
              <span className="block">Dr. Nicolás</span>
              <span className="block text-red-600">Bustamante Coronado</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 font-medium">
              Secretario General - Todo con el Pueblo (TCP)
            </p>
            <p className="mt-4 text-base text-gray-700 dark:text-gray-300 sm:text-lg md:text-xl leading-relaxed">
              Abogado, exministro de Transportes y Comunicaciones. Comprometido con la justicia social y el desarrollo económico de todos los peruanos.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("biografia")}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Conoce mi trayectoria
              </button>
              <button
                onClick={() => scrollToSection("inscribete")}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-red-600 text-base font-medium rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Únete al partido
              </button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-red-600 to-red-700 p-1 rounded-2xl shadow-2xl">
                <Image
                  src="/images/hero/bustamante.jpg"
                  alt="Dr. Nicolás Bustamante Coronado - Todo con el Pueblo"
                  width={450}
                  height={550}
                  className="rounded-xl object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border-2 border-red-600">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Exministro MTC</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Marzo - Mayo 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
