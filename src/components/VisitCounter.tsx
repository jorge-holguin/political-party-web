"use client";

import { useState, useEffect } from "react";
import { Users, Eye } from "lucide-react";

interface VisitData {
  total: number;
  unique: number;
}

export default function VisitCounter() {
  const [visits, setVisits] = useState<VisitData | null>(null);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const response = await fetch("/api/visits", {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          setVisits({ total: data.total, unique: data.unique });
        }
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    trackVisit();
  }, []);

  if (!visits) return null;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-PE").format(num);
  };

  return (
    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4" />
        <span>{formatNumber(visits.total)} visitas</span>
      </div>
      <div className="w-px h-4 bg-gray-300"></div>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <span>{formatNumber(visits.unique)} visitantes únicos</span>
      </div>
    </div>
  );
}
