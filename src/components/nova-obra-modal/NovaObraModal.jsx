import { useState } from 'react';
import { EstruturaModal } from '../modal-shell/ModalShell';
import { CampoFormulario } from '../field/Field';
import { statusObra } from '../../data/mockData';
import { obterDataAtual } from '../../utils/datas';
import styles from './NovaObraModal.module.css';

export function ModalNovaObra({ tecnicosCadastrados, aoFechar, aoSalvar }) {
  const [form, setForm] = useState({
    nome: '', cliente: '', cidade: '', responsavel: '', inicio: '', status: 'Planejada',
  });
  const canSave = form.nome.trim() && form.cliente.trim() && form.cidade.trim() && form.responsavel.trim();

  return (
    <EstruturaModal titulo="Nova obra" subtitulo="Cadastre uma nova frente de trabalho" aoFechar={aoFechar}>
      <div className={styles.form}>
        <CampoFormulario rotulo="Nome da obra">
          <input
            autoFocus
            className={styles.input}
            placeholder="Ex.: Expansão FTTH — Zona Norte"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </CampoFormulario>

        <div className={styles.grid2}>
          <CampoFormulario rotulo="Cliente">
            <input
              className={styles.input}
              placeholder="Ex.: Claro"
              value={form.cliente}
              onChange={(e) => setForm({ ...form, cliente: e.target.value })}
            />
          </CampoFormulario>
          <CampoFormulario rotulo="Cidade / UF">
            <input
              className={styles.input}
              placeholder="Ex.: Manaus, AM"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            />
          </CampoFormulario>
        </div>

        <div className={styles.grid2}>
          <CampoFormulario rotulo="Responsável">
            <input
              className={styles.input}
              value={form.responsavel}
              onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
              list="tecnicos-nova-obra"
              placeholder="Selecione ou informe um nome"
            />
            <datalist id="tecnicos-nova-obra">{tecnicosCadastrados.map((nome) => <option key={nome} value={nome} />)}</datalist>
          </CampoFormulario>
          <CampoFormulario rotulo="Data de início">
            <input
              type="date"
              className={styles.input}
              value={form.inicio}
              onChange={(e) => setForm({ ...form, inicio: e.target.value })}
            />
          </CampoFormulario>
        </div>

        <CampoFormulario rotulo="Status inicial">
          <div className={styles.statusRow}>
            {statusObra.map((s) => (
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
        </CampoFormulario>

        <div className={styles.actions}>
          <button onClick={aoFechar} className={styles.cancel}>Cancelar</button>
          <button
            disabled={!canSave}
            onClick={() =>
              aoSalvar({ ...form, inicio: form.inicio || obterDataAtual() })
            }
            className={styles.submit}
          >
            Criar obra
          </button>
        </div>
      </div>
    </EstruturaModal>
  );
}
