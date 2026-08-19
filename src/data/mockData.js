import { Radio, Wrench, Cable } from 'lucide-react';

// ---------------------------------------------------------------------------
// Obras — cobrem todos os status (Planejada / Em andamento / Concluída)
// ---------------------------------------------------------------------------
export const obrasIniciais = [
  { id: 'o1', nome: 'Expansão FTTH — Zona Norte', cliente: 'Claro', cidade: 'Manaus, AM', responsaveis: ['Carlos Nunes', 'Diego Farias'], inicio: '2026-06-02', status: 'Em andamento' },
  { id: 'o2', nome: 'Manutenção Backbone BR-174', cliente: 'Vivo', cidade: 'Manaus, AM', responsaveis: ['Ana Paula Reis', 'Marcos Vinícius'], inicio: '2026-07-10', status: 'Em andamento' },
  { id: 'o3', nome: 'Implantação Data Center', cliente: 'Oi', cidade: 'Itacoatiara, AM', responsaveis: ['Bruno Alencar'], inicio: '2026-05-20', status: 'Em andamento' },
  { id: 'o4', nome: 'Certificação Rede Corporativa', cliente: 'TIM', cidade: 'Parintins, AM', responsaveis: ['Fernanda Lima'], inicio: '2026-04-15', status: 'Concluída' },
  { id: 'o5', nome: 'Expansão FTTH — Zona Sul', cliente: 'Claro', cidade: 'Manaus, AM', responsaveis: ['Amanda Castro'], inicio: '2026-08-01', status: 'Em andamento' },
  { id: 'o6', nome: 'Backbone Óptico Manaus–Rio Preto', cliente: 'Vivo', cidade: 'Presidente Figueiredo, AM', responsaveis: ['Júlia Mendes', 'Marcos Vinícius'], inicio: '2026-06-18', status: 'Em andamento' },
  { id: 'o7', nome: 'Redes de Transmissão Rural 4G', cliente: 'Algar', cidade: 'Careiro, AM', responsaveis: ['Rafael Torres'], inicio: '2026-03-02', status: 'Em andamento' },
  { id: 'o8', nome: 'Modernização de Headend', cliente: 'Oi', cidade: 'Manaus, AM', responsaveis: ['Diego Farias'], inicio: '2026-02-12', status: 'Em andamento' },
  { id: 'o9', nome: 'Rede Metropolitana de Alta Disponibilidade', cliente: 'TIM', cidade: 'Itacoatiara, AM', responsaveis: ['Marcos Vinícius'], inicio: '2025-11-05', status: 'Concluída' },
  { id: 'o10', nome: 'Fibra para Empresa Corporativa', cliente: 'Vivo', cidade: 'Manaus, AM', responsaveis: ['Ana Paula Reis'], inicio: '2026-09-15', status: 'Planejada' },
];

// ---------------------------------------------------------------------------
// Equipamentos — cobrem todos os tipos e status; alguns vinculados a obras,
// outros no depósito; alguns com/sem técnico associado.
// ---------------------------------------------------------------------------
export const equipamentosIniciais = [
  // OTDR
  {
    id: 'e1', tipo: 'OTDR', modelo: 'EXFO FTB-1v2', serie: 'FTB-88213',
    status: 'Em campo', obraId: 'o1', tecnico: 'Diego Farias',
    saida: '2026-05-22', data: '2026-05-22', dataEntrada: '2026-05-22', dataSaida: '2026-05-22',
    historico: [
      {
        id: 'h1a',
        dataMovimentacao: '2026-05-22',
        dataSaida: '2026-05-22',
        dataEntrada: '2026-05-22',
        origemObraId: null,
        destinoObraId: 'o1',
        origemNome: 'Depósito central',
        destinoNome: 'Expansão FTTH — Zona Norte',
        tecnico: 'Diego Farias',
        status: 'Em campo',
      },
    ],
  },
  { id: 'e2', tipo: 'OTDR', modelo: 'Viavi SmartOTDR 6000', serie: 'VVX-40217', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e15', tipo: 'OTDR', modelo: 'EXFO FTB-1v2', serie: 'OTF-88215', status: 'Em campo', obraId: 'o5', tecnico: 'Amanda Castro', saida: '2026-06-19', data: '2026-06-19', dataEntrada: '2026-06-19', dataSaida: '2026-06-19' },
  { id: 'e16', tipo: 'OTDR', modelo: 'Viavi SmartOTDR 6000', serie: 'VVX-40219', status: 'Em trânsito', obraId: 'o3', tecnico: 'Bruno Alencar', saida: '2026-06-21', data: '2026-06-21', dataEntrada: '2026-06-21', dataSaida: '2026-06-21' },
  { id: 'e17', tipo: 'OTDR', modelo: 'Anritsu MT9090A', serie: 'MT-4410', status: 'Em trânsito', obraId: 'o7', tecnico: 'Rafael Torres', saida: '2026-06-23', data: '2026-06-23', dataEntrada: '2026-06-23', dataSaida: '2026-06-23' },
  { id: 'e18', tipo: 'OTDR', modelo: 'EXFO FTB-400 UTS', serie: 'UTS-6012', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e19', tipo: 'OTDR', modelo: 'AFL FlexTester AXS-200', serie: 'AFL-90043', status: 'Em campo', obraId: 'o6', tecnico: 'Marcos Vinícius', saida: '2026-06-27', data: '2026-06-27', dataEntrada: '2026-06-27', dataSaida: '2026-06-27' },
  { id: 'e20', tipo: 'OTDR', modelo: 'Tektronix TFP2', serie: 'TPK-7741', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e34', tipo: 'OTDR', modelo: 'Keysight NFA100', serie: 'KEY-99103', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e35', tipo: 'OTDR', modelo: 'Viavi MTS-2000', serie: 'MTS-77812', status: 'Em trânsito', obraId: 'o8', tecnico: 'Diego Farias', saida: '2026-07-29', data: '2026-07-29', dataEntrada: '2026-07-29', dataSaida: '2026-07-29' },
// Fluke
  { id: 'e5', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51092', status: 'Em campo', obraId: 'o1', tecnico: 'Diego Farias', saida: '2026-05-30' },
  {
    id: 'e6', tipo: 'Fluke', modelo: 'Fluke Networks CertiFiber Pro', serie: 'FLK-33871',
    status: 'Em estoque', obraId: null, tecnico: null, data: '2026-06-30', dataEntrada: '2026-06-30',
    historico: [
      { id: 'h6a', dataMovimentacao: '2026-06-01', dataSaida: '2026-06-01', dataEntrada: '2026-06-01', origemObraId: null, destinoObraId: 'o4', origemNome: 'Depósito central', destinoNome: 'Certificação Rede Corporativa', tecnico: 'Fernanda Lima', status: 'Em campo' },
      { id: 'h6b', dataMovimentacao: '2026-06-30', dataSaida: '2026-06-30', dataEntrada: '2026-06-30', origemObraId: 'o4', destinoObraId: null, origemNome: 'Certificação Rede Corporativa', destinoNome: 'Depósito central', tecnico: null, status: 'Em estoque' },
    ],
  },
  { id: 'e7', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51093', status: 'Em estoque', obraId: null, tecnico: null },
  {
    id: 'e14', tipo: 'Fluke', modelo: 'Fluke Networks CertiFiber Pro', serie: 'FLK-33872',
    status: 'Em campo', obraId: 'o6', tecnico: 'Marcos Vinícius', saida: '2026-08-17', data: '2026-08-17', dataEntrada: '2026-08-17', dataSaida: '2026-08-17',
    historico: [{
      id: 'solicitacao-s3-e14', solicitacaoId: 's3', dataMovimentacao: '2026-08-17', dataSaida: '2026-08-17', dataEntrada: '2026-08-17',
      origemObraId: 'o2', destinoObraId: 'o6', origemNome: 'Manutenção Backbone BR-174', destinoNome: 'Backbone Óptico Manaus–Rio Preto',
      tecnico: 'Marcos Vinícius', status: 'Em campo',
    }],
  },
  { id: 'e21', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51094', status: 'Em campo', obraId: 'o5', tecnico: 'Amanda Castro', saida: '2026-07-01' },
  { id: 'e22', tipo: 'Fluke', modelo: 'Fluke DSX2-8000', serie: 'FLK-28800', status: 'Em campo', obraId: 'o8', tecnico: 'Rafael Torres', saida: '2026-07-03' },
  { id: 'e23', tipo: 'Fluke', modelo: 'Fluke Networks MicroScanner2', serie: 'FLK-20985', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e24', tipo: 'Fluke', modelo: 'Fluke LinkIQ', serie: 'FLK-30010', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e25', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51095', status: 'Em trânsito', obraId: 'o6', tecnico: 'Júlia Mendes', saida: '2026-07-09' },
  { id: 'e36', tipo: 'Fluke', modelo: 'Fluke Networks CertiFiber Pro', serie: 'FLK-33873', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e37', tipo: 'Fluke', modelo: 'Fluke OneTouch AT', serie: 'FLK-41220', status: 'Em trânsito', obraId: 'o6', tecnico: 'Marcos Vinícius', saida: '2026-08-02' },

  // Outro
  { id: 'e9', tipo: 'Outro', modelo: 'Fusionadora Fujikura 90S', serie: 'FJK-77341', status: 'Em campo', obraId: 'o2', tecnico: 'Marcos Vinícius', saida: '2026-06-07' },
  { id: 'e10', tipo: 'Outro', modelo: 'Fusionadora Fujikura 90S', serie: 'FJK-77342', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e11', tipo: 'Outro', modelo: 'Localizador de Fibra Ativa VFL', serie: 'VFL-10233', status: 'Em campo', obraId: 'o1', tecnico: 'Diego Farias', saida: '2026-06-11' },
  { id: 'e12', tipo: 'Outro', modelo: 'Power Meter EXFO FPM-600', serie: 'FPM-60019', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e26', tipo: 'Outro', modelo: 'Fusionadora Sumitomo Q102', serie: 'SUM-5811', status: 'Em campo', obraId: 'o5', tecnico: 'Amanda Castro', saida: '2026-07-11' },
  { id: 'e27', tipo: 'Outro', modelo: 'Power Meter EXFO FPM-600', serie: 'FPM-60020', status: 'Em trânsito', obraId: 'o3', tecnico: 'Bruno Alencar', saida: '2026-07-13' },
  { id: 'e28', tipo: 'Outro', modelo: 'Spreader Fusion Splicer', serie: 'SPL-1108', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e29', tipo: 'Outro', modelo: 'Site Master S820D', serie: 'ANR-2203', status: 'Em campo', obraId: 'o8', tecnico: 'Rafael Torres', saida: '2026-07-17' },
  { id: 'e30', tipo: 'Outro', modelo: 'Light Source EXFO FLS-240', serie: 'FLS-9912', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e31', tipo: 'Outro', modelo: 'Fusionadora Fujikura 90S', serie: 'FJK-77343', status: 'Em trânsito', obraId: 'o7', tecnico: 'Júlia Mendes', saida: '2026-07-21' },
  { id: 'e32', tipo: 'Outro', modelo: 'Lupa de Inspeção InspectPro', serie: 'INSP-4501', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e33', tipo: 'Outro', modelo: 'Power Meter Viavi OLP-38', serie: 'OLP-38V', status: 'Em trânsito', obraId: 'o6', tecnico: 'Diego Farias', saida: '2026-07-25' },
  { id: 'e38', tipo: 'Outro', modelo: 'Fusionadora Fujikura 90S', serie: 'FJK-77344', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e39', tipo: 'Outro', modelo: 'Alinhador de Núcleo Auto', serie: 'ALN-2200', status: 'Em estoque', obraId: null, tecnico: null },
  // Depósito — itens fora de campo (estoque / manutenção / trânsito)
  { id: 'e40', tipo: 'OTDR', modelo: 'Viavi SmartOTDR 3500', serie: 'VVX-11111', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e41', tipo: 'OTDR', modelo: 'Keysight NFA101', serie: 'KEY-99104', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e42', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51096', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e43', tipo: 'Fluke', modelo: 'Fluke Networks MicroScanner2', serie: 'FLK-20986', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e44', tipo: 'Fluke', modelo: 'Fluke LinkIQ', serie: 'FLK-30011', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e45', tipo: 'Outro', modelo: 'Fusionadora Sumitomo Q101', serie: 'SUM-5812', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e46', tipo: 'Outro', modelo: 'Power Meter EXFO FPM-600', serie: 'FPM-60021', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e47', tipo: 'Outro', modelo: 'Lupa de Inspeção InspectPro', serie: 'INSP-4502', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e48', tipo: 'Outro', modelo: 'Kit Fusionadora 60S', serie: 'FJK-66001', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e49', tipo: 'OTDR', modelo: 'EXFO FTB-1v2', serie: 'FTB-88220', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e50', tipo: 'OTDR', modelo: 'Viavi SmartOTDR 6000', serie: 'VVX-40220', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e51', tipo: 'Fluke', modelo: 'Fluke DSX2-8000', serie: 'FLK-28801', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e52', tipo: 'Outro', modelo: 'Fusionadora Fujikura 90S', serie: 'FJK-77345', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e53', tipo: 'Outro', modelo: 'Alinhador de Núcleo Auto', serie: 'ALN-2201', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e54', tipo: 'Fluke', modelo: 'Fluke Networks CertiFiber Pro', serie: 'FLK-33874', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e55', tipo: 'OTDR', modelo: 'EXFO FTB-1v2', serie: 'FTB-88221', status: 'Em estoque', obraId: null, tecnico: null, saida: '2026-08-12' },
  { id: 'e56', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51097', status: 'Em trânsito', obraId: 'o10', tecnico: 'Júlia Mendes', saida: '2026-08-13' },
  { id: 'e57', tipo: 'Outro', modelo: 'Power Meter Viavi OLP-38', serie: 'OLP-38X', status: 'Em trânsito', obraId: 'o7', tecnico: 'Bruno Alencar', saida: '2026-08-14' },
];

// Funcionários são uma entidade própria. Quando a API estiver disponível,
// esta coleção será substituída pelo retorno do endpoint de funcionários.
export const funcionariosIniciais = [
  { id: 'f1', nome: 'Amanda Castro', cargo: 'Técnica de campo', email: 'amanda.castro@era.com.br', telefone: '(92) 99101-1001', status: 'Ativo' },
  { id: 'f2', nome: 'Ana Paula Reis', cargo: 'Engenheira de redes', email: 'ana.reis@era.com.br', telefone: '(92) 99101-1002', status: 'Ativo' },
  { id: 'f3', nome: 'Bruno Alencar', cargo: 'Técnico de campo', email: 'bruno.alencar@era.com.br', telefone: '(92) 99101-1003', status: 'Ativo' },
  { id: 'f4', nome: 'Carlos Nunes', cargo: 'Supervisor de obras', email: 'carlos.nunes@era.com.br', telefone: '(92) 99101-1004', status: 'Ativo' },
  { id: 'f5', nome: 'Diego Farias', cargo: 'Técnico de campo', email: 'diego.farias@era.com.br', telefone: '(92) 99101-1005', status: 'Ativo' },
  { id: 'f6', nome: 'Fernanda Lima', cargo: 'Engenheira de redes', email: 'fernanda.lima@era.com.br', telefone: '(92) 99101-1006', status: 'Ativo' },
  { id: 'f7', nome: 'Júlia Mendes', cargo: 'Técnica de campo', email: 'julia.mendes@era.com.br', telefone: '(92) 99101-1007', status: 'Ativo' },
  { id: 'f8', nome: 'Marcos Vinícius', cargo: 'Técnico de campo', email: 'marcos.vinicius@era.com.br', telefone: '(92) 99101-1008', status: 'Ativo' },
  { id: 'f9', nome: 'Rafael Torres', cargo: 'Técnico de campo', email: 'rafael.torres@era.com.br', telefone: '(92) 99101-1009', status: 'Ativo' },
  { id: 'f10', nome: 'Renata Nogueira', cargo: 'Gerente de obras', email: 'renata.nogueira@era.com.br', telefone: '(92) 99101-1010', status: 'Ativo' },
];

// Solicitações recebidas das equipes de campo. Mais tarde esta coleção será
// substituída pelo endpoint de atividades do painel dos técnicos.
export const solicitacoesIniciais = [
  {
    id: 's1', tipo: 'Movimentação', tecnico: 'Diego Farias', obraOrigemId: 'o1', obraDestinoId: 'o8',
    dataSolicitacao: '2026-08-18', status: 'Pendente', observacao: 'Equipamentos necessários para os testes finais do headend.',
    materiais: [
      { id: 'm1', nome: 'Fluke DSX2-5000', quantidade: 1, identificacao: 'FLK-51092' },
      { id: 'm2', nome: 'Localizador de Fibra Ativa VFL', quantidade: 1, identificacao: 'VFL-10233' },
    ],
  },
  {
    id: 's2', tipo: 'Aquisição', tecnico: 'Amanda Castro', obraOrigemId: null, obraDestinoId: 'o5',
    dataSolicitacao: '2026-08-18', status: 'Pendente', observacao: 'Reposição do consumo previsto para a próxima etapa da expansão.',
    materiais: [
      { id: 'm3', nome: 'Conector óptico SC/APC', quantidade: 80 },
      { id: 'm4', nome: 'Caixa de emenda 24 fibras', quantidade: 6 },
      { id: 'm5', nome: 'Bobina de cabo drop', quantidade: 2 },
    ],
  },
  {
    id: 's3', tipo: 'Movimentação', tecnico: 'Marcos Vinícius', obraOrigemId: 'o2', obraDestinoId: 'o6',
    dataSolicitacao: '2026-08-17', status: 'Aprovada', observacao: 'Transferência para continuidade das medições do backbone.',
    materiais: [{ id: 'm6', nome: 'Fluke Networks CertiFiber Pro', quantidade: 1, identificacao: 'FLK-33872' }],
  },
  {
    id: 's4', tipo: 'Aquisição', tecnico: 'Bruno Alencar', obraOrigemId: null, obraDestinoId: 'o3',
    dataSolicitacao: '2026-08-16', status: 'Rejeitada', observacao: 'Solicitação substituída por materiais disponíveis no depósito.',
    materiais: [
      { id: 'm7', nome: 'Power Meter EXFO FPM-600', quantidade: 1 },
      { id: 'm8', nome: 'Cordão óptico SC/APC', quantidade: 12 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Constantes de filtro e mapa de ícones
// ---------------------------------------------------------------------------
export const tiposEquipamento = ['Fluke', 'OTDR', 'Outro'];
export const statusEquipamento = ['Em campo', 'Em estoque', 'Em manutenção', 'Em trânsito'];
export const statusObra = ['Planejada', 'Em andamento', 'Concluída'];

export const iconePorTipoEquipamento = { Fluke: Cable, OTDR: Radio, Outro: Wrench };
