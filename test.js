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

const fetchProfile = async () => {
  const address = "0xA3c89782154f3EF5C27c5cE1FD907122c3cB2Ce8";
  console.log(`Received address in fetchProfile: ${address}`);
  // Initiate erc725.js
  const erc725js = new ERC725(
    lsp3ProfileSchema,
    address,
    "https://rpc.testnet.lukso.gateway.fm",
    {
      ipfsGateway: "https://api.universalprofile.cloud/ipfs",
    }
  );
  console.log("initiated erc725");
  // Fetch all of the profile's issued assets
  const issuedAssetsDataKey = await erc725js.fetchData("LSP12IssuedAssets[]");
  console.log("fetched issued assets");
  // Fetch all owned assets of the profile
  const receivedAssetsDataKey = await erc725js.fetchData(
    "LSP5ReceivedAssets[]"
  );
  console.log("fetched received assets");
  // Fetch the profile's universal receiver
  const universalReceiverDataKey = await erc725js.fetchData(
    "LSP1UniversalReceiverDelegate"
  );
  console.log("fetched universal receiver");
  // Get all profile data from the profile smart contract
  const profileData = await erc725js.getData();
  console.log(
    issuedAssetsDataKey,
    receivedAssetsDataKey,
    universalReceiverDataKey,
    profileData
  );
  return {
    issuedAssetsDataKey,
    receivedAssetsDataKey,
    universalReceiverDataKey,
    profileData,
  };
};

export { fetchProfile };
// debug:
fetchProfile();
