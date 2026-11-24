export type PhotoRotation = 0 | 90 | 180 | 270;

interface TreatmentPhotoProps {
  src: string;
  alt: string;
  rotation?: PhotoRotation;
  loading?: 'lazy';
}

export default function TreatmentPhoto({ src, alt, rotation = 0, loading }: TreatmentPhotoProps) {
  return (
    <img
      className={rotation === 90 || rotation === 270 ? 'treatment-photo treatment-photo--quarter-turn' : 'treatment-photo'}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
    />
  );
}
