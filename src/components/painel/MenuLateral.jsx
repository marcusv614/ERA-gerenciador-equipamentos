import { Boxes, Building2, Users, Warehouse } from 'lucide-react';
import { iconePorTipoEquipamento, tiposEquipamento } from '../../data/mockData';
import logoEra from '../../assets/ERALTDA.png';

export function MenuLateral({ aberto, telaAtual, tipoSelecionado, aoFechar, aoSelecionarTela, aoSelecionarTipo, estilos }) {
  return <>
    {aberto && <button type="button" className={estilos.sidebarScrim} aria-label="Fechar menu lateral" onClick={aoFechar} />}
    <aside className={`${estilos.sidebar} ${aberto ? estilos.sidebarOpen : estilos.sidebarClosed}`}>
      {aberto && <div className={estilos.sidebarInner}>
        <div className={estilos.brandRow}><img className={estilos.brandLogo} src={logoEra} alt="ERA Engenharia de Redes da Amazônia" /></div>
        <nav className={estilos.nav}>
          <button onClick={() => aoSelecionarTipo('Todos')} className={`${estilos.navItem} ${telaAtual === 'equipamentos' ? estilos.navItemActive : ''}`}><Boxes size={16} /> Equipamentos</button>
          <div className={estilos.navSub}>
            {tiposEquipamento.map((tipo) => {
              const IconeTipo = iconePorTipoEquipamento[tipo];
              return <button key={tipo} onClick={() => aoSelecionarTipo(tipo)} className={`${estilos.navSubItem} ${tipoSelecionado === tipo && telaAtual === 'equipamentos' ? estilos.navSubItemActive : ''}`}><IconeTipo size={13} />{tipo === 'Outro' ? 'Outros' : `${tipo}s`}</button>;
            })}
          </div>
          <button onClick={() => aoSelecionarTela('obras')} className={`${estilos.navItem} ${telaAtual === 'obras' ? estilos.navItemActive : ''}`}><Building2 size={16} /> Obras</button>
          <button onClick={() => aoSelecionarTela('funcionarios')} className={`${estilos.navItem} ${telaAtual === 'funcionarios' ? estilos.navItemActive : ''}`}><Users size={16} /> Funcionários</button>
          <button onClick={() => aoSelecionarTela('deposito')} className={`${estilos.navItem} ${telaAtual === 'deposito' ? estilos.navItemActive : ''}`}><Warehouse size={16} /> Depósito</button>
        </nav>
        <div className={estilos.profileWrap}><div className={estilos.profile}><div className={estilos.avatar}>RN</div><div className={estilos.profileText}><div className={estilos.profileName}>Renata Nogueira</div><div className={estilos.profileRole}>Coordenação de Ativos</div></div></div></div>
      </div>}
    </aside>
  </>;
}
