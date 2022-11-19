const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware({
      target: 'http://127.0.0.1:8001',
      changeOrigin: true,
    })
  );
};