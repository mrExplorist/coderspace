require("dotenv").config();

const express = require("express"); // importing express
const app = express(); // calling express
const cors = require("cors"); //
const DbConnect = require("./database");
const router = require("./routes");

// cors options
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

// applying cors
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5500;

DbConnect();
app.use(express.json()); // Add the JSON body parsing middleware

app.use(router); //Registering it with Express app.

app.get("/", (req, res) => {
  res.send("Hello from express JS");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
