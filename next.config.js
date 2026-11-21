const path = require("path");

module.exports = {
  distDir: ".rti-next-build",
  outputFileTracingRoot: path.join(__dirname),
  experimental: { serverActions: { bodySizeLimit: "10mb" } }
};
