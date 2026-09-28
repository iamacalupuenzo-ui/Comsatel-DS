import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = readFileSync(fileURLToPath(new URL('../projects/comsatel-ds/src/styles/tokens.css', import.meta.url)), 'utf8');
const sections = {
  light: css.slice(css.indexOf(':root,'), css.indexOf('[data-theme="dark"]')),
  dark: css.slice(css.indexOf('[data-theme="dark"]'), css.indexOf('[data-theme="glass"]')),
  glass: css.slice(css.indexOf('[data-theme="glass"]'), css.indexOf('RADIUS & SHADOWS')),
};
const roles = ['surface', 'series-current', 'series-previous', 'grid', 'axis', 'tooltip-background', 'tooltip-text', 'tooltip-border'];
function value(source, role) {
  return source.match(new RegExp(`--color-chart-${role}:\\s*(#[0-9a-f]{6}|rgba\\([^;]+\\))\\s*;`, 'i'))?.[1];
}
function luminance(hex) {
  const channels = hex.match(/[0-9a-f]{2}/gi).map(channel => parseInt(channel, 16) / 255);
  return channels.map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
}
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
for (const [theme, source] of Object.entries(sections)) {
  const palette = Object.fromEntries(roles.map(role => [role, value(source, role)]));
  for (const [role, color] of Object.entries(palette)) if (!color) throw new Error(`${theme}: falta ${role}`);
  for (const role of ['series-current', 'series-previous', 'axis']) {
    const ratio = contrast(palette[role], palette.surface);
    if (ratio < 4.5) throw new Error(`${theme}: ${role} ${ratio.toFixed(2)}:1`);
    console.log(`${theme}: ${role} ${ratio.toFixed(2)}:1`);
  }
  const tooltipRatio = contrast(palette['tooltip-text'], palette['tooltip-background']);
  if (tooltipRatio < 4.5) throw new Error(`${theme}: tooltip ${tooltipRatio.toFixed(2)}:1`);
  console.log(`${theme}: tooltip ${tooltipRatio.toFixed(2)}:1`);
}
