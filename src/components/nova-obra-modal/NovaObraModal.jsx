import { useState } from 'react';
import { ModalShell } from '../modal-shell/ModalShell';
import { Field } from '../field/Field';
import { obraStatusList } from '../../data/mockData';
import styles from './NovaObraModal.module.css';

export function NovaObraModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: '', cliente: '', cidade: '', responsavel: '', inicio: '', status: 'Planejada',
  });
  const canSave = form.nome.trim() && form.cliente.trim() && form.cidade.trim();

  return (
    <ModalShell title="Nova obra" subtitle="Cadastre uma nova frente de trabalho" onClose={onClose}>
      <div className={styles.form}>
        <Field label="Nome da obra">
          <input
            autoFocus
            className={styles.input}
            placeholder="Ex.: Expansão FTTH — Zona Norte"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </Field>

        <div className={styles.grid2}>
          <Field label="Cliente">
            <input
              className={styles.input}
              placeholder="Ex.: Claro"
              value={form.cliente}
              onChange={(e) => setForm({ ...form, cliente: e.target.value })}
            />
          </Field>
          <Field label="Cidade / UF">
            <input
              className={styles.input}
              placeholder="Ex.: Manaus, AM"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            />
          </Field>
        </div>

        <div className={styles.grid2}>
          <Field label="Responsável">
            <input
              className={styles.input}
              placeholder="Nome do técnico líder"
              value={form.responsavel}
              onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
            />
          </Field>
          <Field label="Data de início">
            <input
              type="date"
              className={styles.input}
              value={form.inicio}
              onChange={(e) => setForm({ ...form, inicio: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Status inicial">
          <div className={styles.statusRow}>
            {obraStatusList.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm({ ...form, status: s })}
                className={`${styles.statusBtn} ${form.status === s ? styles.statusBtnActive : ''}`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancel}>Cancelar</button>
          <button
            disabled={!canSave}
            onClick={() =>
              onSave({ ...form, inicio: form.inicio || new Date().toISOString().slice(0, 10) })
            }
            className={styles.submit}
          >
            Criar obra
          </button>
        </div>
      </div>
    </ModalShell>
  );
}