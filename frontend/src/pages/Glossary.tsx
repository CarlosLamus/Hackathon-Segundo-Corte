import { useMemo, useState } from 'react';

const TERMS: { term: string; def: string; }[] = [
  { term:'API REST', def:'Interfaz que usa HTTP para operaciones CRUD sobre recursos.'},
  { term:'JWT', def:'Token firmado usado para autenticar clientes sin guardar sesión en servidor.'},
  { term:'XSS', def:'Inyección de scripts en el navegador por salida no saneada.'},
  { term:'VLSM', def:'Máscaras de subred de longitud variable para optimizar direccionamiento.'},
  { term:'ETL', def:'Proceso de extracción, transformación y carga de datos.'},
  { term:'A11y', def:'Accesibilidad web'},
  { term:'CQRS', def:'Separación de operaciones de lectura y escritura en sistemas.'},
  { term:'DDD', def:'Diseño dirigido por el dominio'},
  { term:'ROC-AUC', def:'Área bajo la curva ROC; mide separabilidad de clases.'}
];

export default function Glossary(){
  const [q,setQ] = useState('');
  const filtered = useMemo(()=>TERMS.filter(t=> (t.term+t.def).toLowerCase().includes(q.toLowerCase())),[q]);
  return (
    <div className="container py-4">
      <h2 className="mb-3">Glosario</h2>
      <input className="form-control mb-3" placeholder="buscar..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="list-group">
        {filtered.map((t,i)=>(
          <div className="list-group-item" key={i}>
            <strong>{t.term}:</strong> {t.def}
          </div>
        ))}
        {filtered.length===0 && <p className="text-muted">Sin resultados</p>}
      </div>
    </div>
  );
}
