const { Web3 } = require("web3");
const { Chain, Common, Hardfork } = require('@ethereumjs/common');
const { LegacyTransaction } = require('@ethereumjs/tx');
const { bytesToHex } = require('@ethereumjs/util');

async function main() {
  const web3 = new Web3("http://127.0.0.1:8545/");

  const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // import the Hardhat test account without the use of a wallet
  const sender = web3.eth.accounts.privateKeyToAccount(privateKey);
  const receiver = web3.eth.accounts.create();

  const txParams = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x2710',
    to: '0x0000000000000000000000000000000000000000',
    value: '0x00',
    data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
  }

  const common = new Common({ chain: Chain.Mainnet, hardfork: Hardfork.Istanbul })
  const tx = LegacyTransaction.fromTxData(txParams, { common })
  console.log("tx", tx)
  console.log("tx", tx.serialize())

  const signedTx = tx.sign(Buffer.from(privateKey.substring(2, privateKey.length), 'hex'))
  console.log("signedTx", signedTx)
  console.log("signedTx", signedTx.serialize())
}

main();