// extract-asset-data.js
// Imports
import Web3 from "web3";
import { ERC725 } from "@erc725/erc725.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
const __dirname = dirname(new URL(import.meta.url).pathname);
// Construct the path directly
const jsonFilePath = join(
  process.cwd(),
  "node_modules",
  "@erc725/erc725.js/schemas/LSP4DigitalAsset.json"
);
// console.log("Current working directory:", process.cwd());
// console.log("Resolved JSON file path:", jsonFilePath);
const jsonContent = readFileSync(jsonFilePath, "utf-8");
const LSP4Schema = JSON.parse(jsonContent);
// Now you can use LSP4Schema as needed

// Static variables
const RPC_ENDPOINT = "https://rpc.testnet.lukso.gateway.fm";
const IPFS_GATEWAY = "https://universalpage.dev/api/ipfs/";

// const SAMPLE_ASSET_ADDRESS = "0x6395b330F063F96579aA8F7b59f2584fb9b6c3a5";
const SAMPLE_ASSET_ADDRESS = "0x84284c6121BFF349a852017A5Fc82de33Ef3b81C"; //GMM token

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
      // https://universalpage.dev/api/ipfs/QmaXQSZFoUPM43kND6EUPSnJF7NjpkW9LwW6J9vRki5QDh
      // https://universalpage.dev/api/ipfs/QmcqVLGFRpweZCfhoG7vGkChc45FNSfSvkmaq3XnH3uk2Q

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
// fetchAndReadAssetData(SAMPLE_ASSET_ADDRESS);

export { fetchAndReadAssetData };

// example output:
// maarten@LAPTOP-L1E8IBDS:~/node-express/BE-Lukso-Dapp$ node extract-asset-data.js
// {
//   key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
//   name: 'LSP4Metadata',
//   value: {
//     LSP4Metadata: {
//       description: 'Purple Bear is always rocking hard',
//       links: [Array],
//       images: [Array],
//       icon: [Array],
//       assets: null
//     }
//   }
// }
// {
//   "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
//   "name": "LSP4Metadata",
//   "value": {
//     "LSP4Metadata": {
//       "description": "Purple Bear is always rocking hard",
//       "links": [
//         {
//           "title": "LUKSO Docs",
//           "url": "https://docs.lukso.tech"
//         }
//       ],
//       "images": [
//         [
//           {
//             "width": 1377,
//             "height": 1380,
//             "hashFunction": "keccak256(bytes)",
//             "hash": "0x85c86c6973984773751f3272904501355a7f21008c8d96f06e74c26cb40fedfd",
//             "url": "ipfs://QmV4Tbre8Pre3SRTZUopzE8VbY8SSEqtQVMfWnB1aAsnJS"
//           },
//           {
//             "width": 1021,
//             "height": 1024,
//             "hashFunction": "keccak256(bytes)",
//             "hash": "0x1e92171ad3ef6aca6a8fb2fc1350f46f334a5133524a533e9789d627a65b2d92",
//             "url": "ipfs://Qmak2WfMvmbVLv6xNGcJXB9Q2gzr2vVXygxL2Ap9LUSRiD"
//           },
//           {
//             "width": 638,
//             "height": 640,
//             "hashFunction": "keccak256(bytes)",
//             "hash": "0xe89c2399437e694cbc9664a8fca731f54d34c5b60ba87cb854f9203811d2382d",
//             "url": "ipfs://QmebprVfDei9M342JDWwZF2APA5ySN28RT6vkg9pmHy4NE"
//           },
//           {
//             "width": 319,
//             "height": 320,
//             "hashFunction": "keccak256(bytes)",
//             "hash": "0xee18de3c69c04e859a3588e7c9aafcbdbc077950b195606d4bd8a7b355a3a1a4",
//             "url": "ipfs://QmSN1pJ4q11ytuUr9tPtfxycvqQFSLV8DSCBYsHwVmziNN"
//           },
//           {
//             "width": 179,
//             "height": 180,
//             "hashFunction": "keccak256(bytes)",
//             "hash": "0x5eaa7b6ed96ccd3d6587a74e61afc308b4a72b6751d471ba38f06becc2c5998e",
//             "url": "ipfs://QmavcM6xYwxdV1iFeMoh4SSMrFnzVMrrpxAAD3Ue78Wjc5"
//           }
//         ]
//       ],
//       "icon": [
//         {
//           "width": 256,
//           "height": 238,
//           "hashFunction": "keccak256(bytes)",
//           "hash": "0xf8ff716c69f26fa49433234a5a94fc32e92d407b50b8239a696ea4dfa9ae279d",
//           "url": "ipfs://QmfMD1hTKHsgFFq3qiarcSFsYUZwPXZp2n31m8mhBEKLNw"
//         },
//         {
//           "width": 32,
//           "height": 29,
//           "hashFunction": "keccak256(bytes)",
//           "hash": "0x8e52197a2d3213630a441f6663a4394cc5ff091582427a331eb8f6a1184ea0d8",
//           "url": "ipfs://QmXUDP5NZSPGJ4g769YJ7ufjeQ8qCAUnroUqWbKGDvXLZN"
//         }
//       ],
//       "assets": null
//     }
//   }
// }
// Asset has image data

// Asset Image Links: [
//   [
//     "0",
//     "https://universalpage.dev/api/ipfs/QmV4Tbre8Pre3SRTZUopzE8VbY8SSEqtQVMfWnB1aAsnJS"
//   ],
//   [
//     "1",
//     "https://universalpage.dev/api/ipfs/Qmak2WfMvmbVLv6xNGcJXB9Q2gzr2vVXygxL2Ap9LUSRiD"
//   ],
//   [
//     "2",
//     "https://universalpage.dev/api/ipfs/QmebprVfDei9M342JDWwZF2APA5ySN28RT6vkg9pmHy4NE"
//   ],
//   [
//     "3",
//     "https://universalpage.dev/api/ipfs/QmSN1pJ4q11ytuUr9tPtfxycvqQFSLV8DSCBYsHwVmziNN"
//   ],
//   [
//     "4",
//     "https://universalpage.dev/api/ipfs/QmavcM6xYwxdV1iFeMoh4SSMrFnzVMrrpxAAD3Ue78Wjc5"
//   ]
// ]

// Full Size Asset Image Link: https://universalpage.dev/api/ipfs/QmV4Tbre8Pre3SRTZUopzE8VbY8SSEqtQVMfWnB1aAsnJS

// Asset Icon Links: [
//   [
//     "0",
//     "https://universalpage.dev/api/ipfs/QmfMD1hTKHsgFFq3qiarcSFsYUZwPXZp2n31m8mhBEKLNw"
//   ],
//   [
//     "1",
//     "https://universalpage.dev/api/ipfs/QmXUDP5NZSPGJ4g769YJ7ufjeQ8qCAUnroUqWbKGDvXLZN"
//   ]
// ]

// Full Size Icon Image Link: https://universalpage.dev/api/ipfs/QmfMD1hTKHsgFFq3qiarcSFsYUZwPXZp2n31m8mhBEKLNw

// Asset Description: Purple Bear is always rocking hard
