const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/ws",
    createProxyMiddleware({ target: "http://localhost:9999", ws: true })
  );
};
