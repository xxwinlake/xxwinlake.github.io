require('dotenv').config();
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = require('./app');

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return 0;
  }
  else if (port >= 0) {
    return port;
  }
  else {
    return 0;
  }
};

if (process.env.NODE_ENV === 'production') {
  const port = normalizePort(process.env.PORT || '443');
  https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/api.afdaspace.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api.afdaspace.com/fullchain.pem')
  }, app).listen(port, () => {
    console.log(`Server started on ${port}`);
  });
}
else {  // development
  const port = normalizePort(process.env.PORT || 3000);
  const httpServer = new http.Server(app);
  httpServer.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
}
