# Estructura de Carpetas - Partido Político Web

## 📁 Estructura Recomendada

```
src/
├── app/                          # App Router de Next.js
│   ├── (routes)/                 # Rutas agrupadas
│   │   ├── prensa/              # Sección de noticias
│   │   │   ├── page.tsx         # Página principal de prensa
│   │   │   └── [slug]/          # Página dinámica para noticias individuales
│   │   └── inscribete/          # Formulario de inscripción
│   │       └── page.tsx
│   ├── api/                      # Endpoints de API
│   │   ├── auth/                # Autenticación
│   │   ├── noticias/            # CRUD de noticias
│   │   ├── inscripciones/       # Gestión de inscripciones
│   │   └── upload/              # Subida de archivos
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Home (One Page)
│
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes base (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── modal.tsx
│   │   ├── carousel.tsx
│   │   └── ...
│   ├── layout/                  # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── forms/                   # Formularios
│   │   ├── InscripcionForm.tsx
│   │   └── ContactoForm.tsx
│   └── features/                # Componentes específicos
│       ├── NoticiaCard.tsx
│       ├── NoticiaModal.tsx
│       └── SocialLinks.tsx
│
├── sections/                     # Secciones del One Page
│   ├── HeroSection.tsx          # Inicio
│   ├── ConocenosSection.tsx     # Conócenos
│   ├── PrensaSection.tsx        # Prensa (con carrusel)
│   ├── InscribeteSection.tsx    # Inscribirse
│   ├── ContactoSection.tsx      # Contacto
│   └── SocialSection.tsx        # Redes sociales
│
├── lib/                         # Utilidades y configuración
│   ├── api.ts                   # Cliente de API
│   ├── auth.ts                  # Configuración de auth
│   ├── db.ts                    # Conexión a base de datos
│   ├── utils.ts                 # Funciones helper
│   └── validations.ts           # Validaciones de formularios
│
├── types/                       # Definiciones de TypeScript
│   ├── noticia.ts
│   ├── inscripcion.ts
│   └── api.ts
│
├── hooks/                       # Custom hooks
│   ├── useNoticias.ts
│   ├── useInscripcion.ts
│   └── useScroll.ts
│
├── constants/                   # Constantes y configuración
│   ├── navigation.ts            # Items de navegación
│   ├── social.ts               # Redes sociales
│   └── api.ts                  # URLs de API
│
└── public/                      # Archivos estáticos
    ├── images/
    │   ├── hero/
    │   ├── noticias/
    │   └── logos/
    ├── documents/               # Documentos descargables
    └── uploads/                 # Archivos subidos por usuarios
```

## 🎯 Explicación de Carpetas Principales

### `/app/` - App Router
- **page.tsx**: Tu one-page website principal
- **(routes)/**: Rutas agrupadas que no afectan el layout principal
- **api/**: Todos tus endpoints de backend

### `/components/` - Componentes Reutilizables
- **ui/**: Componentes base (botones, modales, carruseles)
- **layout/**: Header, footer, navegación
- **forms/**: Formularios específicos
- **features/**: Componentes con lógica de negocio

### `/sections/` - Secciones del One Page
Cada sección es un componente grande que se renderiza en la página principal

### `/lib/` - Lógica Centralizada
- Configuración de APIs, base de datos, utilidades

### `/types/` - TypeScript
Definiciones de tipos para mantener tu código tipado

## 🔄 Flujo de Navegación

### One Page Experience
1. **Navegación suave**: Scroll a secciones con IDs
2. **Modal para noticias**: Click en tarjeta abre modal sin cambiar página
3. **Formularios integrados**: Todo en la misma página

### Rutas Adicionales
- `/prensa`: Página dedicada a todas las noticias
- `/prensa/[slug]`: Página individual para SEO
- `/inscribete`: Página dedicada al formulario

## 🚀 Implementación Sugerida

### 1. Navegación Smooth Scroll
```typescript
// constants/navigation.ts
export const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'conocenos', label: 'Conócenos' },
  { id: 'prensa', label: 'Prensa' },
  { id: 'inscribete', label: 'Inscríbete' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'redes', label: 'Redes Sociales' }
]
```

### 2. Carrusel Interactivo
- Usar react-slick o framer-motion para el carrusel
- Implementar drag con mouse/touch
- Modal para vista detallada

### 3. API Structure
```typescript
// api/noticias/route.ts - GET, POST
// api/noticias/[id]/route.ts - GET, PUT, DELETE
// api/inscripciones/route.ts - POST
// api/upload/route.ts - POST (para fichas de inscripción)
```

## 📋 Próximos Pasos

1. **Crear la estructura base** de carpetas
2. **Configurar el carrusel** de noticias
3. **Implementar los modales** para vista detallada
4. **Crear los formularios** con validación
5. **Configurar las APIs** para el backend

¿Quieres que te ayude a crear alguna carpeta específica o empezar con algún componente en particular?
