const path = require('path'),
	express = require('express'),
	http = require('http');

let app = express(),
	server = http.createServer(app),
	drones = [];

drones.push({
	name: 'drone-001'
});

/**
 * Serveur de fichier
 */
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/src/**/*', (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

app.get('/node_modules/**/*', (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

/**
 * Web services
 */
app.get('/api/drones', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(drones));
});

/**
 * Démarrage du serveur
 */
server.listen(3000, () => {
	console.info('Démarrage du serveur sur le port 3000.');
});
