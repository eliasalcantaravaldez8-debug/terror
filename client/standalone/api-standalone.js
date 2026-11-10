// Na versão sem servidor, o cliente da API é trocado pela implementação local (IndexedDB + Claude da página).
export * from '../src/api.js';
export { api } from './localApi.js';
