import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Header />
      <div className="container py-4">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop" className="d-block w-100" alt="Ingeniería 1" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Explora las líneas</h5>
                <p>Elige tu camino: ciberseguridad, IA, redes, arquitectura y más.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop" className="d-block w-100" alt="Ingeniería 2" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Aprende haciendo</h5>
                <p>Interacción, filtros, plan personal y recursos curados.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <section className="mt-5 text-center">
          <h2 className="mb-3">¿Listo para explorar?</h2>
          <Link className="btn btn-primary btn-lg" to="/lines">Ir al catálogo de líneas</Link>
        </section>
      </div>
    </>
  );
}
