"use client";

import { useState } from "react";
import { 
  Download, 
  FileText, 
  CheckCircle, 
  Users, 
  Heart, 
  Shield, 
  Star,
  ArrowRight,
  AlertCircle
} from "lucide-react";

interface Requisito {
  titulo: string;
  descripcion: string;
}

const requisitos: Requisito[] = [
  {
    titulo: "Ser ciudadano peruano",
    descripcion: "Mayor de 18 años con DNI vigente"
  },
  {
    titulo: "No pertenecer a otro partido",
    descripcion: "Declaración jurada de no afiliación a otra organización política"
  },
  {
    titulo: "Aceptar el ideario",
    descripcion: "Comprometerse con los principios y valores del partido"
  },
  {
    titulo: "Llenar ficha de afiliación",
    descripcion: "Completar el formulario oficial con datos verídicos"
  }
];

const beneficios = [
  {
    icono: <Users className="h-8 w-8" />,
    titulo: "Participación Activa",
    descripcion: "Voz y voto en las decisiones del partido"
  },
  {
    icono: <Heart className="h-8 w-8" />,
    titulo: "Comunidad",
    descripcion: "Forma parte de una red de ciudadanos comprometidos"
  },
  {
    icono: <Shield className="h-8 w-8" />,
    titulo: "Representación",
    descripcion: "Tus intereses serán defendidos a nivel nacional"
  },
  {
    icono: <Star className="h-8 w-8" />,
    titulo: "Oportunidades",
    descripcion: "Acceso a formación política y cargos partidarios"
  }
];

export default function AfiliadosPage() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    fechaNacimiento: "",
    email: "",
    telefono: "",
    departamento: "",
    provincia: "",
    distrito: "",
    direccion: "",
    ocupacion: "",
    aceptaTerminos: false
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError("");

    if (!formData.aceptaTerminos) {
      setError("Debes aceptar los términos y condiciones");
      setEnviando(false);
      return;
    }

    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setEnviando(false);
    setEnviado(true);
  };

  const departamentos = [
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
    "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad",
    "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco",
    "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
  ];

  if (enviado) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Solicitud Enviada!
            </h2>
            <p className="text-gray-600 mb-6">
              Hemos recibido tu solicitud de afiliación. Nuestro equipo la revisará 
              y te contactaremos pronto para los siguientes pasos.
            </p>
            <a
              href="/pages/inicio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
            >
              Volver al Inicio
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
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
            Afiliación al Partido
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Únete a Todo con el Pueblo y sé parte del cambio que el Perú necesita. 
            Tu participación es fundamental para construir un mejor país.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Descarga de ficha */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-red-100 rounded-2xl">
              <FileText className="h-12 w-12 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Descarga la Ficha de Afiliación
              </h2>
              <p className="text-gray-600">
                Descarga el formulario oficial, complétalo y preséntalo en tu comité más cercano.
              </p>
            </div>
            <a
              href="/documentos/ficha-afiliacion-tcp.pdf"
              download
              className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              Descargar PDF
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Columna izquierda: Requisitos y beneficios */}
          <div className="lg:col-span-1 space-y-8">
            {/* Requisitos */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Requisitos</h3>
              <div className="space-y-4">
                {requisitos.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
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
              <h3 className="text-xl font-bold text-gray-900 mb-6">Beneficios</h3>
              <div className="space-y-6">
                {beneficios.map((ben, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
                      {ben.icono}
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

          {/* Formulario de pre-registro */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Formulario de Pre-Registro
              </h2>
              <p className="text-gray-600 mb-8">
                Completa este formulario para iniciar tu proceso de afiliación en línea.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Datos personales */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Datos Personales</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombres *
                      </label>
                      <input
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Ingresa tus nombres"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellidos *
                      </label>
                      <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Ingresa tus apellidos"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        DNI *
                      </label>
                      <input
                        type="text"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                        maxLength={8}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="12345678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Nacimiento *
                      </label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Datos de contacto */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Datos de Contacto</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="+51 999 999 999"
                      />
                    </div>
                  </div>
                </div>

                {/* Ubicación */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Ubicación</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departamento *
                      </label>
                      <select
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Selecciona</option>
                        {departamentos.map((dep) => (
                          <option key={dep} value={dep}>{dep}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Provincia *
                      </label>
                      <input
                        type="text"
                        name="provincia"
                        value={formData.provincia}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Provincia"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Distrito *
                      </label>
                      <input
                        type="text"
                        name="distrito"
                        value={formData.distrito}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Distrito"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Av. / Jr. / Calle"
                    />
                  </div>
                </div>

                {/* Ocupación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ocupación
                  </label>
                  <input
                    type="text"
                    name="ocupacion"
                    value={formData.ocupacion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Profesión u ocupación"
                  />
                </div>

                {/* Términos */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="aceptaTerminos"
                    name="aceptaTerminos"
                    checked={formData.aceptaTerminos}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="aceptaTerminos" className="text-sm text-gray-600">
                    Declaro que la información proporcionada es veraz y acepto los{" "}
                    <a href="/pages/todo-con-el-pueblo" className="text-red-600 hover:underline">
                      estatutos y reglamentos
                    </a>{" "}
                    del partido Todo con el Pueblo. *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enviando ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
