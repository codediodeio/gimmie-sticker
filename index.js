const inquirer = require('inquirer');
const NodeRSA = require('node-rsa');
const fs = require('fs-extra');

const main = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What's your name friend"
    },
    {
      type: 'input',
      name: 'street',
      message: 'Street address'
    },
    {
      type: 'input',
      name: 'street2',
      message: 'Suite or Apt # (optional)'
    },
    {
      type: 'input',
      name: 'city',
      message: 'City'
    },
    {
      type: 'input',
      name: 'state',
      message: 'State/Region'
    },
    {
      type: 'input',
      name: 'zip',
      message: 'Postal Code'
    },
    {
      type: 'input',
      name: 'country',
      message: 'Country'
    },
    {
      type: 'input',
      name: 'notes',
      message: 'Any special notes for me?'
    }
  ]);

  const keyData = await fs.readFile('public.txt', 'utf8');

  const key = NodeRSA();
  key.importKey(keyData);

  const encrypted = key.encrypt(answers, 'base64');
  console.log('------ copy below ------');
  console.log(encrypted);
  console.log('------ copy above ------');
  console.log(
    '😍 \x20 Copy the encrypted address to stickers/<your-github-username>.txt and send a pull request'
  );
};

main();
