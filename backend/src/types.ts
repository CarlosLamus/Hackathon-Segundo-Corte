export type Role = 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
}

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  description: string;
  status: IncidentStatus;
  reportedBy: string; // userId
  createdAt: string;
  updatedAt: string;
}

// Línea de profundización (para exponer por API)
export interface Linea {
  id: string;
  slug: string;
  nombre: string;
  area: 'Ciberseguridad'|'IA y Ciencia de Datos'|'Redes'|'Arquitectura de Software'|'BI & Analítica'|'Desarrollo Web'|'Sistemas Embebidos'|'Gestión de Proyectos';
  nivel: 'Básico'|'Intermedio'|'Avanzado';
  descripcion: string;
  contenidos: string[];
  habilidades: string[];
  recursos: { titulo: string; url: string }[];
}


export type QuizOption = { id: string; text: string; correct: boolean; };
export type QuizQuestion = { id: string; prompt: string; options: QuizOption[]; explanation: string; };
export type Module = { titulo: string; objetivos: string[]; leccion: string; ejemplosCodigo: { lenguaje: string; codigo: string; }[]; practicas: string[]; };

declare global { interface Array<T> { } } // no-op to keep TS happy in some setups
