const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const path = require("path");

// Get port from environment variable or use 10000 as default
const port = process.env.PORT || 10000;

// Serve static files from the current directory
// app.use("/yelp-randomizer", express.static(__dirname));
app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userYelpCollectionLink = "";
app.post("/yelp-randomizer/submit-url", async (req, res) => {
  userYelpCollectionLink = req.body.urlInput;
  res.json({ message: "URL received", status: "loading" });
  await scrapeYelpCollection(); // Wait for scraping to complete
});

// app.post("/submit-google-map-url", async (req, res) => {
//   const mapUrl = req.body.urlInput;
//   console.log(mapUrl, "googlemapsURL");
//   const places = await scrapeGoogleMapCollection(mapUrl);
//   res.json({ places, status: "success" });
// });

// New function to scrape Google Maps collection
// async function scrapeGoogleMapCollection(mapUrl) {
//   try {
//     const response = await axios.get(mapUrl);
//     const $ = cheerio.load(response.data);
//     console.log($, "adasd");

//     // Adjust the selector based on the actual HTML structure of the Google Maps page
//     const placeNames = $(".fontHeadlineSmall") // Replace with actual selector
//       .map((_, element) => $(element).text().trim())
//       .get();

//     console.log("Place Names:", placeNames);
//     return placeNames;
//   } catch (error) {
//     console.error("Error scraping Google Maps collection:", error);
//     return [];
//   }
// }

app.get("/yelp-randomizer/get-restaurants", async (req, res) => {
  try {
    const restaurants = await scrapeYelpCollection();
    res.json({ restaurants, status: "success" });
  } catch (error) {
    res.json({ restaurants: [], status: "error" });
  }
});

async function scrapeYelpCollection() {
  try {
    const response = await axios.get(userYelpCollectionLink);
    const $ = cheerio.load(response.data);

    // Get all restaurant names from collection page
    const restaurantNames = $(".biz-name")
      .map((_, element) => $(element).text().trim())
      .get(); // Convert cheerio object to array
    return restaurantNames;
  } catch (error) {
    console.error("Error scraping Yelp collection:", error);
    return []; // Return empty array instead of null on error
  }
}

app.get("/yelp-randomizer", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get(["/", "/yelp-randomizer"], (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
