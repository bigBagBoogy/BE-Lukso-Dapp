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
const erc725schema = JSON.parse(jsonContent);
// Now you can use erc725schema as needed

const erc725js = new ERC725(
  lsp3ProfileSchema,
  "0x163CF6D68Fb7287e032Eb7d1a797E737174985c1", // graspop group
  "https://rpc.testnet.lukso.gateway.fm",
  {
    ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  }
);

// Get all profile data from the profile smart contract
let profileData = await erc725js.getData();
console.log(profileData);
