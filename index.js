var fs = require('fs'),
	opencv = require('opencv');

// 1. Lecture d'un stream vidéo
var stream = new opencv.VideoStream(0);

// Option 2, ``camera.toStream()`` pour convertir la capture vidéo.

/*
var camera = new opencv.VideoCapture(0),
	window = new opencv.NamedWindow('Video', 0),
	patternPath = './node_modules/opencv/data/haarcascade_frontalface_alt2.xml';

setInterval(function() {
	camera.read(function(err, im) {
		if (err) throw err;
		console.log(im.size());
		if (im.size()[0] > 0 && im.size()[1] > 0){
			im.detectObject(patternPath, {}, function(err, faces) {
				if (err) throw err;

				for (var i = 0; i < faces.length; i++) {
					var face = faces[i];
					im.rectangle([face.x, face.y], [face.width, face.height], [0, 255, 0], 2);
				}

				window.show(im);
			});
		}
		window.blockingWaitKey(0, 50);
	});
}, 20);
*/
