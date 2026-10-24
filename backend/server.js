require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`COMPLIMET API running on port ${PORT}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);