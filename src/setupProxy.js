const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/testapi',
    createProxyMiddleware({
      target: 'localhost:10000/',
      changeOrigin: true,
    })
  );
  app.use(
    '/testpay',
    createProxyMiddleware({
      target: '/localhost:10000',
      changeOrigin: true,
    })
  );
}