import { useState } from 'react';
import { Boxes, Building2, ChevronDown, ChevronRight, UserRound, Users, Warehouse } from 'lucide-react';
import { iconePorTipoEquipamento, tiposEquipamento } from '../../data/mockData';
import logoEra from '../../assets/ERALTDA.png';

export function MenuLateral({ aberto, telaAtual, tipoSelecionado, obras, funcionarios, aoFechar, aoSelecionarTela, aoSelecionarTipo, aoSelecionarBusca, estilos }) {
  const [grupoExpandido, definirGrupoExpandido] = useState(null);
  const alternarGrupo = (grupo, tela) => {
    definirGrupoExpandido((grupoAtual) => grupoAtual === grupo ? null : grupo);
    aoSelecionarTela(tela);
  };
  const renderizarIndicadorGrupo = (grupo) => grupoExpandido === grupo
    ? <ChevronDown size={14} className={estilos.navItemChevron} />
    : <ChevronRight size={14} className={estilos.navItemChevron} />;

  return <>
    <button type="button" className={`${estilos.sidebarScrim} ${aberto ? estilos.sidebarScrimVisible : ''}`} aria-label="Fechar menu lateral" onClick={aoFechar} tabIndex={aberto ? 0 : -1} />
    <aside className={`${estilos.sidebar} ${aberto ? estilos.sidebarOpen : estilos.sidebarClosed}`}>
      <div className={`${estilos.sidebarInner} ${aberto ? '' : estilos.sidebarInnerHidden}`} aria-hidden={!aberto}>
        <div className={estilos.brandRow}><img className={estilos.brandLogo} src={logoEra} alt="ERA Engenharia de Redes da Amazônia" /></div>
        <nav className={estilos.nav}>
          <button onClick={() => alternarGrupo('equipamentos', 'equipamentos')} className={`${estilos.navItem} ${telaAtual === 'equipamentos' ? estilos.navItemActive : ''}`}><Boxes size={16} /> Equipamentos {renderizarIndicadorGrupo('equipamentos')}</button>
          {grupoExpandido === 'equipamentos' && <div className={estilos.navSub}>
            {tiposEquipamento.map((tipo) => {
              const IconeTipo = iconePorTipoEquipamento[tipo];
              return <button key={tipo} onClick={() => aoSelecionarTipo(tipo)} className={`${estilos.navSubItem} ${tipoSelecionado === tipo && telaAtual === 'equipamentos' ? estilos.navSubItemActive : ''}`}><IconeTipo size={13} />{tipo === 'Outro' ? 'Outros' : `${tipo}s`}</button>;
            })}
          </div>}
          <button onClick={() => alternarGrupo('obras', 'obras')} className={`${estilos.navItem} ${telaAtual === 'obras' ? estilos.navItemActive : ''}`}><Building2 size={16} /> Obras {renderizarIndicadorGrupo('obras')}</button>
          {grupoExpandido === 'obras' && <div className={estilos.navSub}>
            {obras.map((obra) => <button key={obra.id} onClick={() => { aoSelecionarTela('obras'); aoSelecionarBusca(obra.nome); }} className={estilos.navSubItem}><Building2 size={13} /><span>{obra.nome}</span></button>)}
          </div>}
          <button onClick={() => alternarGrupo('funcionarios', 'funcionarios')} className={`${estilos.navItem} ${telaAtual === 'funcionarios' ? estilos.navItemActive : ''}`}><Users size={16} /> Funcionários {renderizarIndicadorGrupo('funcionarios')}</button>
          {grupoExpandido === 'funcionarios' && <div className={estilos.navSub}>
            {funcionarios.map((funcionario) => <button key={funcionario.id} onClick={() => { aoSelecionarTela('funcionarios'); aoSelecionarBusca(funcionario.nome); }} className={estilos.navSubItem}><UserRound size={13} /><span>{funcionario.nome}</span></button>)}
          </div>}
          <button onClick={() => { definirGrupoExpandido(null); aoSelecionarTela('deposito'); }} className={`${estilos.navItem} ${telaAtual === 'deposito' ? estilos.navItemActive : ''}`}><Warehouse size={16} /> Depósito</button>
        </nav>
        <div className={estilos.profileWrap}><div className={estilos.profile}><div className={estilos.avatar}>RN</div><div className={estilos.profileText}><div className={estilos.profileName}>Renata Nogueira</div><div className={estilos.profileRole}>Coordenação de Ativos</div></div></div></div>
      </div>
    </aside>
  </>;
}
