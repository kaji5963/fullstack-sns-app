const express = require("express");
const app = express();
const authRoute = require("./routers/auth");
const cors = require("cors");

require("dotenv").config();

const PORT = 8001;

// json()のuseがないとリクエストできない
app.use(express.json());

// corsエラーに対しuseする
app.use(cors());

// auth.jsのrouterをuseする
app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
