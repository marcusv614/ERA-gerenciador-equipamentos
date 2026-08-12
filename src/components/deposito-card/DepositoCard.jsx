import { StatusBadge } from '../status-badge/StatusBadge';
import { tipoIcon } from '../../data/mockData';
import styles from './DepositoCard.module.css';

const TILE = {
  Fluke: styles.tipoFluke,
  OTDR: styles.tipoOtdr,
  Outro: styles.tipoOutro,
};

const LEGEND = [
  { key: 'Em estoque', label: 'estoque', dot: styles.dotEstoque },
  { key: 'Em manutenção', label: 'manutenção', dot: styles.dotManutencao },
  { key: 'Em trânsito', label: 'trânsito', dot: styles.dotTransito },
];

export function DepositoCard({ items, allObras }) {
  const obraDe = (id) => (id ? allObras.find((o) => o.id === id) : null);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Depósito</h2>
          <p className={styles.subtitle}>Itens fora de campo — {items.length} registros</p>
        </div>
        <div className={styles.legend}>
          {LEGEND.map((l) => (
            <span key={l.key} className={styles.legendItem}>
              <span className={`${styles.dot} ${l.dot}`} />
              {items.filter((i) => i.status === l.key).length} {l.label}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.scroll}>
        {items.length === 0 ? (
          <div className={styles.empty}>Nenhum item fora de campo encontrado.</div>
        ) : (
          items.map((e) => {
            const Icon = tipoIcon[e.tipo];
            const obra = obraDe(e.obraId);
            return (
              <div key={e.id} className={styles.row}>
                <div className={`${styles.tile} ${TILE[e.tipo] || ''}`}>
                  <Icon size={15} />
                </div>
                <div className={styles.info}>
                  <div className={styles.model}>{e.modelo}</div>
                  <div className={styles.serie}>{e.serie}</div>
                </div>
                <StatusBadge status={e.status} />
                <div className={styles.local}>{obra ? obra.nome : 'Depósito central'}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}