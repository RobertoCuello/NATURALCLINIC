import { useEffect, useState } from 'react';
import TreatmentPhoto, { type PhotoRotation } from './TreatmentPhoto';

interface TreatmentGalleryProps {
  title: string;
  images: string[];
  rotations?: Partial<Record<number, PhotoRotation>>;
}

export default function TreatmentGallery({ title, images, rotations }: TreatmentGalleryProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => { if (media.matches) setPaused(true); };
    const onVisibilityChange = () => setVisible(!document.hidden);
    media.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      media.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (paused || !visible || images.length < 2) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % images.length), 5000);
    return () => window.clearTimeout(timer);
  }, [active, paused, visible, images.length]);

  const changePhoto = (direction: number) => {
    setPaused(true);
    setActive((index) => (index + direction + images.length) % images.length);
  };

  return (
    <section className="treatment-gallery" aria-label={`Fotografías de ${title}`} aria-roledescription="carrusel">
      <button
        type="button"
        className="treatment-gallery__frame"
        onClick={() => setPaused((value) => !value)}
        aria-label={`${paused ? 'Reanudar' : 'Pausar'} carrusel de ${title}`}
        aria-pressed={paused}
      >
        <TreatmentPhoto src={images[active]} alt={`Fotografía ${active + 1} de ${title}`} rotation={rotations?.[active + 1]} />
      </button>
      <div className="treatment-gallery__controls">
        <button type="button" onFocus={() => setPaused(true)} onClick={() => changePhoto(-1)} aria-label={`Foto anterior de ${title}`}>
          <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
        </button>
        <button type="button" onFocus={() => setPaused(true)} onClick={() => changePhoto(1)} aria-label={`Foto siguiente de ${title}`}>
          <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
