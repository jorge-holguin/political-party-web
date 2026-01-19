"use client";

import Image from "next/image";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              Partido Todo con el Pueblo
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="block">Dr. Nicolás</span>
              <span className="block text-red-600">Bustamante Coronado</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-600 font-medium">
              Secretario General del Partido Todo con el Pueblo
            </p>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
              Abogado de vocación, servidor público por convicción. Liderando un movimiento ciudadano que busca transformar el Perú con justicia, transparencia y oportunidades para todos.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection("biografia")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Conoce mi trayectoria
              </button>
              <button
                onClick={() => scrollToSection("inscribete")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-red-600 text-base font-medium rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Únete al partido
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-red-600 to-red-700 p-1 rounded-2xl shadow-2xl">
                <Image
                  src="/images/hero/bustamante.jpg"
                  alt="Dr. Nicolás Bustamante Coronado - Secretario General de Todo con el Pueblo"
                  width={450}
                  height={550}
                  className="rounded-xl object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
