import axios from 'axios';

export const apiHabilitada = import.meta.env.VITE_USAR_API === 'true';

export const clienteHttp = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT || 10000),
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

clienteHttp.interceptors.request.use((configuracao) => {
  const token = localStorage.getItem('era_token_acesso');
  if (token) configuracao.headers.Authorization = `Bearer ${token}`;
  return configuracao;
});

clienteHttp.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    const erroNormalizado = new Error(
      erro.response?.data?.mensagem || erro.response?.data?.message || erro.message || 'Não foi possível comunicar com a API.',
    );
    erroNormalizado.status = erro.response?.status;
    erroNormalizado.dados = erro.response?.data;
    return Promise.reject(erroNormalizado);
  },
);

export function obterDadosResposta(resposta) {
  return resposta.data?.dados ?? resposta.data?.data ?? resposta.data;
}
