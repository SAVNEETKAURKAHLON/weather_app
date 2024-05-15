import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req,res) => {
  res.render("index");
})

app.post("/",async(req,res) => {
  const city_name = req.body.city;
  //metric is the unit to show the temperature in celsius
  //By default it is in kelvin
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=7c9a2a9f26229c4bd27efd1f3ba5cb2e`
  );
  console.log(response.data);
  res.render("index", { weatherData: response.data, name:city_name });

})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });