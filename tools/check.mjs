import {readFile,readdir,stat} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist');
const required=['index.html','favicon.svg','.nojekyll','assets/site.js','assets/site.css','assets/demo.mp4','assets/demo-en.vtt','assets/InstAgent-paper.pdf','assets/brands/instadapt.svg','assets/brands/shanghaitech-red.svg','assets/transcript.html','assets/system.jpg','assets/architecture.png'];
for(const name of required)if(!existsSync(path.join(dist,name)))throw new Error(`Missing publication asset: ${name}`);
const files=[];async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(entry.isSymbolicLink())throw new Error(`Symlink in publication: ${entry.name}`);const p=path.join(dir,entry.name);if(entry.isDirectory())await walk(p);else files.push(p);}}await walk(dist);
let size=0;for(const file of files){const n=(await stat(file)).size;size+=n;if(n>=100*1024*1024)throw new Error(`File exceeds GitHub's regular Git limit: ${file}`);}
if(size>=1024**3)throw new Error('Site exceeds GitHub Pages size limit');
const js=await readFile(path.join(dist,'assets/site.js'),'utf8');
if(/\.\.\/assets\/|All design directions|Compare the directions|Preview 08|user-confirmed/.test(js))throw new Error('Preview-only content or parent-relative URLs remain in the site bundle');
const html=await readFile(path.join(dist,'index.html'),'utf8');if(!html.includes('ScholarlyArticle')||!html.includes('InstAgent'))throw new Error('Missing page metadata');
for(const match of js.matchAll(/\.\/assets\/[A-Za-z0-9_./-]+\.(?:svg|jpg|png|mp4|pdf|vtt|html)/g)){if(!existsSync(path.join(dist,match[0])))throw new Error(`Broken bundled asset reference: ${match[0]}`);}
const results=JSON.parse(await readFile(path.join(root,'src/results.json'),'utf8'));if(results.results.models.length!==3||results.results.models.some(m=>m.rows.length!==4))throw new Error('Unexpected results dataset');
console.log(`Publication check passed: ${files.length} files, ${(size/1024/1024).toFixed(2)} MiB. Relative paths support both user and project Pages sites.`);
