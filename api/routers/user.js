const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// user取得 api
router.get("/find", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      res.status(404).json({ error: "ユーザーが見つかりませんでした" });
    }
    // パスワードを抜くためuserで返さない
    res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// プロフィール取得 api
router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      // parseIntで文字列を整数とする
      where: { userId: parseInt(userId) },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!profile) {
      return res
        .status(404)
        .json({ error: "プロフィールが見つかりませんでした" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
