/**
 * UTube class
 * 
 * Author: Nic Bell
 */

var objectAssign = require('object-assign');

function UTube(element) {
	this.element = element;
	this.options = objectAssign({}, this.options, JSON.parse(this.element.getAttribute('data-utube-options') || {}));
	this.addEvents();
}

UTube.prototype.options = {
	id: null,
	autohide: 1,
	autoplay: 1,
	color: 'white',
	controls: 1,
	cc_load_policy: 0,
	disablekb: 0,
	enablejsapi: 1,
	end: null,
	fs: 1,
	iv_load_policy: 3,
	loop: 0,
	modestbranding: 1,
	mobile: false,
	origin: document.domain, // Should be set to domain
	playsinline: 0,
	rel: 0,
	showinfo: 0,
	start: null,
	theme: 'dark',
	wmode: 'opaque'
};

UTube.prototype.addEvents = function () {
	this.element.addEventListener('click', this.onPlay.bind(this));
}

UTube.prototype.onPlay = function () {
	if (typeof YT == 'undefined' || typeof YT.Player == 'undefined') {
		this.waitingForApi = true;

		this.loadAPI(function () {
			if (this.waitingForApi) {
				this.createPlayer();
				this.waitingForApi = false;
			}
		});
	}
	else {
		this.createPlayer();
	}
}

UTube.prototype.loadAPI = function (callback) {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";

	document.head.appendChild(tag);

	window.onYouTubeIframeAPIReadyCallbacks = window.onYouTubeIframeAPIReadyCallbacks || [];
	window.onYouTubeIframeAPIReadyCallbacks.push(callback.bind(this));

	window.onYouTubeIframeAPIReady = function () {
		for (var i = 0; i < window.onYouTubeIframeAPIReadyCallbacks.length; i++) {
			window.onYouTubeIframeAPIReadyCallbacks[i].call();
		}
	}
}

UTube.prototype.createPlayer = function () {
	this.player = new YT.Player(this.element.querySelector('.movie-player'), {
		height: '100%',
		width: '100%',
		videoId: this.options.id,
		playerVars: {
			'autohide': this.options.autohide,
			'autoplay': this.options.autoplay,
			'color': this.options.color,
			'controls': this.options.controls,
			'disablekb': this.options.disablekb,
			'enablejsapi': this.options.enablejsapi,
			'end': this.options.end,
			'fs': this.options.fs,
			'iv_load_policy': this.options.iv_load_policy,
			'loop': this.options.loop,
			'modestbranding': this.options.modestbranding,
			'playsinline': this.options.playsinline,
			'rel': this.options.rel,
			'showinfo': this.options.showinfo,
			'start': this.options.start,
			'theme': this.options.theme,
			'wmode': 'opaque'		
		}
	});

	this.videoPercentage = 0;
	this.player.addEventListener('onStateChange', this.onStateChange.bind(this));
}

UTube.prototype.onStateChange = function (e) {
	var state = e.data,
		percentages = [25, 50, 75, 100],
		trackVideoPercentage = function () {
			var currentTime = this.player.getCurrentTime(),
				duration = this.player.getDuration();

			for (var index = 0; index < percentages.length; index++) {
				var percentage = percentages[index];

				if (currentTime >= (duration * percentage / 100) && this.videoPercentage < percentage) {
					this.videoPercentage = percentage;
					this.trak(percentage + '%');
				}
			}
		};

	if (state == YT.PlayerState.PLAYING) {
		this.trak('PLAYING');
		this.playerInterval = setInterval(trackVideoPercentage.bind(this), 200);
	}
	else if (state == YT.PlayerState.PAUSED) {
		this.trak('PAUSED');
		clearInterval(this.playerInterval);
	}
	else if (state == YT.PlayerState.ENDED) {
		this.trak('ENDED');
		clearInterval(this.playerInterval);
		this.close();
	}
	else {
		clearInterval(this.playerInterval);
	}
}

UTube.prototype.trak = function (status) {
	console.log('UTube', status, this.player.getVideoData().title);
}

UTube.prototype.pause = function () {
	if (this.player) {
		this.player.pauseVideo();
	}
}

UTube.prototype.close = function () {
	if (this.player) {
		this.player.destroy();
	}
}


module.exports = UTube;