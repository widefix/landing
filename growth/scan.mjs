#!/usr/bin/env node
// Dependency-free, read-only public SEO snapshot. No LLM calls, secrets or writes to the site.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const config = JSON.parse(await readFile(new URL('./config.json', import.meta.url)));
const base = new URL(config.site);
const maxPages = Math.min(config.maxPages || 150, 300);
const timeout = config.timeoutMs || 12000;
const fetchText = async (url) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(timeout), headers: { 'User-Agent': 'WideFixGrowthAudit/0.1 (+https://widefix.com)' } });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${url}`);
  return response.text();
};
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const sitemap = await fetchText(config.sitemap);
const locs = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map(x => decode(x[1].trim()));
const urls = [...new Set(locs)].filter(url => { try { const u = new URL(url); return u.origin === base.origin && /^https?:$/.test(u.protocol); } catch { return false; } }).slice(0,maxPages);
const results = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    try {
      const html = await fetchText(url);
      const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '');
      const description = decode(html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)/i)?.[1] || html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1] || '');
      const h1Count = [...html.matchAll(/<h1(?:\s[^>]*)?>/gi)].length;
      const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)/i)?.[1] || html.match(/<link\s+[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i)?.[1] || null;
      const noindex = /<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
      const issues = [];
      if (!title) issues.push('missing_title');
      if (!description) issues.push('missing_description');
      if (h1Count !== 1) issues.push('h1_count_' + h1Count);
      if (!canonical) issues.push('missing_canonical');
      if (noindex) issues.push('noindex');
      results.push({url,title,description,h1Count,canonical,noindex,issues});
    } catch (error) { results.push({url,error:String(error),issues:['fetch_error']}); }
  }
}
await Promise.all(Array.from({length:Math.min(config.concurrency || 3,5)},worker));
results.sort((a,b)=>a.url.localeCompare(b.url));
const report = {generatedAt:new Date().toISOString(),site:config.site,discoveredUrls:locs.length,scannedUrls:results.length,issueCounts:{},pages:results};
for(const page of results) for(const issue of page.issues) report.issueCounts[issue]=(report.issueCounts[issue]||0)+1;
await mkdir('growth/reports',{recursive:true});
const output='growth/reports/latest.json';
await writeFile(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({output,scanned:report.scannedUrls,issueCounts:report.issueCounts},null,2));
if(!urls.length) { console.error('No same-origin page URLs in sitemap; audit incomplete.'); process.exitCode=1; }
