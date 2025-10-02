import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import LineCard from '../components/LineCard';
import LineFilters from '../components/LineFilters';
import PlanSidebar from '../components/PlanSidebar';
import { Linea } from '../data/types';

export default function Lines() {
  const [data, setData] = useState<Linea[]>([]);
  const [q, setQ] = useState('');
  const [area, setArea] = useState('');
  const [nivel, setNivel] = useState('');
  const [plan, setPlan] = useState<Linea[]>(() => {
    try { return JSON.parse(localStorage.getItem('plan') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    (async () => {
      const res = await api.getPublic('/lineas');
      setData(res.data || []);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('plan', JSON.stringify(plan));
  }, [plan]);

  const filtered = useMemo(() => {
    return data.filter(l => {
      const okQ = q ? (l.nombre.toLowerCase().includes(q.toLowerCase()) || l.descripcion.toLowerCase().includes(q.toLowerCase())) : true;
      const okA = area ? l.area === area as any : true;
      const okN = nivel ? l.nivel === nivel as any : true;
      return okQ && okA && okN;
    });
  }, [data, q, area, nivel]);

  function addToPlan(l: Linea) {
    setPlan(prev => prev.find(p=>p.id===l.id) ? prev : [...prev, l]);
  }
  function removeFromPlan(id: string) {
    setPlan(prev => prev.filter(p => p.id !== id));
  }
  function clearPlan() { setPlan([]); }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Catálogo de líneas</h2>
      <LineFilters q={q} setQ={setQ} area={area} setArea={setArea} nivel={nivel} setNivel={setNivel} />
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="row g-3">
            {filtered.map(l => (
              <LineCard key={l.id} l={l} onAdd={addToPlan} />
            ))}
            {filtered.length === 0 && <p className="text-muted">Sin resultados para los filtros dados.</p>}
          </div>
        </div>
        <div className="col-lg-4">
          <PlanSidebar plan={plan} onRemove={removeFromPlan} onClear={clearPlan} />
        </div>
      </div>
    </div>
  );
}
