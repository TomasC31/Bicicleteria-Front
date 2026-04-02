export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bike-nav sticky-top">
        <div className="container py-2">
          <a className="navbar-brand fw-semibold" href="#inicio">
            Bicicleteria Urbana
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Mostrar navegacion"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto gap-lg-2">
              <li className="nav-item">
                <a className="nav-link" href="#servicios">
                  Servicios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#destacados">
                  Bicis
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contacto">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main id="inicio" className="pb-5">
        <section className="container pt-5 pb-4">
          <div className="p-4 p-md-5 bike-hero rounded-4 text-white">
            <p className="text-uppercase small mb-2 bike-eyebrow">Desde 1998 en movimiento</p>
            <h1 className="display-5 fw-bold mb-3">Tu proxima bici te esta esperando</h1>
            <p className="fs-5 text-white-50 mb-4 col-lg-8">
              Venta, mantenimiento y asesoramiento para ciudad, ruta y montana.
              Todo en un solo lugar.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <button type="button" className="btn btn-warning btn-lg px-4 fw-semibold">
                Ver catalogo
              </button>
              <button type="button" className="btn btn-outline-light btn-lg px-4">
                Reservar service
              </button>
            </div>
          </div>
        </section>

        <section id="destacados" className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <h2 className="h3 fw-bold m-0">Modelos destacados</h2>
            <a href="#" className="link-light text-decoration-none">
              Ver todos
            </a>
          </div>
          <div className="row g-3">
            {[
              {
                nombre: 'Urban Flow 300',
                tipo: 'Ciudad',
                precio: '$ 790.000',
              },
              {
                nombre: 'Trail Pro X',
                tipo: 'Montana',
                precio: '$ 1.250.000',
              },
              {
                nombre: 'Speedline Aero',
                tipo: 'Ruta',
                precio: '$ 1.980.000',
              },
            ].map((bici) => (
              <div key={bici.nombre} className="col-12 col-md-6 col-lg-4">
                <article className="card h-100 border-0 shadow-sm bike-card">
                  <div className="card-body p-4">
                    <span className="badge text-bg-dark-subtle text-dark mb-3">{bici.tipo}</span>
                    <h3 className="h5 fw-semibold">{bici.nombre}</h3>
                    <p className="text-secondary mb-4">Ideal para riders que buscan rendimiento y estilo.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong className="fs-5">{bici.precio}</strong>
                      <button type="button" className="btn btn-sm btn-outline-dark">
                        Detalles
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section id="servicios" className="container py-4">
          <div className="row g-3">
            <div className="col-12 col-lg-8">
              <div className="bike-panel rounded-4 p-4 p-md-5 h-100">
                <h2 className="h3 fw-bold">Service express en 24 horas</h2>
                <p className="text-secondary mb-4">
                  Mecanicos certificados, repuestos originales y seguimiento por WhatsApp.
                </p>
                <button type="button" className="btn btn-dark px-4">
                  Solicitar turno
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-4" id="contacto">
              <div className="bike-panel rounded-4 p-4 h-100">
                <h3 className="h5 fw-bold">Contacto rapido</h3>
                <p className="text-secondary mb-2">Lun a Sab: 9:00 - 19:00</p>
                <p className="mb-1 fw-semibold">+54 11 1234 5678</p>
                <p className="mb-0 text-secondary">Av. Siempreviva 742, CABA</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
