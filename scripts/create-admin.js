// Promove uma conta existente a administrador:  npm run seed:admin -- <usuario>
// (crie a conta normalmente pelo site e depois rode este comando no servidor).
import { one, run } from '../server/db/index.js';

const username = process.argv[2];
if (!username) { console.error('Uso: npm run seed:admin -- <usuario>'); process.exit(1); }
const u = one('SELECT id, username, role FROM users WHERE username = ?', username);
if (!u) { console.error(`Usuário "${username}" não encontrado. Crie a conta pelo site primeiro.`); process.exit(1); }
run(`UPDATE users SET role='admin', email_verified=1 WHERE id=?`, u.id);
run(`INSERT INTO audit_log(actor_id, action, target_type, target_id, details) VALUES (NULL, 'cli.promote_admin', 'user', ?, '{}')`, String(u.id));
console.log(`@${u.username} agora é administrador.`);
