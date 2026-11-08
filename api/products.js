const config = require("../lib/products");
module.exports = (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=60");
  res.status(200).json(config);
};
