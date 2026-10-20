// Self-check for Drive link parsing: node test.js
const vm = require('vm'), fs = require('fs'), assert = require('assert');
const ctx = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), ctx);
const id1 = '1AbCdEfGhIjKlMnOpQrStUvWxYz012345', id2 = '1ZyXwVuTsRqPoNmLkJiHgFeDcBa_-9876';
assert.deepEqual([...ctx.driveIds_(`https://drive.google.com/file/d/${id1}/view?usp=sharing, https://docs.google.com/document/d/${id2}/edit`)], [id1, id2]);
assert.deepEqual([...ctx.driveIds_(`https://drive.google.com/open?id=${id1}`)], [id1]);
assert.deepEqual([...ctx.driveIds_('')], []);
console.log('ok');
