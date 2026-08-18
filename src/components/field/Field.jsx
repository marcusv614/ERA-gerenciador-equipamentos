import styles from './Field.module.css';

export function CampoFormulario({ rotulo, children }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{rotulo}</span>
      {children}
    </label>
  );
}
