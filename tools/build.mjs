import {build} from 'esbuild';
import {cp,mkdir,readFile,readdir,rm,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {paperTitle,authors} from '../src/authors.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'dist');
// Only generated files in this project's exact dist directory are replaced.
if(path.dirname(output)!==root||path.basename(output)!=='dist')throw new Error('Invalid output directory');
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
await cp(path.join(root,'public'),output,{recursive:true});
await build({entryPoints:[path.join(root,'src/main.jsx')],bundle:true,minify:true,format:'esm',jsx:'automatic',target:['es2020'],outfile:path.join(output,'assets/site.js'),legalComments:'external',define:{'process.env.NODE_ENV':'"production"'},logLevel:'info'});

const repo=process.env.GITHUB_REPOSITORY;
const config=JSON.parse(await readFile(path.join(root,'site.config.json'),'utf8'));
let siteURL=process.env.SITE_URL||'';
if(!siteURL&&repo){const [owner,name]=repo.split('/');if(owner&&name){const projectPath=name.toLowerCase()===`${owner.toLowerCase()}.github.io`?'':`${name}/`;siteURL=`https://${owner.toLowerCase()}.github.io/${projectPath}`;}}
if(!siteURL)siteURL=config.siteUrl||'';
if(siteURL){const url=new URL(siteURL);if(!['https:','http:'].includes(url.protocol))throw new Error('SITE_URL must use HTTPS or HTTP');siteURL=url.href.replace(/\/?$/,'/');}
const escape=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const description='InstAgent coordinates heterogeneous robots through executable behavior trees, shared observations and recursively improved procedural experience.';
const structured={'@context':'https://schema.org','@type':'ScholarlyArticle',headline:paperTitle,description,author:authors.map(a=>({'@type':'Person',name:a.name,affiliation:a.aff.split(',').filter(x=>x==='1'||x==='2').map(x=>({'@type':'Organization',name:x==='1'?'ShanghaiTech University':'InstAdapt'}))})),inLanguage:'en'};
if(siteURL)structured.url=siteURL;
const canonical=siteURL?`<link rel="canonical" href="${escape(siteURL)}"><meta property="og:url" content="${escape(siteURL)}"><meta property="og:image" content="${escape(new URL('assets/demo-poster.jpg',siteURL).href)}">`:'';
await writeFile(path.join(output,'index.html'),`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0b1020"><title>${escape(paperTitle)}</title><meta name="description" content="${escape(description)}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(paperTitle)}"><meta property="og:description" content="${escape(description)}"><meta name="twitter:card" content="summary_large_image">${canonical}<link rel="icon" href="./favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="./assets/fonts/fonts.css"><link rel="stylesheet" href="./assets/site.css"><script type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script><script type="module" src="./assets/site.js"></script></head><body><div id="root"></div><noscript><main style="max-width:800px;margin:60px auto;padding:24px;font-family:sans-serif"><h1>${escape(paperTitle)}</h1><p>${escape(description)}</p><p>${authors.map(a=>escape(a.name)).join(', ')}</p><p>ShanghaiTech University · InstAdapt</p><a href="./assets/InstAgent-paper.pdf">Read the paper</a> · <a href="./assets/demo.mp4">Watch the demonstration</a> · <a href="./assets/transcript.html">Read the transcript</a><p>Enable JavaScript to explore the interactive mechanisms and experiment charts.</p></main></noscript></body></html>`);
await mkdir(path.join(output,'licenses'),{recursive:true});
await cp(path.join(root,'licenses'),path.join(output,'licenses'),{recursive:true});
const dependencyLicenses=[];
for(const name of ['react','react-dom','ogl','lucide-react']){const dir=path.join(root,'node_modules',name);for(const filename of (await readdir(dir)).filter(f=>/^licen[sc]e(?:\.|$)/i.test(f))){dependencyLicenses.push(`## ${name}\n\n${await readFile(path.join(dir,filename),'utf8')}`);}}
await writeFile(path.join(output,'licenses/DEPENDENCIES.txt'),dependencyLicenses.join('\n\n'));
if(siteURL){await writeFile(path.join(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml',siteURL).href}\n`);await writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteURL)}</loc></url></urlset>`);}
console.log('Built standalone InstAgent website → dist/');
console.log(siteURL?`Configured publication URL (not a deployment confirmation): ${siteURL}`:'No public URL configured. Local preview build.');
