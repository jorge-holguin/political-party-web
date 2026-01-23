"use client";

import React, { useEffect, useState } from "react";
import DocumentModal from "./DocumentModal";
import { documentosInstitucionales } from "@/data/documentos";

// Función para renderizar markdown simple
function renderMarkdown(text: string) {
  const lines = text.trim().split("\n");
  const elements: React.ReactElement[] = [];
  let key = 0;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<br key={key++} />);
    } else if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-2xl font-bold text-gray-900 mb-4 mt-6">
          {trimmed.replace("# ", "")}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-xl font-bold text-gray-900 mt-6 mb-3">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-gray-800 mt-4 mb-2">
          {trimmed.replace("### ", "")}
        </h3>
      );
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <li key={key++} className="text-gray-700 ml-4">
          {trimmed.replace("- ", "")}
        </li>
      );
    } else if (trimmed.startsWith("---")) {
      elements.push(<hr key={key++} className="my-6 border-gray-200" />);
    } else if (/^\d+\./.test(trimmed)) {
      elements.push(
        <li key={key++} className="text-gray-700 ml-4 list-decimal">
          {trimmed.replace(/^\d+\.\s*/, "")}
        </li>
      );
    } else if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
      elements.push(
        <p key={key++} className="text-gray-500 italic mb-3">
          {trimmed.replace(/\*/g, "")}
        </p>
      );
    } else {
      // Procesar negritas **texto**
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      const content = parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="text-gray-900">{part.replace(/\*\*/g, "")}</strong>;
        }
        return part;
      });
      elements.push(
        <p key={key++} className="text-gray-700 mb-3 leading-relaxed">
          {content}
        </p>
      );
    }
  });

  return elements;
}

export default function DocumentosModals() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay un hash en la URL
    const hash = window.location.hash.replace("#", "");
    if (hash && Object.keys(documentosInstitucionales).some(key => 
      documentosInstitucionales[key as keyof typeof documentosInstitucionales].id === hash
    )) {
      setActiveModal(hash);
    }

    // Listener para cambios de hash
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && Object.keys(documentosInstitucionales).some(key => 
        documentosInstitucionales[key as keyof typeof documentosInstitucionales].id === newHash
      )) {
        setActiveModal(newHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const closeModal = () => {
    setActiveModal(null);
    // Limpiar el hash de la URL
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      {Object.entries(documentosInstitucionales).map(([key, doc]) => (
        <DocumentModal
          key={key}
          isOpen={activeModal === doc.id}
          onClose={closeModal}
          title={doc.titulo}
        >
          <div className="prose prose-gray max-w-none">
            {renderMarkdown(doc.contenido)}
          </div>
        </DocumentModal>
      ))}
    </>
  );
}

// Hook para abrir modales desde otros componentes
export function useDocumentModal() {
  const openModal = (id: string) => {
    window.location.hash = id;
  };

  return { openModal };
}
