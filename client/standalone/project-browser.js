// Versão para navegador de server/ai/project.js: a checagem de sintaxe só COMPILA o script (new Function não executa o corpo).
import * as shared from '../../shared/project.js';

export * from '../../shared/project.js';

export function checkScriptSyntax(source) {
  try {
    // eslint-disable-next-line no-new-func
    new Function('api', source);
    return null;
  } catch (e) {
    return String(e.message).slice(0, 300);
  }
}

export function validateProject(doc) {
  return shared.validateProject(doc, { checkScript: checkScriptSyntax });
}
