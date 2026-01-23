"use client";

import { useState } from "react";
import { FileText, Book, ScrollText, ChevronDown, ChevronRight, Download } from "lucide-react";

interface DocumentoItem {
  id: string;
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
  contenido: string;
}

const documentos: DocumentoItem[] = [
  {
    id: "estatuto",
    titulo: "Estatuto del Partido",
    descripcion: "Documento fundamental que establece las normas de organización y funcionamiento del partido.",
    icono: <Book className="h-8 w-8" />,
    contenido: `
# ESTATUTO DEL PARTIDO POLÍTICO TODO CON EL PUEBLO

## TÍTULO I: DISPOSICIONES GENERALES

### Artículo 1°.- Denominación
El partido político se denomina "TODO CON EL PUEBLO", pudiendo usar las siglas "TCP".

### Artículo 2°.- Domicilio
El domicilio legal del partido se encuentra en la ciudad de Lima, pudiendo establecer sedes en todo el territorio nacional.

### Artículo 3°.- Ámbito de Acción
El partido tiene ámbito de acción nacional y puede participar en procesos electorales a nivel nacional, regional y local.

### Artículo 4°.- Fines y Objetivos
Son fines y objetivos del partido:
a) Representar la voluntad de los ciudadanos
b) Contribuir a la formación de la voluntad política del pueblo
c) Participar en los procesos electorales
d) Promover la participación ciudadana
e) Contribuir a la gobernabilidad del país

## TÍTULO II: DE LOS AFILIADOS

### Artículo 5°.- Requisitos de Afiliación
Pueden afiliarse al partido los ciudadanos peruanos mayores de 18 años que:
a) Se encuentren en pleno ejercicio de sus derechos civiles
b) No pertenezcan a otro partido político
c) Acepten los principios y estatutos del partido

### Artículo 6°.- Derechos de los Afiliados
Son derechos de los afiliados:
a) Participar con voz y voto en las asambleas
b) Elegir y ser elegidos para cargos partidarios
c) Ser informados sobre las actividades del partido
d) Presentar iniciativas y propuestas

### Artículo 7°.- Deberes de los Afiliados
Son deberes de los afiliados:
a) Cumplir los estatutos y acuerdos del partido
b) Contribuir al fortalecimiento institucional
c) Participar activamente en las actividades partidarias
d) Mantener conducta ética y democrática

## TÍTULO III: DE LA ORGANIZACIÓN

### Artículo 8°.- Estructura Orgánica
El partido se organiza en los siguientes niveles:
a) Nivel Nacional: Congreso Nacional, Comité Ejecutivo Nacional
b) Nivel Regional: Comités Regionales
c) Nivel Provincial: Comités Provinciales
d) Nivel Distrital: Comités Distritales

### Artículo 9°.- Congreso Nacional
El Congreso Nacional es el máximo órgano deliberativo del partido y se reúne ordinariamente cada dos años.

### Artículo 10°.- Comité Ejecutivo Nacional
El Comité Ejecutivo Nacional es el órgano de dirección del partido y está conformado por:
a) Secretario General
b) Sub Secretario General
c) Secretarios Nacionales
    `
  },
  {
    id: "reglamento",
    titulo: "Reglamento Interno",
    descripcion: "Normas específicas que regulan el funcionamiento interno y los procedimientos del partido.",
    icono: <ScrollText className="h-8 w-8" />,
    contenido: `
# REGLAMENTO INTERNO DEL PARTIDO TODO CON EL PUEBLO

## CAPÍTULO I: DISPOSICIONES GENERALES

### Artículo 1°.- Objeto
El presente reglamento tiene por objeto establecer las normas específicas que regulan el funcionamiento interno del partido.

### Artículo 2°.- Alcance
Las disposiciones contenidas en este reglamento son de aplicación obligatoria para todos los afiliados y órganos del partido.

## CAPÍTULO II: DEL PROCESO DE AFILIACIÓN

### Artículo 3°.- Solicitud de Afiliación
La solicitud de afiliación se presenta ante el comité correspondiente, adjuntando:
a) Ficha de afiliación debidamente llenada
b) Copia del DNI
c) Declaración jurada de no pertenecer a otro partido

### Artículo 4°.- Evaluación
El comité evaluará la solicitud en un plazo máximo de 15 días hábiles.

### Artículo 5°.- Registro
Una vez aprobada la afiliación, el nuevo militante será inscrito en el padrón de afiliados.

## CAPÍTULO III: DE LAS SESIONES

### Artículo 6°.- Tipos de Sesiones
Las sesiones pueden ser:
a) Ordinarias: Se realizan según calendario establecido
b) Extraordinarias: Se convocan por asuntos urgentes

### Artículo 7°.- Quórum
El quórum para las sesiones es la mitad más uno de los miembros.

### Artículo 8°.- Acuerdos
Los acuerdos se adoptan por mayoría simple, salvo los casos que requieran mayoría calificada.

## CAPÍTULO IV: DEL RÉGIMEN DISCIPLINARIO

### Artículo 9°.- Faltas
Constituyen faltas:
a) Incumplimiento de los estatutos
b) Conducta contraria a los principios del partido
c) Difamación de los miembros o del partido

### Artículo 10°.- Sanciones
Las sanciones aplicables son:
a) Amonestación verbal
b) Amonestación escrita
c) Suspensión temporal
d) Expulsión
    `
  },
  {
    id: "sintesis",
    titulo: "Síntesis del Símbolo",
    descripcion: "Significado y representación del símbolo del partido Todo con el Pueblo.",
    icono: <FileText className="h-8 w-8" />,
    contenido: `
# SÍNTESIS DEL SÍMBOLO PARTIDARIO

## El Símbolo de Todo con el Pueblo

El símbolo del partido TODO CON EL PUEBLO representa los valores fundamentales y la visión que guía nuestra organización política.

## Elementos del Símbolo

### Los Colores
- **Rojo**: Representa la pasión por el servicio al pueblo, la valentía para defender los intereses de los ciudadanos y la fuerza de nuestra convicción.
- **Blanco**: Simboliza la transparencia, la paz y la pureza de nuestras intenciones al servicio de la nación.
- **Negro**: Representa la firmeza, la seriedad y el compromiso inquebrantable con nuestros principios.

### La Forma
El diseño del símbolo incorpora elementos que representan:
- **Unidad**: La integración de todos los peruanos sin distinción
- **Progreso**: El avance hacia un futuro mejor para todos
- **Democracia**: El respeto por la voluntad popular

## Significado Histórico

El símbolo fue adoptado en la fundación del partido, reflejando el compromiso con:

1. **El Pueblo**: Como centro de toda acción política
2. **La Justicia Social**: Como objetivo fundamental
3. **El Desarrollo Nacional**: Como meta común

## Uso del Símbolo

El símbolo debe ser utilizado conforme a las siguientes normas:
- Mantener las proporciones originales
- Respetar los colores institucionales
- No alterar ni modificar sus elementos
- Usar solo en actividades oficiales del partido

## Representación

El símbolo representa nuestra promesa de trabajar "Todo con el Pueblo", es decir, con la participación activa de todos los ciudadanos en la construcción de un Perú más justo y próspero.
    `
  }
];

export default function TodoConElPuebloPage() {
  const [documentoActivo, setDocumentoActivo] = useState<string | null>(null);

  const renderContenido = (contenido: string) => {
    const lines = contenido.trim().split("\n");
    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={index} />;
      
      if (trimmed.startsWith("# ")) {
        return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">{trimmed.replace("# ", "")}</h1>;
      }
      if (trimmed.startsWith("## ")) {
        return <h2 key={index} className="text-2xl font-bold text-gray-800 mb-4 mt-6">{trimmed.replace("## ", "")}</h2>;
      }
      if (trimmed.startsWith("### ")) {
        return <h3 key={index} className="text-xl font-semibold text-gray-700 mb-3 mt-4">{trimmed.replace("### ", "")}</h3>;
      }
      if (trimmed.startsWith("- **")) {
        const match = trimmed.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          return (
            <li key={index} className="ml-6 mb-2 text-gray-600">
              <strong className="text-gray-800">{match[1]}</strong>
              {match[2] && `: ${match[2]}`}
            </li>
          );
        }
      }
      if (trimmed.match(/^[a-z]\)/)) {
        return <li key={index} className="ml-8 mb-1 text-gray-600 list-none">{trimmed}</li>;
      }
      if (trimmed.match(/^\d+\./)) {
        return <li key={index} className="ml-6 mb-2 text-gray-600 list-decimal">{trimmed.replace(/^\d+\.\s*/, "")}</li>;
      }
      
      return <p key={index} className="text-gray-600 mb-3">{trimmed}</p>;
    });
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Todo con el Pueblo
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Conoce los documentos fundamentales que rigen nuestra organización 
            y definen nuestra identidad política.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Cards de documentos */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {documentos.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setDocumentoActivo(documentoActivo === doc.id ? null : doc.id)}
              className={`text-left bg-white rounded-2xl shadow-lg p-8 border-2 transition-all hover:shadow-xl ${
                documentoActivo === doc.id 
                  ? "border-red-500 ring-2 ring-red-200" 
                  : "border-transparent hover:border-red-200"
              }`}
            >
              <div className={`p-4 rounded-xl mb-4 inline-block ${
                documentoActivo === doc.id ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}>
                {doc.icono}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.titulo}</h3>
              <p className="text-gray-600 text-sm mb-4">{doc.descripcion}</p>
              <div className="flex items-center gap-2 text-red-600 font-medium">
                {documentoActivo === doc.id ? "Ocultar documento" : "Ver documento"}
                {documentoActivo === doc.id ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Contenido del documento activo */}
        {documentoActivo && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                  {documentos.find(d => d.id === documentoActivo)?.icono}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {documentos.find(d => d.id === documentoActivo)?.titulo}
                </h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Download className="h-4 w-4" />
                Descargar PDF
              </button>
            </div>
            <div className="p-8 max-h-[600px] overflow-y-auto">
              {renderContenido(documentos.find(d => d.id === documentoActivo)?.contenido || "")}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">¿Quieres formar parte del cambio?</h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Únete a Todo con el Pueblo y sé parte de una organización comprometida 
            con el bienestar de todos los peruanos.
          </p>
          <a
            href="/pages/afiliados"
            className="inline-block px-8 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Afíliate Ahora
          </a>
        </div>
      </div>
    </div>
  );
}
