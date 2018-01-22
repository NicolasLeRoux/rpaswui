const path = require('path'),
	express = require('express'),
	http = require('http');

let app = express(),
	server = http.createServer(app)

/**
 * Serveur de fichier
 */
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/**/*', (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

/**
 * Démarrage du serveur
 */
server.listen(3000, () => {
	console.info('Démarrage du serveur sur le port 3000.');
});
