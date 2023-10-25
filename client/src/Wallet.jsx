import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1-compat';
import { toHex, hexToBytes } from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const newPrivateKey = evt.target.value;
    setPrivateKey(newPrivateKey);
    console.log("private key:", newPrivateKey);
    const privateKeyBytes = hexToBytes(newPrivateKey);
    //console.log("private key bytes:", privateKeyBytes);
    const publicKey = toHex(secp.publicKeyCreate(privateKeyBytes));
    console.log("public key :", publicKey);
    const newAddress = '0x' + publicKey.slice(-40);
    console.log("address:", newAddress);
    setAddress(newAddress);
    if (newAddress) {
      const {
        data: { balance },
      } = await server.get(`balance/${newAddress}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type in a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

/*
  async function onChange(evt) {
    const newPrivateKey = evt.target.value;
    setPrivateKey(newPrivateKey);
    console.log("private key:", newPrivateKey);
    const privateKeyBytes = hexToBytes(newPrivateKey);
    console.log("private key bytes:", privateKeyBytes);
    const publicKey = toHex(secp.publicKeyCreate(privateKeyBytes));
    console.log("public key :", publicKey);
    const newAddress = '0x' + publicKey.slice(-40);
    console.log("address:", newAddress);
    setAddress(newAddress);
    if (newAddress) {
      const {
        data: { balance },
      } = await server.get(`balance/${newAddress}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
*/