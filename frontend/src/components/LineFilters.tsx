import { useId } from 'react';

export default function LineFilters({
  q, setQ, area, setArea, nivel, setNivel
}: { q: string; setQ: (v:string)=>void; area: string; setArea: (v:string)=>void; nivel: string; setNivel: (v:string)=>void; }) {
  const qid = useId(); const aid = useId(); const nid = useId();
  return (
    <div className="card p-3 shadow-sm mb-3">
      <div className="row g-3 align-items-end">
        <div className="col-md-6">
          <label htmlFor={qid} className="form-label">Buscar</label>
          <input id={qid} className="form-control" placeholder="palabra clave..." value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor={aid} className="form-label">Área</label>
          <select id={aid} className="form-select" value={area} onChange={e=>setArea(e.target.value)}>
            <option value="">Todas</option>
            <option>Ciberseguridad</option>
            <option>IA y Ciencia de Datos</option>
            <option>Redes</option>
            <option>Arquitectura de Software</option>
            <option>BI & Analítica</option>
            <option>Desarrollo Web</option>
            <option>Sistemas Embebidos</option>
            <option>Gestión de Proyectos</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor={nid} className="form-label">Nivel</label>
          <select id={nid} className="form-select" value={nivel} onChange={e=>setNivel(e.target.value)}>
            <option value="">Todos</option>
            <option>Básico</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
          </select>
        </div>
      </div>
    </div>
  );
}
