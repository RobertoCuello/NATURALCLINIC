import { useLayoutEffect, useRef, type RefObject } from 'react';
import ExperienceCarousel from './ExperienceCarousel';

interface PatientExperienceDialogProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  fallbackFocusRef: RefObject<HTMLButtonElement | null>;
}

export default function PatientExperienceDialog({ open, onClose, triggerRef, fallbackFocusRef }: PatientExperienceDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropPressRef = useRef(false);

  useLayoutEffect(() => {
    if (!open || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    dialog.querySelector('.doctor-dialog__scroll')?.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      const target = triggerRef.current?.isConnected ? triggerRef.current : fallbackFocusRef.current;
      target?.focus({ preventScroll: true });
    };
  }, [open, triggerRef, fallbackFocusRef]);

  return (
    <dialog
      ref={dialogRef}
      id="patient-experience-dialog"
      className="doctor-dialog patient-experience-dialog"
      aria-labelledby="patient-experience-title"
      aria-modal="true"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'))
          .filter((element) => element.getClientRects().length > 0 && !element.hasAttribute('disabled'));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onPointerDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        backdropPressRef.current = event.target === event.currentTarget &&
          (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
      }}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (backdropPressRef.current && event.target === event.currentTarget &&
          (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
          event.currentTarget.close();
        }
        backdropPressRef.current = false;
      }}
    >
      <div className="doctor-dialog__header">
        <h2 id="patient-experience-title" className="font-headline-lg font-bold">NATURAL | Experiencia sin fronteras</h2>
        <button type="button" className="doctor-dialog__close" aria-label="Cerrar información para pacientes nacionales e internacionales" onClick={() => dialogRef.current?.close()} autoFocus>
          <span className="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      </div>
      <div className="doctor-dialog__scroll" tabIndex={0} role="region" aria-label="Experiencia de atención para pacientes nacionales e internacionales">
        <div className="patient-experience__layout">
          <div className="patient-experience__media">{open && <ExperienceCarousel />}</div>
        <div className="patient-experience__body">
          <p className="patient-experience__lead font-headline-lg">Tu sonrisa merece una experiencia sin fronteras.</p>
          <p>¿Vives en otra ciudad o fuera de Colombia y deseas realizar tu tratamiento odontológico en Valledupar?</p>
          <p>En NATURAL Clinic queremos que la distancia no sea una barrera para cuidar tu sonrisa.</p>
          <p>Te ofrecemos una experiencia de atención personalizada, diseñada para acompañarte desde tu primer contacto con nuestro equipo hasta el seguimiento de tu tratamiento.</p>
          <section aria-labelledby="patient-experience-steps">
            <h3 id="patient-experience-steps" className="font-headline-lg">¿Cómo te acompañamos?</h3>
            <ol className="patient-experience__steps">
              <li><h4>Orientación inicial a distancia</h4></li>
              <li><h4>Planificación de tu tratamiento</h4></li>
              <li>
                <h4>Facilitamos tu estadía en Valledupar</h4>
                <p>Te ponemos en contacto con aliados especializados en alojamiento, transporte y experiencias turísticas, para que organices tu visita de acuerdo con tus preferencias.</p>
                <p className="patient-experience__note">Estos servicios son opcionales, contratados directamente con los proveedores y sujetos a disponibilidad.</p>
              </li>
              <li><h4>Una experiencia de atención NATURAL</h4></li>
              <li>
                <h4>Seguimiento después de tu visita</h4>
                <p>Te orientamos sobre los controles y cuidados posteriores, así como sobre el seguimiento que requiera tu tratamiento.</p>
              </li>
            </ol>
          </section>
          <p className="patient-experience__lead font-headline-lg">Tu próxima sonrisa puede comenzar aquí.</p>
          <p>Escríbenos y descubre cómo planificar tu experiencia odontológica en NATURAL.</p>
          <a className="treatment-dialog__cta" href={`https://wa.me/573124549968?text=${encodeURIComponent('Hola, quisiera planificar mi experiencia odontológica Sin Fronteras en NATURAL.')}`} target="_blank" rel="noopener noreferrer">Planificar mi visita</a>
        </div>
        </div>
      </div>
    </dialog>
  );
}
