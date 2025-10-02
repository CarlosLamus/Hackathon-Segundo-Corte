import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => { localStorage.removeItem('token'); navigate('/'); };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">IngSys</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample" aria-controls="navbarsExample" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/lines">Líneas de Profundización</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Incidentes</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/glossary">Glosario</NavLink></li>
<li className="nav-item"><NavLink className="nav-link" to="/feedback">Feedback</NavLink></li>
</ul>
          <div className="d-flex">
            {token ? (
              <button className="btn btn-outline-light" onClick={logout}>Salir</button>
            ) : (
              <Link className="btn btn-outline-light" to="/login">Ingresar</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
