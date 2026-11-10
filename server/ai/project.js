// Adaptador do modelo de projeto para o servidor: adiciona checagem de sintaxe de scripts
// via node:vm (apenas COMPILA; nunca executa código de usuário no servidor).
import vm from 'node:vm';
import * as shared from '../../shared/project.js';

export * from '../../shared/project.js';

export function checkScriptSyntax(source) {
  try {
    // Scripts são corpos de função com a API do runtime injetada (ver client/src/engine/scripting.js).
    new vm.Script(`(function(api){\n${source}\n})`, { filename: 'script.js' });
    return null;
  } catch (e) {
    return String(e.message).slice(0, 300);
  }
}

export function validateProject(doc) {
  return shared.validateProject(doc, { checkScript: checkScriptSyntax });
}
