import { X } from 'lucide-react';
import styles from './ModalShell.module.css';

export function ModalShell({ title, subtitle, onClose, children, wide }) {
  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.modal} ${wide ? styles.modalWide : ''}`}
      >
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <button onClick={onClose} className={styles.close} aria-label="Fechar">
            <X size={17} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}