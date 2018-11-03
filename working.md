# Interested in how this project works?

> Suggestions and edits are welcome 👻

This project is built using `NodeJS`.

`Node` uses other packages also called `modules` available at repositories which can be installed via a command.

The default `package manager` is [`npm`](https://npmjs.com).

## The file structure used here is

```
keygen.js - Used to generate the public and private keys and export them as public.txt and private.txt files.
decrypt.js - As the name suggests it is used to decrypt the files using the public and private keys.
index.js - It is used to encrpyt the data. Remember how we entered our details and got out an encrypted string? This is the file that does that
```

## Working

### Generating public and private keys

> P.S. Executing this line would break the code. As in your encrypted text would be encrypted via a different key. Do on a separate branch and do NOT raise a PR!

> DO NOT EXECUTE IF YOU WANT A STICKER

`node keygen.js` 

This generates a new set of public and private keys at the root of the project called you guessed it - `public.txt` and `private.txt`.

### Encrypting

+ Have a look at `package.json` under the scripts section you can find `address`. Whenever you run `npm run address` it means run the command corresponding to the `address` script, which is `node index.js`.

+ Here we use the `inquirer` package to gather information and store it as `answers`.
+ We then read the `public.txt` file using the `fs` package and encrypt the `answers` using this public key.


### Decrypting

+ Have a look at `package.json` under the scripts section you can find `test`, which is `node decrypt.js`.

+ We read the `private.txt` file using the `fs` package and also the file you've written into. Please note currently its `test.txt`. This then reads the data and decrypts the encrypted string into your address.

I guess that is it.

Happy coding.