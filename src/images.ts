import { items, type Item } from './data'

// Generated artwork (SVG data URIs) so the site works offline. Set `img` on an item in data.ts to use a real photo.
const pal: Record<string, [string, string, string, string, string]> = {
  Starters: ['#E7F0E2', '#86AB6F', '#F3D87A', '#3E6B3A', '#DDEBD3'],
  Mains: ['#F3E8DC', '#B8643B', '#6B3B22', '#86AB6F', '#F1DFC8'],
  Pizza: ['#F6E4C8', '#D9482B', '#F2C14E', '#2F6B3A', '#F8E7C4'],
  Desserts: ['#F6E5EA', '#4A2618', '#E58FA6', '#F7F0E6', '#F6DCE3'],
  Drinks: ['#E0F0EE', '#E8A33A', '#FFF6D8', '#4C9A7C', '#D4EBE6'],
}
const rng = (s: number) => { let a = s * 9301 + 49297; return () => { a = (a * 1103515245 + 12345) & 0x7fffffff; return a / 0x7fffffff } }
const uri = (svg: string) => 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)

function plate(i: Item): string {
  const [tint, base, mid, garn] = pal[i.cat]
  const r = rng(i.id + 3)
  const blob = (R: number, j: number) => {
    let d = ''
    for (let k = 0; k < 22; k++) { const a = (k / 22) * 6.2832, rr = R * (1 - j + r() * j * 2); d += `${k ? 'L' : 'M'}${(100 + Math.cos(a) * rr).toFixed(1)} ${(100 + Math.sin(a) * rr).toFixed(1)}` }
    return d + 'Z'
  }
  const dots = Array.from({ length: 18 }, () => { const a = r() * 6.2832, d = r() * 50; return { x: 100 + Math.cos(a) * d, y: 100 + Math.sin(a) * d, s: 2 + r() * 4.5, c: r() > 0.5 ? mid : garn, rot: r() * 180 } })
  const b1 = blob(52, 0.1), b2 = blob(33, 0.16)
  let out = `<ellipse cx="102" cy="110" rx="92" ry="88" fill="#1A1208" opacity=".22"/><circle cx="100" cy="100" r="92" fill="#fff"/><circle cx="100" cy="100" r="80" fill="${tint}" stroke="#E4E0D6" stroke-width="1.5"/>`
  if (i.cat === 'Drinks') {
    out += `<circle cx="100" cy="100" r="64" fill="${base}" opacity=".9"/><circle cx="100" cy="100" r="52" fill="${mid}" opacity=".4"/>`
    out += dots.map(d => `<circle cx="${d.x}" cy="${d.y}" r="${d.s * 0.8}" fill="#fff" opacity=".6"/>`).join('')
    out += `<circle cx="128" cy="76" r="17" fill="${garn}" opacity=".85"/><circle cx="128" cy="76" r="12" fill="#F6E58D"/>`
  } else if (i.cat === 'Pizza') {
    out += `<circle cx="100" cy="100" r="68" fill="#E3B063"/><circle cx="100" cy="100" r="58" fill="${base}"/><path d="${b1}" fill="${mid}" stroke="${mid}" stroke-width="9" stroke-linejoin="round" opacity=".92"/>`
    out += dots.map(d => `<ellipse cx="${d.x}" cy="${d.y}" rx="${d.s * 1.5}" ry="${d.s}" fill="${garn}" transform="rotate(${d.rot} ${d.x} ${d.y})"/>`).join('')
  } else {
    out += `<path d="${b1}" fill="${base}" stroke="${base}" stroke-width="9" stroke-linejoin="round"/><path d="${b2}" fill="${mid}" stroke="${mid}" stroke-width="7" stroke-linejoin="round" opacity=".9"/>`
    out += dots.map(d => `<ellipse cx="${d.x}" cy="${d.y}" rx="${d.s * 1.4}" ry="${d.s}" fill="${d.c}" transform="rotate(${d.rot} ${d.x} ${d.y})"/>`).join('')
  }
  return out
}

function scene(inner: string, w: number, h: number, s: number, c1: string, c2: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><radialGradient id="g" cx=".5" cy=".4" r=".85"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><g transform="translate(${(w - 200 * s) / 2} ${(h - 200 * s) / 2}) scale(${s})">${inner}</g></svg>`
}

const cache = new Map<string, string>()
const memo = (k: string, f: () => string) => { if (!cache.has(k)) cache.set(k, f()); return cache.get(k)! }

export const dishImg = (i: Item, w = 400, h = 300): string => i.img ?? memo(`d${i.id}${w}`, () => uri(scene(plate(i), w, h, Math.min(w, h) / 230, '#FFFFFF', pal[i.cat][4])))
export const catImg = (cat: string): string => memo('c' + cat, () => { const i = items.find(x => x.cat === cat)!; return uri(scene(plate(i), 400, 400, 1.35, '#3D2B14', '#1A1208')) })
export const heroImg = (i: Item): string => memo('h', () => uri(scene(plate(i), 800, 600, 2.3, '#4A3318', '#1A1208')))
export const avatar = (name: string, color: string): string => uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="${color}"/><circle cx="150" cy="82" r="38" fill="#FAF6EF" opacity=".9"/><path d="M70 200c0-45 36-72 80-72s80 27 80 72z" fill="#FAF6EF" opacity=".9"/><text x="150" y="96" text-anchor="middle" font-family="Georgia,serif" font-size="40" font-weight="700" fill="${color}">${name.split(' ').map(w => w[0]).join('')}</text></svg>`)
