import { useMemo, useState } from 'react';
import {
  equipamentosIniciais,
  funcionariosIniciais,
  obrasIniciais,
} from '../data/mockData';
import { obterDataAtual } from '../utils/datas';
import { obterHistoricoEquipamento } from '../utils/historicoEquipamento';

export function useControleAtivos() {
  const [obras, definirObras] = useState(obrasIniciais);
  const [equipamentos, definirEquipamentos] = useState(equipamentosIniciais);
  const [funcionarios, definirFuncionarios] = useState(funcionariosIniciais);

  const buscarObraPorId = (identificador) =>
    obras.find((obra) => obra.id === identificador);

  const resumoEquipamentos = useMemo(() => ({
    total: equipamentos.length,
    emCampo: equipamentos.filter(({ status }) => status === 'Em campo').length,
    emEstoque: equipamentos.filter(({ status }) => status === 'Em estoque').length,
    emManutencao: equipamentos.filter(({ status }) => status === 'Em manutenção').length,
    emTransito: equipamentos.filter(({ status }) => status === 'Em trânsito').length,
  }), [equipamentos]);

  const tecnicosCadastrados = useMemo(() => funcionarios
    .filter(({ status, cargo }) => status === 'Ativo' && !cargo.toLocaleLowerCase('pt-BR').includes('gerente'))
    .map(({ nome }) => nome)
    .sort((primeiroNome, segundoNome) => primeiroNome.localeCompare(segundoNome, 'pt-BR')),
  [funcionarios]);

  function cadastrarObra(dadosNovaObra) {
    definirObras((obrasAtuais) => [
      { id: `o${obrasAtuais.length + 1}_${Date.now()}`, ...dadosNovaObra },
      ...obrasAtuais,
    ]);
  }

  function cadastrarEquipamento(dadosNovoEquipamento) {
    const serieNormalizada = dadosNovoEquipamento.serie.trim().toLocaleLowerCase('pt-BR');
    const serieJaExiste = equipamentos.some(({ serie }) =>
      serie.trim().toLocaleLowerCase('pt-BR') === serieNormalizada);
    if (serieJaExiste) return false;

    const dataCadastro = dadosNovoEquipamento.data || obterDataAtual();
    definirEquipamentos((equipamentosAtuais) => [
      {
        id: `e${equipamentosAtuais.length + 1}_${Date.now()}`,
        ...dadosNovoEquipamento,
        data: dataCadastro,
        dataEntrada: dataCadastro,
      },
      ...equipamentosAtuais,
    ]);
    return true;
  }

  function cadastrarFuncionario(dadosNovoFuncionario) {
    const emailNormalizado = dadosNovoFuncionario.email.trim().toLocaleLowerCase('pt-BR');
    const nomeNormalizado = dadosNovoFuncionario.nome.trim().toLocaleLowerCase('pt-BR');
    const funcionarioJaExiste = funcionarios.some(({ email, nome }) =>
      email.trim().toLocaleLowerCase('pt-BR') === emailNormalizado ||
      nome.trim().toLocaleLowerCase('pt-BR') === nomeNormalizado);
    if (funcionarioJaExiste) return false;

    definirFuncionarios((funcionariosAtuais) => [{
      id: `f${funcionariosAtuais.length + 1}_${Date.now()}`,
      ...dadosNovoFuncionario,
      status: 'Ativo',
    }, ...funcionariosAtuais]);
    return true;
  }

  function movimentarEquipamento(identificador, dadosMovimentacao) {
    definirEquipamentos((equipamentosAtuais) =>
      equipamentosAtuais.map((equipamento) => {
        if (equipamento.id !== identificador) return equipamento;

        const obraOrigemId = equipamento.obraId ?? null;
        const statusDestino = dadosMovimentacao.status;
        const obraDestinoId = ['Em estoque', 'Em manutenção'].includes(statusDestino)
          ? null
          : dadosMovimentacao.obraId ?? null;
        const dataMovimentacao = dadosMovimentacao.dataMovimentacao || obterDataAtual();
        const historicoAtual = [...obterHistoricoEquipamento(equipamento, buscarObraPorId)];
        const tecnicoDestino = ['Em estoque', 'Em manutenção'].includes(statusDestino)
          ? null
          : dadosMovimentacao.tecnico || equipamento.tecnico || null;
        const tecnicoMovimentacao = dadosMovimentacao.tecnico || equipamento.tecnico || null;

        historicoAtual.push({
          id: `h${Date.now()}_${historicoAtual.length}`,
          dataMovimentacao,
          dataSaida: dataMovimentacao,
          dataEntrada: dataMovimentacao,
          origemObraId: obraOrigemId,
          destinoObraId: obraDestinoId,
          origemNome: obraOrigemId
            ? buscarObraPorId(obraOrigemId)?.nome
            : 'Depósito central',
          destinoNome: obraDestinoId
            ? buscarObraPorId(obraDestinoId)?.nome
            : 'Depósito central',
          tecnico: tecnicoMovimentacao,
          status: statusDestino || equipamento.status,
        });

        return {
          ...equipamento,
          ...dadosMovimentacao,
          obraId: obraDestinoId,
          tecnico: tecnicoDestino,
          data: dataMovimentacao,
          saida: dataMovimentacao,
          dataSaida: dataMovimentacao,
          dataEntrada: dataMovimentacao,
          historico: historicoAtual,
        };
      }),
    );
  }

  function consultarHistorico(equipamento) {
    return obterHistoricoEquipamento(equipamento, buscarObraPorId);
  }

  return {
    obras,
    equipamentos,
    funcionarios,
    resumoEquipamentos,
    tecnicosCadastrados,
    buscarObraPorId,
    cadastrarObra,
    cadastrarEquipamento,
    cadastrarFuncionario,
    movimentarEquipamento,
    consultarHistorico,
  };
}
