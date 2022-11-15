const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware({
      target: 'https://kubernetes.default.svc',
      changeOrigin: true,
    })
  );
};