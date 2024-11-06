const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const router = require("./routes");
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

const port = 3000;
app.listen(port, () => console.log(`Magic happens on port ${port}`));
