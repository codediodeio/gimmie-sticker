const NodeRSA = require('node-rsa');
const fs = require('fs-extra');

const main = async () => {
  const keyData = await fs.readFile('private.txt', 'utf8');
  const test = await fs.readFile('test.txt', 'utf8');

  const key = NodeRSA();
  key.importKey(keyData);

  const decrypted = key.decrypt(test, 'utf8');

  console.log(decrypted);
};

main();
