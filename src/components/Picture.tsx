type PictureProps = {
  /** file stem under /images, e.g. "history-ntu" */
  name: string;
  /** widths available as `${name}-${w}.webp` */
  widths: number[];
  /** fallback extension for browsers without WebP */
  fallback?: 'jpg' | 'png';
  alt: string;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

const base = import.meta.env.BASE_URL + 'images/';

export default function Picture({ name, widths, fallback = 'jpg', alt, sizes = '100vw', className, loading = 'lazy' }: PictureProps) {
  const srcSet = widths.map((w) => `${base}${name}-${w}.webp ${w}w`).join(', ');
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img className={className} src={`${base}${name}.${fallback}`} alt={alt} loading={loading} decoding="async" />
    </picture>
  );
}
