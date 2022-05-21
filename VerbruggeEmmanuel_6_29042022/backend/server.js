const http = require('http');
const app = require('./app');


// Création d'une fonction normalizePort qui renvoie un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

// Création d'une fonction errorHandler qui vérifie les erreurs et les gères de manière appropriée
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
// Création d'un serveur à l'aide de la méthode createServer à partir du package http
const server = http.createServer(app);

/* Création d'un écouteur d'événements pour enregistrer 
le port ou le canal nommé sur lequel le serveur s'exécute dans la console */
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


// Utilisation de la méthode d'écoute du serveur pour écouter le port tel que défini
server.listen(port);
