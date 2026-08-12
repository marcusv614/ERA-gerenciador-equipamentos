import styles from './TraceMark.module.css';

export function TraceMark({ w = 132, h = 28 }) {
  // A jagged OTDR-style reflectance trace — used as the signature motif.
  return (
    <svg
      className={styles.trace}
      width={w}
      height={h}
      viewBox="0 0 132 28"
      fill="none"
    >
      <polyline
        points="0,20 14,20 18,20 22,6 26,20 40,19 58,19 62,10 66,19 84,18 96,18 100,4 104,18 132,17"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <circle cx="22" cy="6" r="2" fill="var(--accent)" />
      <circle cx="100" cy="4" r="2" fill="var(--warn)" />
    </svg>
  );
}