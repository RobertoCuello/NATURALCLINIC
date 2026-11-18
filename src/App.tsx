/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';

interface Treatment {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  ctaText: string;
  whatsappText: string;
  details: {
    duration: string;
    sessions: string;
    material: string;
    overview: string;
  };
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
    title: 'Diseño de sonrisa en cerámica',
    description: 'Un resultado natural y armónico, hecho a tu medida.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWjGxxFDZkrxy7g1aHllqXiRyNxzz5E5r5O8CtQgb0yobCc34X1hDtUCwR6HpuiQRJTNv8e6fbqno3BfCb78lhdtXR5DEIrJ0rh5Thp6nTwFoyjOOIxdFJTaIVWdYYq47P-Kl9C-IJvOZEquZb4mTYJ8UvVpSMVW3k-cwGicDqfVbdB5B3UfBJIH-SNjeNmlCHdZanHulMEtiaX_jog9MC_9tTVBWncXN1rJ8KnF3CF5CM8IXfJndi2agxuFxWgjxNjLw',
    alt: 'Diseño de sonrisa en cerámica realizado por el Dr. Roberto Cuello',
    ctaText: 'Quiero mi diseño en cerámica',
    whatsappText:
      'Hola, quisiera agendar mi valoración para Diseño de sonrisa en cerámica en Natural.',
    details: {
      duration: 'Alta longevidad (10-15+ años)',
      sessions: '2 a 3 citas clínicas',
      material: 'Disilicato de litio y cerámica feldespática estratificada',
      overview:
        'Láminas ultrafinas de porcelana diseñadas digitalmente según tus proporciones faciales, textura dental natural y traslucidez incisal para un acabado imperceptible.',
    },
  },
  {
    id: 'indirecta',
    badge: 'Técnica indirecta',
    title: 'Diseño de sonrisa en técnica indirecta',
    description: 'Precisión y durabilidad para una sonrisa que perdura.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEkdjKhMCk6qCUTWTbJ_m1IaghAwOHzay_iSONjh6FoApfaZfkJameKtCyYoV7SKd7d_z5TbrLobrPCdtcy30_gu4jMmykfZBkysIE_NmbcaG8es9waBmv6YaZ8Gt6ElToCfae1YiUqmcjjHjrwq62dmaM8n2DtCoNVxeDYerE_m3BKS7ty0OkjqOZzezCGq7HM1kl6BPLM9Xod0mAnsZ_Z2morHqJxFAnCWtAoexhOCQmqBCe0cCHRNcNWYjFSTeTSco',
    alt: 'Diseño de sonrisa en técnica indirecta de alta precisión',
    ctaText: 'Quiero mi diseño de sonrisa',
    whatsappText:
      'Hola, quisiera agendar mi valoración para Diseño de sonrisa en técnica indirecta en Natural.',
    details: {
      duration: 'Estabilidad estética superior',
      sessions: '2 citas personalizadas',
      material: 'Biomateriales poliméricos y cerómeros de alta densidad',
      overview:
        'Confección extraoral sobre modelos de alta precisión que garantiza adaptación gingival impecable, brillo duradero y mínima intervención sobre tu estructura dental.',
    },
  },
  {
    id: 'ortodoncia',
    badge: 'Ortodoncia estética',
    title: 'Ortodoncia',
    description: 'Una sonrisa alineada y saludable, para ti o tu familia.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8B80n_Zmew7LxftGTC29hVz-kWAzzjkMiebeWPWAQM9cprPdgDgAKSEt7CXze3s3FXveZ9yvRjmKMzwyLZUX0qgNnIGZbymsFubf9PjYbroBvIDg7l1mVCgSXNiexrPdiX1PY0scARBHzln1BOMf2z8L-ImIMABf19O1xDyliAW6WnWAkZ8mJniBA70rZsKsEvIMmX3ctVysXbu0COG2A8nyc-Uw0Dd9xf0A6rGLlg6h7btSt8McHL_V8rl0VfM2O1SM',
    alt: 'Ortodoncia estética y funcional para alineación dental',
    ctaText: 'Consultar ortodoncia',
    whatsappText:
      'Hola, quisiera consultar por el tratamiento de Ortodoncia en Natural.',
    details: {
      duration: 'Planificado según diagnóstico 3D',
      sessions: 'Controles mensuales personalizados',
      material: 'Alineadores invisibles, brackets de autoligado y zafiro',
      overview:
        'Alineación biomecánica que armoniza la mordida, protege la articulación temporomandibular y prepara la arquitectura dental para una sonrisa saludable.',
    },
  },
  {
    id: 'general',
    badge: 'Salud integral',
    title: 'Odontología general',
    description: 'Cuidado integral de tu salud oral en un solo lugar.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7aCaS6ZpBDZo-4-NL-iS53fd1T5QD548HgLqmfERxuWoCHBMhXVukzSKByY6017PLeW1Sx6N3GYssyStTzoB_7DHw15nDEsnkOU7ezY3l103wbYTr1jbz3PvMNfSwdLumhrU5xiviws7e44rI4rGYwCBHJZqfsWFHUbM7Au5198AiXd5O7JM27lgg8GThgy_omip3K8lblAZvc0677L5u5TBQO7T9Q6oA6ZY7nCJd0jAsIFO7qnp6cD8EagtV42VvuTU',
    alt: 'Odontología general y salud oral integral en Natural',
    ctaText: 'Agendar mi cita',
    whatsappText:
      'Hola, quisiera agendar mi cita de Odontología general en Natural.',
    details: {
      duration: 'Prevención y rehabilitación continua',
      sessions: 'Desde 1 sesión clínica',
      material: 'Resinas de nanotecnología y profilaxis ultrasónica',
      overview:
        'Diagnóstico preventivo, restauraciones biomiméticas, periodoncia e higiene clínica avanzada bajo un enfoque libre de dolor y estrés.',
    },
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
    answer: 'Cl. 7a #9-60, San Carlos, Valledupar.',
  },
];

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAtl4qZ4hQaGlRc7BPueCg9a4BFyz6icZbfJAUoQhZ1Betf3kwuWUneFpsA8sQ7YXSeAbjYqWE4UG2YeBceFWZ0d6_puBIjt0daQbqSzctFSgi207bwPPWKAtUUKwl398HB3a6Ua4q5oPxsltslZHFlnD59Qrlajs9VL1mmksyJd593DiJ0288KZapY2av_QLaKd2PjHhuSBPktgJgjHic5xy7u2TKFXev0_u7J2Ktd_7YMdPNpdKnqjMyxaXnfhaKJlH8';

const HERO_MACRO_SMILE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDWjGxxFDZkrxy7g1aHllqXiRyNxzz5E5r5O8CtQgb0yobCc34X1hDtUCwR6HpuiQRJTNv8e6fbqno3BfCb78lhdtXR5DEIrJ0rh5Thp6nTwFoyjOOIxdFJTaIVWdYYq47P-Kl9C-IJvOZEquZb4mTYJ8UvVpSMVW3k-cwGicDqfVbdB5B3UfBJIH-SNjeNmlCHdZanHulMEtiaX_jog9MC_9tTVBWncXN1rJ8KnF3CF5CM8IXfJndi2agxuFxWgjxNjLw';

const DOCTOR_PORTRAIT_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAn5IwKF1rF2bAx1CJa1U4NMiu4D7lftzeBvHVoyTH8v4jhaBUixQ2ifJ_GFt9OeFB6sREQb5Y3_bCUcyrztRkXPQc01DD4BMUwbAPdXa0JCl9BhhINFtqhY_GM9U05AUi9F_Nl8ro73NHBV36xV46x7u9H8af2RzNAaRmDe9VaVwoNweXpLSki22MXVanSBHMpfpCCzwuTnrgLrgjkYTOvlB9yQkJ_zxr_KIhnyw6tvoINH-njoiGuKk3Q3o0fmms5Goo3p3hMWJlLTSw';

const BG_PHOTOS = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXqDt-Iz0EPX8XBH98Sl3lMrfy7HMoqJqOuu5gia_Euz7k9RDRHLzCIjRwaQe6L_tLmCyexXr3FXF2VlMtBk4jPkhVR0myzJmqIv89kf0tLUzfI1f0XYoCSzQ6AJeSZxI8gK6pBXuVqg5--NI3JhXhouT24lcHVNx18hNRrrGyUDV4nuVCnBDosMGW8Fh33ZQgxMiP4rwlmVUg7JAAsPTjYNrOLX5hP__VBiI245ULDke2lUrHA78ILsBckE1zOxYYeBU',
    alt: 'Fachada Natural by Roberto Cuello',
    hideOnMobile: false,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUxIekatSBoJuU01CEY6AIYdArAOfX02Kt4xinfltk5gyMX5YN7WUCJeFWb0A22a1C0jBh2mmmfrlEti9g0BdTHFp1CakwFTnQP_bM-ln7uQEiQtAcsPRKn038dQ-BzqIAEoB4cauQjzM53ZtpAQSff9ghhL2tK5_m2man-pnIVmXiVDGjr-Mk7c0eDD7gKB8eP-tiU4PoOKVn6lSoevmpuvjOcACatWuNnpMvXQo22N6WRqPN88KD3GGQ7P1mUXd04hw',
    alt: 'Recepción y sala de espera Natural',
    hideOnMobile: true,
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiUIBBECyI0rCJas0uChlKbg9F42Gav_YphT-eKTshA4OmtpYhp9mjxBb1xalzlroQfVoWHAILwFA1kJRyW4kVx80cIXgTXrpniosxez-qq4QDBWU6FiHE9UoMi7LqpjlImJJm2ZL9ywcepX1S6wprGWJnq7c3dk2bFXd6hJUR3RjgUPPqIocoZcYYEYGkuvYXoDx0QDtHrLzPt3PGBoABSbLEpth0Ba9ayybwUS0TGNdPWn45H5Qm3kvu-MHDRhoR7mI',
    alt: 'Detalle zen y naturaleza en clínica Natural',
    hideOnMobile: true,
  },
];

function WhatsAppIcon({ className = 'w-5 h-5 fill-current' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.163 8.163 0 0 1-1.25-4.38c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.41 3.61 2.41 5.8 0 4.52-3.68 8.24-8.37 8.24zm4.5-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"></path>
    </svg>
  );
}

export default function App() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [activeDot, setActiveDot] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [heroView, setHeroView] = useState<'macro' | 'doctor'>('macro');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F5F0] font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container relative">
      {/* FONDO FIJO (PARALLAX CON FOTOS Y VELO) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-0 opacity-40 mix-blend-multiply scale-105">
          {BG_PHOTOS.map((photo, index) => (
            <div
              key={index}
              className={`h-full w-full overflow-hidden relative ${
                photo.hideOnMobile ? 'hidden md:block' : ''
              }`}
            >
              <img
                alt={photo.alt}
                src={photo.src}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter blur-[1px]"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[#F8F5F0]/85 backdrop-blur-[2px]"></div>
      </div>

      {/* HEADER / BARRA DE NAVEGACIÓN */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F5F0]/90 backdrop-blur-xl border-b border-white/60 shadow-[0_1px_12px_rgba(46,42,38,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-margin-desktop flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-shrink-0">
            <a className="flex items-center gap-3.5 group" href="#">
              <div className="p-0.5 rounded-full ring-1 ring-outline-variant/30 group-hover:ring-primary-container transition-all overflow-hidden bg-white/80">
                <img
                  alt="Natural by Roberto Cuello"
                  className="w-9 h-9 rounded-full object-contain"
                  src={LOGO_URL}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-base text-on-surface leading-tight font-medium">
                  Natural
                </span>
                <span className="font-label-sm text-[10px] text-outline leading-tight">
                  by Roberto Cuello
                </span>
              </div>
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <a
              className="font-label-lg text-[13px] tracking-[0.06em] text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap"
              href="#tratamientos"
            >
              Tratamientos
            </a>
            <a
              className="font-label-lg text-[13px] tracking-[0.06em] text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap"
              href="#turismo-medico"
            >
              Turismo médico
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

          <div className="flex items-center gap-4">
            <a
              className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-[13px] font-semibold transition-all duration-300 hover:brightness-95 shadow-[0_4px_16px_rgba(212,175,127,0.25)] hover:shadow-[0_6px_22px_rgba(212,175,127,0.35)] whitespace-nowrap"
              href="https://wa.me/573124549968?text=Hola,%20quisiera%20agendar%20mi%20valoraci%C3%B3n%20en%20Natural%20by%20Roberto%20Cuello."
              rel="noopener noreferrer"
              target="_blank"
            >
              Agenda tu valoración
            </a>
            <button
              aria-label="Abrir menú"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F8F5F0]/95 backdrop-blur-xl border-b border-outline-variant/30 px-6 py-5 flex flex-col gap-4">
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-lg text-sm font-medium text-on-surface py-1.5"
              href="#tratamientos"
            >
              Tratamientos
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-lg text-sm font-medium text-on-surface py-1.5"
              href="#turismo-medico"
            >
              Turismo médico
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-label-lg text-xs font-bold shadow-sm mt-1"
              href="https://wa.me/573124549968?text=Hola,%20quisiera%20agendar%20mi%20valoraci%C3%B3n%20en%20Natural%20by%20Roberto%20Cuello."
              rel="noopener noreferrer"
              target="_blank"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Agenda tu valoración</span>
            </a>
          </div>
        )}
      </header>

      <main className="w-full pt-20">
        <div className="flex flex-col w-full text-on-surface">
          {/* HERO SECTION — Centered Layout matching screenshot */}
          <section className="relative w-full overflow-hidden pb-space-xl">
            <div className="max-w-5xl mx-auto px-6 lg:px-margin-desktop pt-10 lg:pt-14 flex flex-col items-center text-center">
              {/* Pill Kicker */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/70 border border-secondary/20 backdrop-blur-sm shadow-xs text-on-secondary-container mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-md text-[11px] font-semibold tracking-wide">
                  Tu salud, nuestra esencia
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-headline-lg font-bold text-4xl sm:text-5xl lg:text-[54px] lg:leading-[1.14] text-on-surface tracking-tight max-w-3xl text-balance">
                Tu sonrisa, con la naturalidad que te representa
              </h1>

              {/* Subtitle */}
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed mt-5">
                Diseño de sonrisa, ortodoncia y odontología integral en Valledupar, con el
                cuidado y la calidez de Natural by Roberto Cuello
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-7 w-full sm:w-auto">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-primary-container text-on-primary-container font-label-lg text-[13px] font-bold transition-all duration-300 hover:brightness-95 shadow-[0_6px_24px_rgba(212,175,127,0.4)] hover:shadow-[0_8px_32px_rgba(212,175,127,0.55)] transform hover:-translate-y-0.5"
                  href="https://wa.me/573124549968?text=Hola,%20quisiera%20agendar%20mi%20valoraci%C3%B3n%20en%20Natural%20by%20Roberto%20Cuello."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>Agendar mi valoración</span>
                </a>
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/85 backdrop-blur-md border border-white/90 text-on-surface font-label-lg text-[13px] font-semibold hover:bg-white transition-colors shadow-sm"
                  href="#tratamientos"
                >
                  Explorar tratamientos
                </a>
              </div>

              {/* Hero Featured Media Card with Macro Dental Photography & Floating Atelier Badge */}
              <div className="relative w-full max-w-3xl mt-12">
                <div className="relative aspect-[16/11] sm:aspect-[16/10] rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(46,42,38,0.14)] border-[6px] border-white/90 ring-1 ring-[#D4AF7F]/25 bg-[#12100e]">
                  {heroView === 'macro' ? (
                    <img
                      alt="Precisión anatómica — Carillas cerámicas por Dr. Roberto Cuello"
                      className="w-full h-full object-cover object-center transition-all duration-500"
                      src={HERO_MACRO_SMILE}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <img
                      alt="Dr. Roberto Cuello — Especialista en Estética Dental y Rehabilitación"
                      className="w-full h-full object-cover object-top transition-all duration-500"
                      src={DOCTOR_PORTRAIT_URL}
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none"></div>

                  {/* Bottom-left caption inside image */}
                  <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white/95">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF7F]"></span>
                    <span className="font-body-sm text-xs font-medium tracking-wide drop-shadow">
                      {heroView === 'macro'
                        ? 'Precisión anatómica • Carillas cerámicas'
                        : 'Dr. Roberto Cuello • Director Clínico'}
                    </span>
                  </div>

                  {/* Top-right subtle switcher pill to toggle between Macro Smile & Dr. Roberto Cuello */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/45 backdrop-blur-md p-1 rounded-full border border-white/20">
                    <button
                      type="button"
                      onClick={() => setHeroView('macro')}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        heroView === 'macro'
                          ? 'bg-primary-container text-on-primary-container font-semibold'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      Caso Clínico
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroView('doctor')}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        heroView === 'doctor'
                          ? 'bg-primary-container text-on-primary-container font-semibold'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      Dr. Roberto Cuello
                    </button>
                  </div>
                </div>

                {/* Floating Bottom-Right Atelier Badge matching screenshot */}
                <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_12px_30px_rgba(46,42,38,0.12)] border border-white ring-1 ring-[#D4AF7F]/20 text-left">
                  <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center p-1 border border-outline-variant/30">
                    <img
                      src={LOGO_URL}
                      alt="Atelier Natural"
                      className="w-full h-full object-contain rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-xs font-bold text-on-surface leading-tight">
                      Atelier de sonrisas
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                      Valledupar, Colombia
                    </span>
                  </div>
                </div>
              </div>

              {/* 3-Column Trust & Metrics Bar */}
              <div className="w-full max-w-4xl mt-14 bg-white/80 backdrop-blur-md border border-white/80 ring-1 ring-[#D4AF7F]/20 rounded-3xl p-6 lg:p-7 shadow-[0_10px_30px_rgba(46,42,38,0.04)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-outline-variant/30 text-center">
                  {/* Metric 1: 5.0 Google Reviews */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 md:pt-0">
                    <div className="w-11 h-11 rounded-2xl bg-primary-fixed/40 flex items-center justify-center text-primary flex-shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-xl">star</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-title-md font-bold text-on-surface text-sm">
                          5.0
                        </span>
                        <div className="flex text-[#D4AF7F]">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-[14px]"
                              style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="font-body-sm text-[11px] text-on-surface-variant font-medium">
                        90 opiniones en Google
                      </span>
                    </div>
                  </div>

                  {/* Metric 2: Valoración personalizada */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 md:pt-0 md:pl-6">
                    <div className="w-11 h-11 rounded-2xl bg-secondary-container/50 flex items-center justify-center text-secondary flex-shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-xl">clinical_notes</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <span className="font-title-md font-bold text-on-surface text-xs sm:text-sm leading-snug">
                        Valoración personalizada
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                        Diagnóstico estético y funcional individual
                      </span>
                    </div>
                  </div>

                  {/* Metric 3: Atención humana y cercana */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 md:pt-0 md:pl-6">
                    <div className="w-11 h-11 rounded-2xl bg-tertiary-fixed/60 flex items-center justify-center text-tertiary flex-shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-xl">spa</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <span className="font-title-md font-bold text-on-surface text-xs sm:text-sm leading-snug">
                        Atención humana y cercana
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                        Acompañamiento cálido en cada cita
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TRATAMIENTOS ESTRELLA */}
          <section className="w-full py-20 scroll-mt-20 relative" id="tratamientos">
            <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop">
              <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-3 mb-14">
                <span className="font-label-md text-[11px] text-secondary font-semibold tracking-wider">
                  Excelencia clínica • Arte dental
                </span>
                <h2 className="font-headline-lg font-bold text-3xl sm:text-4xl text-on-surface text-center">
                  Tratamientos estrella
                </h2>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant text-center max-w-xl">
                  La armonía entre la ciencia odontológica y la sensibilidad artística para
                  devolverte la seguridad al sonreír.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TREATMENTS.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col bg-white/80 backdrop-blur-md border border-white/80 ring-1 ring-[#D4AF7F]/20 rounded-3xl overflow-hidden shadow-[0_10px_25px_rgba(46,42,38,0.04)] hover:shadow-[0_16px_36px_rgba(212,175,127,0.18)] hover:-translate-y-1.5 transition-all duration-300 text-center"
                  >
                    <div
                      onClick={() => setSelectedTreatment(item)}
                      className="relative aspect-[4/3] overflow-hidden bg-surface-container cursor-pointer"
                    >
                      <img
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={item.image}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur text-on-surface font-label-sm text-[10px] font-semibold shadow-xs border border-[#D4AF7F]/30 whitespace-nowrap">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between items-center gap-5">
                      <div className="flex flex-col items-center gap-2.5">
                        <h3 className="font-headline-sm font-bold text-lg sm:text-xl text-on-surface group-hover:text-primary transition-colors text-center leading-snug">
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
                          className="inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">verified</span>
                          <span className="font-label-md text-[11px] font-semibold underline decoration-secondary/40 underline-offset-2">
                            Valoración personalizada
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
            </div>
          </section>

          {/* POR QUÉ ELEGIRNOS */}
          <section className="w-full py-space-xl">
            <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop">
              <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
                <span className="font-label-md text-[11px] text-secondary font-semibold">
                  Nuestra esencia
                </span>
                <h2 className="font-headline-lg font-bold text-3xl sm:text-4xl text-on-surface text-center">
                  Por qué elegirnos
                </h2>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant text-center">
                  Entendemos la odontología como un espacio de bienestar, tranquilidad y
                  precisión donde cada paciente recibe un trato exclusivo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">
                      sentiment_satisfied
                    </span>
                  </div>
                  <h3 className="font-headline-sm font-semibold text-lg sm:text-xl text-on-surface text-center">
                    Atención humana y cercana
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                    Escuchamos tus expectativas con empatía y calidez, garantizando una
                    experiencia libre de estrés y plenamente confiable.
                  </p>
                </div>

                <div className="bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed/50 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">brush</span>
                  </div>
                  <h3 className="font-headline-sm font-semibold text-lg sm:text-xl text-on-surface text-center">
                    Cuidado en cada detalle
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                    Análisis milimétrico de la proporción facial, el color dentario y la
                    textura para lograr microestética de nivel superior.
                  </p>
                </div>

                <div className="bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-fixed/60 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">verified_user</span>
                  </div>
                  <h3 className="font-headline-sm font-semibold text-lg sm:text-xl text-on-surface text-center">
                    Resultados naturales y duraderos
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed text-center">
                    Materiales biocompatibles de última generación diseñados para perdurar en
                    el tiempo sin perder su brillo ni vitalidad.
                  </p>
                </div>

                <div className="bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed/70 text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">apartment</span>
                  </div>
                  <h3 className="font-headline-sm font-semibold text-lg sm:text-xl text-on-surface text-center">
                    Instalaciones elegantes y cómodas
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
              <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
                <span className="font-label-md text-[11px] text-secondary font-semibold">
                  Proceso simple y transparente
                </span>
                <h2 className="font-headline-lg font-bold text-3xl sm:text-4xl text-on-surface text-center">
                  Tu camino hacia una nueva sonrisa en 3 pasos
                </h2>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant text-center">
                  Te acompañamos desde la primera conversación hasta el resultado final con un
                  protocolo claro y sin complicaciones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                {/* Paso 1 */}
                <div className="bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl relative flex flex-col items-center text-center gap-5 hover:shadow-md transition-shadow">
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
                <div className="bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl relative flex flex-col items-center text-center gap-5 hover:shadow-md transition-shadow">
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
                <div className="bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl relative flex flex-col items-center text-center gap-5 hover:shadow-md transition-shadow">
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

          {/* TURISMO MÉDICO */}
          <section className="w-full py-space-xl scroll-mt-20" id="turismo-medico">
            <div className="max-w-5xl mx-auto px-6 lg:px-margin-desktop">
              <div className="bg-white/80 backdrop-blur-md border border-white/80 p-8 sm:p-12 lg:p-16 rounded-3xl shadow-md flex flex-col items-center text-center gap-7 ring-1 ring-outline-variant/25">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/60 text-secondary border border-white/60">
                  <span className="material-symbols-outlined text-base">flight_takeoff</span>
                  <span className="font-label-sm text-[11px] font-semibold">
                    Pacientes internacionales
                  </span>
                </div>

                <h2 className="font-headline-lg font-bold text-3xl sm:text-4xl text-on-surface leading-tight max-w-2xl text-center">
                  Tu nueva sonrisa, desde cualquier lugar del mundo
                </h2>

                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-2xl text-center">
                  Estamos preparando programas para pacientes del exterior que desean
                  transformar su sonrisa en Valledupar. Escríbenos y cuéntanos tu caso.
                </p>

                <div className="max-w-md w-full p-4 rounded-2xl bg-surface-container-low/80 border border-white/60 text-on-surface-variant flex items-center justify-center gap-3 text-center">
                  <span className="material-symbols-outlined text-primary text-lg flex-shrink-0">
                    info
                  </span>
                  <span className="font-body-md text-xs sm:text-sm font-medium">
                    [Detalles del paquete de turismo médico por definir]
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl pt-2">
                  <div className="bg-white/70 backdrop-blur-sm border border-white/60 p-6 rounded-2xl flex flex-col items-center text-center gap-2">
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                      <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
                        Tiempos optimizados
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant text-center leading-relaxed">
                      Sesiones continuas y planificadas para que aproveches tu estancia en la
                      ciudad mientras renuevas tu sonrisa.
                    </p>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm border border-white/60 p-6 rounded-2xl flex flex-col items-center text-center gap-2">
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined text-lg">support_agent</span>
                      <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
                        Acompañamiento VIP
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant text-center leading-relaxed">
                      Orientación personalizada desde tu llegada a Valledupar hasta tu retorno
                      seguro a casa.
                    </p>
                  </div>
                </div>

                <a
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-primary-container text-on-primary-container font-label-lg text-[13px] font-bold hover:brightness-95 transition-all shadow-md mt-2"
                  href="https://wa.me/573124549968?text=Hola,%20quisiera%20consultar%20mi%20plan%20de%20viaje%20y%20turismo%20m%C3%A9dico%20en%20Natural."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-lg">travel_explore</span>
                  <span>Consulta tu plan de viaje</span>
                </a>
              </div>
            </div>
          </section>

          {/* TESTIMONIOS */}
          <section className="w-full py-space-xl scroll-mt-20" id="testimonios">
            <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop">
              <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto mb-12">
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
                    className="min-w-[85vw] sm:min-w-[340px] lg:min-w-[380px] snap-start bg-white/75 backdrop-blur-md border border-white/70 p-8 rounded-3xl flex flex-col justify-between items-center text-center gap-6 shadow-sm hover:shadow-md transition-all"
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
              <div className="text-center max-w-xl mx-auto mb-12 flex flex-col items-center gap-3">
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
                      className="bg-white/75 backdrop-blur-md border border-white/70 rounded-2xl overflow-hidden shadow-sm transition-all text-center"
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
              <div className="bg-white/80 backdrop-blur-md border border-white/80 p-10 sm:p-16 rounded-3xl shadow-lg text-center flex flex-col items-center gap-6 relative overflow-hidden">
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
            className="w-full bg-white/70 backdrop-blur-md border-t border-white/60 py-14 scroll-mt-20"
            id="contacto"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
                {/* Logo y eslogan */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-surface-container-low/70">
                      <img
                        alt="Logo Natural by Roberto Cuello"
                        className="w-10 h-10 rounded-full object-contain"
                        src={LOGO_URL}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-headline-sm text-base font-semibold text-on-surface">
                        Natural
                      </span>
                      <span className="font-label-sm text-[10px] text-outline">
                        by Roberto Cuello
                      </span>
                    </div>
                  </div>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant italic text-center md:text-left">
                    “Tu salud, nuestra esencia”
                  </p>
                </div>

                {/* Ubicación */}
                <div className="flex flex-col items-center md:items-start gap-3">
                  <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
                    Ubicación
                  </span>
                  <div className="flex items-center md:items-start gap-2.5 text-on-surface-variant font-body-md text-xs sm:text-sm text-center md:text-left">
                    <span className="material-symbols-outlined text-lg text-primary flex-shrink-0">
                      location_on
                    </span>
                    <span>Cl. 7a #9-60, San Carlos, Valledupar, Colombia</span>
                  </div>
                </div>

                {/* Horarios y Redes marcadores exactos */}
                <div className="flex flex-col items-center md:items-start gap-3">
                  <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
                    Información
                  </span>
                  <div className="flex flex-col gap-2 font-body-sm text-xs text-on-surface-variant w-full max-w-[200px]">
                    <span className="p-2 rounded bg-surface-container-low/80 inline-block font-medium text-center">
                      [Horarios por definir]
                    </span>
                    <span className="p-2 rounded bg-surface-container-low/80 inline-block font-medium text-center">
                      [Redes sociales por definir]
                    </span>
                  </div>
                </div>

                {/* Contacto Directo */}
                <div className="flex flex-col items-center md:items-start gap-3">
                  <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
                    Contacto directo
                  </span>
                  <a
                    className="inline-flex items-center gap-2 text-on-surface hover:text-primary transition-colors font-body-md text-xs sm:text-sm font-semibold"
                    href="https://wa.me/573124549968"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-secondary text-lg">
                      phone
                    </span>
                    <span>+57 312 4549968</span>
                  </a>
                  <span className="font-body-sm text-xs text-on-surface-variant text-center md:text-left">
                    Atención personalizada y agendamiento vía WhatsApp
                  </span>
                </div>
              </div>

              <div className="pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-body-sm text-outline text-center sm:text-left">
                <span>© 2025 Natural by Roberto Cuello. Todos los derechos reservados.</span>
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
      <footer className="w-full bg-white/60 backdrop-blur-md border-t border-white/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop py-space-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-headline-sm text-sm font-semibold text-on-surface">
              Natural by Roberto Cuello
            </span>
            <span className="font-body-sm text-xs text-on-surface-variant">
              Atelier de arquitectura y estética dental • Valledupar, Colombia
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              className="font-label-md text-xs text-on-surface-variant hover:text-on-surface transition-colors"
              href="#tratamientos"
            >
              Tratamientos
            </a>
            <a
              className="font-label-md text-xs text-on-surface-variant hover:text-on-surface transition-colors"
              href="#turismo-medico"
            >
              Turismo médico
            </a>
            <a
              className="font-label-md text-xs text-on-primary-container font-semibold hover:underline"
              href="https://wa.me/573124549968"
              rel="noopener noreferrer"
              target="_blank"
            >
              Concierge VIP
            </a>
          </div>
          <p className="font-body-sm text-xs text-outline">
            © 2025 Natural. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* MODAL DE DETALLE CLÍNICO PARA CADA TRATAMIENTO */}
      {selectedTreatment && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedTreatment(null)}
        >
          <div
            className="bg-[#F8F5F0] border border-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-surface-container">
              <img
                src={selectedTreatment.image}
                alt={selectedTreatment.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                aria-label="Cerrar detalle"
                onClick={() => setSelectedTreatment(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-on-surface flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
              <div className="absolute bottom-3 left-4">
                <span className="px-3 py-1 rounded-full bg-white/95 text-on-surface font-label-sm text-[11px] font-semibold shadow-xs">
                  {selectedTreatment.badge}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <h3 className="font-headline-sm font-bold text-2xl text-on-surface">
                {selectedTreatment.title}
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                {selectedTreatment.details.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/80 p-3.5 rounded-2xl border border-outline-variant/30">
                  <span className="font-label-sm text-[10px] uppercase text-outline block">
                    Tiempo estimado
                  </span>
                  <span className="font-title-md text-xs font-bold text-on-surface">
                    {selectedTreatment.details.sessions}
                  </span>
                </div>
                <div className="bg-white/80 p-3.5 rounded-2xl border border-outline-variant/30">
                  <span className="font-label-sm text-[10px] uppercase text-outline block">
                    Durabilidad / Enfoque
                  </span>
                  <span className="font-title-md text-xs font-bold text-on-surface">
                    {selectedTreatment.details.duration}
                  </span>
                </div>
              </div>

              <div className="bg-white/80 p-3.5 rounded-2xl border border-outline-variant/30">
                <span className="font-label-sm text-[10px] uppercase text-outline block">
                  Tecnología y Biomateriales
                </span>
                <span className="font-body-sm text-xs font-medium text-on-surface">
                  {selectedTreatment.details.material}
                </span>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <a
                  href={`https://wa.me/573124549968?text=${encodeURIComponent(
                    selectedTreatment.whatsappText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-xs font-bold shadow-md hover:brightness-95 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>{selectedTreatment.ctaText}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

