## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. Distributed consensus will not be addressed for this project.

Instead, the aim of this project is to incorporate Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

In addition to the centralized design, this project has several security flaws (the most obvious one being the requirement of a user to enter their private key). In reality, a user's private key would be stored within their hot-wallet or hard-wallet and be used to sign transactions which then leave the wallet/device. The signature can then be used on the server-side to derive the public key & eth address and then to verify the ownership of the wallet.
