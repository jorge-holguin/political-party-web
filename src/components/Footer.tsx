"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import VisitCounter from "./VisitCounter";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { name: "Inicio", anchor: "inicio" },
    { name: "Biografía", anchor: "biografia" },
    { name: "Trayectoria", anchor: "trayectoria" },
    { name: "Prensa", anchor: "prensa" },
    { name: "Galería", anchor: "contenido" },
    { name: "Inscríbete", anchor: "inscribete" },
    { name: "Contacto", anchor: "contacto" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Columna 1: Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" onClick={() => scrollToSection("inicio")}>
              <div className="w-32 h-20 bg-white rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300 p-2">
                <Image 
                  src="/images/logos/logo.png" 
                  alt="Todo con el Pueblo" 
                  width={120} 
                  height={70}
                  className="rounded-lg object-contain"
                />
              </div>
            </Link>
            <p className="text-lg font-semibold mt-4 text-center md:text-left text-red-500">
              Todo con el Pueblo
            </p>
            <p className="text-gray-400 text-sm mt-2 text-center md:text-left">
              Trabajando juntos por un Perú justo y solidario para todos los peruanos.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 text-white">Enlaces rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.anchor}>
                  <button
                    onClick={() => scrollToSection(link.anchor)}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 text-white">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">Lima, Perú</p>
              </div>
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <Mail className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:contacto@todoconelpueblo.pe" className="text-gray-300 text-sm hover:text-white transition-colors">
                  contacto@todoconelpueblo.pe
                </a>
              </div>
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <Phone className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">+51 999 999 999</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contador de visitas */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="mb-6">
            <VisitCounter />
          </div>
        </div>

        {/* Línea divisoria y derechos reservados */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Todo con el Pueblo (TCP). Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/todoconelpueblo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://x.com/todoconelpueblo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@todoconelpueblo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@todoconelpueblo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
