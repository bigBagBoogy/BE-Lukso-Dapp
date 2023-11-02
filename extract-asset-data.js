// extract-asset-data.js
// Imports
import Web3 from "web3";
import { ERC725 } from "@erc725/erc725.js";
import LSP4Schema from "@erc725/erc725.js/schemas/LSP4DigitalAsset.json" assert { type: "json" };

// Static variables
const RPC_ENDPOINT = "https://rpc.testnet.lukso.gateway.fm";
const IPFS_GATEWAY = "https://universalpage.dev/api/ipfs/";

// const SAMPLE_ASSET_ADDRESS = "0x6395b330F063F96579aA8F7b59f2584fb9b6c3a5";
const SAMPLE_ASSET_ADDRESS = "0x42cbd824dB82D0c7b03c1AEcd10E4a38f1cEE9ED"; //rock-bear

// Parameters for the ERC725 instance
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };

// Fetchable Asset information
let assetImageLinks = [];
let fullSizeAssetImage;
let assetIconLinks = [];
let fullSizeIconImage;
let assetDescription;

/*
 * Get the dataset of an asset
 *
 * @param address of the asset
 * @return string of the encoded data
 */
async function fetchAndReadAssetData(address) {
  try {
    const digitalAsset = new ERC725(LSP4Schema, address, provider, config);
    const assetData = await digitalAsset.fetchData("LSP4Metadata");
    console.log(assetData);
    console.log(JSON.stringify(assetData, undefined, 2));
    await getAssetProperties(assetData);
    return assetData;
  } catch (error) {
    console.log("Could not fetch and read asset data: ", error);
  }
}

/*
 * Read properties of an asset
 */
async function getAssetProperties(assetJSON) {
  let assetImageData = [];
  let iconImageData = [];
  try {
    if (
      Array.isArray(assetJSON.value.LSP4Metadata.images) &&
      assetJSON.value.LSP4Metadata.images[0]
    ) {
      // Check if 'images' is an array and if it has at least one item
      console.log("Asset has image data \n");
      assetImageData = assetJSON.value.LSP4Metadata.images[0]; // Access the inner array
      for (let i in assetImageData) {
        assetImageLinks.push([
          i,
          assetImageData[i].url.replace("ipfs://", IPFS_GATEWAY),
        ]);
      }
      // example: https://universalpage.dev/api/ipfs/QmXkgQgJxsuWFtZgZZxHWmoAyMBAVYYGT1CHDBSWNfw9am
      //      https://api.universalprofile.cloud/ipfsQmV4Tbre8Pre3SRTZUopzE8VbY8SSEqtQVMfWnB1aAsnJS
      //          https://universalpage.dev/api/ipfs/QmV4Tbre8Pre3SRTZUopzE8VbY8SSEqtQVMfWnB1aAsnJS
      console.log(
        "Asset Image Links: " +
          JSON.stringify(assetImageLinks, undefined, 2) +
          "\n"
      );

      fullSizeAssetImage = assetImageLinks[0][1];
      console.log("Full Size Asset Image Link: " + fullSizeAssetImage + "\n");
    } else {
      console.log("Asset does not have image data \n");
    }

    if (assetJSON.value.LSP4Metadata.icon[0]) {
      iconImageData = assetJSON.value.LSP4Metadata.icon;
      for (let i in iconImageData) {
        assetIconLinks.push([
          i,
          iconImageData[i].url.replace("ipfs://", IPFS_GATEWAY),
        ]);
      }

      console.log(
        "Asset Icon Links: " +
          JSON.stringify(assetIconLinks, undefined, 2) +
          "\n"
      );

      fullSizeIconImage = assetIconLinks[0][1];
      console.log("Full Size Icon Image Link: " + fullSizeIconImage + "\n");
    } else {
      console.log("Asset does not have icon data");
    }

    if (assetJSON.value.LSP4Metadata.description) {
      assetDescription = assetJSON.value.LSP4Metadata.description;
      console.log("Asset Description: " + assetDescription + "\n");
    } else {
      console.log("Asset does not have description data \n");
    }
  } catch (error) {
    console.log("Could not fetch all asset properties: ", error);
  }
}

// debug;
fetchAndReadAssetData(SAMPLE_ASSET_ADDRESS);

export { fetchAndReadAssetData };
