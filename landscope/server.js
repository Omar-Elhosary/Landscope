import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("latitude", async (req, res) => {
  const { satelliteId, lat, lon, alt, apiKey } = req.params;

  try {
    const response = await axios.get(
      `https://api.n2yo.com/rest/v1/satellite/radiopasses/${satelliteId}/${lat}/${lon}/${alt}/10/40/&apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
