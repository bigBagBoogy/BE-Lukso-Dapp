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

const fetchProfile = async (address) => {
  // Initiate erc725.js
  const erc725js = new ERC725(
    lsp3ProfileSchema,
    address,
    "https://rpc.testnet.lukso.gateway.fm",
    {
      ipfsGateway: "https://api.universalprofile.cloud/ipfs",
    }
  );

  // Fetch all of the profile's issued assets
  const issuedAssetsDataKey = await erc725js.fetchData("LSP12IssuedAssets[]");

  // Fetch all owned assets of the profile
  const receivedAssetsDataKey = await erc725js.fetchData(
    "LSP5ReceivedAssets[]"
  );

  // Fetch the profile's universal receiver
  const universalReceiverDataKey = await erc725js.fetchData(
    "LSP1UniversalReceiverDelegate"
  );

  // Get all profile data from the profile smart contract
  const profileData = await erc725js.getData();

  return {
    issuedAssetsDataKey,
    receivedAssetsDataKey,
    universalReceiverDataKey,
    profileData,
  };
};

export { fetchProfile };
// debug:
// fetchProfile("0x9139def55c73c12bcda9c44f12326686e3948634");
