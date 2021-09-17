const inquirer = require('inquirer');
const NodeRSA = require('node-rsa');
const fs = require('fs-extra');

//Instructions
//Note: You must have Node 8 or later installed locally. Note: Your commit must contain only 1 file. Verify that you did not change any existing code before making your PR.

//fork this repo
//git clone your fork url
//Enter the project and run npm install && git checkout -b mysticker
//npm run address and enter your address carefully.
//Copy the encrypted address to a new file in /stickers/<your-github-username>.txt
//git add . && git commit -m <your-message>
//git push origin mysticker
//Open new pull request on Github
//Wait 1 to 2 weeks for the sticker 💌
//Pro Tip: Follow me on Github to get early access to new projects on AngularFirebase.com before they become videos.

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
