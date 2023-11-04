import express from "express";
const app = express();
const port = 5000;
import cors from "cors";
import fs from "fs";
import axios from "axios"; // Import Axios
import { fetchAssetData } from "./02-fetch-asset-data.js";
import { fetchOwnedAssets } from "./fetch-owned-assets.js";
import { fetchAndReadAssetData } from "./extract-asset-data.js";
import { createUniversalProfile } from "./deployUP.js";

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

app.post("/submit-LSP3", async (req, res) => {
  try {
    console.log("Received POST request with data:", req.body);
    const lsp3Profile = req.body;

    // Validate the incoming data (You can add more specific checks)
    if (typeof lsp3Profile !== "object") {
      throw new Error("Invalid LSP3 data.");
    }
    // Write the LSP3 profile data to a file
    // fs.writeFileSync("lsp3Profile.json", JSON.stringify(lsp3Profile, null, 2));
    // Call the createUniversalProfile function with the LSP3 profile data
    const result = await createUniversalProfile(lsp3Profile);
    console.log("Universal Profile created:", result);

    // Handle the response as needed
    // You can send a response back to the client or perform other actions here

    // Example: Sending a success response
    res.json({ success: "Universal Profile created successfully" });
  } catch (error) {
    console.error("Error posting LSP3 metadata:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
    // console.log("BE sending: ", response.data);

    // Send the assets as a JSON response
    res.json({ assetData: response.data });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
