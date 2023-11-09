// fetch-owned-assets.js
// Imports
import { ERC725 } from "@erc725/erc725.js";
import Web3 from "web3";
import { readFileSync } from "fs";
import { join, dirname } from "path";
const __dirname = dirname(new URL(import.meta.url).pathname);
// Construct the path directly
const jsonFilePath = join(
  process.cwd(),
  "node_modules",
  "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json"
);
const jsonContent = readFileSync(jsonFilePath, "utf-8");
const erc725schema = JSON.parse(jsonContent);
// Now you can use erc725schema as needed

// Static variables
const RPC_ENDPOINT = "https://rpc.testnet.lukso.gateway.fm";
const IPFS_GATEWAY = "https://api.universalprofile.cloud/ipfs";
const SAMPLE_PROFILE_ADDRESS = "0x3F0350EaFc25Cc9185a77394B7E2440ec002e466";
// const SAMPLE_PROFILE_ADDRESS1 = "0x3F0350EaFc25Cc9185a77394B7E2440ec002e466";

// Parameters for the ERC725 instance
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };

/*
 * Fetch the LSP5 data of the Universal Profile
 * to get its ever received assets
 *
 * @param address of the Universal Profile
 * @return address[] of received assets or custom error
 */
async function fetchOwnedAssets(address) {
  try {
    const profile = new ERC725(erc725schema, address, provider, config);
    const result = await profile.fetchData("LSP5ReceivedAssets[]");
    return result.value;
  } catch (error) {
    return console.log("This is not an ERC725 Contract: ", error);
  }
}

// Debug
// fetchOwnedAssets(SAMPLE_PROFILE_ADDRESS).then((ownedAssets) =>
//   console.log(JSON.stringify(ownedAssets, undefined, 2))
// );

export { fetchOwnedAssets };
