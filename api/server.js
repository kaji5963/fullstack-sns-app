const express = require("express");
const app = express();
const authRoute = require("./routers/auth");

require("dotenv").config();

const PORT = 8001;

// json()のuseがないとリクエストできない
app.use(express.json());

// auth.jsのrouterをuseする
app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
