import { Linea } from '../data/types';

export default function PlanSidebar({ plan, onRemove, onClear }: { plan: Linea[]; onRemove: (id:string)=>void; onClear: ()=>void; }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Mi plan</strong>
        <button className="btn btn-sm btn-outline-danger" onClick={onClear}>Limpiar</button>
      </div>
      <ul className="list-group list-group-flush">
        {plan.length === 0 && <li className="list-group-item text-muted">Vacío. Agrega líneas desde el catálogo.</li>}
        {plan.map(l => (
          <li key={l.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{l.nombre}</span>
            <button className="btn btn-sm btn-outline-secondary" onClick={()=>onRemove(l.id)}>Quitar</button>
          </li>
        ))}
      </ul>
      {plan.length > 0 && (
        <div className="card-body">
          <p className="mb-1"><strong>Total líneas:</strong> {plan.length}</p>
          <p className="mb-0">Exporta tu plan copiando este listado o realiza capturas.</p>
        </div>
      )}
    </div>
  );
}
