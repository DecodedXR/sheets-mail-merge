// Self-check for Drive link parsing: node test.js
const vm = require('vm'), fs = require('fs'), assert = require('assert');
const ctx = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), ctx);
const id1 = '1AbCdEfGhIjKlMnOpQrStUvWxYz012345', id2 = '1ZyXwVuTsRqPoNmLkJiHgFeDcBa_-9876';
assert.deepEqual([...ctx.driveIds_(`https://drive.google.com/file/d/${id1}/view?usp=sharing, https://docs.google.com/document/d/${id2}/edit`)], [id1, id2]);
assert.deepEqual([...ctx.driveIds_(`https://drive.google.com/open?id=${id1}`)], [id1]);
assert.deepEqual([...ctx.driveIds_('')], []);

// Site check: every guide has a title and description, is listed on the index, and its internal links resolve
const pages = fs.readdirSync(__dirname).filter(f => f.endsWith('.md') && f !== 'README.md' && f !== 'index.md');
const read = f => fs.readFileSync(__dirname + '/' + f, 'utf8');
for (const f of pages) {
  const md = read(f);
  assert.match(md, /^---\r?\ntitle: .+\r?\ndescription: .+[\s\S]*?\r?\n---\r?\n/, f + ': missing title/description');
  assert.equal(md.split('{% raw %}').length, md.split('{% endraw %}').length, f + ': unbalanced {% raw %}'); // {{placeholders}} need raw
  assert.ok(read('index.md').includes('(' + f.replace(/\.md$/, '.html') + ')'), f + ': not linked from index.md');
}
// ponytail: catches [text](page.html), ./page.html, #anchors and absolute links to this site; reference-style links aren't used here
for (const f of [...pages, 'index.md'])
  for (const [, page] of read(f).matchAll(/\]\((?:\.\/|https:\/\/decodedxr\.github\.io\/sheets-mail-merge\/)?([\w-]+)\.html[#)" ]/g))
    assert.ok(page === 'index' || pages.includes(page + '.md'), f + ': broken link ' + page + '.html');
console.log('ok');
