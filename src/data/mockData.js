import { Radio, Wrench, Cable } from 'lucide-react';

export const initialObras = [
  { id: 'o1', nome: 'Expansão FTTH — Zona Norte', cliente: 'Claro', cidade: 'Manaus, AM', responsavel: 'Carlos Nunes', inicio: '2026-06-02', status: 'Em andamento' },
  { id: 'o2', nome: 'Manutenção Backbone BR-174', cliente: 'Vivo', cidade: 'Manaus, AM', responsavel: 'Ana Paula Reis', inicio: '2026-07-10', status: 'Em andamento' },
  { id: 'o3', nome: 'Implantação Data Center', cliente: 'Oi', cidade: 'Itacoatiara, AM', responsavel: 'Bruno Alencar', inicio: '2026-05-20', status: 'Planejada' },
  { id: 'o4', nome: 'Certificação Rede Corporativa', cliente: 'TIM', cidade: 'Parintins, AM', responsavel: 'Fernanda Lima', inicio: '2026-04-15', status: 'Concluída' },
];

export const initialEquip = [
  { id: 'e1', tipo: 'OTDR', modelo: 'EXFO FTB-1v2', serie: 'FTB-88213', status: 'Em campo', obraId: 'o1', tecnico: 'Diego Farias' },
  { id: 'e2', tipo: 'OTDR', modelo: 'Viavi SmartOTDR 6000', serie: 'VVX-40217', status: 'Em campo', obraId: 'o2', tecnico: 'Marcos Vinícius' },
  { id: 'e3', tipo: 'OTDR', modelo: 'AFL FlexTester AXS-200', serie: 'AFL-90042', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e4', tipo: 'OTDR', modelo: 'EXFO FTB-1v2', serie: 'FTB-88214', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e5', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51092', status: 'Em campo', obraId: 'o1', tecnico: 'Diego Farias' },
  { id: 'e6', tipo: 'Fluke', modelo: 'Fluke Networks CertiFiber Pro', serie: 'FLK-33871', status: 'Em campo', obraId: 'o4', tecnico: 'Fernanda Lima' },
  { id: 'e7', tipo: 'Fluke', modelo: 'Fluke DSX2-5000', serie: 'FLK-51093', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e8', tipo: 'Fluke', modelo: 'Fluke Networks MicroScanner PoE', serie: 'FLK-20984', status: 'Em trânsito', obraId: 'o3', tecnico: 'Bruno Alencar' },
  { id: 'e9', tipo: 'Outro', modelo: 'Fusionadora Fujikura 90S', serie: 'FJK-77341', status: 'Em campo', obraId: 'o2', tecnico: 'Marcos Vinícius' },
  { id: 'e10', tipo: 'Outro', modelo: 'Fusionadora Fujikura 90S', serie: 'FJK-77342', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e11', tipo: 'Outro', modelo: 'Localizador de Fibra Ativa VFL', serie: 'VFL-10233', status: 'Em campo', obraId: 'o1', tecnico: 'Diego Farias' },
  { id: 'e12', tipo: 'Outro', modelo: 'Power Meter EXFO FPM-600', serie: 'FPM-60019', status: 'Em estoque', obraId: null, tecnico: null },
  { id: 'e13', tipo: 'OTDR', modelo: 'Viavi SmartOTDR 6000', serie: 'VVX-40218', status: 'Em manutenção', obraId: null, tecnico: null },
  { id: 'e14', tipo: 'Fluke', modelo: 'Fluke Networks CertiFiber Pro', serie: 'FLK-33872', status: 'Em campo', obraId: 'o2', tecnico: 'Marcos Vinícius' },
];

export const tipos = ['Fluke', 'OTDR', 'Outro'];
export const statusList = ['Em campo', 'Em estoque', 'Em manutenção', 'Em trânsito'];
export const obraStatusList = ['Planejada', 'Em andamento', 'Concluída'];

export const tipoIcon = { Fluke: Cable, OTDR: Radio, Outro: Wrench };