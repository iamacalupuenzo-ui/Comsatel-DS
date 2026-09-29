/**
 * Recursos vectoriales auto-contenidos de C-Flotas.
 *
 * Se codifican como data URL para que una aplicación consumidora no dependa
 * de rutas internas del paquete ni del pre-bundling ESM de Vite.
 */
function svgSource(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const C_FLOTAS_WORDMARK_SOURCE = svgSource(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730 112" role="img">
    <title>C-Flotas by Comsatel</title>
    <path fill="#202020" d="M78 16H38C17 16 3 33 3 56s14 40 35 40h40l-4-20H39c-11 0-18-8-18-20s7-20 18-20h35l4-20Z"/>
    <path fill="#202020" d="M91 48h25l-3 16H88l3-16Z"/>
    <rect x="128" y="16" width="284" height="80" rx="18" fill="#202020"/>
    <text x="149" y="75" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-size="53" font-style="italic" font-weight="900" letter-spacing="-2.6">FLOTAS</text>
    <text x="428" y="67" fill="#202020" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700">by</text>
    <text x="457" y="68" fill="#202020" font-family="Arial Black, Arial, sans-serif" font-size="27" font-style="italic" font-weight="900" letter-spacing="-1.6">COMSATEL</text>
  </svg>
`);

export const C_FLOTAS_ISOTYPE_SOURCE = svgSource(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282 112" role="img">
    <title>C-FL, C-Flotas by Comsatel</title>
    <path fill="#202020" d="M78 16H38C17 16 3 33 3 56s14 40 35 40h40l-4-20H39c-11 0-18-8-18-20s7-20 18-20h35l4-20Z"/>
    <path fill="#202020" d="M91 48h25l-3 16H88l3-16Z"/>
    <rect x="128" y="16" width="130" height="80" rx="18" fill="#202020"/>
    <text x="151" y="75" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-size="57" font-style="italic" font-weight="900" letter-spacing="-4">FL</text>
  </svg>
`);
