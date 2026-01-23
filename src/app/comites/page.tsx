"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Users, Phone, Mail, ChevronRight } from "lucide-react";

interface Provincia {
  nombre: string;
  departamento: string;
}

interface Comite {
  provincia: string;
  presidente: string;
  telefono: string;
  email: string;
  direccion: string;
  afiliados: number;
}

// Datos de ejemplo de comités por provincia
const comitesPorProvincia: Record<string, Comite> = {
  "LIMA": {
    provincia: "Lima",
    presidente: "Dr. Juan Carlos Pérez",
    telefono: "+51 999 888 777",
    email: "lima@todoconelpueblo.pe",
    direccion: "Av. Arequipa 1234, Lima",
    afiliados: 5420
  },
  "AREQUIPA": {
    provincia: "Arequipa",
    presidente: "Ing. María Rodríguez",
    telefono: "+51 999 777 666",
    email: "arequipa@todoconelpueblo.pe",
    direccion: "Calle Mercaderes 456, Arequipa",
    afiliados: 3200
  },
  "CUSCO": {
    provincia: "Cusco",
    presidente: "Lic. Pedro Quispe",
    telefono: "+51 999 666 555",
    email: "cusco@todoconelpueblo.pe",
    direccion: "Plaza de Armas 123, Cusco",
    afiliados: 2800
  },
  "TRUJILLO": {
    provincia: "Trujillo",
    presidente: "Dra. Ana López",
    telefono: "+51 999 555 444",
    email: "trujillo@todoconelpueblo.pe",
    direccion: "Jr. Pizarro 789, Trujillo",
    afiliados: 2500
  },
  "CHICLAYO": {
    provincia: "Chiclayo",
    presidente: "Dr. Carlos Mendoza",
    telefono: "+51 999 444 333",
    email: "chiclayo@todoconelpueblo.pe",
    direccion: "Av. Balta 321, Chiclayo",
    afiliados: 2100
  },
  "PIURA": {
    provincia: "Piura",
    presidente: "Ing. Rosa Fernández",
    telefono: "+51 999 333 222",
    email: "piura@todoconelpueblo.pe",
    direccion: "Calle Lima 654, Piura",
    afiliados: 1900
  },
  "HUANCAYO": {
    provincia: "Huancayo",
    presidente: "Lic. Miguel Torres",
    telefono: "+51 999 222 111",
    email: "huancayo@todoconelpueblo.pe",
    direccion: "Jr. Real 987, Huancayo",
    afiliados: 1700
  },
  "IQUITOS": {
    provincia: "Maynas",
    presidente: "Dr. Jorge Vásquez",
    telefono: "+51 999 111 000",
    email: "iquitos@todoconelpueblo.pe",
    direccion: "Malecón Tarapacá 159, Iquitos",
    afiliados: 1500
  },
};

// Colores por departamento
const departamentoColores: Record<string, string> = {
  "AMAZONAS": "#ef4444",
  "ANCASH": "#f97316",
  "APURIMAC": "#eab308",
  "AREQUIPA": "#22c55e",
  "AYACUCHO": "#14b8a6",
  "CAJAMARCA": "#3b82f6",
  "CALLAO": "#8b5cf6",
  "CUSCO": "#ec4899",
  "HUANCAVELICA": "#f43f5e",
  "HUANUCO": "#06b6d4",
  "ICA": "#84cc16",
  "JUNIN": "#a855f7",
  "LA LIBERTAD": "#0ea5e9",
  "LAMBAYEQUE": "#10b981",
  "LIMA": "#dc2626",
  "LORETO": "#059669",
  "MADRE DE DIOS": "#7c3aed",
  "MOQUEGUA": "#d946ef",
  "PASCO": "#f59e0b",
  "PIURA": "#64748b",
  "PUNO": "#0891b2",
  "SAN MARTIN": "#65a30d",
  "TACNA": "#4f46e5",
  "TUMBES": "#be185d",
  "UCAYALI": "#0d9488",
};

export default function ComitesPage() {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedProvincia, setSelectedProvincia] = useState<string | null>(null);
  const [hoveredProvincia, setHoveredProvincia] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    fetch("/peru_provincial_simple.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading GeoJSON:", err));
  }, []);

  // Función para convertir coordenadas geográficas a coordenadas SVG
  const projectCoordinates = (coords: number[]): [number, number] => {
    const [lon, lat] = coords;
    // Bounds aproximados de Perú
    const minLon = -81.5;
    const maxLon = -68.5;
    const minLat = -18.5;
    const maxLat = 0;
    
    const width = 600;
    const height = 700;
    
    const x = ((lon - minLon) / (maxLon - minLon)) * width;
    const y = ((maxLat - lat) / (maxLat - minLat)) * height;
    
    return [x, y];
  };

  // Función para generar el path SVG de un polígono
  const generatePath = (coordinates: number[][][]): string => {
    return coordinates
      .map((ring) => {
        const points = ring.map((coord) => {
          const [x, y] = projectCoordinates(coord);
          return `${x},${y}`;
        });
        return `M${points.join("L")}Z`;
      })
      .join(" ");
  };

  const comiteActual = selectedProvincia ? comitesPorProvincia[selectedProvincia] : null;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comités Provinciales
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Presencia en todo el Perú. Selecciona una provincia en el mapa para ver 
            la información del comité local.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mapa */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-red-600" />
              Mapa del Perú
            </h2>
            
            <div className="relative bg-gray-50 rounded-xl overflow-hidden" style={{ minHeight: "500px" }}>
              {geoData ? (
                <svg
                  ref={svgRef}
                  viewBox="0 0 600 700"
                  className="w-full h-auto"
                  style={{ maxHeight: "600px" }}
                >
                  {geoData.features.map((feature: any, index: number) => {
                    const nombreProv = feature.properties.NOMBPROV;
                    const departamento = feature.properties.FIRST_NOMB;
                    const isSelected = selectedProvincia === nombreProv;
                    const isHovered = hoveredProvincia === nombreProv;
                    const hasComite = comitesPorProvincia[nombreProv];
                    
                    let pathD = "";
                    if (feature.geometry.type === "Polygon") {
                      pathD = generatePath(feature.geometry.coordinates);
                    } else if (feature.geometry.type === "MultiPolygon") {
                      pathD = feature.geometry.coordinates
                        .map((poly: number[][][]) => generatePath(poly))
                        .join(" ");
                    }

                    const baseColor = departamentoColores[departamento] || "#94a3b8";
                    
                    return (
                      <path
                        key={index}
                        d={pathD}
                        fill={isSelected ? "#dc2626" : isHovered ? "#fecaca" : hasComite ? baseColor : "#e2e8f0"}
                        stroke={isSelected || isHovered ? "#991b1b" : "#ffffff"}
                        strokeWidth={isSelected || isHovered ? 2 : 0.5}
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredProvincia(nombreProv)}
                        onMouseLeave={() => setHoveredProvincia(null)}
                        onClick={() => setSelectedProvincia(nombreProv)}
                      >
                        <title>{`${nombreProv} - ${departamento}`}</title>
                      </path>
                    );
                  })}
                </svg>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[500px]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Cargando mapa...</p>
                  </div>
                </div>
              )}
            </div>

            {hoveredProvincia && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm text-red-800 font-medium">
                  {hoveredProvincia}
                  {comitesPorProvincia[hoveredProvincia] && (
                    <span className="ml-2 text-red-600">• Comité activo</span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Panel de información */}
          <div className="space-y-6">
            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {Object.keys(comitesPorProvincia).length}
                    </p>
                    <p className="text-sm text-gray-500">Comités Activos</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {Object.values(comitesPorProvincia).reduce((acc, c) => acc + c.afiliados, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Afiliados Total</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalle del comité seleccionado */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {comiteActual ? `Comité ${comiteActual.provincia}` : "Selecciona una provincia"}
              </h3>
              
              {comiteActual ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Presidente</p>
                      <p className="font-medium text-gray-900">{comiteActual.presidente}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="font-medium text-gray-900">{comiteActual.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{comiteActual.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Dirección</p>
                      <p className="font-medium text-gray-900">{comiteActual.direccion}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Afiliados registrados</span>
                      <span className="text-2xl font-bold text-red-600">
                        {comiteActual.afiliados.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Haz clic en una provincia del mapa para ver los detalles del comité
                  </p>
                </div>
              )}
            </div>

            {/* Lista de comités */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Todos los Comités
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(comitesPorProvincia).map(([key, comite]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedProvincia(key)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      selectedProvincia === key
                        ? "bg-red-50 border-red-200 border"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedProvincia === key ? "bg-red-600" : "bg-gray-400"
                      }`}></div>
                      <span className="font-medium text-gray-900">{comite.provincia}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
