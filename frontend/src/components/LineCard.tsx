import { Link } from 'react-router-dom';
import { Linea } from '../data/types';

export default function LineCard({ l, onAdd }: { l: Linea; onAdd: (l: Linea) => void }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{l.nombre}</h5>
          <span className="badge bg-secondary mb-2">{l.area}</span>
          <span className="badge bg-info text-dark mb-2">{l.nivel}</span>
          <p className="card-text flex-grow-1">{l.descripcion}</p>
          <div className="d-flex gap-2">
            <Link className="btn btn-primary" to={`/lines/${l.slug}`}>Ver detalle</Link>
            <button className="btn btn-outline-success" onClick={() => onAdd(l)}>Agregar a mi plan</button>
          </div>
        </div>
      </div>
    </div>
  );
}
