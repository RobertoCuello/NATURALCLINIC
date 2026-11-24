/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import ClinicCarousel from './components/ClinicCarousel';
import PartnersPage from './components/PartnersPage';
import TreatmentGallery from './components/TreatmentGallery';
import TreatmentPhoto, { type PhotoRotation } from './components/TreatmentPhoto';
import PatientExperienceDialog from './components/PatientExperienceDialog';

interface Treatment {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  imageRotation?: PhotoRotation;
  // Gallery rotations use the original, one-based photo numbers.
  galleryRotations?: Partial<Record<number, PhotoRotation>>;
  alt: string;
  ctaText: string;
  whatsappText: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const TREATMENTS: Treatment[] = [
  {
    id: 'ceramica',
    badge: 'Carillas cerámicas',
    title: 'Diseño en Cerámica',
    description: 'Un resultado natural y armónico, hecho a tu medida.',
    image: '/treatments/ceramica/portada.jpg',
    imageRotation: 180,
    galleryRotations: { 2: 270, 3: 270, 6: 180 },
    gallery: Array.from({ length: 6 }, (_, index) => `/treatments/ceramica/${String(index + 1).padStart(2, '0')}.jpg`),
    alt: 'Diseño de sonrisa en cerámica realizado por el Dr. Roberto Cuello',
    ctaText: 'Quiero mi diseño en cerámica',
    whatsappText:
      'Hola, quisiera agendar mi valoración para Diseño en Cerámica en Natural.',
  },
  {
    id: 'indirecta',
    badge: 'Técnica indirecta',
    title: 'Diseño en Resina Indirecta',
    description: 'Precisión y durabilidad para una sonrisa que perdura.',
    image: '/treatments/indirecta/portada.jpg',
    galleryRotations: { 2: 90, 7: 90 },
    gallery: Array.from({ length: 7 }, (_, index) => `/treatments/indirecta/${String(index + 1).padStart(2, '0')}.jpg`),
    alt: 'Diseño de sonrisa en técnica indirecta de alta precisión',
    ctaText: 'Quiero mi diseño de sonrisa',
    whatsappText:
      'Hola, quisiera agendar mi valoración para Diseño en Resina Indirecta en Natural.',
  },
  {
    id: 'directa',
    badge: 'Resina directa',
    title: 'Diseño en Resina Directa',
    description: 'Diseño de sonrisa en resina directa, con atención personalizada para tu caso.',
    image: '/treatments/directa/portada.jpg',
    imageRotation: 180,
    galleryRotations: { 1: 90, 2: 90, 3: 90 },
    gallery: Array.from({ length: 5 }, (_, index) => `/treatments/directa/${String(index + 1).padStart(2, '0')}.jpg`),
    alt: 'Diseño de sonrisa en resina directa',
    ctaText: 'Consultar resina directa',
    whatsappText:
      'Hola, quisiera agendar mi valoración para Diseño en Resina Directa en Natural.',
  },
  {
    id: 'general',
    badge: 'Salud integral',
    title: 'Odontología General',
    description: 'Cuidado integral de tu salud oral en un solo lugar.',
    image: '/treatments/general/portada.jpg',
    galleryRotations: { 4: 90, 5: 90 },
    gallery: Array.from({ length: 5 }, (_, index) => `/treatments/general/${String(index + 1).padStart(2, '0')}.jpg`),
    alt: 'Odontología general y salud oral integral en Natural',
    ctaText: 'Agendar mi cita',
    whatsappText:
      'Hola, quisiera agendar mi valoración para Odontología General en Natural.',
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sammy Aservallan',
    role: 'Paciente • Opinión en Google',
    quote:
      '¡Me encantó mi experiencia en el consultorio del Dr. Roberto Cuello! Súper atentos, cuidadosos con cada detalle y un servicio de calidad desde el primer momento. ¡Feliz con mi diseño de sonrisa!',
  },
  {
    id: 2,
    name: 'Ivanna Andrea Maestre Charris',
    role: 'Paciente • Opinión en Google',
    quote:
      'Excelente experiencia, la recomiendo a ojos cerrados, me hice mi diseño hace 7 años y está en perfecto estado, sumado a mis controles que siempre los hago aprovechando los descuentos que siempre hacen.',
  },
  {
    id: 3,
    name: 'José Mario Gutiérrez Zuleta',
    role: 'Paciente • Opinión en Google',
    quote:
      'Excelente servicio, la experiencia es estrato diez mil, las instalaciones son de ensueños, la parte humana de todos los q hacen parte de este maravillosa empresa es fenomenal. Definitivamente quedó en buenas manos.',
  },
  {
    id: 4,
    name: 'Angie Caroline Maestre Peña',
    role: 'Paciente • Opinión en Google',
    quote:
      'Estoy absolutamente agradecida con la atención recibida por parte del Dr Roberto Cuello y su equipo. Su profesionalismo, paciencia y dedicación se notan en cada detalle y el resultado de mi diseño de sonrisa ha superado por completo mis expectativas. Muchas Gracias.',
  },
  {
    id: 5,
    name: 'Yamaira Restrepo',
    role: 'Paciente • Opinión en Google',
    quote:
      'Mi experiencia en Natural ha sido muy buena, a mi hijo le hacen ortodoncia y nos ha ido muy bien, la atención es excelente',
  },
  {
    id: 6,
    name: 'Iracema Liliana Ortiz Mendoza',
    role: 'Paciente • Opinión en Google',
    quote:
      'Dr Roberto Excelente profesional. Le doy gracias a Dios por su vida. Eres el mejor en lo q haces.',
  },
];

const FAQS: FaqItem[] = [
  {
    id: 1,
    question: '¿Cómo agendo mi valoración?',
    answer: 'Escríbenos por WhatsApp y te ayudamos a elegir fecha y hora.',
  },
  {
    id: 2,
    question: '¿El tratamiento se adapta a mí?',
    answer: 'Sí. Cada tratamiento se diseña después de una valoración personalizada.',
  },
  {
    id: 3,
    question: '¿Atienden pacientes del exterior?',
    answer: 'Escríbenos y te contamos cómo planear tu viaje.',
  },
  {
    id: 4,
    question: '¿Dónde están ubicados?',
    answer: 'Calle 7B # 9-60, Barrio San Carlos, Valledupar, Colombia.',
  },
];

const BG_PHOTOS = [
  { src: '/clinic/recepcion.jpg', alt: 'Recepción de Natural by Roberto Cuello', hideOnMobile: false },
  { src: '/clinic/consultorio.jpg', alt: 'Consultorio de Natural by Roberto Cuello', hideOnMobile: true },
];

function WhatsAppIcon({ className = 'w-5 h-5 fill-current' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.163 8.163 0 0 1-1.25-4.38c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.41 3.61 2.41 5.8 0 4.52-3.68 8.24-8.37 8.24zm4.5-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"></path>
    </svg>
  );
}

export default function App() {
  const [partnersPage, setPartnersPage] = useState(() => window.location.hash === '#/aliados-y-convenios');
  const landingTitle = useRef(document.title);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [activeDot, setActiveDot] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [patientsOpen, setPatientsOpen] = useState(false);
  const patientsTriggerRef = useRef<HTMLElement | null>(null);
  const doctorDialogRef = useRef<HTMLDialogElement>(null);
  const doctorBackdropPressRef = useRef(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const treatmentDialogRef = useRef<HTMLDialogElement>(null);
  const treatmentBackdropPressRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const openPatientExperience = (event: React.MouseEvent<HTMLButtonElement>) => {
    patientsTriggerRef.current = event.currentTarget;
    setMobileMenuOpen(false);
    setPatientsOpen(true);
  };

  useEffect(() => {
    const updatePage = () => {
      setPartnersPage(window.location.hash === '#/aliados-y-convenios');
      setMobileMenuOpen(false);
    };
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  useLayoutEffect(() => {
    document.title = partnersPage
      ? 'Aliados médicos y convenios — Natural by Roberto Cuello'
      : landingTitle.current;
    if (partnersPage) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('partners-page')?.focus({ preventScroll: true });
    } else {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [partnersPage]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    const desktop = window.matchMedia('(min-width: 75rem)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsidePress);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!doctorOpen) return;
    const dialog = doctorDialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [doctorOpen]);

  useEffect(() => {
    if (!selectedTreatment) return;
    const dialog = treatmentDialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [selectedTreatment]);

  const toggleFaq = (id: number) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const getScrollAmount = () => {
    if (!trackRef.current) return 380;
    const firstCard = trackRef.current.querySelector('div');
    return firstCard ? firstCard.offsetWidth + 24 : 380;
  };

  const handlePrevTestimonial = () => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  };

  const handleNextTestimonial = () => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  };

  const scrollToTestimonial = (index: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollTo({
      left: index * getScrollAmount(),
      behavior: 'smooth',
    });
    setActiveDot(index);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const amount = getScrollAmount();
      if (amount > 0) {
        const index = Math.round(track.scrollLeft / amount);
        setActiveDot(Math.min(Math.max(index, 0), TESTIMONIALS.length - 1));
      }
    };

    handleScroll();
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [partnersPage]);

  return (
    <div className="natural-page min-h-screen font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container relative">
      {/* FONDO GENERAL: SOLO LAS DOS INSTALACIONES ELEGIDAS, DESENFOCADAS */}
      <div className="natural-page__background" aria-hidden="true">
        <div className="natural-page__photos">
          {BG_PHOTOS.map((photo) => (
            <img key={photo.src} src={photo.src} alt="" className={photo.hideOnMobile ? 'hidden md:block' : ''} />
          ))}
        </div>
        <div className="natural-page__veil" />
      </div>

      {/* HEADER / BARRA DE NAVEGACIÓN */}
      <header ref={headerRef} className="site-header">
        <div className="site-header__inner">
          <a className="site-header__brand" href="#" aria-label="Natural by Roberto Cuello — Inicio">
            {/* Encuadre del PNG oficial; conserva el archivo y sus proporciones. */}
            <svg viewBox="555 1995 3391 710" aria-hidden="true" focusable="false">
              <image href="/brand/natural-logo-47.png" width="4501" height="4501" />
            </svg>
          </a>

          <nav className="site-header__desktop-nav" aria-label="Navegación principal">
            <a
              className="font-label-lg text-[13px] tracking-[0.06em] text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap"
              href="#tratamientos"
            >
              Tratamientos
            </a>
            <button
              type="button"
              className="site-header__patients font-label-lg text-[13px] tracking-[0.06em] text-on-surface-variant hover:text-on-surface transition-colors"
              aria-haspopup="dialog"
              aria-controls="patient-experience-dialog"
              onClick={openPatientExperience}
            >
              Pacientes nacionales e internacionales
            </button>
            <a
              className="font-label-lg text-[13px] tracking-[0.06em] text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap"
              href="#/aliados-y-convenios"
              aria-current={partnersPage ? 'page' : undefined}
            >
              Aliados y convenios
            </a>
            <a
              className="font-label-lg text-[13px] tracking-[0.06em] text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap"
              href="#testimonios"
            >
              Testimonios
            </a>
            <a
              className="font-label-lg text-[13px] tracking-[0.06em] text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap"
              href="#contacto"
            >
              Contacto
            </a>
          </nav>

          <div className="site-header__actions">
            <a
              className="site-header__cta site-header__cta--desktop"
              href="https://wa.me/573124549968?text=Hola,%20quisiera%20agendar%20mi%20valoraci%C3%B3n%20en%20Natural%20by%20Roberto%20Cuello."
              rel="noopener noreferrer"
              target="_blank"
            >
              Agenda tu valoración
            </a>
            <button
              ref={menuToggleRef}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="site-header__toggle"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <nav id="mobile-navigation" className="site-header__mobile-nav" aria-label="Navegación móvil">
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-lg text-sm font-medium text-on-surface py-1.5"
              href="#tratamientos"
            >
              Tratamientos
            </a>
            <button
              type="button"
              onClick={openPatientExperience}
              className="font-label-lg text-sm font-medium text-on-surface py-1.5"
              aria-haspopup="dialog"
              aria-controls="patient-experience-dialog"
            >
              Pacientes nacionales e internacionales
            </button>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-lg text-sm font-medium text-on-surface py-1.5"
              href="#/aliados-y-convenios"
              aria-current={partnersPage ? 'page' : undefined}
            >
              Aliados y convenios
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-lg text-sm font-medium text-on-surface py-1.5"
              href="#testimonios"
            >
              Testimonios
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-lg text-sm font-medium text-on-surface py-1.5"
              href="#contacto"
            >
              Contacto
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="site-header__cta"
              href="https://wa.me/573124549968?text=Hola,%20quisiera%20agendar%20mi%20valoraci%C3%B3n%20en%20Natural%20by%20Roberto%20Cuello."
              rel="noopener noreferrer"
              target="_blank"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Agenda tu valoración</span>
            </a>
          </nav>
        )}
      </header>

      {partnersPage ? <PartnersPage /> : <>
      <main className="w-full pt-20">
        <div className="flex flex-col w-full text-on-surface">
          {/* PORTADA: RECEPCIÓN REAL, VIDRIO LEGIBLE Y CONSULTORIO ELEGIDO */}
          <section className="natural-hero" aria-label="Natural by Roberto Cuello">
            <div className="natural-hero__background" aria-hidden="true">
              <img src="/clinic/recepcion.jpg" alt="" width={6000} height={3376} fetchPriority="high" />
            </div>
            <div className="natural-hero__layout">
              <div className="natural-hero__glass">
                <h1 className="font-headline-lg font-bold natural-title natural-title--hero">
                  <span className="natural-title__lead">TU SONRISA,</span>{' '}
                  <span className="natural-title__continuation">CON LA NATURALIDAD QUE TE REPRESENTA</span>
                </h1>
                <p className="natural-hero__subtitle">
                  Diseño de sonrisa, ortodoncia y odontología integral en Valledupar, con el
                  cuidado y la calidez de Natural by Roberto Cuello
                </p>
                <div className="natural-hero__actions">
                  <a
                    className="natural-hero__primary"
                    href="https://wa.me/573124549968?text=Hola,%20quisiera%20agendar%20mi%20valoraci%C3%B3n%20en%20Natural%20by%20Roberto%20Cuello."
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Agendar mi valoración</span>
                  </a>
                  <a className="natural-hero__secondary" href="#tratamientos">Explorar tratamientos</a>
                </div>
              </div>
              <ClinicCarousel />
            </div>
          </section>

          <div className="doctor-profile-entry" id="roberto-cuello">
            <button
              type="button"
              className="doctor-profile-entry__button"
              aria-haspopup="dialog"
              aria-controls="roberto-dialog"
              onClick={() => setDoctorOpen(true)}
            >
              <span className="doctor-profile-entry__label">Conoce al Dr. Roberto Cuello</span>
              <span className="material-symbols-outlined" aria-hidden="true">arrow_outward</span>
            </button>
          </div>

          {/* TRATAMIENTOS ESTRELLA */}
          <section className="w-full py-20 scroll-mt-20 relative" id="tratamientos">
            <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop">
              <div className="natural-glass natural-section-intro w-full max-w-2xl mx-auto text-center flex flex-col items-center gap-3 mb-14">
                <span className="font-label-md text-[11px] text-secondary font-semibold tracking-wider">
                  Excelencia clínica • Arte dental
                </span>
                <h2 className="w-full font-headline-lg font-bold text-on-surface text-center natural-title natural-title--section">
                  TRATAMIENTOS ESTRELLA
                </h2>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant text-center max-w-xl">
                  La armonía entre la ciencia odontológica y la sensibilidad artística para
                  devolverte la seguridad al sonreír.
                </p>
              </div>

              <div className="treatments-grid">
                {TREATMENTS.map((item) => (
                  <div
                    key={item.id}
                    className="treatment-card natural-glass group flex flex-col bg-white/80 backdrop-blur-md border border-white/80 ring-1 ring-[#D4AF7F]/20 rounded-3xl overflow-hidden shadow-[0_10px_25px_rgba(46,42,38,0.04)] hover:shadow-[0_16px_36px_rgba(212,175,127,0.18)] hover:-translate-y-1.5 transition-all duration-300 text-center"
                  >
                    <div className="treatment-card__image">
                      <TreatmentPhoto src={item.image} alt={item.alt} rotation={item.imageRotation} loading="lazy" />
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between items-center gap-5">
                      <div className="flex flex-col items-center gap-2.5">
                        <h3 className="treatment-card__title font-headline-sm font-bold text-lg sm:text-xl text-on-surface text-center leading-snug">
                          {item.title}
                        </h3>
                        <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-3.5 pt-2 w-full">
                        <button
                          type="button"
                          onClick={() => setSelectedTreatment(item)}
                          aria-haspopup="dialog"
                          aria-controls="treatment-dialog"
                          aria-label={`Ver información de ${item.title}`}
                          className="inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors cursor-pointer"
                        >
                          <span className="font-label-md text-[11px] font-semibold underline decoration-secondary/40 underline-offset-2">
                            Ver información
                          </span>
                        </button>

                        <a
                          className="w-full text-center py-3 px-4 rounded-xl bg-primary-container text-on-primary-container font-label-sm text-xs font-bold hover:brightness-95 transition-all shadow-sm"
                          href={`https://wa.me/573124549968?text=${encodeURIComponent(
                            item.whatsappText
                          )}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {item.ctaText}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="treatment-specialties natural-glass" role="region" aria-labelledby="other-specialties-title">
                <h3 id="other-specialties-title" className="font-headline-sm font-bold text-on-surface">OTRAS ESPECIALIDADES</h3>
                <ul className="treatment-specialties__list">
                  <li>Ortodoncia</li>
                  <li>Endodoncia</li>
                  <li>Periodoncia</li>
                  <li>Cirugía Oral</li>
                  <li>Rehabilitación Oral</li>
                </ul>
              </div>
            </div>
          </section>

          {/* POR QUÉ ELEGIRNOS */}
          <section className="w-full py-space-xl">
            <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop">
              <div className="natural-glass natural-section-intro text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
                <span className="font-label-md text-[11px] text-secondary font-semibold">
                  Nuestra esencia
                </span>
                <h2 className="font-headline-lg font-bold text-on-surface text-center natural-title natural-title--section">
                  ¿POR QUÉ ELEGIRNOS?
                </h2>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant text-center">
                  Entendemos la odontología como un espacio de bienestar, tranquilidad y
                  precisión donde cada paciente recibe un trato exclusivo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="natural-glass bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">
                      sentiment_satisfied
                    </span>
                  </div>
                  <h3 className="font-headline-sm font-semibold text-on-surface text-center natural-title natural-title--benefit">
                    ATENCIÓN HUMANA Y CERCANA
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                    Escuchamos tus expectativas con empatía y calidez, garantizando una
                    experiencia libre de estrés y plenamente confiable.
                  </p>
                </div>

                <div className="natural-glass bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed/50 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">brush</span>
                  </div>
                  <h3 className="font-headline-sm font-semibold text-on-surface text-center natural-title natural-title--benefit">
                    CUIDADO EN CADA DETALLE
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                    Análisis milimétrico de la proporción facial, el color dentario y la
                    textura para lograr microestética de nivel superior.
                  </p>
                </div>

                <div className="natural-glass bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-fixed/60 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">verified_user</span>
                  </div>
                  <h3 className="font-headline-sm font-semibold text-on-surface text-center natural-title natural-title--benefit">
                    RESULTADOS NATURALES Y DURADEROS
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                    Materiales biocompatibles de última generación diseñados para perdurar en
                    el tiempo sin perder su brillo ni vitalidad.
                  </p>
                </div>

                <div className="natural-glass bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed/70 text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">apartment</span>
                  </div>
                  <h3 className="font-headline-sm font-semibold text-on-surface text-center natural-title natural-title--benefit">
                    INSTALACIONES ELEGANTES Y CÓMODAS
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                    Un ambiente sereno tipo boutique dental concebido para hacer de cada cita
                    un momento de descanso y relajación.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CÓMO FUNCIONA EN 3 PASOS */}
          <section className="w-full py-space-xl">
            <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop">
              <div className="natural-glass natural-section-intro text-center max-w-4xl mx-auto mb-14 flex flex-col items-center gap-3">
                <span className="font-label-md text-[11px] text-secondary font-semibold">
                  Proceso simple y transparente
                </span>
                <h2 className="font-headline-lg font-bold text-on-surface text-center natural-title natural-title--process">
                  <span className="natural-title__line">TU CAMINO HACIA UNA NUEVA SONRISA</span>{' '}
                  <span className="natural-title__line">EN 3 SIMPLES PASOS</span>
                </h2>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant text-center max-w-2xl">
                  Te acompañamos desde la primera conversación hasta el resultado final con un
                  protocolo claro y sin complicaciones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                {/* Paso 1 */}
                <div className="natural-glass bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl relative flex flex-col items-center text-center gap-5 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container font-headline-md text-xl font-bold flex items-center justify-center shadow-xs">
                    1
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="font-headline-sm font-bold text-lg sm:text-xl text-on-surface text-center">
                      Escríbenos por WhatsApp
                    </h3>
                    <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                      Te atendemos de forma directa y resolvemos tus primeras dudas con
                      asesoría inmediata.
                    </p>
                  </div>
                </div>

                {/* Paso 2 */}
                <div className="natural-glass bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl relative flex flex-col items-center text-center gap-5 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container font-headline-md text-xl font-bold flex items-center justify-center shadow-xs">
                    2
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="font-headline-sm font-bold text-lg sm:text-xl text-on-surface text-center">
                      Agenda tu valoración personalizada
                    </h3>
                    <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                      Analizamos la armonía facial y tus objetivos específicos en nuestro
                      consultorio en Valledupar.
                    </p>
                  </div>
                </div>

                {/* Paso 3 */}
                <div className="natural-glass bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl relative flex flex-col items-center text-center gap-5 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed-variant font-headline-md text-xl font-bold flex items-center justify-center shadow-xs">
                    3
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="font-headline-sm font-bold text-lg sm:text-xl text-on-surface text-center">
                      Conoce el plan a tu medida
                    </h3>
                    <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                      Definimos juntos el tratamiento ideal para lograr tu sonrisa deseada con
                      total naturalidad.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <a
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-primary-container text-on-primary-container font-label-lg text-[13px] font-bold transition-all shadow-md hover:brightness-95"
                  href="https://wa.me/573124549968?text=Hola,%20quisiera%20agendar%20mi%20valoraci%C3%B3n%20en%20Natural%20by%20Roberto%20Cuello."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Iniciar mi proceso hoy</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
          </section>

          {/* TESTIMONIOS */}
          <section className="w-full py-space-xl scroll-mt-20" id="testimonios">
            <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop">
              <div className="natural-glass natural-section-intro flex flex-col items-center text-center gap-3 max-w-2xl mx-auto mb-12">
                <span className="font-label-md text-[11px] text-secondary font-semibold">
                  Historias reales
                </span>
                <h2 className="font-headline-lg font-bold text-3xl sm:text-4xl text-on-surface text-center">
                  Lo que dicen nuestros pacientes
                </h2>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant text-center">
                  La satisfacción de quienes ya confían su sonrisa en Natural by Roberto Cuello.
                </p>

                {/* Flechas de navegación para Carrusel */}
                <div className="flex items-center justify-center gap-3 pt-3">
                  <button
                    aria-label="Testimonio anterior"
                    onClick={handlePrevTestimonial}
                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/70 text-on-surface flex items-center justify-center hover:bg-white transition-colors shadow-xs cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                  </button>
                  <button
                    aria-label="Siguiente testimonio"
                    onClick={handleNextTestimonial}
                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/70 text-on-surface flex items-center justify-center hover:bg-white transition-colors shadow-xs cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Carrusel Contenedor */}
              <div
                ref={trackRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory no-scrollbar"
              >
                {TESTIMONIALS.map((item) => (
                  <div
                    key={item.id}
                    className="natural-glass min-w-[85vw] sm:min-w-[340px] lg:min-w-[380px] snap-start bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl flex flex-col justify-between items-center text-center gap-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <span className="font-headline-lg text-3xl text-primary leading-none">
                        “
                      </span>
                      <div className="flex text-[#D4AF7F]">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <p className="font-body-md text-xs sm:text-sm text-on-surface leading-relaxed text-center">
                        {item.quote}
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center pt-2">
                      <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
                        {item.name}
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        {item.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Indicators */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {TESTIMONIALS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Ir al testimonio ${idx + 1}`}
                    onClick={() => scrollToTestimonial(idx)}
                    className={`rounded-full transition-all cursor-pointer ${
                      activeDot === idx
                        ? 'w-2.5 h-2.5 bg-primary-container'
                        : 'w-2 h-2 bg-outline-variant/50 hover:bg-outline-variant'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* PREGUNTAS FRECUENTES */}
          <section className="w-full py-space-xl">
            <div className="max-w-3xl mx-auto px-6 lg:px-margin-desktop">
              <div className="natural-glass natural-section-intro text-center max-w-xl mx-auto mb-12 flex flex-col items-center gap-3">
                <span className="font-label-md text-[11px] text-secondary font-semibold">
                  Claridad y confianza
                </span>
                <h2 className="font-headline-lg font-bold text-3xl sm:text-4xl text-on-surface text-center">
                  Preguntas frecuentes
                </h2>
              </div>

              {/* Acordeón interactivo centrado */}
              <div className="flex flex-col gap-4">
                {FAQS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="natural-glass bg-white/75 backdrop-blur-md border border-white/70 rounded-2xl overflow-hidden shadow-sm transition-all text-center"
                    >
                      <button
                        aria-expanded={isOpen}
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-center gap-4 cursor-pointer"
                        type="button"
                      >
                        <span className="w-6"></span>
                        <span className="font-title-md font-semibold text-sm sm:text-base text-on-surface flex-1 text-center">
                          {faq.question}
                        </span>
                        <span
                          className={`material-symbols-outlined text-primary text-xl transition-transform duration-300 w-6 ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                        >
                          add
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-on-surface-variant font-body-md text-xs sm:text-sm leading-relaxed text-center">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 text-center">
                <a
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white/80 backdrop-blur-md border border-white/70 text-on-surface font-label-md text-xs font-semibold hover:bg-white transition-colors shadow-sm"
                  href="https://wa.me/573124549968?text=Hola,%20tengo%20una%20pregunta%20sobre%20sus%20tratamientos%20en%20Natural."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-base">help_outline</span>
                  <span>Tengo otra pregunta</span>
                </a>
              </div>
            </div>
          </section>

          {/* LLAMADO FINAL (CTA BANNER) */}
          <section className="w-full py-20">
            <div className="max-w-5xl mx-auto px-6 lg:px-margin-desktop">
              <div className="natural-glass bg-white/80 backdrop-blur-md border border-white/80 p-10 sm:p-16 rounded-3xl shadow-lg text-center flex flex-col items-center gap-6 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none"></div>

                <span className="font-label-md text-[11px] text-secondary font-semibold">
                  Da el primer paso
                </span>

                <h2 className="font-headline-lg font-bold text-3xl sm:text-5xl text-on-surface max-w-2xl leading-tight text-center">
                  Tu sonrisa merece estar en las mejores manos
                </h2>

                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-xl text-center">
                  Agenda tu cita diagnóstica y descubre cómo la odontología estética
                  personalizada puede resaltar tu verdadera esencia.
                </p>

                <a
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-primary-container text-on-primary-container font-label-lg text-sm font-bold transition-all duration-300 hover:brightness-95 shadow-[0_8px_32px_rgba(212,175,127,0.45)] hover:scale-[1.02] transform"
                  href="https://wa.me/573124549968?text=Hola,%20quisiera%20agendar%20mi%20valoraci%C3%B3n%20en%20Natural%20by%20Roberto%20Cuello."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                  <span>Quiero mi valoración</span>
                </a>
              </div>
            </div>
          </section>

          {/* PIE DE PÁGINA ESPECIFICADO */}
          <section
            className="natural-glass contact-section w-full bg-white/70 backdrop-blur-md border-t border-white/60 py-14 scroll-mt-20"
            id="contacto"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
                {/* Logo y eslogan */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <a className="contact-section__brand" href="#" aria-label="Natural by Roberto Cuello — Inicio">
                    <svg viewBox="555 1995 3391 710" aria-hidden="true" focusable="false">
                      <image href="/brand/natural-logo-47.png" width="4501" height="4501" />
                    </svg>
                  </a>
                  <p className="font-body-md text-sm text-on-surface-variant italic text-center md:text-left">
                    “Tu salud, nuestra esencia”
                  </p>
                </div>

                {/* Ubicación */}
                <div className="flex flex-col items-center md:items-start gap-3">
                  <span className="font-title-md text-sm font-bold text-on-surface">
                    Ubicación
                  </span>
                  <div className="flex items-center md:items-start gap-2.5 text-on-surface-variant font-body-md text-sm text-center md:text-left">
                    <span className="material-symbols-outlined text-lg text-primary flex-shrink-0">
                      location_on
                    </span>
                    <span>Calle 7B # 9-60, Barrio San Carlos, Valledupar, Colombia</span>
                  </div>
                </div>

                {/* Horarios aportados por la clínica */}
                <div className="flex flex-col items-center md:items-start gap-3">
                  <span className="font-title-md text-sm font-bold text-on-surface">
                    Horarios de atención
                  </span>
                  <dl className="flex flex-col gap-3 font-body-md text-sm leading-relaxed text-on-surface-variant">
                    <div>
                      <dt className="font-semibold">Lunes a viernes</dt>
                      <dd>08:30–12:00<br />14:00–18:00</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Sábados</dt>
                      <dd>08:00–12:30</dd>
                    </div>
                  </dl>
                </div>

                {/* Contacto Directo */}
                <div className="flex flex-col items-center md:items-start gap-3">
                  <span className="font-title-md text-sm font-bold text-on-surface">
                    Contacto directo
                  </span>
                  <a
                    className="inline-flex items-center gap-2 text-on-surface hover:text-primary transition-colors font-body-md text-sm font-semibold"
                    href="https://wa.me/573124549968"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-secondary text-lg">
                      phone
                    </span>
                    <span>+57 312 4549968</span>
                  </a>
                  <span className="font-body-md text-sm text-on-surface-variant text-center md:text-left">
                    Atención personalizada y agendamiento vía WhatsApp
                  </span>
                  <a
                    className="contact-section__social font-body-md text-sm text-on-surface underline underline-offset-4"
                    href="https://www.instagram.com/naturalbyrobertocuello/"
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label="Instagram de Natural: @naturalbyrobertocuello"
                  >
                    Instagram · @naturalbyrobertocuello
                  </a>
                  <a
                    className="contact-section__social font-body-md text-sm text-on-surface underline underline-offset-4"
                    href="https://www.instagram.com/dr.robertocuellop/"
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label="Instagram del Dr. Roberto Cuello: @dr.robertocuellop"
                  >
                    Instagram · @dr.robertocuellop
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-body-sm text-outline text-center sm:text-left">
                <span>© Natural by Roberto Cuello. Todos los derechos reservados.</span>
                <span>Clínica de Estética Dental y Odontología Integral</span>
              </div>
            </div>
          </section>

          {/* BOTÓN FLOTANTE DE WHATSAPP */}
          <aside className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            <div className="hidden md:block bg-white/95 backdrop-blur-md border border-white/70 text-on-surface px-3.5 py-1.5 rounded-full shadow-md font-label-sm text-[11px] font-semibold">
              Escríbenos por WhatsApp
            </div>
            <a
              aria-label="Escríbenos por WhatsApp"
              className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_6px_24px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
              href="https://wa.me/573124549968?text=Hola,%20quisiera%20agendar%20mi%20valoraci%C3%B3n%20en%20Natural%20by%20Roberto%20Cuello."
              rel="noopener noreferrer"
              target="_blank"
            >
              <WhatsAppIcon className="w-8 h-8 fill-current" />
            </a>
          </aside>
        </div>
      </main>

      {/* FOOTER FINAL */}
      <footer className="natural-glass w-full bg-white/60 backdrop-blur-md border-t border-white/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop py-space-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-headline-sm text-sm font-semibold text-on-surface">
              Natural by Roberto Cuello
            </span>
            <span className="font-body-sm text-xs text-on-surface-variant">
              Valledupar, Colombia
            </span>
          </div>
          <div className="natural-footer-links flex items-center gap-6">
            <a
              className="font-label-md text-xs text-on-surface-variant hover:text-on-surface transition-colors"
              href="#tratamientos"
            >
              Tratamientos
            </a>
            <button
              type="button"
              className="font-label-md text-xs text-on-surface-variant hover:text-on-surface transition-colors"
              aria-haspopup="dialog"
              aria-controls="patient-experience-dialog"
              onClick={openPatientExperience}
            >
              Pacientes nacionales e internacionales
            </button>
            <a
              className="font-label-md text-xs text-on-primary-container font-semibold hover:underline"
              href="https://wa.me/573124549968"
              rel="noopener noreferrer"
              target="_blank"
            >
              Escríbenos
            </a>
          </div>
          <p className="font-body-sm text-xs text-outline">
            © Natural. Todos los derechos reservados.
          </p>
        </div>
      </footer>
      </>}

      <PatientExperienceDialog open={patientsOpen} onClose={() => setPatientsOpen(false)} triggerRef={patientsTriggerRef} fallbackFocusRef={menuToggleRef} />

      {/* RESEÑA, RETRATO Y CIFRAS: DIÁLOGO MODAL NATIVO */}
      <dialog
        ref={doctorDialogRef}
        id="roberto-dialog"
        className="doctor-dialog"
        aria-labelledby="roberto-modal-title"
        aria-modal="true"
        onClose={() => setDoctorOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'))
            .filter((element) => element.getClientRects().length > 0 && !element.hasAttribute('disabled'));
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (!first || !last) return;
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        onPointerDown={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          doctorBackdropPressRef.current = event.target === event.currentTarget &&
            (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
        }}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          if (doctorBackdropPressRef.current && event.target === event.currentTarget &&
            (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
            event.currentTarget.close();
          }
          doctorBackdropPressRef.current = false;
        }}
      >
        <div className="doctor-dialog__header">
          <h2 id="roberto-modal-title" className="font-headline-lg font-bold">DR. ROBERTO CUELLO</h2>
          <button
            type="button"
            className="doctor-dialog__close"
            aria-label="Cerrar presentación de Roberto Cuello"
            onClick={() => doctorDialogRef.current?.close()}
            autoFocus
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>
        <div className="doctor-dialog__scroll" tabIndex={0} role="region" aria-label="Reseña y trayectoria de Roberto Cuello">
          <section className="doctor-profile" id="roberto-profile-content">
            <div className="doctor-profile__inner">
              <dl className="doctor-profile__metrics" aria-label="Trayectoria de Roberto Cuello">
                <div>
                  <dt>casos clínicos</dt>
                  <dd><span>Más de</span> 500</dd>
                </div>
                <div>
                  <dt>carillas dentales</dt>
                  <dd><span>Más de</span> 5.000</dd>
                </div>
                <div>
                  <dt>años de trayectoria</dt>
                  <dd><span>Más de</span> 10</dd>
                </div>
              </dl>

              <div className="doctor-profile__layout">
                <figure className="doctor-profile__portrait">
                  <img
                    src="/team/roberto-cuello.jpeg"
                    alt="Retrato del Dr. Roberto Cuello en Natural"
                    width={1080}
                    height={1920}
                    loading="eager"
                    decoding="async"
                  />
                </figure>
                <div className="doctor-profile__copy">
                  <p className="doctor-profile__eyebrow">Ciencia, arte y naturalidad</p>
                  <div className="doctor-profile__biography">
                    <p>
                      Con más de diez años de trayectoria en la odontología, el Dr. Roberto Cuello ha dedicado su carrera a transformar sonrisas a través de una visión que combina ciencia, arte y naturalidad.
                    </p>
                    <p>
                      Desde sus inicios profesionales en 2016, ha mantenido un compromiso permanente con la excelencia y la actualización de sus conocimientos, participando en cursos, diplomados y entrenamientos avanzados junto a reconocidos referentes nacionales e internacionales de la odontología estética. Esta formación le ha permitido perfeccionar sus habilidades y desarrollar un enfoque propio, especialmente en el diseño de sonrisa y las restauraciones estéticas con resinas compuestas indirectas.
                    </p>
                    <p>
                      A lo largo de su trayectoria, ha realizado más de 500 casos clínicos y más de 5.000 carillas dentales, respaldando su experiencia con una práctica basada en la precisión, la atención al detalle y el respeto por las características individuales de cada paciente.
                    </p>
                    <p>
                      Su filosofía parte de una convicción: una sonrisa verdaderamente hermosa es aquella que conserva su esencia natural. Por eso, cada tratamiento es concebido de manera personalizada, buscando armonía entre la sonrisa, el rostro y la identidad de quien la lleva.
                    </p>
                    <p>
                      De esta visión nace NATURAL by Roberto Cuello, una clínica que refleja su manera de entender la odontología: un equilibrio entre experiencia, innovación, calidad humana y atención integral, donde cada detalle está pensado para ofrecer una experiencia diferente.
                    </p>
                    <p>
                      Más que transformar sonrisas, su propósito es crear resultados que transmitan confianza, autenticidad y bienestar, manteniendo siempre la naturalidad como su sello distintivo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </dialog>

      {/* INFORMACIÓN DE TRATAMIENTOS: FOTOGRAFÍAS EN EL ORDEN INDICADO POR EL PROPIETARIO */}
      <dialog
        ref={treatmentDialogRef}
        id="treatment-dialog"
        className="doctor-dialog treatment-dialog"
        aria-labelledby="treatment-title"
        aria-modal="true"
        onClose={() => setSelectedTreatment(null)}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'))
            .filter((element) => element.getClientRects().length > 0 && !element.hasAttribute('disabled'));
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (!first || !last) return;
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault(); last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first.focus();
          }
        }}
        onPointerDown={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          treatmentBackdropPressRef.current = event.target === event.currentTarget &&
            (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
        }}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          if (treatmentBackdropPressRef.current && event.target === event.currentTarget &&
            (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
            event.currentTarget.close();
          }
          treatmentBackdropPressRef.current = false;
        }}
      >
        <div className="doctor-dialog__header">
          <h2 id="treatment-title" className="font-headline-lg font-bold">{selectedTreatment?.title ?? 'Tratamiento'}</h2>
          <button type="button" className="doctor-dialog__close" aria-label="Cerrar información del tratamiento" onClick={() => treatmentDialogRef.current?.close()} autoFocus>
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>
        <div className="doctor-dialog__scroll" tabIndex={0} role="region" aria-label="Información del tratamiento">
          {selectedTreatment && <>
            <TreatmentGallery key={selectedTreatment.id} title={selectedTreatment.title} images={selectedTreatment.gallery} rotations={TREATMENTS.find((item) => item.id === selectedTreatment.id)?.galleryRotations} />
            <div className="treatment-dialog__body">
              {selectedTreatment.description && <p>{selectedTreatment.description}</p>}
              <section className="treatment-dialog__assessment" aria-label="Valoración personalizada">
                <h3>Primero, tu valoración</h3>
                <p>La duración del tratamiento y de sus resultados, el número de citas y los materiales se definen según cada caso clínico. Agenda tu valoración para conocer el plan más adecuado para ti.</p>
              </section>
              <a className="treatment-dialog__cta" href={`https://wa.me/573124549968?text=${encodeURIComponent(selectedTreatment.whatsappText)}`} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Agendar mi valoración</span>
              </a>
            </div>
          </>}
        </div>
      </dialog>
    </div>
  );
}
