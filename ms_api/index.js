require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');

const app = express();
const port = process.env.PORT || 3000;

const services = {
  '/api/ms_users': process.env.USERS_SERVICE_URL,
  '/api/ms_rests': process.env.RESTAURANTS_SERVICE_URL,
  '/api/ms_articles': process.env.ARTICLES_SERVICE_URL,
  '/api/ms_notifs': process.env.NOTIFICATIONS_SERVICE_URL,
  '/api/ms_logs': process.env.LOGS_SERVICE_URL,
  '/api/ms_menus': process.env.MENUS_SERVICE_URL,
  '/api/ms_orders': process.env.ORDERS_SERVICE_URL,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de journalisation
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Configurer les proxies pour chaque microservice
Object.keys(services).forEach((context) => {
  const serviceUrl = services[context];
  app.use(context, proxy(serviceUrl, {
    proxyReqPathResolver: (req) => {
      const url = context.replace('/api', '') + req.url;
      console.log(`Proxying request to: ${serviceUrl}${url}`); // Log de l'URL proxy
      return url;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.log(`Response from proxied request to: ${serviceUrl}${userReq.url}`);
      return proxyResData;
    }
  }));
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
