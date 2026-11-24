import { useEffect, useState } from 'react';
import { EXPERIENCE_PHOTOS } from '../data/experiencePhotos';

export default function ExperienceCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(() => !document.hidden);
  const photo = EXPERIENCE_PHOTOS[active] ?? EXPERIENCE_PHOTOS[0];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => { if (media.matches) setPaused(true); };
    const onVisibility = () => setVisible(!document.hidden);
    media.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      media.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % EXPERIENCE_PHOTOS.length), 5000);
    return () => window.clearTimeout(timer);
  }, [active, paused, visible]);

  useEffect(() => {
    const next = new Image();
    next.src = EXPERIENCE_PHOTOS[(active + 1) % EXPERIENCE_PHOTOS.length].src;
  }, [active]);

  const changePhoto = (direction: number) => {
    setPaused(true);
    setActive((index) => (index + direction + EXPERIENCE_PHOTOS.length) % EXPERIENCE_PHOTOS.length);
  };

  return (
    <section className="experience-carousel" aria-label="Imágenes de Experiencia sin fronteras" aria-roledescription="carrusel">
      <div className="experience-carousel__stage">
        <button type="button" className="experience-carousel__arrow" onFocus={() => setPaused(true)} onClick={() => changePhoto(-1)} aria-label="Foto anterior de Experiencia sin fronteras">
          <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
        </button>
        <button type="button" className="experience-carousel__photo" onClick={() => setPaused((value) => !value)} aria-label={`${paused ? 'Reanudar' : 'Pausar'} carrusel de Experiencia sin fronteras`} aria-pressed={paused}>
          <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} decoding="async" />
        </button>
        <button type="button" className="experience-carousel__arrow" onFocus={() => setPaused(true)} onClick={() => changePhoto(1)} aria-label="Foto siguiente de Experiencia sin fronteras">
          <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
