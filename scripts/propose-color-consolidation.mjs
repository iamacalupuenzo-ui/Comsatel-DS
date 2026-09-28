import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const folder = resolve(root, 'docs/refactor/ejecucion-plan-1');
const css = readFileSync(resolve(root, 'projects/comsatel-ds/src/styles/tokens.css'), 'utf8');
const snapshot = JSON.parse(readFileSync(resolve(folder, 'n0-snapshot-antes.json'), 'utf8'));
const steps = ['050','100','200','300','400','500','600','700','800','900','950'];
const primitives = Object.fromEntries([...css.matchAll(/--color-primitive-([a-z]+)-([\d]{3}[a-z]?)\s*:\s*([^;]+);/g)]
  .map(([,tone,step,value]) => [`${tone}-${step}`,value.trim().toLowerCase()]));
const tones = [...new Set(Object.keys(primitives).map(k => k.split('-')[0]))].filter(t =>
  Object.keys(primitives).some(k => new RegExp(`^${t}-\\d{3}[a-z]$`).test(k)));
const hexes = Object.fromEntries([...new Set(Object.keys(primitives).map(k=>k.split('-')[0]))].map(t => [t,[...new Set(Object.entries(primitives)
  .filter(([k,v]) => k.startsWith(`${t}-`) && /^#[\da-f]{6}$/.test(v)).map(([,v]) => v))]]));
function flatten(v){
  if(v.startsWith('#')) return v;
  const [r,g,b,a]=v.match(/[\d.]+/g).map(Number);
  return '#'+[r,g,b].map(n=>Math.round(n*a+255*(1-a)).toString(16).padStart(2,'0')).join('');
}
const clamp = x => Math.max(0,Math.min(1,x));
function lab(hex) {
  const c = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
  const l = Math.cbrt(.4122214708*c[0]+.5363325363*c[1]+.0514459929*c[2]);
  const m = Math.cbrt(.2119034982*c[0]+.6806995451*c[1]+.1073969566*c[2]);
  const s = Math.cbrt(.0883024619*c[0]+.2817188376*c[1]+.6299787005*c[2]);
  return [.2104542553*l+.793617785*m-.0040720468*s,1.9779984951*l-2.428592205*m+.4505937099*s,.0259040371*l+.7827717662*m-.808675766*s];
}
function rgb([L,a,b]) {
  const l=(L+.3963377774*a+.2158037573*b)**3,m=(L-.1055613458*a-.0638541728*b)**3,s=(L-.0894841775*a-1.291485548*b)**3;
  const v=[4.0767416621*l-3.3077115913*m+.2309699292*s,-1.2684380046*l+2.6097574011*m-.3413193965*s,-.0041960863*l-.7034186147*m+1.707614701*s];
  return '#'+v.map(x => Math.round(clamp(x<=.0031308?12.92*x:1.055*x**(1/2.4)-.055)*255).toString(16).padStart(2,'0')).join('');
}
const de=(a,b)=>Math.hypot(...lab(flatten(a)).map((x,i)=>(x-lab(flatten(b))[i])*100));
function interpolate(a,b,f){
  const x=lab(a),y=lab(b),h1=Math.atan2(x[2],x[1]),h2=Math.atan2(y[2],y[1]);
  let turn=h2-h1; if(turn>Math.PI)turn-=2*Math.PI; if(turn< -Math.PI)turn+=2*Math.PI;
  const L=x[0]+(y[0]-x[0])*f,C=Math.hypot(x[1],x[2])+(Math.hypot(y[1],y[2])-Math.hypot(x[1],x[2]))*f,h=h1+turn*f;
  return rgb([L,C*Math.cos(h),C*Math.sin(h)]);
}
const relative=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>{const x=relative(a),y=relative(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const counts={};
for(const theme of ['light','dark']) for(const [name,v] of Object.entries(snapshot[theme])) {
  if(!/^#[\da-f]{6}$/.test(v)) continue;
  const candidates=tones.filter(t=>hexes[t].includes(v));
  const semantic=candidates.find(t=>name.includes(`-${t}-`)) ?? candidates.find(t=>t==='gray') ?? candidates[0];
  if(semantic) counts[`${semantic}:${v}`]=(counts[`${semantic}:${v}`]??0)+1;
}
const scales={};
const scaleTones=['gray','brand','danger','success','warning'];
const accentTones=['orange','purple','blue','teal','lime','pink','yellow'];
for(const tone of scaleTones){
  let values=hexes[tone].filter(v=>v!=='#ffffff'&&v!=='#000000');
  if(tone==='gray') values=values.filter(v=>Math.hypot(...lab(v).slice(1))<.075&&!Object.entries(hexes).some(([t,list])=>t!=='gray'&&list.includes(v)));
  const ranked=values.toSorted((a,b)=>(counts[`${tone}:${b}`]??0)-(counts[`${tone}:${a}`]??0));
  let selected=ranked.slice(0,11);
  if(tone==='brand'&&!selected.includes('#153565'))selected[selected.length-1]='#153565';
  selected=[...new Set(selected)].sort((a,b)=>lab(b)[0]-lab(a)[0]);
  if(selected.length<11){
    const first=selected[0],last=selected.at(-1);
    selected=steps.map((_,i)=>{
      const j=Math.round(i*(selected.length-1)/10);
      return i===0?first:i===10?last:interpolate(first,last,i/10);
    });
  }
  scales[tone]=selected.map((hex,i)=>({step:steps[i],hex,source:values.includes(hex)?'anclado':'interpolado',uses:counts[`${tone}:${hex}`]??0}));
  if(scales[tone].some((s,i)=>i&&lab(s.hex)[0]>=lab(scales[tone][i-1].hex)[0]))throw new Error(`Escala ${tone} no monótona`);
}
const accents=Object.fromEntries(accentTones.map(t=>[t,hexes[t].toSorted((a,b)=>lab(b)[0]-lab(a)[0]).map((hex,i,arr)=>({step:steps[Math.round((1-lab(hex)[0])*10)],hex,source:'exacto'}))]));
const overlays=Object.fromEntries(Object.values(primitives).filter(v=>v.startsWith('rgba(')).map(v=>{
  const [r,g,b,a]=v.match(/[\d.]+/g).map(Number);
  const family=r===0&&g===0&&b===0?'black':r===255&&g===255&&b===255?'white':'danger';
  return [`--color-primitive-${family}-alpha-${String(Math.round(a*100)).padStart(2,'0')}`,v];
}));
const extraAnchors={};
function assignment(name,v){
  if(v==='#ffffff'||v==='#000000')return {tone:'global',step:null,token:`--color-primitive-${v==='#ffffff'?'white':'black'}`,after:v,deltaE:0};
  if(name.includes('secondary')&&hexes.secondary?.includes(v))return {tone:'secondary',step:null,token:`--color-primitive-secondary-exact-${v.slice(1)}`,after:v,deltaE:0};
  if(name==='--color-background-canvas')return {tone:'gray',step:null,token:`--color-primitive-gray-exact-${v.slice(1)}`,after:v,deltaE:0};
  if(v.startsWith('rgba('))return {tone:'overlay',step:null,token:Object.keys(overlays).find(k=>overlays[k]===v),after:v,deltaE:0};
  const accent=accentTones.find(t=>accents[t].some(x=>x.hex===v));
  if(accent){const entry=accents[accent].find(x=>x.hex===v);return {tone:accent,step:entry.step,token:`--color-primitive-${accent}-${entry.step}`,after:v,deltaE:0};}
  const matches=scaleTones.filter(t=>hexes[t].includes(v));
  const tone=matches.find(t=>name.includes(`-${t}-`))??matches.find(t=>t==='gray')??matches[0];
  if(!tone)return null;
  const nearest=scales[tone].toSorted((a,b)=>de(v,a.hex)-de(v,b.hex))[0];
  const cap=/(selected|link-)/.test(name)?2:3;
  if(de(v,nearest.hex)>cap){
    const token=`--color-primitive-${tone}-exact-${v.slice(1)}`;extraAnchors[token]=v;
    return {tone,step:null,token,after:v,deltaE:0,reason:'ancla exacta: supera límite ΔE'};
  }
  return {tone,step:nearest.step,token:`--color-primitive-${tone}-${nearest.step}`,after:nearest.hex,deltaE:+de(v,nearest.hex).toFixed(2)};
}
const roles={};
for(const theme of ['light','dark']) roles[theme]=Object.entries(snapshot[theme]).flatMap(([name,before])=>{
  if(!/^#[\da-f]{6}$/.test(before)&&!before.startsWith('rgba('))return [];
  const a=assignment(name,before); if(!a)return [];
  const kind=/--color-(text|icon|border)-/.exec(name)?.[1];
  let backgrounds=kind?Object.fromEntries(['base','canvas'].map(bg=>{
    const bgName=`--color-background-${bg}`,old=snapshot[theme][bgName],next=assignment(bgName,old)?.after??old;
    return [bg,{before:+contrast(before,old).toFixed(2),after:+contrast(a.after,next).toFixed(2)}];
  })):undefined;
  if(backgrounds&&a.deltaE>0&&Object.values(backgrounds).some(c=>c.after<(kind==='text'?4.5:3))){
    a.after=before;a.deltaE=0;a.step=null;a.token=`--color-primitive-${a.tone}-exact-${before.slice(1)}`;
    extraAnchors[a.token]=before;a.reason='ancla exacta: conserva contraste previo';
    backgrounds=Object.fromEntries(Object.entries(backgrounds).map(([k,c])=>[k,{before:c.before,after:c.before}]));
  }
  return [{name,before,...a,...(backgrounds?{contrast:backgrounds}:{})}];
}).sort((a,b)=>b.deltaE-a.deltaE||a.name.localeCompare(b.name));
const report={method:'ΔE euclidiano en OKLab × 100; interpolación en OKLCH por arco de tono más corto; contraste WCAG 2',steps,scales,accents,overlays,globals:{'--color-primitive-white':'#ffffff','--color-primitive-black':'#000000'},extraAnchors,roles};
writeFileSync(resolve(folder,'n0b-propuesta.json'),JSON.stringify(report,null,2)+'\n');
const all=[...roles.light,...roles.dark],changed=all.filter(r=>r.before!==r.after);
const low=r=>r.contrast&&Object.values(r.contrast).some(c=>c.after<(r.name.includes('-text-')?4.5:3));
const debt=all.filter(r=>r.deltaE===0&&low(r)),flagged=all.filter(r=>r.deltaE>3||(r.deltaE>0&&low(r)));
const lines=['¿Qué cambia al consolidar las escalas sin mover categorías de datos?','','## En 30 segundos',`La propuesta cambia ${changed.length} de ${all.length} instancias de rol en claro y oscuro. ΔE máximo ${Math.max(...all.map(r=>r.deltaE)).toFixed(2)}; promedio ${((all.reduce((s,r)=>s+r.deltaE,0))/all.length).toFixed(2)}.`,`Acentos y overlays conservan valores exactos. ${Object.keys(extraAnchors).length} valores quedan como anclas exactas fuera de escala para respetar los límites; tokens.css sigue intacto.`,'','## Escalas propuestas'];
lines.push('| Paso | Hex por tono | Origen por tono |','|---|---|---|');
for(let i=0;i<steps.length;i++)lines.push(`| ${steps[i]} | ${scaleTones.map(t=>`${t}: ${scales[t][i].hex}`).join('<br>')} | ${scaleTones.map(t=>`${t}: ${scales[t][i].source}`).join('<br>')} |`);
lines.push('','## Valores exactos y revisión',`Acentos: ${accentTones.map(t=>`${t} (${accents[t].map(x=>`${x.step} ${x.hex}`).join(', ')})`).join('; ')}.`,`Overlays: ${Object.entries(overlays).map(([k,v])=>`${k} ${v}`).join('; ')}. Blanco y negro: --color-primitive-white y --color-primitive-black.`,`Anclas fuera de escala: ${Object.entries(extraAnchors).map(([k,v])=>`${k} ${v}`).join('; ')||'ninguna'}.`,`Método: ΔE euclidiano OKLab × 100; interpolación OKLCH. Contraste WCAG contra base y canvas. ${flagged.length} instancias a revisar. Detalle en [JSON](n0b-propuesta.json) y [comparación](n0b-comparacion.html).`);
for(const theme of ['light','dark']){
  const items=flagged.filter(r=>roles[theme].includes(r));
  lines.push(`### Tema ${theme==='light'?'claro':'oscuro'} (${items.length})`);
  for(let i=0;i<items.length;i+=8)lines.push('- '+items.slice(i,i+8).map(r=>`${r.name} (ΔE ${r.deltaE}${r.contrast?`, mín. ${Math.min(...Object.values(r.contrast).map(c=>c.after)).toFixed(2)}:1`:''})`).join('; ')+'.');
}
lines.push('','## Deuda de contraste previa (Nivel 1)',`Estos ${debt.length} casos ya tenían bajo contraste y mantienen ΔE 0: ${debt.map(r=>`${r.name} (${roles.light.includes(r)?'claro':'oscuro'}, mín. ${Math.min(...Object.values(r.contrast).map(c=>c.after)).toFixed(2)}:1)`).join('; ')}. No se corrigen en 0b-1.`,'','## Pregunta de comprobación','¿Por qué las anclas exactas quedan fuera de la escala?','','## Listo 0b-1 v2');
writeFileSync(resolve(folder,'n0b-propuesta.md'),lines.join('\n')+'\n');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const sections=['light','dark'].map(theme=>`<section><h2>${theme==='light'?'Tema claro':'Tema oscuro'}</h2>${roles[theme].map(r=>`<article><h3>${esc(r.name)} · ΔE ${r.deltaE}</h3><div class="pair"><div style="background:${r.before}"><span>Antes<br>${r.before}</span></div><div style="background:${r.after}"><span>Después<br>${r.after}</span></div></div></article>`).join('')}</section>`).join('');
writeFileSync(resolve(folder,'n0b-comparacion.html'),`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Consolidación de color 0b-1</title><style>body{font:16px system-ui;max-width:1100px;margin:auto;padding:24px;background:#f5f5f5;color:#101828}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px}h2{grid-column:1/-1}article{background:white;padding:12px;border-radius:8px}h3{font-size:13px;overflow-wrap:anywhere}.pair{display:flex}.pair div{flex:1;min-height:80px;display:grid;place-items:center}.pair span{background:#fff;color:#111;padding:4px;text-align:center;font-size:12px}</style><h1>Comparación de roles · 0b-1</h1><p>Orden descendente por ΔE OKLab × 100. Las muestras opacas muestran el color del rol.</p>${sections}</html>\n`);
console.log(`Generados: ${all.length} roles, ${changed.length} cambian, ${flagged.length} señalados; ${lines.length} líneas MD`);
