import { PackageSearch } from 'lucide-react';
import { StatusBadge } from '../status-badge/StatusBadge';
import { ObraStatusBadge } from '../obra-status-badge/ObraStatusBadge';
import { formatDate } from '../../utils/formatDate';
import styles from './TecnicoCard.module.css';

export function TecnicoCard({ nome, obras, equipamentos, allObras }) {
  const initials = nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const obraDoEquip = (obraId) => (obraId ? allObras.find((o) => o.id === obraId) : null);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.headerInfo}>
          <div className={styles.name}>{nome}</div>
          <div className={styles.meta}>
            <span className={styles.pill}>
              {obras.length} {obras.length === 1 ? 'obra' : 'obras'}
            </span>
            <span className={styles.pill}>
              {equipamentos.length} {equipamentos.length === 1 ? 'material' : 'materiais'}
            </span>
          </div>
        </div>
      </div>

      {obras.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Obras sob responsabilidade</div>
          <div className={styles.obraList}>
            {obras.map((o) => (
              <div key={o.id} className={styles.obraRow}>
                <span className={styles.obraNome}>{o.nome}</span>
                <ObraStatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Materiais registrados com o técnico</div>
        {equipamentos.length === 0 ? (
          <div className={styles.empty}>Nenhum material registrado no momento.</div>
        ) : (
          <div className={styles.tableWrap}>
            <div className={styles.table}>
              <div className={styles.rowHead}>
                <span>Equipamento</span>
                <span>Série</span>
                <span>Status</span>
                <span>Local</span>
                <span>Retirada</span>
              </div>
              {equipamentos.map((e) => {
                const obra = obraDoEquip(e.obraId);
                return (
                  <div key={e.id} className={styles.row}>
                    <span className={styles.rowModel}>
                      <PackageSearch size={13} className={styles.rowIcon} />
                      {e.modelo}
                    </span>
                    <span className={styles.rowSerie}>{e.serie}</span>
                    <span>
                      <StatusBadge status={e.status} />
                    </span>
                    <span className={styles.rowLocal}>
                      {obra ? obra.nome : 'Depósito central'}
                    </span>
                    <span className={styles.rowData}>{(e.saida && formatDate(e.saida)) || '—'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}