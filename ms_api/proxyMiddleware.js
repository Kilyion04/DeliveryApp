const proxy = require('express-http-proxy');

const services = {
    '/api/ms_articles': process.env.ARTICLES_SERVICE_URL,
    '/api/ms_logs': process.env.LOGS_SERVICE_URL,
    '/api/ms_menus': process.env.MENUS_SERVICE_URL,
    '/api/ms_notifications': process.env.NOTIFICATIONS_SERVICE_URL,
    '/api/ms_orders': process.env.ORDERS_SERVICE_URL,
    '/api/ms_rests': process.env.RESTAURANTS_SERVICE_URL,
    '/api/ms_users': process.env.USERS_SERVICE_URL,
    '/api/ms_auth': process.env.AUTH_SERVICE_URL,
    '/api/ms_storage': process.env.WORKERS_SERVICE_URL
};

const setupProxies = (app) => {
    Object.keys(services).forEach((context) => {
        const serviceUrl = services[context];
        app.use(context, proxy(serviceUrl, {
            proxyReqPathResolver: (req) => {
                const newPath = req.originalUrl;
                console.log(`Proxying request to: ${serviceUrl}${newPath}`);
                return newPath;
            },
            userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
                console.log(`Response from proxied request to: ${serviceUrl}${userReq.url}`);
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
