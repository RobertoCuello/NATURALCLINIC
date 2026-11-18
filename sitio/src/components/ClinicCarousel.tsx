import { useEffect, useState } from 'react';

const PHOTOS = [
  { src: '/clinic/consultorio.jpg', label: 'Consultorio', alt: 'Consultorio de Natural con equipo odontológico y acabados en madera', width: 4000, height: 6000 },
  { src: '/clinic/acceso-consultorio.jpg', label: 'Acceso al consultorio', alt: 'Acceso acristalado a un consultorio odontológico de Natural', width: 4000, height: 6000 },
  { src: '/clinic/escalera.jpg', label: 'Jardín interior y escalera', alt: 'Escalera de Natural junto a su jardín interior', width: 4000, height: 6000 },
  { src: '/clinic/fachada.jpg', label: 'Fachada', alt: 'Fachada de Natural by Roberto Cuello y su rótulo rodeado de vegetación', width: 4000, height: 6000 },
];

export default function ClinicCarousel() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hovered, setHovered] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [visible, setVisible] = useState(() => !document.hidden);
  const photo = PHOTOS[active];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduceMotion = () => setReducedMotion(media.matches);
    const onVisibility = () => setVisible(!document.hidden);
    media.addEventListener('change', reduceMotion);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      media.removeEventListener('change', reduceMotion);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || hovered || focusPaused || !visible) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % PHOTOS.length), 5500);
    return () => window.clearInterval(timer);
  }, [reducedMotion, hovered, focusPaused, visible]);

  useEffect(() => {
    const next = new Image();
    next.src = PHOTOS[(active + 1) % PHOTOS.length].src;
  }, [active]);

  const changePhoto = (direction: number) => {
    setActive((index) => (index + direction + PHOTOS.length) % PHOTOS.length);
  };

  return (
    <div
      className="clinic-carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Nuestras instalaciones"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => setFocusPaused(event.target instanceof HTMLElement && event.target.matches(':focus-visible'))}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusPaused(false);
      }}
    >
      <figure className="natural-hero__photo" role="group" aria-roledescription="diapositiva" aria-label={`${active + 1} de ${PHOTOS.length}: ${photo.label}`}>
        <img key={photo.src} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} decoding="async" />
        <figcaption aria-live={reducedMotion || hovered || focusPaused ? 'polite' : 'off'}>
          <span className="clinic-carousel__heading">Nuestras instalaciones</span>
          <span>{photo.label}</span>
        </figcaption>
      </figure>
      <button type="button" className="clinic-carousel__control clinic-carousel__previous" onClick={() => changePhoto(-1)} aria-label="Foto anterior de la clínica">
        <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
      </button>
      <button type="button" className="clinic-carousel__control clinic-carousel__next" onClick={() => changePhoto(1)} aria-label="Siguiente foto de la clínica">
        <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
      </button>
    </div>
  );
}
