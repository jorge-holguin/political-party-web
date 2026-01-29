"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Building2, ChevronRight, ChevronDown } from "lucide-react";
import { ComitesSkeleton } from "@/components/SkeletonLoader";

interface Comite {
  id: string;
  provincia: string;
  region: string;
  capital: string;
  direccion: string | null;
}

// Colores por departamento para el mapa
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
  const [comites, setComites] = useState<Comite[]>([]);
  const [selectedProvincia, setSelectedProvincia] = useState<string | null>(null);
  const [hoveredProvincia, setHoveredProvincia] = useState<string | null>(null);
  const [regionExpandida, setRegionExpandida] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Cargar GeoJSON y comités de Notion
    Promise.all([
      fetch("/peru_provincial_simple.geojson").then((res) => res.json()),
      fetch("/api/comites").then((res) => res.json())
    ])
      .then(([geoJson, comitesData]) => {
        setGeoData(geoJson);
        if (Array.isArray(comitesData)) {
          setComites(comitesData);
        }
      })
      .catch((err) => console.error("Error loading data:", err))
      .finally(() => setCargando(false));
  }, []);

  // Crear mapa de comités por provincia (normalizado a mayúsculas)
  const comitesPorProvincia: Record<string, Comite> = {};
  comites.forEach((c) => {
    if (c.provincia) {
      comitesPorProvincia[c.provincia.toUpperCase()] = c;
    }
  });

  // Agrupar comités por región
  const comitesPorRegion: Record<string, Comite[]> = {};
  comites.forEach((c) => {
    if (c.region) {
      if (!comitesPorRegion[c.region]) {
        comitesPorRegion[c.region] = [];
      }
      comitesPorRegion[c.region].push(c);
    }
  });

  // Función para convertir coordenadas geográficas a coordenadas SVG
  const projectCoordinates = (coords: number[]): [number, number] => {
    const [lon, lat] = coords;
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

  const comiteSeleccionado = selectedProvincia ? comitesPorProvincia[selectedProvincia] : null;

  if (cargando) {
    return <ComitesSkeleton />;
  }

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
                  {/* Renderizar provincias */}
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
                        stroke={isSelected || isHovered ? "#991b1b" : "#374151"}
                        strokeWidth={isSelected || isHovered ? 2 : 0.8}
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
                    <span className="ml-2 text-red-600">• Comité registrado</span>
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
                      {comites.length}
                    </p>
                    <p className="text-sm text-gray-500">Comités Registrados</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {Object.keys(comitesPorRegion).length}
                    </p>
                    <p className="text-sm text-gray-500">Regiones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalle del comité seleccionado */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {comiteSeleccionado ? `Comité ${comiteSeleccionado.provincia}` : "Selecciona una provincia"}
              </h3>
              
              {comiteSeleccionado ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Provincia</p>
                      <p className="font-medium text-gray-900">{comiteSeleccionado.provincia}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Región</p>
                      <p className="font-medium text-gray-900">{comiteSeleccionado.region}</p>
                    </div>
                  </div>
                  {comiteSeleccionado.capital && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Capital</p>
                        <p className="font-medium text-gray-900">{comiteSeleccionado.capital}</p>
                      </div>
                    </div>
                  )}
                  {comiteSeleccionado.direccion && (
                    <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Dirección del Local</p>
                        <p className="font-medium text-gray-900">{comiteSeleccionado.direccion}</p>
                      </div>
                    </div>
                  )}
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

            {/* Lista de comités por región */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Comités por Región
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {Object.entries(comitesPorRegion)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([region, comitesRegion]) => (
                  <div key={region} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setRegionExpandida(regionExpandida === region ? null : region)}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                        <span className="font-medium text-gray-900">{region}</span>
                        <span className="text-sm text-gray-500">({comitesRegion.length})</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                        regionExpandida === region ? "rotate-180" : ""
                      }`} />
                    </button>
                    
                    {regionExpandida === region && (
                      <div className="border-t border-gray-100 bg-gray-50">
                        {comitesRegion.map((comite) => (
                          <button
                            key={comite.id}
                            onClick={() => setSelectedProvincia(comite.provincia.toUpperCase())}
                            className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 transition-colors ${
                              selectedProvincia === comite.provincia.toUpperCase() ? "bg-red-50" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                selectedProvincia === comite.provincia.toUpperCase() ? "bg-red-600" : "bg-gray-400"
                              }`}></div>
                              <span className="text-sm text-gray-700">{comite.provincia}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {comites.length === 0 && (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    La información de los comités se actualizará próximamente.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
