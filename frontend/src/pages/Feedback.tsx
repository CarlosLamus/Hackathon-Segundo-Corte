import { useState } from 'react';
import { api } from '../services/api';

export default function Feedback(){
  const [nombre,setNombre]=useState('');
  const [email,setEmail]=useState('');
  const [mensaje,setMensaje]=useState('');
  const [ok,setOk]=useState<string|null>(null);
  const [err,setErr]=useState<string|null>(null);

  async function send(e:React.FormEvent){
    e.preventDefault();
    setOk(null); setErr(null);
    try{
      const r = await api.postPublic('/feedback',{ nombre,email,mensaje });
      setOk('¡Gracias por tu mensaje!');
      setNombre(''); setEmail(''); setMensaje('');
    }catch(e:any){ setErr(e?.message || 'Error enviando feedback'); }
  }

  return (
    <div className="container py-4" style={{maxWidth:600}}>
      <h2 className="mb-3">Sugerencias y Feedback</h2>
      <form onSubmit={send} className="card p-3 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={nombre} onChange={e=>setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea className="form-control" rows={4} value={mensaje} onChange={e=>setMensaje(e.target.value)} required />
        </div>
        {ok && <div className="alert alert-success">{ok}</div>}
        {err && <div className="alert alert-danger">{err}</div>}
        <button className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}
