const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//新規ユーザー登録api
router.post("/register", async (req, res) => {
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

//ユーザーログインapi
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "そのユーザーは存在しません。" });
  }
  // DBのパスワードとreqのパスワードを比較してtrue/falseを返す
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "そのパスワードは間違っています。" });
  }
  // jwtTokenを発行、１日期限とする
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.json({ token });
});

module.exports = router;
