import { Radio, Wrench, Cable } from 'lucide-react';

// ---------------------------------------------------------------------------
// Obras — cobrem todos os status (Planejada / Em andamento / Concluída)
// ---------------------------------------------------------------------------
export const initialObras = [
  { id: 'o1', nome: 'Expansão FTTH — Zona Norte', cliente: 'Claro', cidade: 'Manaus, AM', responsavel: 'Carlos Nunes', inicio: '2026-06-02', status: 'Em andamento' },
  { id: 'o2', nome: 'Manutenção Backbone BR-174', cliente: 'Vivo', cidade: 'Manaus, AM', responsavel: 'Ana Paula Reis', inicio: '2026-07-10', status: 'Em andamento' },
  { id: 'o3', nome: 'Implantação Data Center', cliente: 'Oi', cidade: 'Itacoatiara, AM', responsavel: 'Bruno Alencar', inicio: '2026-05-20', status: 'Planejada' },
  { id: 'o4', nome: 'Certificação Rede Corporativa', cliente: 'TIM', cidade: 'Parintins, AM', responsavel: 'Fernanda Lima', inicio: '2026-04-15', status: 'Concluída' },
  { id: 'o5', nome: 'Expansão FTTH — Zona Sul', cliente: 'Claro', cidade: 'Manaus, AM', responsavel: 'Amanda Castro', inicio: '2026-08-01', status: 'Em andamento' },
  { id: 'o6', nome: 'Backbone Óptico Manaus–Rio Preto', cliente: 'Vivo', cidade: 'Presidente Figueiredo, AM', responsavel: 'Júlia Mendes', inicio: '2026-06-18', status: 'Em andamento' },
  { id: 'o7', nome: 'Redes de Transmissão Rural 4G', cliente: 'Algar', cidade: 'Careiro, AM', responsavel: 'Rafael Torres', inicio: '2026-03-02', status: 'Planejada' },
  { id: 'o8', nome: 'Modernização de Headend', cliente: 'Oi', cidade: 'Manaus, AM', responsavel: 'Diego Farias', inicio: '2026-02-12', status: 'Em andamento' },
  { id: 'o9', nome: 'Rede Metropolitana de Alta Disponibilidade', cliente: 'TIM', cidade: 'Itacoatiara, AM', responsavel: 'Marcos Vinícius', inicio: '2025-11-05', status: 'Concluída' },
  { id: 'o10', nome: 'Fibra para Empresa Corporativa', cliente: 'Vivo', cidade: 'Manaus, AM', responsavel: 'Ana Paula Reis', inicio: '2026-09-15', status: 'Planejada' },
];

// ---------------------------------------------------------------------------
// Equipamentos — cobrem todos os tipos e status; alguns vinculados a obras,
// outros no depósito; alguns com/sem técnico associado.
// ---------------------------------------------------------------------------
export const initialEquip = [
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
  { id: 'e17', tipo: 'OTDR', modelo: 'Anritsu MT9090A', serie: 'MT-4410', status: 'Em campo', obraId: 'o7', tecnico: 'Rafael Torres', saida: '2026-06-23', data: '2026-06-23', dataEntrada: '2026-06-23', dataSaida: '2026-06-23' },
  { id: 'e18', tipo: 'OTDR', modelo: 'EXFO FTB-400 UTS', serie: 'UTS-6012', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e19', tipo: 'OTDR', modelo: 'AFL FlexTester AXS-200', serie: 'AFL-90043', status: 'Em campo', obraId: 'o6', tecnico: 'Marcos Vinícius', saida: '2026-06-27', data: '2026-06-27', dataEntrada: '2026-06-27', dataSaida: '2026-06-27' },
  { id: 'e20', tipo: 'OTDR', modelo: 'Tektronix TFP2', serie: 'TPK-7741', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e34', tipo: 'OTDR', modelo: 'Keysight NFA100', serie: 'KEY-99103', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e35', tipo: 'OTDR', modelo: 'Viavi MTS-2000', serie: 'MTS-77812', status: 'Em trânsito', obraId: 'o8', tecnico: 'Diego Farias', saida: '2026-07-29', data: '2026-07-29', dataEntrada: '2026-07-29', dataSaida: '2026-07-29' },
// Fluke
  { id: 'e5', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51092', status: 'Em campo', obraId: 'o1', tecnico: 'Diego Farias', saida: '2026-05-30' },
  { id: 'e6', tipo: 'Fluke', modelo: 'Fluke Networks CertiFiber Pro', serie: 'FLK-33871', status: 'Em campo', obraId: 'o4', tecnico: 'Fernanda Lima', saida: '2026-06-01' },
  { id: 'e7', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51093', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e14', tipo: 'Fluke', modelo: 'Fluke Networks CertiFiber Pro', serie: 'FLK-33872', status: 'Em campo', obraId: 'o2', tecnico: 'Marcos Vinícius', saida: '2026-06-17' },
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
  { id: 'e31', tipo: 'Outro', modelo: 'Fusionadora Fujikura 90S', serie: 'FJK-77343', status: 'Em campo', obraId: 'o7', tecnico: 'Júlia Mendes', saida: '2026-07-21' },
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
  { id: 'e55', tipo: 'OTDR', modelo: 'EXFO FTB-1v2', serie: 'FTB-88221', status: 'Em trânsito', obraId: 'o9', tecnico: 'Marcos Vinícius', saida: '2026-08-12' },
  { id: 'e56', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51097', status: 'Em trânsito', obraId: 'o10', tecnico: 'Júlia Mendes', saida: '2026-08-13' },
  { id: 'e57', tipo: 'Outro', modelo: 'Power Meter Viavi OLP-38', serie: 'OLP-38X', status: 'Em trânsito', obraId: 'o7', tecnico: 'Bruno Alencar', saida: '2026-08-14' },
];

// ---------------------------------------------------------------------------
// Constantes de filtro e mapa de ícones
// ---------------------------------------------------------------------------
export const tipos = ['Fluke', 'OTDR', 'Outro'];
export const statusList = ['Em campo', 'Em estoque', 'Em manutenção', 'Em trânsito'];
export const obraStatusList = ['Planejada', 'Em andamento', 'Concluída'];

export const tecnicosCadastrados = Array.from(
  new Set(
    [
      ...initialObras.map((obra) => obra.responsavel),
      ...initialEquip.map((equip) => equip.tecnico),
    ].filter(Boolean),
  ),
).sort((a, b) => a.localeCompare(b, 'pt-BR'));

export const tipoIcon = { Fluke: Cable, OTDR: Radio, Outro: Wrench };
