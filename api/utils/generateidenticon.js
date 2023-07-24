const { cookieStorageManager } = require("@chakra-ui/react");
const Identicon = require("identicon.js");

// userのアイコンを作成
const generateIdenticon = (input, size = 64) => {
  // 入力された情報をハッシュ化
  const hash = require("crypto").createHash("md5").update(input).digest("hex");

  const data = new Identicon(hash, size).toString();

  return ` data:image/png;base64,${data}`;
};

module.exports = generateIdenticon;
