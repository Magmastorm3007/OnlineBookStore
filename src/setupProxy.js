const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'localhost:10000/',
      changeOrigin: true,
    })
  );
  app.use(
    '/payments',
    createProxyMiddleware({
      target: '/localhost:10000',
      changeOrigin: true,
    })
  );
}