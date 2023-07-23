const jwt = require("jsonwebtoken");

// tokenを取得しているか判定するミドルウェア
function isAuthenticated(req, res, next) {
  // フロント側の定数`Bearer ${token}`をsplitで半角で区切り配列、要素の１番目を取得
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).res.json({ message: "権限がありません" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).res.json({ message: "権限がありません" });
    }

    req.userId = decoded.id;

    next();
  });
}

module.exports = isAuthenticated;
