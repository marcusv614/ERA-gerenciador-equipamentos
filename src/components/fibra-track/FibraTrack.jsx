import { useState, useMemo } from 'react';
import {
  Activity, MapPin, Plus, Search, ChevronLeft, ChevronRight,
  LayoutDashboard, Boxes, Building2, Users, Warehouse,
  ArrowLeftRight, Calendar,
} from 'lucide-react';
import { TraceMark } from '../trace-mark/TraceMark';
import { StatCard } from '../stat-card/StatCard';
import { StatusBadge } from '../status-badge/StatusBadge';
import { ObraStatusBadge } from '../obra-status-badge/ObraStatusBadge';
import { NovaObraModal } from '../nova-obra-modal/NovaObraModal';
import { NovoEquipModal } from '../novo-equip-modal/NovoEquipModal';
import { MoverEquipModal } from '../mover-equip-modal/MoverEquipModal';
import { formatDate } from '../../utils/formatDate';
import { initialObras, initialEquip, tipos, statusList, tipoIcon } from '../../data/mockData';
import styles from './FibraTrack.module.css';

const tipoTileClass = {
  Fluke: 'tipoFluke',
  OTDR: 'tipoOtdr',
  Outro: 'tipoOutro',
};

export function FibraTrack() {
  const [obras, setObras] = useState(initialObras);
  const [equipamentos, setEquipamentos] = useState(initialEquip);
  const [view, setView] = useState('equipamentos'); // equipamentos | obras
  const [search, setSearch] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <div className={styles.root}>
      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}
      >
        {sidebarOpen && (
          <div className={styles.sidebarInner}>
            <div className={styles.brandRow}>
              <div className={styles.brandIcon}>
                <Activity size={16} />
              </div>
              <span className={styles.brandName}>FibraTrack</span>
            </div>
            <div className={styles.brandTrace}>
              <TraceMark />
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
              <div className={styles.navItem}>
                <Users size={16} /> Técnicos
              </div>
              <div className={styles.navItem}>
                <Warehouse size={16} /> Depósito
              </div>
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
              {view === 'equipamentos' ? 'Equipamentos' : 'Obras'}
            </h1>
            <p className={styles.subtitle}>
              {view === 'equipamentos'
                ? 'Onde cada instrumento está e com quem'
                : 'Frentes de trabalho ativas e planejadas'}
            </p>
          </div>

          <div className={styles.topbarRight}>
            <div className={styles.searchBox}>
              <Search size={14} className={styles.searchIcon} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar modelo, série, técnico..."
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
          ) : (
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
                      <div className={styles.obraEquips}>
                        {equipDaObra.map((e) => {
                          const Icon = tipoIcon[e.tipo];
                          return (
                            <span key={e.id} className={styles.obraEquipChip}>
                              <Icon size={11} />
                              {e.modelo}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {showNovaObra && <NovaObraModal onClose={() => setShowNovaObra(false)} onSave={handleAddObra} />}
      {showNovoEquip && <NovoEquipModal obras={obras} onClose={() => setShowNovoEquip(false)} onSave={handleAddEquip} />}
      {moverEquip && <MoverEquipModal equip={moverEquip} obras={obras} onClose={() => setMoverEquip(null)} onSave={handleMoveEquip} />}
    </div>
  );
}
