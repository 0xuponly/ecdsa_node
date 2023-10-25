const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xf4a7a33878927d988681c9ccafa82e4d9f59e49f": 100, //a
  "0x51ed7232d8222de585ad6b0a2aa0360c610758d9": 50, //b
  "0x29e6b445ca08a3d61b56afcf7ea428f69d58a017": 75, //c
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  // Verify the signature and recover the public address
  const message = "Hello, world!";
  const messageBytes = Buffer.from(message, 'utf8');
  const publicKey = secp.recoverPublicKey(messageBytes, signature);
  const address = '0x' + toHex(publicKey).slice(-40);

  if (address !== sender) {
    res.status(400).send({ message: "Invalid signature!" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}