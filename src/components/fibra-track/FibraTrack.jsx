import { useState, useMemo } from 'react';
import {
  MapPin, Plus, Search, ChevronLeft, ChevronRight,
  LayoutDashboard, Boxes, Building2, Users, Warehouse,
  ArrowLeftRight, Calendar, Moon, Sun,
} from 'lucide-react';
import { StatCard } from '../stat-card/StatCard';
import { StatusBadge } from '../status-badge/StatusBadge';
import { ObraStatusBadge } from '../obra-status-badge/ObraStatusBadge';
import { NovaObraModal } from '../nova-obra-modal/NovaObraModal';
import { NovoEquipModal } from '../novo-equip-modal/NovoEquipModal';
import { MoverEquipModal } from '../mover-equip-modal/MoverEquipModal';
import { TecnicoCard } from '../tecnico-card/TecnicoCard';
import { DepositoCard } from '../deposito-card/DepositoCard';
import { formatDate } from '../../utils/formatDate';
import { initialObras, initialEquip, tipos, statusList, tipoIcon } from '../../data/mockData';
import eraLogo from '../../assets/ERALTDA.png';
import styles from './FibraTrack.module.css';

const tipoTileClass = {
  Fluke: 'tipoFluke',
  OTDR: 'tipoOtdr',
  Outro: 'tipoOutro',
};

export function FibraTrack() {
  const [obras, setObras] = useState(initialObras);
  const [equipamentos, setEquipamentos] = useState(initialEquip);
  const [view, setView] = useState('equipamentos'); // equipamentos | obras | tecnicos | deposito
  const [search, setSearch] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [showNovaObra, setShowNovaObra] = useState(false);
  const [showNovoEquip, setShowNovoEquip] = useState(false);
  const [moverEquip, setMoverEquip] = useState(null); // equipment being reassigned

  const obraById = (id) => obras.find((o) => o.id === id);

  const stats = useMemo(() => {
    const total = equipamentos.length;
    const campo = equipamentos.filter((e) => e.status === 'Em campo').length;
    const estoque = equipamentos.filter((e) => e.status === 'Em estoque').length;
    const manut = equipamentos.filter((e) => e.status === 'Em manutenção').length;
    return { total, campo, estoque, manut };
  }, [equipamentos]);

  const filteredEquip = useMemo(() => {
    return equipamentos.filter((e) => {
      const matchTipo = filtroTipo === 'Todos' || e.tipo === filtroTipo;
      const matchStatus = filtroStatus === 'Todos' || e.status === filtroStatus;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        e.modelo.toLowerCase().includes(q) ||
        e.serie.toLowerCase().includes(q) ||
        (e.tecnico || '').toLowerCase().includes(q);
      return matchTipo && matchStatus && matchSearch;
    });
  }, [equipamentos, filtroTipo, filtroStatus, search]);

  const tecnicos = useMemo(() => {
    const nomes = new Set();
    obras.forEach((o) => o.responsavel && nomes.add(o.responsavel));
    equipamentos.forEach((e) => e.tecnico && nomes.add(e.tecnico));
    const q = search.trim().toLowerCase();
    return [...nomes]
      .filter((nome) => !q || nome.toLowerCase().includes(q))
      .sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [obras, equipamentos, search]);

  const depositoItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return equipamentos.filter((e) => {
      if (e.status === 'Em campo') return false;
      if (!q) return true;
      return (
        e.modelo.toLowerCase().includes(q) ||
        e.serie.toLowerCase().includes(q)
      );
    });
  }, [equipamentos, search]);

  function handleAddObra(nova) {
    setObras((prev) => [{ id: 'o' + (prev.length + 1) + '_' + Date.now(), ...nova }, ...prev]);
    setShowNovaObra(false);
  }

  function handleAddEquip(novo) {
    setEquipamentos((prev) => [{ id: 'e' + (prev.length + 1) + '_' + Date.now(), ...novo }, ...prev]);
    setShowNovoEquip(false);
  }

  function handleMoveEquip(id, updates) {
    setEquipamentos((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    setMoverEquip(null);
  }

  return (
    <div className={styles.root} data-theme={darkMode ? 'dark' : 'light'}>
      {sidebarOpen && (
        <button
          type="button"
          className={styles.sidebarScrim}
          aria-label="Fechar menu lateral"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}
      >
        {sidebarOpen && (
          <div className={styles.sidebarInner}>
            <div className={styles.brandRow}>
              <img className={styles.brandLogo} src={eraLogo} alt="ERA Engenharia de Redes da Amazônia" />
            </div>

            <nav className={styles.nav}>
              <div className={`${styles.navItem} ${styles.navItemDashboard}`}>
                <LayoutDashboard size={16} /> Dashboard
              </div>
              <button
                onClick={() => setView('equipamentos')}
                className={`${styles.navItem} ${view === 'equipamentos' ? styles.navItemActive : ''}`}
              >
                <Boxes size={16} /> Equipamentos
              </button>

              <div className={styles.navSub}>
                {tipos.map((t) => {
                  const Icon = tipoIcon[t];
                  return (
                    <button
                      key={t}
                      onClick={() => { setView('equipamentos'); setFiltroTipo(t); }}
                      className={`${styles.navSubItem} ${filtroTipo === t && view === 'equipamentos' ? styles.navSubItemActive : ''}`}
                    >
                      <Icon size={13} />
                      {t === 'Outro' ? 'Outros' : t + 's'}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setView('obras')}
                className={`${styles.navItem} ${view === 'obras' ? styles.navItemActive : ''}`}
              >
                <Building2 size={16} /> Obras
              </button>
              <button
                onClick={() => setView('tecnicos')}
                className={`${styles.navItem} ${view === 'tecnicos' ? styles.navItemActive : ''}`}
              >
                <Users size={16} /> Técnicos
              </button>
              <button
                onClick={() => setView('deposito')}
                className={`${styles.navItem} ${view === 'deposito' ? styles.navItemActive : ''}`}
              >
                <Warehouse size={16} /> Depósito
              </button>
            </nav>

            <div className={styles.profileWrap}>
              <div className={styles.profile}>
                <div className={styles.avatar}>RN</div>
                <div className={styles.profileText}>
                  <div className={styles.profileName}>Renata Nogueira</div>
                  <div className={styles.profileRole}>Coordenação de Ativos</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
      {/* Main */}
      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={styles.toggleBtn}
            aria-label="Alternar menu lateral"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
          <div>
            <h1 className={styles.title}>
              {view === 'equipamentos' ? 'Equipamentos'
                : view === 'obras' ? 'Obras'
                : view === 'tecnicos' ? 'Técnicos'
                : 'Depósito'}
            </h1>
            <p className={styles.subtitle}>
              {view === 'equipamentos'
                ? 'Onde cada instrumento está e com quem'
                : view === 'obras'
                  ? 'Frentes de trabalho ativas e planejadas'
                  : view === 'tecnicos'
                    ? 'Equipes, obras sob responsabilidade e retiradas de materiais'
                    : 'Itens fora de campo — estoque, manutenção e trânsito'}
            </p>
          </div>

          <div className={styles.topbarRight}>
            <button
              type="button"
              role="switch"
              aria-checked={darkMode}
              aria-label="Alternar modo escuro"
              onClick={() => setDarkMode((value) => !value)}
              className={`${styles.themeSwitch} ${darkMode ? styles.themeSwitchActive : ''}`}
            >
              <Sun size={14} className={styles.themeIconLight} />
              <span className={styles.themeTrack}>
                <span className={styles.themeThumb} />
              </span>
              <Moon size={14} className={styles.themeIconDark} />
            </button>
            <div className={styles.searchBox}>
              <Search size={14} className={styles.searchIcon} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  view === 'tecnicos' ? 'Buscar técnico...'
                    : view === 'deposito' ? 'Buscar item, série...'
                    : 'Buscar modelo, série, técnico...'
                }
                className={styles.searchInput}
              />
            </div>
            <button
              onClick={() => setShowNovoEquip(true)}
              className={styles.btnGhost}
            >
              <Plus size={15} /> Equipamento
            </button>
            <button
              onClick={() => setShowNovaObra(true)}
              className={styles.btnPrimary}
            >
              <Plus size={15} /> Nova obra
            </button>
          </div>
        </header>

        <div className={styles.content}>
          {/* Stats */}
          <div className={styles.statsGrid}>
            <StatCard label="Total de equipamentos" value={stats.total} />
            <StatCard label="Em campo" value={stats.campo} accent="var(--accent)" />
            <StatCard label="Em estoque" value={stats.estoque} accent="var(--info)" />
            <StatCard label="Em manutenção" value={stats.manut} accent="var(--warn)" />
          </div>

          {view === 'equipamentos' ? (
            <>
              {/* Filters */}
              <div className={styles.filters}>
                {['Todos', ...tipos].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFiltroTipo(t)}
                    className={`${styles.filterChip} ${filtroTipo === t ? styles.filterChipTipoActive : ''}`}
                  >
                    {t === 'Outro' ? 'Outros' : t}
                  </button>
                ))}
                <span className={styles.filterDivider} />
                {['Todos', ...statusList].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFiltroStatus(s)}
                    className={`${styles.filterChip} ${filtroStatus === s ? styles.filterChipStatusActive : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Equipment grid */}
              <div className={styles.equipGrid}>
                {filteredEquip.map((e) => {
                  const Icon = tipoIcon[e.tipo];
                  const obra = e.obraId ? obraById(e.obraId) : null;
                  return (
                    <div key={e.id} className={styles.equipCard}>
                      <div className={styles.equipHead}>
                        <div className={styles.equipIdent}>
                          <div className={`${styles.equipIconBox} ${styles[tipoTileClass[e.tipo]] || ''}`}>
                            <Icon size={16} />
                          </div>
                          <div className={styles.equipTitleWrap}>
                            <div className={styles.equipModel}>{e.modelo}</div>
                            <div className={styles.equipSerie}>{e.serie}</div>
                          </div>
                        </div>
                        <StatusBadge status={e.status} />
                      </div>
                      <div className={styles.equipFooter}>
                        <div className={styles.equipLocation}>
                          <MapPin size={12} className={styles.equipLocPin} />
                          <span className={styles.equipLocationText}>
                            {obra ? obra.nome : 'Depósito central'}
                          </span>
                        </div>
                        <button
                          onClick={() => setMoverEquip(e)}
                          className={styles.moverBtn}
                        >
                          <ArrowLeftRight size={11} /> Mover
                        </button>
                      </div>
                      {e.tecnico && (
                        <div className={styles.equipTecnico}>Com {e.tecnico}</div>
                      )}
                    </div>
                  );
                })}
                {filteredEquip.length === 0 && (
                  <div className={styles.emptyState}>
                    Nenhum equipamento encontrado com esses filtros.
                  </div>
                )}
              </div>
            </>
          ) : view === 'obras' ? (
            <div className={styles.obraList}>
              {obras.map((o) => {
                const equipDaObra = equipamentos.filter((e) => e.obraId === o.id);
                return (
                  <div key={o.id} className={styles.obraCard}>
                    <div className={styles.obraHead}>
                      <div>
                        <div className={styles.obraTitleRow}>
                          <h3 className={styles.obraTitle}>{o.nome}</h3>
                          <ObraStatusBadge status={o.status} />
                        </div>
                        <div className={styles.obraMeta}>
                          <span className={styles.obraClient}>{o.cliente}</span>
                          <span className={styles.obraMetaItem}>
                            <MapPin size={11} />{o.cidade}
                          </span>
                          <span className={styles.obraMetaItem}>
                            <Calendar size={11} />{formatDate(o.inicio)}
                          </span>
                          <span>Resp.: {o.responsavel}</span>
                        </div>
                      </div>
                      <span className={styles.obraCount}>
                        {equipDaObra.length} equip.
                      </span>
                    </div>
                    {equipDaObra.length > 0 && (
                      <div className={styles.obraEquipList}>
                        {equipDaObra.map((e) => {
                          const Icon = tipoIcon[e.tipo];
                          return (
                            <div key={e.id} className={styles.obraEquipRow}>
                              <div className={styles.obraEquipInfo}>
                                <div className={`${styles.obraEquipTile} ${styles[tipoTileClass[e.tipo]] || ''}`}>
                                  <Icon size={14} />
                                </div>
                                <div className={styles.obraEquipText}>
                                  <div className={styles.obraEquipTopRow}>
                                    <span className={styles.obraEquipNome}>{e.modelo}</span>
                                    <span className={styles.obraEquipMov}>mov. {e.saida ? formatDate(e.saida) : '—'}</span>
                                  </div>
                                  <div className={styles.obraEquipSerie}>{e.serie}</div>
                                </div>
                              </div>
                              <button
                                onClick={() => setMoverEquip(e)}
                                className={styles.obraMoverBtn}
                              >
                                <ArrowLeftRight size={11} /> Mover
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : view === 'tecnicos' ? (
            <div className={styles.tecnicoGrid}>
              {tecnicos.map((nome) => (
                <TecnicoCard
                  key={nome}
                  nome={nome}
                  obras={obras.filter((o) => o.responsavel === nome)}
                  equipamentos={equipamentos.filter((e) => e.tecnico === nome)}
                  allObras={obras}
                />
              ))}
              {tecnicos.length === 0 && (
                <div className={styles.emptyState}>Nenhum técnico encontrado.</div>
              )}
            </div>
          ) : (
            <DepositoCard items={depositoItems} allObras={obras} />
          )}
        </div>
      </main>

      {showNovaObra && <NovaObraModal onClose={() => setShowNovaObra(false)} onSave={handleAddObra} />}
      {showNovoEquip && <NovoEquipModal obras={obras} onClose={() => setShowNovoEquip(false)} onSave={handleAddEquip} />}
      {moverEquip && <MoverEquipModal equip={moverEquip} obras={obras} onClose={() => setMoverEquip(null)} onSave={handleMoveEquip} />}
    </div>
  );
}
