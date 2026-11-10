import nodemailer from 'nodemailer';
import { config } from '../config.js';

let transport = null;
if (config.mail.host) {
  transport = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.port === 465,
    auth: config.mail.user ? { user: config.mail.user, pass: config.mail.pass } : undefined,
  });
}

export const mailConfigured = () => Boolean(transport);

/**
 * Envia e-mail. Sem SMTP configurado, NÃO finge envio: registra no console do servidor
 * (útil em desenvolvimento) e retorna { delivered: false }.
 */
export async function sendMail(to, subject, text) {
  if (!transport) {
    if (!config.isTest) console.log(`\n[mail:não-configurado] Para: ${to}\nAssunto: ${subject}\n${text}\n`);
    return { delivered: false };
  }
  await transport.sendMail({ from: config.mail.from, to, subject, text });
  return { delivered: true };
}
