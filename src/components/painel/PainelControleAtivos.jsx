import { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { BarraSuperior } from './BarraSuperior';
import { MenuLateral } from './MenuLateral';
import { ModalHistoricoEquipamento } from './ModalHistoricoEquipamento';
import { ResumoEquipamentos } from './ResumoEquipamentos';
import { TelaEquipamentos } from './TelaEquipamentos';
import { TelaObras } from './TelaObras';
import { TelaFuncionarios } from './TelaFuncionarios';
import { CartaoDeposito } from '../deposito-card/DepositoCard';
import { ModalNovaObra } from '../nova-obra-modal/NovaObraModal';
import { ModalNovoEquipamento } from '../novo-equip-modal/NovoEquipModal';
import { ModalMovimentarEquipamento } from '../mover-equip-modal/MoverEquipModal';
import { ModalNovoFuncionario } from '../novo-funcionario-modal/NovoFuncionarioModal';
import { useControleAtivos } from '../../hooks/useControleAtivos';
import { useFiltrosPainel } from '../../hooks/useFiltrosPainel';
import { imprimirCautelaObra, imprimirHistoricoEquipamento, imprimirHistoricoObra } from '../../services/documentosEquipamentos';
import estilos from '../fibra-track/FibraTrack.module.css';

export function PainelControleAtivos() {
  const controleAtivos = useControleAtivos();
  const filtros = useFiltrosPainel(controleAtivos);
  const [telaAtual, definirTelaAtual] = useState('equipamentos');
  const [menuLateralAberto, definirMenuLateralAberto] = useState(true);
  const [modoEscuro, definirModoEscuro] = useState(false);
  const [barraSuperiorRecolhida, definirBarraSuperiorRecolhida] = useState(false);
  const [modalNovaObraAberto, definirModalNovaObraAberto] = useState(false);
  const [modalNovoEquipamentoAberto, definirModalNovoEquipamentoAberto] = useState(false);
  const [modalNovoFuncionarioAberto, definirModalNovoFuncionarioAberto] = useState(false);
  const [equipamentoParaMover, definirEquipamentoParaMover] = useState(null);
  const [equipamentoComHistoricoAberto, definirEquipamentoComHistoricoAberto] = useState(null);

  const imprimirHistoricoDoEquipamento = (equipamento) => imprimirHistoricoEquipamento(equipamento, controleAtivos.consultarHistorico(equipamento), controleAtivos.buscarObraPorId);
  const cadastrarObra = (novaObra) => { controleAtivos.cadastrarObra(novaObra); definirModalNovaObraAberto(false); };
  const cadastrarEquipamento = (novoEquipamento) => {
    if (controleAtivos.cadastrarEquipamento(novoEquipamento)) definirModalNovoEquipamentoAberto(false);
  };
  const movimentarEquipamento = (identificador, movimentacao) => { controleAtivos.movimentarEquipamento(identificador, movimentacao); definirEquipamentoParaMover(null); };
  const cadastrarFuncionario = (novoFuncionario) => {
    if (controleAtivos.cadastrarFuncionario(novoFuncionario)) definirModalNovoFuncionarioAberto(false);
  };
  const selecionarTela = (tela) => {
    definirTelaAtual(tela);
    filtros.definirTermoBusca('');
    if (tela === 'equipamentos') {
      filtros.definirTipoSelecionado('Todos');
      filtros.definirStatusSelecionado('Todos');
    }
  };
  const selecionarTipoNoMenu = (tipo) => {
    selecionarTela('equipamentos');
    filtros.definirTipoSelecionado(tipo);
  };

  return <div className={estilos.root} data-theme={modoEscuro ? 'dark' : 'light'}>
    <MenuLateral aberto={menuLateralAberto} telaAtual={telaAtual} tipoSelecionado={filtros.tipoSelecionado} aoFechar={() => definirMenuLateralAberto(false)} aoSelecionarTela={selecionarTela} aoSelecionarTipo={selecionarTipoNoMenu} estilos={estilos} />
    <button type="button" onClick={() => definirMenuLateralAberto((aberto) => !aberto)} className={`${estilos.sidebarEdgeToggle} ${menuLateralAberto ? estilos.sidebarEdgeToggleOpen : ''}`} aria-label={menuLateralAberto ? 'Recolher menu lateral' : 'Expandir menu lateral'}>
      {menuLateralAberto ? <PanelLeftClose size={17} /> : <PanelLeftOpen size={17} />}
    </button>
    <main className={estilos.main}>
      <BarraSuperior telaAtual={telaAtual} recolhida={barraSuperiorRecolhida} modoEscuro={modoEscuro} termoBusca={filtros.termoBusca} aoAlternarRecolhimento={() => definirBarraSuperiorRecolhida((recolhida) => !recolhida)} aoAlternarTema={() => definirModoEscuro((escuro) => !escuro)} aoBuscar={filtros.definirTermoBusca} aoAbrirNovoEquipamento={() => definirModalNovoEquipamentoAberto(true)} aoAbrirNovaObra={() => definirModalNovaObraAberto(true)} aoAbrirNovoFuncionario={() => definirModalNovoFuncionarioAberto(true)} estilos={estilos} />
      <div className={estilos.content}>
        <ResumoEquipamentos resumo={controleAtivos.resumoEquipamentos} estilos={estilos} />
        {telaAtual === 'equipamentos' && <TelaEquipamentos equipamentos={filtros.equipamentosFiltrados} buscarObraPorId={controleAtivos.buscarObraPorId} tipoSelecionado={filtros.tipoSelecionado} statusSelecionado={filtros.statusSelecionado} aoSelecionarTipo={filtros.definirTipoSelecionado} aoSelecionarStatus={filtros.definirStatusSelecionado} aoAbrirHistorico={definirEquipamentoComHistoricoAberto} aoImprimirHistorico={imprimirHistoricoDoEquipamento} aoMover={definirEquipamentoParaMover} estilos={estilos} />}
        {telaAtual === 'obras' && <TelaObras obras={filtros.obrasFiltradas} equipamentos={controleAtivos.equipamentos} aoMoverEquipamento={definirEquipamentoParaMover} aoImprimirCautela={(obra) => imprimirCautelaObra(obra, controleAtivos.equipamentos)} aoImprimirHistorico={(obra) => imprimirHistoricoObra(obra, controleAtivos.equipamentos)} estilos={estilos} />}
        {telaAtual === 'funcionarios' && <TelaFuncionarios funcionarios={filtros.funcionariosFiltrados} obras={controleAtivos.obras} equipamentos={controleAtivos.equipamentos} estilos={estilos} />}
        {telaAtual === 'deposito' && <CartaoDeposito equipamentos={filtros.equipamentosDoDeposito} obras={controleAtivos.obras} />}
      </div>
    </main>
    {modalNovaObraAberto && <ModalNovaObra tecnicosCadastrados={controleAtivos.tecnicosCadastrados} aoFechar={() => definirModalNovaObraAberto(false)} aoSalvar={cadastrarObra} />}
    {modalNovoEquipamentoAberto && <ModalNovoEquipamento obras={controleAtivos.obras} tecnicosCadastrados={controleAtivos.tecnicosCadastrados} seriesCadastradas={controleAtivos.equipamentos.map(({ serie }) => serie)} aoFechar={() => definirModalNovoEquipamentoAberto(false)} aoSalvar={cadastrarEquipamento} />}
    {equipamentoParaMover && <ModalMovimentarEquipamento equipamento={equipamentoParaMover} obras={controleAtivos.obras} tecnicosCadastrados={controleAtivos.tecnicosCadastrados} aoFechar={() => definirEquipamentoParaMover(null)} aoSalvar={movimentarEquipamento} />}
    {modalNovoFuncionarioAberto && <ModalNovoFuncionario funcionariosCadastrados={controleAtivos.funcionarios} aoFechar={() => definirModalNovoFuncionarioAberto(false)} aoSalvar={cadastrarFuncionario} />}
    <ModalHistoricoEquipamento equipamento={equipamentoComHistoricoAberto} historico={equipamentoComHistoricoAberto ? controleAtivos.consultarHistorico(equipamentoComHistoricoAberto) : []} buscarObraPorId={controleAtivos.buscarObraPorId} aoFechar={() => definirEquipamentoComHistoricoAberto(null)} aoImprimir={() => imprimirHistoricoDoEquipamento(equipamentoComHistoricoAberto)} estilos={estilos} />
  </div>;
}
