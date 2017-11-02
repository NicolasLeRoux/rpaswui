# POC RPAS

Proof of concept for a Remotely Piloted Aircraft System with nodejs


## Install

TODO


## TODO

L'enregistrement vidéo est fonctionnelle mais la transmission du flux sur le
canal WebRTC nécessite la serialisation des données. Plusieurs possibilitées
existent dont la transformation en base 64 avec un codex jpg... Enfin, c'est
encore à creuser...


Utiliser un canvas pour ajouter des informations complémentaires sur l'images.


## Tuto

https://planb.nicecupoftea.org/2016/10/24/a-presence-robot-with-chromium-webrtc-raspberry-pi-3-and-easyrtc/

https://www.grafikart.fr/tutoriels/javascript/webrtc-864


## node webRTC workarround

https://github.com/js-platform/node-webrtc/issues/156


Pour le data channel
https://github.com/webrtc/samples/tree/gh-pages/src/content/datachannel


## Description

Title: MMIRPAS (Man Machine Interface for a Remotely Piloted Aircraft System)

What: L'objectif de ce projet est de créer une interface web de pilotage de drone
(ou RPAS). La cible est d'avoir un échange bidirectionnelle de donnée, la vidéo
et les mesures des capteurs du drone vers le smartphone et les consignes de
pilotage du smartphone vers le drone.

Why: L'innovation est dans l'utilisation d'une plateforme web pour piloter un
drone.




## Liens

https://webrtc.github.io/samples/
