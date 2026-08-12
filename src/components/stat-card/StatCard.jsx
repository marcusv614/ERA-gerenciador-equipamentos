import styles from './StatCard.module.css';

const ACCENTS = {
  'var(--accent)': styles.accent,
  'var(--info)': styles.info,
  'var(--warn)': styles.warn,
};

export function StatCard({ label, value, accent }) {
  const valueClass = accent
    ? `${styles.value} ${ACCENTS[accent] || styles.accent}`
    : styles.value;

  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}