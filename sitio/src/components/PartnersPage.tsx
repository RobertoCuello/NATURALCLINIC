const CFZ_SERVICES = [
  {
    category: 'Tratamientos capilares',
    services: ['Mesoterapia capilar', 'Exosomas capilares', 'Trasplante capilar', 'Nano pore'],
  },
  {
    category: 'Terapias endovenosas',
    services: ['Detox', 'Alopecia androgenética', 'Energética', 'Inmunológico', 'Hormonal'],
  },
  {
    category: 'Glúteos de acero',
    services: ['Bioestimulación con Sculptra', 'Chao celulitis', 'Glúteos top'],
  },
  {
    category: 'Corporal',
    services: ['Tecnología Exilis', 'Ondas de choque', 'Mesoterapia corporal', 'Lipomassage'],
  },
];

const AIXA_SERVICES = [
  {
    category: 'Ginecología estética regenerativa y funcional',
    services: [
      'Valoración de salud íntima femenina',
      'Tratamientos para sequedad vaginal y síndrome genitourinario de la menopausia',
      'Radiofrecuencia fraccionada FRAXX',
      'Tratamientos para síntomas asociados a hiperlaxitud vaginal',
      'Evaluación y tratamiento de incontinencia urinaria leve',
      'Bioestimulación de tejidos íntimos (plasma rico en plaquetas y ácido hialurónico íntimo)',
      'Valoración para labioplastia y procedimientos íntimos',
    ],
  },
  {
    category: 'Ginecología',
    services: [
      'Consulta ginecológica especializada',
      'Chequeo ginecológico preventivo',
      'Toma de muestra de citología cervicouterina y VPH',
      'Detección y seguimiento del VPH',
      'Evaluación de alteraciones menstruales',
      'Diagnóstico y manejo de infecciones vaginales',
      'Asesoría en planificación familiar y anticoncepción',
      'Inserción y retiro de implantes subdérmicos',
      'Inserción y retiro de dispositivos intrauterinos (DIU)',
      'Cauterización de verrugas vulvares',
    ],
  },
];

export default function PartnersPage() {
  return (
    <main id="partners-page" className="partners-page" tabIndex={-1}>
      <div className="partners-page__inner">
        <a className="partners-page__back" href="#">Volver a la landing</a>

        <header className="partners-page__intro">
          <p className="partners-page__eyebrow">Natural by Roberto Cuello</p>
          <h1 className="font-headline-lg">ALIADOS MÉDICOS Y CONVENIOS</h1>
          <p>Conoce la información sobre nuestros aliados médicos y consulta las condiciones de los convenios para tu atención.</p>
        </header>

        <section className="partners-page__grid" aria-label="Aliados médicos y convenios disponibles">
          <article className="natural-glass partner-card" aria-labelledby="cfz-title">
            <div className="partner-card__heading">
              <span className="partner-card__label">Convenio</span>
              <h2 id="cfz-title" className="font-headline-lg">CFZ Medicina Estética</h2>
            </div>
            <p>Servicios capilares, terapias endovenosas y tratamientos corporales.</p>
            <img
              className="partner-card__logo partner-card__logo--wide"
              src="/partners/cfz-medicina-estetica-transparente.png"
              alt="Logo de CFZ Medicina Estética"
              width={2170}
              height={725}
              decoding="async"
            />
            <section className="partner-services" aria-label="Áreas de atención de CFZ Medicina Estética">
              {CFZ_SERVICES.map(({ category, services }) => (
                <details key={category}>
                  <summary>{category}</summary>
                  <ul>
                    {services.map((service) => <li key={service}>{service}</li>)}
                  </ul>
                </details>
              ))}
            </section>
            <div className="partner-card__benefit">
              <h3>Código del convenio</h3>
              <strong className="partner-card__code">CRC-2026</strong>
              <p>Para recibir los beneficios del convenio, presenta este código en CFZ Medicina Estética.</p>
            </div>
            <a
              className="partners-page__cta partner-card__cta"
              href="https://wa.me/573214249499?text=Hola%2C%20vengo%20de%20Natural%20Clinic%20By%20ROBERTO%20CUELLO%2C%20quisiera%20informaci%C3%B3n%20sobre%20el%20convenio%20con%20CFZ%20Medicina%20Est%C3%A9tica%20con%20el%20c%C3%B3digo%20CRC-2026."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solicitar información sobre el convenio con CFZ Medicina Estética"
            >
              Solicitar información
            </a>
          </article>

          <article className="natural-glass partner-card" aria-labelledby="aixa-title">
            <div className="partner-card__heading">
              <span className="partner-card__label">Aliada médica</span>
              <h2 id="aixa-title" className="font-headline-lg">Aixa David</h2>
              <p className="partner-card__specialty">Ginecóloga estética</p>
            </div>
            <img
              className="partner-card__logo"
              src="/partners/aixa-david.png"
              alt="Logo de la Dra. Aixa David"
              width={2000}
              height={1497}
              decoding="async"
            />
            <section className="partner-services" aria-label="Áreas de atención de Aixa David">
              {AIXA_SERVICES.map(({ category, services }) => (
                <details key={category}>
                  <summary>{category}</summary>
                  <ul>
                    {services.map((service) => <li key={service}>{service}</li>)}
                  </ul>
                </details>
              ))}
            </section>
            <p>Consulta con nuestro equipo las condiciones de atención.</p>
            <a
              className="partners-page__cta partner-card__cta"
              href="https://wa.me/573122688466?text=Hola%2C%20vengo%20de%20la%20pagina%20web%20de%20Natural%20Clinic%20By%20ROBERTO%20CUELLO%2C%20quisiera%20informaci%C3%B3n%20sobre%20la%20atenci%C3%B3n%20con%20Aixa%20David%2C%20ginec%C3%B3loga%20est%C3%A9tica."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solicitar información sobre Aixa David"
            >
              Solicitar información
            </a>
          </article>
        </section>

        <section className="natural-glass partners-page__contact" aria-labelledby="partners-contact-title">
          <div>
            <h2 id="partners-contact-title" className="font-headline-lg">Consulta antes de tu cita</h2>
            <p>Comunícate con nuestro equipo para conocer los aliados médicos, los convenios disponibles y las condiciones que aplican a tu caso.</p>
          </div>
          <a
            className="partners-page__cta"
            href="https://wa.me/573124549968?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20los%20aliados%20m%C3%A9dicos%20y%20convenios%20de%20Natural."
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar aliados y convenios
          </a>
        </section>

        <footer className="partners-page__footer">
          <span>Natural by Roberto Cuello · Valledupar, Colombia</span>
          <a href="#contacto">Ver ubicación y horarios</a>
        </footer>
      </div>
    </main>
  );
}
