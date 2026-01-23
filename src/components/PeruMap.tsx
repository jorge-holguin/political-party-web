"use client";

import { useState } from "react";

interface PeruMapProps {
  onDepartmentClick: (departmentId: string, departmentName: string) => void;
  selectedDepartment: string | null;
}

const departamentos = [
  { id: "amazonas", name: "Amazonas", path: "M180 120 L220 100 L240 130 L220 160 L180 150 Z" },
  { id: "ancash", name: "Áncash", path: "M120 200 L160 180 L180 210 L160 240 L120 230 Z" },
  { id: "apurimac", name: "Apurímac", path: "M200 340 L240 320 L260 350 L240 380 L200 370 Z" },
  { id: "arequipa", name: "Arequipa", path: "M180 420 L260 400 L300 450 L260 500 L180 480 Z" },
  { id: "ayacucho", name: "Ayacucho", path: "M220 360 L280 340 L300 390 L280 420 L220 400 Z" },
  { id: "cajamarca", name: "Cajamarca", path: "M140 140 L180 120 L200 160 L180 200 L140 180 Z" },
  { id: "callao", name: "Callao", path: "M95 295 L105 290 L110 300 L105 310 L95 305 Z" },
  { id: "cusco", name: "Cusco", path: "M260 340 L340 320 L380 380 L340 440 L260 420 Z" },
  { id: "huancavelica", name: "Huancavelica", path: "M180 320 L220 300 L240 340 L220 370 L180 350 Z" },
  { id: "huanuco", name: "Huánuco", path: "M200 200 L260 180 L280 220 L260 260 L200 240 Z" },
  { id: "ica", name: "Ica", path: "M140 380 L180 360 L200 400 L180 440 L140 420 Z" },
  { id: "junin", name: "Junín", path: "M200 260 L260 240 L280 290 L260 320 L200 300 Z" },
  { id: "lalibertad", name: "La Libertad", path: "M100 160 L160 140 L180 180 L160 220 L100 200 Z" },
  { id: "lambayeque", name: "Lambayeque", path: "M80 140 L120 120 L140 150 L120 180 L80 160 Z" },
  { id: "lima", name: "Lima", path: "M100 260 L160 240 L180 300 L160 360 L100 340 Z" },
  { id: "loreto", name: "Loreto", path: "M240 60 L380 40 L420 140 L380 220 L240 180 Z" },
  { id: "madrededios", name: "Madre de Dios", path: "M340 280 L440 260 L460 340 L420 380 L340 360 Z" },
  { id: "moquegua", name: "Moquegua", path: "M220 480 L280 460 L300 500 L280 530 L220 510 Z" },
  { id: "pasco", name: "Pasco", path: "M180 240 L220 220 L240 260 L220 290 L180 270 Z" },
  { id: "piura", name: "Piura", path: "M60 80 L120 60 L140 100 L120 140 L60 120 Z" },
  { id: "puno", name: "Puno", path: "M300 400 L380 380 L400 460 L380 520 L300 500 Z" },
  { id: "sanmartin", name: "San Martín", path: "M200 140 L260 120 L280 180 L260 220 L200 200 Z" },
  { id: "tacna", name: "Tacna", path: "M280 520 L340 500 L360 550 L340 580 L280 560 Z" },
  { id: "tumbes", name: "Tumbes", path: "M40 60 L80 50 L90 80 L80 100 L40 90 Z" },
  { id: "ucayali", name: "Ucayali", path: "M280 200 L380 180 L400 280 L380 340 L280 320 Z" },
];

export default function PeruMap({ onDepartmentClick, selectedDepartment }: PeruMapProps) {
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 500 600"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
      >
        {/* Fondo del mapa */}
        <rect x="0" y="0" width="500" height="600" fill="#f8fafc" rx="20" />
        
        {/* Océano Pacífico */}
        <path
          d="M0 0 L80 0 L60 100 L40 200 L60 300 L80 400 L60 500 L40 600 L0 600 Z"
          fill="#e0f2fe"
          opacity="0.5"
        />
        
        {/* Departamentos */}
        {departamentos.map((dept) => {
          const isSelected = selectedDepartment === dept.id;
          const isHovered = hoveredDepartment === dept.id;
          
          return (
            <g key={dept.id}>
              <path
                d={dept.path}
                fill={isSelected ? "#dc2626" : isHovered ? "#ef4444" : "#fecaca"}
                stroke={isSelected ? "#991b1b" : "#dc2626"}
                strokeWidth={isSelected ? 3 : 1.5}
                className="cursor-pointer transition-all duration-300"
                style={{
                  transform: isHovered || isSelected ? "scale(1.02)" : "scale(1)",
                  transformOrigin: "center",
                  filter: isHovered ? "brightness(1.1)" : "none",
                }}
                onMouseEnter={() => setHoveredDepartment(dept.id)}
                onMouseLeave={() => setHoveredDepartment(null)}
                onClick={() => onDepartmentClick(dept.id, dept.name)}
              />
              {/* Label del departamento */}
              {(isHovered || isSelected) && (
                <text
                  x={parseInt(dept.path.split(" ")[0].replace("M", "")) + 30}
                  y={parseInt(dept.path.split(" ")[1]) + 20}
                  fill={isSelected ? "#fff" : "#1f2937"}
                  fontSize="10"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {dept.name}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Título */}
        <text x="250" y="30" textAnchor="middle" fill="#1f2937" fontSize="16" fontWeight="bold">
          Mapa del Perú - Comités TCP
        </text>
        
        {/* Leyenda */}
        <g transform="translate(380, 500)">
          <rect x="0" y="0" width="100" height="80" fill="white" rx="8" stroke="#e5e7eb" />
          <text x="10" y="20" fill="#1f2937" fontSize="10" fontWeight="bold">Leyenda</text>
          <rect x="10" y="30" width="15" height="15" fill="#fecaca" stroke="#dc2626" />
          <text x="30" y="42" fill="#6b7280" fontSize="9">Sin seleccionar</text>
          <rect x="10" y="50" width="15" height="15" fill="#dc2626" stroke="#991b1b" />
          <text x="30" y="62" fill="#6b7280" fontSize="9">Seleccionado</text>
        </g>
      </svg>
      
      {/* Tooltip flotante */}
      {hoveredDepartment && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-gray-200">
          <p className="text-sm font-semibold text-gray-900">
            {departamentos.find(d => d.id === hoveredDepartment)?.name}
          </p>
          <p className="text-xs text-gray-500">Click para ver comités</p>
        </div>
      )}
    </div>
  );
}
