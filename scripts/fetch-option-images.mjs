/**
 * One-shot: downloads the Baltresto option thumbnails into the repo so the
 * configurator doesn't hotlink. Safe to re-run (skips files that exist).
 *
 *   node scripts/fetch-option-images.mjs
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const U = 'https://baltresto.com/wp-content/uploads/';
const IMAGES = {
  'spruce.jpg': '2018/07/photo-spruce.jpg',
  'thermowood.jpg': '2018/07/photo-thermo.jpg',
  'electric-standard.jpg': '2023/05/top-steel.jpg',
  'electric-smart.jpg': '2019/06/huum-drop-and-controller.jpg',
  'wood-fired.jpg': '2023/05/harvia-m3-kamin.jpg',
  'd2.jpg': '2023/05/O2m.jpg',
  'd22.jpg': '2023/05/O2-2m.jpg',
  'roof-brown.jpg': '2019/06/colors-2.jpg',
  'roof-black.jpg': '2019/06/colors-1.jpg',
  'roof-green.jpg': '2019/06/colors-3.jpg',
  'fw-2-fixed.jpg': '2023/05/Front-non-openable-windows-2.jpg',
  'fw-2-open.jpg': '2023/05/Front-openable-windows-2.jpg',
  'fw-glass-wall.webp': '2024/11/photo-2.4m-for-4-persons-outdoor-sauna-with-outside-seats-s2v-glass.webp',
  'bw-2-fixed.jpg': '2023/05/Back-non-openable-windows-2.jpg',
  'bw-2-open.jpg': '2023/05/Back-openable-windows-2.jpg',
  'filter-set.jpg': '2022/01/heaters-and-filter-with-box-3.jpg',
  'insulated-cover.jpg': '2023/05/recommended-accessories-4.jpg',
  'chiller-pro.webp': '2022/01/chiller-7kw-new-216.webp',
  'stairs-classic.jpg': '2023/05/photo-3-stairs-216.jpg',
  'stairs-lux.jpg': '2023/05/photo-2-stairs-216.jpg',
  'bubble-system.jpg': '2023/05/bubble-and-hdr-1.jpg',
  'hydromassage.jpg': '2023/05/bubble-and-hdr-2.jpg',
  'bubble-hydro.jpg': '2023/05/bubble-and-hdr-3.jpg',
  'led-1.jpg': '2023/05/photo-leds-1.jpg',
  'led-2.jpg': '2023/05/photo-leds-2.jpg',
  'led-8.jpg': '2023/05/photo-leds-3.jpg',
};

const dir = path.join(process.cwd(), 'public', 'images', 'options');
await mkdir(dir, { recursive: true });

let ok = 0, skipped = 0, failed = 0;
for (const [file, remote] of Object.entries(IMAGES)) {
  const dest = path.join(dir, file);
  try {
    await access(dest);
    skipped++;
    continue;
  } catch {
    /* not there yet — download */
  }
  try {
    const res = await fetch(U + remote);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`✔ ${file}`);
    ok++;
  } catch (err) {
    console.error(`✘ ${file}: ${err.message}`);
    failed++;
  }
}
console.log(`\nDone — ${ok} downloaded, ${skipped} already present, ${failed} failed.`);
if (failed) process.exit(1);
