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
import { fetchProfile } from "./fetch-profile.js";

app.use(cors());
app.use(express.json());

// Define an Axios instance with your API base URL
const axiosInstanceWithoutBaseURL = axios.create({
  baseURL: "http://localhost:5000", // Use the same base URL
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
    fs.writeFileSync("lsp3Profile.json", JSON.stringify(lsp3Profile, null, 2));
    // Call the createUniversalProfile function with the LSP3 profile data
    const result = await createUniversalProfile(lsp3Profile);
    console.log("Universal Profile created:", result);

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

app.get("/extract-asset-data/:address", async (req, res) => {
  try {
    console.log("Handler start");
    const { address } = req.params;
    console.log(`Received request for address: ${address}`);

    // Call the fetchAndReadAssetData function with the provided address
    const assetData = await fetchAndReadAssetData(address);

    // Send the assets as a JSON response
    res.json({ assetData });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///////   Profile getter   ///////////////
app.get("/fetch-profile/:address", async (req, res) => {
  try {
    const { address } = req.params;
    console.log(`Received request for address: ${address}`);
    const profileData = await fetchProfile(address);
    console.log("Maarten Profile Data:", profileData);
    // Send the profile as a JSON response
    res.json({ profileData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
