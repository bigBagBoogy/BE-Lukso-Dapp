import { ERC725 } from "@erc725/erc725.js";
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
const lsp3ProfileSchema = JSON.parse(jsonContent);
// Now you can use erc725schema as needed

async function fetchProfile(address) {
  // address = '0x9139def55c73c12bcda9c44f12326686e3948634'
  // Initatiate erc725.js
  const erc725js = new ERC725(
    lsp3ProfileSchema,
    address,
    "https://rpc.testnet.lukso.gateway.fm",
    {
      ipfsGateway: "https://api.universalprofile.cloud/ipfs",
    }
  );

  // Download and verify the profile metadata JSON file
  // let profileMetaData = await erc725js.fetchData('LSP3Profile');
  // console.log(profileMetaData);

  // Fetch all of the profile's issued assets
  let issuedAssetsDataKey = await erc725js.fetchData("LSP12IssuedAssets[]");
  console.log(issuedAssetsDataKey);

  // Fetch all owned assets of the profile
  let receivedAssetsDataKey = await erc725js.fetchData("LSP5ReceivedAssets[]");
  console.log(receivedAssetsDataKey);

  // Fetch the profile's universal receiver
  let universalReceiverDataKey = await erc725js.fetchData(
    "LSP1UniversalReceiverDelegate"
  );
  console.log(universalReceiverDataKey);

  // Get all profile data from the profile smart contract
  let profileData = await erc725js.getData();
  console.log(profileData);
}
// debug:
// fetchProfile("0x9139def55c73c12bcda9c44f12326686e3948634");
