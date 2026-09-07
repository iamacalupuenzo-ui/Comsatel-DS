// Puerto 1:1 de highlight() en DocsComponents.tsx (sistema React) — mismo
// resaltado de sintaxis por regex para los bloques de código de las
// páginas de documentación. No es un highlighter genérico: reconoce el
// mismo vocabulario reducido (comentarios, strings, palabras clave, tags
// tipo JSX/Angular, nombres de prop) que usa el sistema React.
export function highlight(raw: string): string {
  const kw = '#0369a1';
  const str = '#16a34a';
  const tag = '#2563eb';
  const prop = '#be185d';
  const cmt = '#9ca3af';
  const escaped = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const master = new RegExp(
    [
      String.raw`(\/\/[^\n]*)`,
      String.raw`("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')`,
      String.raw`\b(import|export|default|from|const|let|var|return|function|type|interface|true|false)\b`,
      String.raw`(&lt;\/?[A-Za-z][A-Za-z0-9.-]*)`,
      String.raw`\b([a-zA-Z][a-zA-Z0-9]*)(?==(?!=))`,
    ].join('|'),
    'g',
  );
  return escaped.replace(master, (match, c, s, k, t, p) => {
    if (c !== undefined) return `<span style="color:${cmt}">${match}</span>`;
    if (s !== undefined) return `<span style="color:${str}">${match}</span>`;
    if (k !== undefined) return `<span style="color:${kw}">${match}</span>`;
    if (t !== undefined) return `<span style="color:${tag}">${match}</span>`;
    if (p !== undefined) return `<span style="color:${prop}">${match}</span>`;
    return match;
  });
}
