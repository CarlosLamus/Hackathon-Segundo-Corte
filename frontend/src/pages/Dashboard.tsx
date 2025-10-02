import { useEffect, useState } from 'react';
import { api } from '../services/api';

type Severity = 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL';
type Incident = { id: string; title: string; severity: Severity; description: string; status: 'OPEN'|'IN_PROGRESS'|'RESOLVED'; };

const sevOpts: Severity[] = ['LOW','MEDIUM','HIGH','CRITICAL'];

export default function Dashboard() {
  const [items, setItems] = useState<Incident[]>([]);
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<Severity>('LOW');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const r = await api.get('/incidentes');
      setItems(r.data);
    } catch (e: any) { setError(e?.message || 'Error cargando incidentes'); }
  }
  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault(); setError(null);
    try {
      const r = await api.post('/incidentes', { title, severity, description });
      setTitle(''); setSeverity('LOW'); setDescription('');
      setItems(prev => [r.data, ...prev]);
    } catch (e: any) { setError(e?.message || 'Error creando incidente'); }
  }
  async function update(id: string, patch: Partial<Incident>) {
    try {
      const r = await api.put(`/incidentes/${id}`, patch);
      setItems(prev => prev.map(x => x.id === id ? r.data : x));
    } catch (e: any) { setError(e?.message || 'Error actualizando'); }
  }
  async function remove(id: string) {
    try {
      await api.del(`/incidentes/${id}`);
      setItems(prev => prev.filter(x => x.id !== id));
    } catch (e: any) { setError(e?.message || 'Error eliminando'); }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Gestión de Incidentes</h2>
      <form onSubmit={create} className="card p-3 shadow-sm mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Título</label>
            <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Severidad</label>
            <select className="form-select" value={severity} onChange={e => setSeverity(e.target.value as Severity)}>
              {sevOpts.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Descripción</label>
            <input className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary w-100">Crear</button>
          </div>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead><tr><th>Título</th><th>Severidad</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id}>
                <td>{i.title}</td>
                <td>{i.severity}</td>
                <td>
                  <select value={i.status} className="form-select" onChange={e => update(i.id, { status: e.target.value as any })}>
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>
                </td>
                <td><button className="btn btn-sm btn-outline-danger" onClick={() => remove(i.id)}>Borrar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
