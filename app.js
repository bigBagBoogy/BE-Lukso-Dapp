const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { fetchAssetData } = require("./02-fetch-asset-data.js");
const { fetchOwnedAssets } = require("./fetch-owned-assets.js");
const { fetchAndReadAssetData } = require("./extract-asset-data.js");

app.use(cors());

app.use(express.json());

app.get("/assets", async (req, res) => {
  try {
    // Call the fetchOwnedAssets function to retrieve assets
    const assets = await fetchAssetData(
      "0x3F0350EaFc25Cc9185a77394B7E2440ec002e466"
    ); // Provide the address you want to fetch assets for

    // Send the assets as a JSON response
    res.json({ assets });
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-assets", async (req, res) => {
  try {
    // Call the fetchOwnedAssets function to retrieve assets
    const assets = await fetchOwnedAssets(
      "0x3F0350EaFc25Cc9185a77394B7E2440ec002e466"
    ); // Provide the address you want to fetch assets for

    // Send the assets as a JSON response
    res.json({ assets });
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-asset-properties", async (req, res) => {
  try {
    // Call the fetchAndReadAssetData function to retrieve assets
    const properties = await fetchAndReadAssetData(
      "0x3F0350EaFc25Cc9185a77394B7E2440ec002e466"
    ); // Provide the address you want to fetch assets for

    // Send the assets as a JSON response
    res.json({ properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
