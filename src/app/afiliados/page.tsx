"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  CheckCircle, 
  Users, 
  Shield,
  ClipboardList,
  ArrowRight
} from "lucide-react";

export default function AfiliadosPage() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    email: "",
    telefono: "",
    departamento: "",
    aceptaTerminos: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitSuccess(true);
    setIsSubmitting(false);
  };

  const requisitos = [
    "Ser ciudadano peruano mayor de 18 años",
    "Gozar de derechos civiles y políticos",
    "No estar afiliado a otro partido político",
    "Aceptar el ideario y estatuto del partido",
    "Presentar DNI vigente",
  ];

  const beneficios = [
    {
      icon: Users,
      title: "Participación Activa",
      description: "Participa en las decisiones del partido y en la elección de candidatos.",
    },
    {
      icon: Shield,
      title: "Representación",
      description: "Sé parte de un movimiento que lucha por los intereses del pueblo.",
    },
    {
      icon: ClipboardList,
      title: "Postulación",
      description: "Posibilidad de postular a cargos de representación popular.",
    },
  ];

  const departamentos = [
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho",
    "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huánuco",
    "Ica", "Junín", "La Libertad", "Lambayeque", "Lima",
    "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura",
    "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
  ];

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

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Afíliate a TCP
          </h1>
          <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto">
            Únete a nuestro movimiento y sé parte del cambio que el Perú necesita.
          </p>
        </div>
      </section>

      {/* Descarga de Ficha */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="h-10 w-10 text-red-600" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Descarga la Ficha de Afiliación
              </h2>
              <p className="text-gray-600 mb-4">
                Descarga el formulario oficial, complétalo y preséntalo en el comité más cercano 
                junto con una copia de tu DNI.
              </p>
              <a
                href="/documentos/ficha-afiliacion-tcp.pdf"
                download
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                <Download className="h-5 w-5" />
                Descargar Ficha PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Requisitos y Beneficios */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Requisitos */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-red-600" />
                Requisitos
              </h2>
              <ul className="space-y-4">
                {requisitos.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beneficios */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-600" />
                Beneficios
              </h2>
              <div className="space-y-6">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <beneficio.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{beneficio.title}</h3>
                      <p className="text-sm text-gray-600">{beneficio.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Pre-registro */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Pre-registro en Línea
            </h2>
            <p className="text-gray-600">
              Completa el formulario y nos pondremos en contacto contigo para finalizar tu afiliación.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Pre-registro Exitoso!
              </h3>
              <p className="text-gray-600 mb-6">
                Hemos recibido tu solicitud. Un representante de TCP se comunicará contigo 
                en las próximas 48 horas para completar tu afiliación.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-red-600 font-medium hover:text-red-700"
              >
                Volver al inicio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombres *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombres}
                    onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Tus nombres"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.apellidos}
                    onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Tus apellidos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DNI *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    pattern="[0-9]{8}"
                    value={formData.dni}
                    onChange={(e) => setFormData({...formData, dni: e.target.value.replace(/\D/g, '')})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="12345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="+51 999 999 999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento *
                  </label>
                  <select
                    required
                    value={formData.departamento}
                    onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="">Selecciona...</option>
                    {departamentos.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.aceptaTerminos}
                    onChange={(e) => setFormData({...formData, aceptaTerminos: e.target.checked})}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-600">
                    Acepto el <Link href="/#ideario-politico" className="text-red-600 hover:underline">Ideario Político</Link> y 
                    el <Link href="/#estatuto" className="text-red-600 hover:underline">Estatuto</Link> del partido, 
                    y autorizo el tratamiento de mis datos personales según la Ley N° 29733.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Pre-registro
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer Link */}
      <section className="bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            ¿Tienes dudas? Visita nuestros comités o contáctanos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/comites"
              className="text-white hover:text-red-400 font-medium transition-colors"
            >
              Ver Comités
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="/#contacto"
              className="text-white hover:text-red-400 font-medium transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
