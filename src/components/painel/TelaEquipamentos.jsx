import { ArrowLeftRight, Download, FileText, MapPin } from 'lucide-react';
import { IndicadorStatus } from '../status-badge/StatusBadge';
import { iconePorTipoEquipamento, statusEquipamento, tiposEquipamento } from '../../data/mockData';

const classePorTipo = { Fluke: 'tipoFluke', OTDR: 'tipoOtdr', Outro: 'tipoOutro' };

export function TelaEquipamentos({ equipamentos, buscarObraPorId, tipoSelecionado, statusSelecionado, aoSelecionarTipo, aoSelecionarStatus, aoAbrirHistorico, aoImprimirHistorico, aoMover, estilos }) {
  return <>
    <div className={estilos.filters}>
      {['Todos', ...tiposEquipamento].map((tipo) => <button key={tipo} onClick={() => aoSelecionarTipo(tipo)} className={`${estilos.filterChip} ${tipoSelecionado === tipo ? estilos.filterChipTipoActive : ''}`}>{tipo === 'Outro' ? 'Outros' : tipo}</button>)}
      <span className={estilos.filterDivider} />
      {['Todos', ...statusEquipamento].map((status) => <button key={status} onClick={() => aoSelecionarStatus(status)} className={`${estilos.filterChip} ${statusSelecionado === status ? estilos.filterChipStatusActive : ''}`}>{status}</button>)}
    </div>
    <div className={estilos.equipGrid}>
      {equipamentos.map((equipamento) => {
        const IconeTipo = iconePorTipoEquipamento[equipamento.tipo];
        const obra = equipamento.obraId ? buscarObraPorId(equipamento.obraId) : null;
        return <div key={equipamento.id} className={estilos.equipCard}>
          <div className={estilos.equipHead}><div className={estilos.equipIdent}><div className={`${estilos.equipIconBox} ${estilos[classePorTipo[equipamento.tipo]] || ''}`}><IconeTipo size={16} /></div><div className={estilos.equipTitleWrap}><div className={estilos.equipModel}>{equipamento.modelo}</div><div className={estilos.equipSerie}>{equipamento.serie}</div></div></div>
            <div className={estilos.equipHeadActions}><IndicadorStatus status={equipamento.status} /><div className={estilos.equipActions}><button onClick={() => aoAbrirHistorico(equipamento)} className={estilos.iconBtn} title="Histórico"><FileText size={14} /></button><button onClick={() => aoImprimirHistorico(equipamento)} className={estilos.iconBtn} title="Exportar PDF"><Download size={14} /></button></div></div>
          </div>
          <div className={estilos.equipFooter}><div className={estilos.equipLocation}><MapPin size={12} className={estilos.equipLocPin} /><span className={estilos.equipLocationText}>{obra ? obra.nome : 'Depósito central'}</span></div><button onClick={() => aoMover(equipamento)} className={estilos.moverBtn}><ArrowLeftRight size={11} /> Mover</button></div>
          {equipamento.tecnico && <div className={estilos.equipTecnico}>Com {equipamento.tecnico}</div>}
        </div>;
      })}
      {equipamentos.length === 0 && <div className={estilos.emptyState}>Nenhum equipamento encontrado com esses filtros.</div>}
    </div>
  </>;
}
