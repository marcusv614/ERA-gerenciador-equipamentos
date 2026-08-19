import { ROTAS_API } from '../../config/rotasApi';
import { clienteHttp, obterDadosResposta } from './clienteHttp';

export async function prepararCsrf() { await clienteHttp.get(ROTAS_API.csrf); }
export async function entrar(credenciais) { await prepararCsrf(); return obterDadosResposta(await clienteHttp.post(ROTAS_API.login, credenciais)); }
export async function obterSessao() { return obterDadosResposta(await clienteHttp.get(ROTAS_API.sessao)); }
export async function sair() { await prepararCsrf(); await clienteHttp.post(ROTAS_API.logout); }
export async function alterarSenha(dados) { await clienteHttp.post(ROTAS_API.alterarSenha, dados); }

export const apiUsuarios = {
  listar: async () => obterDadosResposta(await clienteHttp.get(ROTAS_API.usuarios)),
  cadastrar: async (dados) => obterDadosResposta(await clienteHttp.post(ROTAS_API.usuarios, dados)),
  definirStatus: async (id, ativo) => obterDadosResposta(await clienteHttp.patch(ROTAS_API.statusUsuario(id), { ativo })),
  redefinirSenha: async (id, senhaTemporaria) => obterDadosResposta(await clienteHttp.post(ROTAS_API.redefinirSenhaUsuario(id), { senhaTemporaria })),
};
