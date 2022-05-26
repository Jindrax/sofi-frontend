const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/letsencrypt/live/sofiplus.com.co/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sofiplus.com.co/fullchain.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const port = process.env.PORT || 80;

const app = express();

const httpsServer = https.createServer(credentials, app);

app.use(history());
app.use(serveStatic(__dirname + '/dist/pwa'));
httpsServer.listen(443);
