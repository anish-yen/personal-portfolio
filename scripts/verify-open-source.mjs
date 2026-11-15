import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source = readFileSync(new URL('../src/components/PortfolioWorld.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
const section = source.split('<section id="open-source"')[1]?.split('</section>')[0];
test('one accessible open source section', () => {
  assert.equal((source.match(/id="open-source"/g) || []).length, 1);
  assert.match(section, /aria-labelledby="oss-heading"/);
  assert.match(section, /id="oss-heading"/);
});
test('RQ points to the accepted upstream fix', () => {
  assert.match(section, /https:\/\/github.com\/rq\/rq\/pull\/2582/);
  assert.match(section, /CLIENT INFO/); assert.match(section, /CLIENT LIST/);
});
test('Pika points to the accepted upstream fix', () => {
  assert.match(section, /https:\/\/github.com\/pika\/pika\/pull\/1844/);
  assert.match(section, /TLS settings from shared parameters/);
});
test('both contributions state merged and regression coverage', () => {
  assert.equal((section.match(/<span>Merged<\/span>/g) || []).length, 2);
  assert.equal((section.match(/regression coverage/g) || []).length, 3);
});
test('original six animation chapters keep their order', () => {
  const chapters = [...source.matchAll(/<section className="chapter[^\"]*" id="([^\"]+)"/g)].map(m => m[1]);
  assert.deepEqual(chapters, ['hero','work','xp','cred','contact','studio']);
});
test('contribution cards cannot trigger project node handlers', () => {
  assert.equal((section.match(/className="oss-card"/g) || []).length, 2);
  assert.doesNotMatch(section, /className="proj/);
  assert.equal((source.match(/data-node="\d+"/g) || []).length, 11);
});
test('hero links directly to the new section', () => {
  assert.match(source, /href="#open-source">Open source<\/a>/);
});
test('responsive layout uses one column on mobile', () => {
  assert.match(css, /@media\(max-width:760px\).*\.oss-grid\{grid-template-columns:1fr\}/);
});

test('navigation includes Open Source between Projects and Experience', () => {
  const nav = source.split('<div className="tabs"')[1]?.split('</div>')[0];
  assert.match(nav, /href="#work"[^>]*>Projects<\/a>\s*<a className="tab" href="#open-source">Open Source<\/a>\s*<a className="tab" href="#xp"/);
});
test('navigation tracking is independent of the six animation chapters', () => {
  assert.match(source, /navSections = tabs.map/);
  assert.match(source, /active = idx;/);
  assert.match(source, /tab.classList.toggle\('active', i===selected\)/);
  assert.match(css, /\.tab\{flex-shrink:0;white-space:nowrap;/);
});
