import axios from "axios";
import express from "express";
import getRandomId from "./utils/randomActivityId.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const { data } = response;
    res.render("index", { data: data });
  } catch (error) {
    res.render("index.ejs", { error: "No activites that match your criteria" });
  }
});
app.post("/", async (req, res) => {
  try {
    const { participants, type } = req.body;
    const { data } = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    res.render("index", { data: data[getRandomId(data)] });
  } catch (error) {
    res.render("index.ejs", { error: "No activites that match your criteria" });
  }
});
app.listen(3000);
