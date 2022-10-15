const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;


app.use(cors());
app.use(express.json());


const db = require("./app/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Test app response." });
});

require("./app/routes/routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
