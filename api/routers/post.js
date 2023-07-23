const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//呟き投稿api
router.post("/post", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "投稿内容がありません" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: 1,
      },
      include: {
        author: true,
      },
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//最新つぶやき取得用api
router.get("/get_latest_post", async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });

    return res.json(latestPosts);
  } catch (error) {
    console.log(err);
    resizeTo.status(500).json({ error: "サーバーエラーです" });
  }
});

module.exports = router;