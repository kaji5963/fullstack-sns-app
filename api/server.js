const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const PORT = 8001;
const prisma = new PrismaClient();

app.use(express.json());

//新規ユーザー登録api
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10); //hash化

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res.json({ user });
});

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
