const { createPrivateKeySync, ecdsaSign, publicKeyCreate } = require('ethereum-cryptography/secp256k1-compat');
const { toHex } = require("ethereum-cryptography/utils");
const crypto = require('crypto');

const privateKey = createPrivateKeySync();
console.log("private key:", toHex(privateKey));

const publicKey = toHex(publicKeyCreate(privateKey));
console.log("public key :", publicKey);

const address = '0x' + publicKey.slice(-40)
console.log("address:", address);

/*
a
private key: ec5794953dc7356d1947e4c7963b17da1f66b71a840417772f54eb9956212434
public key : 02d88bba024c847310dc66a810f4a7a33878927d988681c9ccafa82e4d9f59e49f
address: 0xf4a7a33878927d988681c9ccafa82e4d9f59e49f

b
private key: e09fffe96f1792d1fa6c430696741ba025364bab91ae40e5e37f80e5649b0b52
public key : 0357ec78f0ac5857a98969b99351ed7232d8222de585ad6b0a2aa0360c610758d9
address: 0x51ed7232d8222de585ad6b0a2aa0360c610758d9

c
private key: 5540c22f81aebce238c33866a00fc18ff6c27a528860708e0f31f305d6340eeb
public key : 02f5b22fc8fc1a7a9be6b6d77d29e6b445ca08a3d61b56afcf7ea428f69d58a017
address: 0x29e6b445ca08a3d61b56afcf7ea428f69d58a017
*/