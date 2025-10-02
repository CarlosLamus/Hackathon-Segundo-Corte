import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      if (isRegister) {
        await api.post('/auth/register', { username: username.trim(), password: password.trim() });
        const res = await api.post('/auth/login', { username: username.trim(), password: password.trim() });
        localStorage.setItem('token', res.token);
        navigate('/dashboard');
      } else {
        const res = await api.post('/auth/login', { username: username.trim(), password: password.trim() });
        localStorage.setItem('token', res.token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      const msg = (err && (err.errors?.map?.((e:any)=>e.msg).join(', ') || err.message)) || 'Error de inicio de sesión'; setError(msg);
    } finally { setLoading(false); }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">{isRegister ? 'Crear cuenta' : 'Ingresar'}</h2>
      <form onSubmit={submit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-flex justify-content-between">
          <button disabled={loading} className="btn btn-primary">{loading ? (isRegister ? 'Creando…' : 'Ingresando…') : (isRegister ? 'Crear cuenta' : 'Ingresar')}</button>
          <button type="button" className="btn btn-link" onClick={()=>setIsRegister(!isRegister)}>
            {isRegister ? 'Ya tengo cuenta' : 'Crear cuenta nueva'}
          </button>
        </div>
      </form>
      <p className="text-muted mt-3">Demo: <code>admin / admin</code> · También puedes **registrar** tu usuario.</p>
    </div>
  );
}
