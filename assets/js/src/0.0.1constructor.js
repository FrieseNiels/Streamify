if(!window.NVDS) window.NVDS = new Object();

window.onload = function(){
	 new NVDS.Controller();
}

NVDS.Controller = function NVDS_Controller(){
	this.init(this);
}

NVDS.Controller.prototype.constructor = NVDS.Controller;

NVDS.Controller.prototype.init = function(me){
	console.log('Opstarten.......');
	var player = new NVDS.Player();
	var screensaver = new NVDS.ScreenSaver();
	this.ready();
}
NVDS.Controller.prototype.playType = function(){
	this.supportsMp3 = false;
	var myAudio = document.createElement('audio');
	if (myAudio.canPlayType('audio/mpeg') !== ""){this.supportsMp3 = true;}
}
NVDS.Controller.prototype.ready = function(){
	document.getElementsByClassName('loading')[0].style.display = 'none';
}