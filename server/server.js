const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db-connection.js");

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json()); // creates req.body

// creates an endpoint for the route /api
app.get("/", (req, res) => {
  res.json({ message: "Hello from My template ExpressJS" });
});

// get sightings

app.get("/api/sightings", async (req, res) => {
  try {
    const allSightings = await db.query(
      "SELECT sightings.sighting_id, sightings.date_time as last_seen, sightings.healthy, sightings.location, individuals.nick_name as name, species.common_name, species.scientific_name FROM sightings LEFT JOIN individuals ON individuals.individual_id = sightings.individual_id LEFT JOIN species ON species.species_id = individuals.species_id"
    );
    res.json(allSightings.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get all species

app.get("/api/species", async (req, res) => {
  try {
    const allSpecies = await db.query("SELECT * FROM species");
    res.json(allSpecies.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get individuals of a specific species
app.get("/api/individuals/:species_id", async (req, res) => {
  const { species_id } = req.params;
  try {
    const individualsOfSpecies = await db.query(
      "SELECT * FROM individuals WHERE species_id = $1",
      [species_id]
    );
    res.json(individualsOfSpecies.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// ADD sighting to sightings table

app.post("/api/sighting/add", async (req, res) => {
  console.log(req.body);
  try {
    let { date_time, individual_id, location, healthy, email } = req.body;
    const newSighting = await db.query(
      "INSERT INTO sightings (date_time, individual_id, location, healthy, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [date_time, individual_id, location, healthy, email]
    );
    res.json(newSighting.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// DELETE A SIGHTING

app.delete("/api/sighting/delete/:sightingId", async (req, res) => {
  try {
    let { sightingId } = req.params;
    const deleteSighting = await db.query(
      "DELETE FROM sightings WHERE sighting_id = $1",
      [sightingId]
    );
    res.json(`Sighting with id ${sightingId} was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
