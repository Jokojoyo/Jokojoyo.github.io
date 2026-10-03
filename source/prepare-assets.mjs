import sharp from 'sharp';
import {mkdir,copyFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const collection=path.resolve(here,'../..');
await mkdir(path.join(here,'public'),{recursive:true});
const sources=[
 ['senja', 'output/senja-live.png', 'https://jokojoyo.github.io/senja-coffee/'],
 ['forma', 'output/forma-live.png', 'https://jokojoyo.github.io/forma-studio/'],
 ['loom', 'output/loom-live.png', 'https://jokojoyo.github.io/loom-store/'],
 ['flowdesk', 'output/flowdesk-live-desktop.jpg', 'https://jokojoyo.github.io/flowdesk/'],
 ['merchantboard', 'output/merchantboard-live.jpg', 'https://jokojoyo.github.io/merchantboard/'],
 ['imagekit', 'output/imagekit-live.jpg', 'https://jokojoyo.github.io/imagekit-studio/']
];
for(const [name,source,url] of sources){
 const from=path.join(collection,source);const meta=await sharp(from).metadata();
 const height=Math.min(meta.height,Math.round(meta.width*.52));
 const to=path.join(here,'public',`${name}-preview.webp`);
 await sharp(from).extract({left:0,top:0,width:meta.width-16,height}).resize({width:1440,withoutEnlargement:true}).webp({quality:88}).toFile(to);
 await writeFile(to+'.json',JSON.stringify({prompt:`Sourced asset, not AI-generated: existing project screenshot from ${source}. Website: ${url}. Top-viewport extraction and WebP conversion; original website pixels preserved.`,origin:`Existing project screenshot: ${source}. ${url}`,method:'Top-viewport extraction and WebP conversion; original website pixels preserved.',source},null,2));
}
for(const font of ['space-grotesk','manrope']) await copyFile(path.join(collection,'websites/flowdesk',font+'.woff2'),path.join(here,'public',font+'.woff2'));
console.log('Six genuine project previews and two self-hosted fonts prepared.');
