// true somente no build "sem servidor" (link para celular). No app normal é sempre false.
export const STANDALONE = import.meta.env.VITE_STANDALONE === '1';
