import { useState } from "react";
import { ModalShell } from "../modal-shell/ModalShell";
import { Field } from "../field/Field";
import { tipos, tipoIcon } from "../../data/mockData";
import styles from "./NovoEquipModal.module.css";

export function NovoEquipModal({ obras, onClose, onSave }) {
  const [form, setForm] = useState({
    tipo: "OTDR",
    modelo: "",
    serie: "",
    status: "Em estoque",
    obraId: "",
    tecnico: "",
    data: "",
  });
  const canSave = form.modelo.trim() && form.serie.trim();

  return (
    <ModalShell
      title="Novo equipamento"
      subtitle="Cadastre um instrumento na frota"
      onClose={onClose}
    >
      <div className={styles.form}>
        <Field label="Tipo">
          <div className={styles.typeRow}>
            {tipos.map((t) => {
              const Icon = tipoIcon[t];
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, tipo: t })}
                  className={`${styles.typeBtn} ${form.tipo === t ? styles.typeBtnActive : ""}`}
                >
                  <Icon size={13} />
                  {t === "Outro" ? "Outro" : t}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Modelo">
          <input
            className={styles.input}
            placeholder="Ex.: EXFO FTB-1v2"
            value={form.modelo}
            onChange={(e) => setForm({ ...form, modelo: e.target.value })}
          />
        </Field>

        <Field label="Número de série">
          <input
            className={`${styles.input} ${styles.mono}`}
            placeholder="Ex.: FTB-88213"
            value={form.serie}
            onChange={(e) => setForm({ ...form, serie: e.target.value })}
          />
        </Field>

        <div className={styles.grid2}>
          <Field label="Localização">
            <select
              className={styles.input}
              value={form.obraId}
              onChange={(e) =>
                setForm({
                  ...form,
                  obraId: e.target.value,
                  status: e.target.value ? "Em campo" : "Em estoque",
                })
              }
            >
              <option value="">Depósito central</option>
              {obras.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.nome}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Técnico responsável">
            <input
              className={styles.input}
              placeholder="Opcional"
              value={form.tecnico}
              onChange={(e) => setForm({ ...form, tecnico: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Data de entrada (opcional)">
          <input
            type="date"
            className={styles.input}
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
          />
        </Field>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancel}>
            Cancelar
          </button>
          <button
            disabled={!canSave}
            onClick={() =>
              onSave({
                ...form,
                obraId: form.obraId || null,
                tecnico: form.tecnico || null,
                data: form.data || null,
              })
            }
            className={styles.submit}
          >
            Adicionar equipamento
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
