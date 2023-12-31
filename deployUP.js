// deployUP.js
import Web3 from "web3";
const web3 = new Web3("https://rpc.testnet.lukso.network");
import { LSPFactory } from "@lukso/lsp-factory.js";
import dotenv from "dotenv/config";
import fs from "fs";
// console.log("running deployUP.js");

async function createUniversalProfile() {
  const lsp3Profile = JSON.parse(process.env.LSP3_PROFILE);
  console.log("running deployUP with: ", lsp3Profile);
  const PRIVATE_KEY = process.env.MY_PRIVATE_KEY;
  const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
  console.log("myEOA: ", myEOA);
  // const lsp3Profile = fs.readFileSync("lsp3Profile.json", "utf8");

  const lspFactory = new LSPFactory("https://rpc.testnet.lukso.network/", {
    deployKey: PRIVATE_KEY,
    chainId: 4201, // LUKSO Testnet
  });

  console.log("creating Universal Profile...");
  const deployedContracts = await lspFactory.UniversalProfile.deploy({
    controllerAddresses: [myEOA.address],
    lsp3Profile: lsp3Profile,
  });
  console.log("ran create Universal Profile...");

  const myUPAddress = deployedContracts.LSP0ERC725Account.address;
  console.log("my Universal Profile address: ", myUPAddress);
  // Now we can add this UP address to our .env file

  return myUPAddress;
}

export { createUniversalProfile };
