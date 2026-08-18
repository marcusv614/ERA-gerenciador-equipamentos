import { useState } from "react";
import { ModalShell } from "../modal-shell/ModalShell";
import { Field } from "../field/Field";
import { statusList, tecnicosCadastrados } from "../../data/mockData";
import styles from "./MoverEquipModal.module.css";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function MoverEquipModal({ equip, obras, onClose, onSave }) {
  const [obraId, setObraId] = useState(equip.obraId || "");
  const [status, setStatus] = useState(equip.status);
  const [tecnico, setTecnico] = useState(equip.tecnico || "");
  const [dataMovimentacao, setDataMovimentacao] = useState(todayStr());

  return (
    <ModalShell
      title="Mover equipamento"
      subtitle={`${equip.modelo} · ${equip.serie}`}
      onClose={onClose}
    >
      <div className={styles.form}>
        <Field label="Novo destino">
          <select
            className={styles.input}
            value={obraId}
            onChange={(e) => setObraId(e.target.value)}
          >
            <option value="">Depósito central</option>
            {obras.map((o) => (
              <option key={o.id} value={o.id}>{o.nome}</option>
            ))}
          </select>
        </Field>

        <Field label="Data de movimentação">
          <input
            type="date"
            className={styles.input}
            value={dataMovimentacao}
            onChange={(e) => setDataMovimentacao(e.target.value)}
          />
        </Field>

        <Field label="Status">
          <div className={styles.statusWrap}>
            {statusList.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`${styles.statusBtn} ${status === s ? styles.statusBtnActive : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Técnico responsável">
          <select
            className={styles.input}
            value={tecnico}
            onChange={(e) => setTecnico(e.target.value)}
          >
            <option value="">Selecione</option>
            {tecnicosCadastrados.map((nome) => (
              <option key={nome} value={nome}>{nome}</option>
            ))}
          </select>
        </Field>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancel}>Cancelar</button>
          <button
            onClick={() =>
              onSave(equip.id, {
                obraId: obraId || null,
                status,
                tecnico: tecnico || null,
                dataMovimentacao,
              })
            }
            className={styles.submit}
          >
            Confirmar movimentação
          </button>
        </div>
      </div>
    </ModalShell>
  );
}