const path = require("path");

module.exports = {
  outputFileTracingRoot: path.join(__dirname),
  experimental: { serverActions: { bodySizeLimit: "10mb" } }
};
