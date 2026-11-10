import { z } from 'zod';
import { HttpError } from './security.js';

/** Valida req.body/query com um schema zod e devolve dados tipados ou erro 400 legível. */
export function parse(schema, data) {
  const r = schema.safeParse(data ?? {});
  if (!r.success) {
    const first = r.error.issues[0];
    const where = first?.path?.length ? `${first.path.join('.')}: ` : '';
    throw new HttpError(400, `${where}${first?.message || 'Dados inválidos.'}`, 'validation');
  }
  return r.data;
}

export const id = z.coerce.number().int().positive();
export const username = z.string().trim().min(3, 'Nome de usuário: mínimo 3 caracteres.').max(24)
  .regex(/^[a-zA-Z0-9_.]+$/, 'Use apenas letras, números, ponto e sublinhado.');
export const password = z.string().min(10, 'A senha precisa ter pelo menos 10 caracteres.').max(200)
  .refine((p) => /[a-zA-Z]/.test(p) && /[0-9]/.test(p), 'A senha precisa conter letras e números.');
export const email = z.string().trim().toLowerCase().max(200).email('E-mail inválido.');
export const text = (max = 5000) => z.string().max(max).transform((s) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim());
export const httpUrl = z.string().trim().max(500).url().refine((u) => /^https?:\/\//i.test(u), 'URL precisa usar http(s).');

export { z };
