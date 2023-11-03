import express from "express";
const app = express();
const port = 5000;
import cors from "cors";
import axios from "axios"; // Import Axios
import { fetchAssetData } from "./02-fetch-asset-data.js";
import { fetchOwnedAssets } from "./fetch-owned-assets.js";
import { fetchAndReadAssetData } from "./extract-asset-data.js";

app.use(cors());
app.use(express.json());

// Define an Axios instance with your API base URL
const axiosInstance = axios.create({
  baseURL: "https://your-api-endpoint.com", // Replace with your actual API endpoint
  timeout: 10000, // Set a reasonable timeout
  headers: {
    "Content-Type": "application/json",
  },
});

app.get("/assets", async (req, res) => {
  try {
    // Call the fetchOwnedAssets function to retrieve assets
    const response = await axiosInstance.get(
      "/fetch-asset-data/0x3F0350EaFc25Cc9185a77394B7E2440ec002e466"
    );

    // Send the assets as a JSON response
    res.json({ assets: response.data });
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-assets", async (req, res) => {
  try {
    // Call the fetchOwnedAssets function to retrieve assets
    const response = await axiosInstance.get(
      "/fetch-owned-assets/0x3F0350EaFc25Cc9185a77394B7E2440ec002e466"
    );

    // Send the assets as a JSON response
    res.json({ assets: response.data });
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-asset-properties", async (req, res) => {
  try {
    // Call the fetchAndReadAssetData function to retrieve assets
    const response = await axiosInstance.get(
      "/extract-asset-data/0x3F0350EaFc25Cc9185a77394B7E2440ec002e466"
    );
    console.log("BE sending: ", response.data);

    // Send the assets as a JSON response
    res.json({ assetData: response.data });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/submit-LSP3", async (req, res) => {
  try {
    // Assume req.body contains the LSP3 data you want to submit
    const lsp3Data = req.body;

    // Send a POST request to submit LSP3 metadata
    const response = await axiosInstance.post("/submit-LSP3", lsp3Data);

    console.log("Receiving LSP3 metadata: ", response.data);

    // Send the response from the server as-is
    res.json(response.data);
  } catch (error) {
    console.error("Error posting LSP3 metadata:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
