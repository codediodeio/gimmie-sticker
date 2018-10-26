const NodeRSA = require('node-rsa');
const fs = require('fs-extra');

const main = async () => {
  const key = new NodeRSA();
  key.generateKeyPair();
  await fs.outputFile('public.txt', key.exportKey('public'));
  await fs.outputFile('private.txt', key.exportKey('private'));
};

main();
