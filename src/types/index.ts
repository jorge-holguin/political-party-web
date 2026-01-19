export interface Noticia {
  id: string;
  titulo: string;
  contenido: string;
  resumen: string;
  imagen: string;
  fecha: Date;
  autor: string;
  categoria: string;
  slug: string;
  publicado: boolean;
}

export interface Inscripcion {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  fichaArchivo?: string;
  fechaInscripcion: Date;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
}

export interface Contacto {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  fecha: Date;
}
