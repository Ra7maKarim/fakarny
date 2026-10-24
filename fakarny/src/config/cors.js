const cors = require("cors");

const corsOptions = {
  origin: true,
};

module.exports = cors(corsOptions);