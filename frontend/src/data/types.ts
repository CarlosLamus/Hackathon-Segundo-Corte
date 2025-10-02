export type Linea = {
  id: string;
  slug: string;
  nombre: string;
  area: 'Ciberseguridad'|'IA y Ciencia de Datos'|'Redes'|'Arquitectura de Software'|'BI & Analítica'|'Desarrollo Web'|'Sistemas Embebidos'|'Gestión de Proyectos';
  nivel: 'Básico'|'Intermedio'|'Avanzado';
  descripcion: string;
  contenidos: string[];
  habilidades: string[];
  recursos: { titulo: string; url: string }[];
};
