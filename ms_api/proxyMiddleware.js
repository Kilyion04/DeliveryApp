const proxy = require('express-http-proxy');

const services = {
  '/api/ms_users': 'http://localhost:3001',
  '/api/ms_rests': 'http://localhost:3002',
  '/api/ms_articles': 'http://localhost:3003',
  '/api/ms_notifications': 'http://localhost:3004',
  '/api/ms_logs': 'http://localhost:3005',
  '/api/ms_menus': 'http://localhost:3006',
  '/api/ms_orders': 'http://localhost:3007',
};

const setupProxies = (app) => {
  Object.keys(services).forEach((context) => {
    const serviceUrl = services[context];
    app.use(context, proxy(serviceUrl, {
      proxyReqPathResolver: (req) => {
        const newPath = context + req.url;
        console.log(`Proxying request to: ${serviceUrl}${newPath}`); // Log de l'URL proxy
        return newPath;
      },
      userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        console.log(`Response status: ${proxyRes.statusCode}`);
        console.log(`Response headers: ${JSON.stringify(proxyRes.headers)}`);
        console.log(`Response body: ${proxyResData.toString('utf8')}`);
        return proxyResData;
      },
      proxyErrorHandler: (err, res, next) => {
        console.error(`Proxy error: ${err.message}`);
        res.status(500).send({ error: 'Proxy error', details: err.message });
      }
    }));
  });
};

module.exports = setupProxies;
