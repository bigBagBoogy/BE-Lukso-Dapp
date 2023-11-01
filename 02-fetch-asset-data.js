// // 02-fetch-asset-data.js
// // Imports
// const { ERC725 } = require("@erc725/erc725.js");
// const LSP4Schema = require("@erc725/erc725.js/schemas/LSP4DigitalAsset.json");
// const Web3 = require("web3");

// // Static variables
// const RPC_ENDPOINT = "https://rpc.testnet.lukso.gateway.fm";
// const IPFS_GATEWAY = "https://api.universalprofile.cloud/ipfs";
// const SAMPLE_ASSET_ADDRESS = "0x3F0350EaFc25Cc9185a77394B7E2440ec002e466";

// // Parameters for the ERC725 instance
// const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
// const config = { ipfsGateway: IPFS_GATEWAY };

// /*
//  * Get the dataset of an asset
//  *
//  * @param address of the asset
//  * @return string of the encoded data
//  */
// async function fetchAssetData(address) {
//   try {
//     const digitalAsset = new ERC725(LSP4Schema, address, provider, config);
//     return await digitalAsset.fetchData("LSP4Metadata");
//   } catch (error) {
//     console.log("Could not fetch asset data: ", error);
//   }
// }

// // Debug
// fetchAssetData(SAMPLE_ASSET_ADDRESS).then((assetData) =>
//   console.log(JSON.stringify(assetData, undefined, 2))
// );

// module.exports = {
//   fetchAssetData,
// };
