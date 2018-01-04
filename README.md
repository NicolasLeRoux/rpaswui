# RPASWUI (Remotely Piloted Aircraft System from a Web User Interface)


## Introduction

Title: MMIRPAS (Man Machine Interface for a Remotely Piloted Aircraft System)

L'objectif de ce projet est de créer une interface web de pilotage de drone
(ou RPAS). La cible est d'avoir un échange bidirectionnelle de donnée, la vidéo
et les mesures des capteurs du drone vers le smartphone et les consignes de
pilotage du smartphone vers le drone.

L'innovation est dans l'utilisation d'une plateforme web pour piloter un drone.


## Install

Installer les dépendances avec la commande ``npm i``.


## Start

Démarrer l'application avec la commande ``npm start`` et ouvrir le navigateur
à l'URL [localhost:8000](http://localhost:8000/).


## TODO

L'enregistrement vidéo est fonctionnelle mais la transmission du flux sur le
canal WebRTC nécessite la serialisation des données. Plusieurs possibilitées
existent dont la transformation en base 64 avec un codex jpg... Enfin, c'est
encore à creuser...


Utiliser un canvas pour ajouter des informations complémentaires sur l'images.


## ZeroConf

Utiliser le protocol ZeroConf pour la connection au drone: https://github.com/watson/bonjour


## Tuto

https://planb.nicecupoftea.org/2016/10/24/a-presence-robot-with-chromium-webrtc-raspberry-pi-3-and-easyrtc/

https://www.grafikart.fr/tutoriels/javascript/webrtc-864


## node webRTC workarround

https://github.com/js-platform/node-webrtc/issues/156


Pour le data channel
https://github.com/webrtc/samples/tree/gh-pages/src/content/datachannel


## Devops

Idée à tester pour permettre la recherche facile du drone dans le réseau local.

1. Une page web qui va faire la recherche des périfériques bluethoot dans les
environs.

2. Une fois le périférique détecté avec le bluethoot, la page web permet de setter
les configs du réseaux local.

3. Dès que le drone est sur le réseau local, il indique sa présence via le
protocol zeroconf.

4. Le site catch la présence du drone et peut donc effectuer la redirection (ou
autre) sur ce dernier.

5. Le pilotage peut commencer !!!


## Architecture

### Serveur

Un simple serveur node permettant de retourner la page d'index et d'afficher les
drone disponible à la prise de contrôle (warning sécurité...). Les drones disponibles
sont ceux qui sont connecter en web socket.

### Client

TODO

### Drone

TODO

## Gyro from smartphone

http://blog.js-republic.com/utiliser-gyrojs-javascript/

## Liens

https://webrtc.github.io/samples/
