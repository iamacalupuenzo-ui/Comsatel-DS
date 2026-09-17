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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 112" role="img">
    <title>C-Flotas by Comsatel</title>
    <g fill="#121212">
      <path d="M22 16h120l-10 24H62L48 72h70l-10 24H0L22 16Z"/>
      <path d="M151 53h34l-9 21h-34l9-21Z"/>
    </g>
    <text x="190" y="78" fill="#121212" font-family="Arial Black, Arial, sans-serif" font-size="62" font-style="italic" font-weight="900" letter-spacing="-3">FLOTAS</text>
    <path d="M505 48h2v31h-2z" fill="#9ca3af"/>
    <text x="520" y="64" fill="#4b5563" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700">by</text>
    <text x="520" y="84" fill="#20252d" font-family="Arial Black, Arial, sans-serif" font-size="24" font-style="italic" font-weight="900" letter-spacing="-1.4">COMSATEL</text>
  </svg>
`);

export const C_FLOTAS_ISOTYPE_SOURCE = svgSource(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 112" role="img">
    <title>CF, C-Flotas by Comsatel</title>
    <path fill="#121212" d="M18 14h62l-9 21H41L30 77h30l-9 21H0l8-20 12-43 8-21Z"/>
    <path fill="#121212" d="M72 14h61l-9 21H94l-4 10h28l-9 20H81L70 98H46l10-24 16-60Z"/>
  </svg>
`);
