// You might need to use node v16.0.0 (nvm use 16.0.0) when running this
// This is because node made a change and a flag is required in the fetch command, and the ipfs-http-client hasn't made an update
// So only older versions of node will work.
// You can do this with `nvm use 16.0.0`

// deployUP.js

import Web3 from "web3";
const web3 = new Web3("https://rpc.testnet.lukso.network");
import { LSPFactory } from "@lukso/lsp-factory.js";
import dotenv from "dotenv/config";
import fs from "fs";
console.log("running deployUP.js");

async function createUniversalProfile(lsp3Profile) {
  console.log("running deployUP.js");
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
