if(!window.NVDS) window.NVDS = new Object();

NVDS.Player = function NVDS_Player(parent){
	this.parent = parent;
	this.init();
	this.currentstation = '';
	this.currenstationnme = '';
	this.current_audio = '';
	this.playing = false;
	this.allstations= new Array();
	this.all = 'none';
	this.file = '';
}

NVDS.Player.prototype.init = function() {
	this.getStation();
	this.generalListeners();
}

NVDS.Player.prototype.loadJSON = function(path, succes, error) {   
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    	var status;
    	var data;
    
    	if (xhr.readyState == 4) { // `DONE`
      		status = xhr.status;
	      	if (status == 200) {
	       	 	succes && succes(xhr.response);
	      	} else {
	        	error && error(status);
      		}
   		}
 	};

    
    xhr.open("GET", path, true);
    xhr.responseType = 'json';
    xhr.send();
}
 

NVDS.Player.prototype.getStation = function(genre){
	var me = this;
	this.loadJSON('/assets/api/streams.json',
         function(data) { 
         	
         	var arr = Object.keys(data).map(function (key) {return data[key]});
         	

        	me.allstations = arr;
        	if (genre === undefined || genre == 'all'){
	      		if (this.all !== 'all'){
		        	this.station = document.getElementsByClassName('station')[0].cloneNode(true);
		        	this.all = 'all';
		        	clear();
		         	for(var i=0; i<arr.length; i++){	
		         		var logo = '/assets/img/station/' + arr[i]['logo'];
		         		var html = '<div class="play" style="background-image:url('+ logo +')"><span class="playbutton"  name="'+ i +'">P</span></div><span class="title">'+ arr[i]['name'] +'</span><span class="nowplaying">Niet beschikbaar</span>';
		         		document.getElementsByClassName('content')[0].appendChild(this.station.cloneNode(true));
		         		document.getElementsByClassName('content')[0].lastChild.innerHTML = html;
		         		document.getElementsByClassName('content')[0].lastChild.style.display = 'inline-block';
		         	}
	 			}
         	} else {
         		this.all = 'none';
         		clear();
         		this.station = document.getElementsByClassName('station')[0].cloneNode(true);
         		for(var i=0; i<arr.length; i++){	
	         		if(arr[i]['genre'] == genre){
		         		var logo = '/assets/img/station/' + arr[i]['logo'];
		         		var html = '<div class="play" style="background-image:url('+ logo +')"><span class="playbutton"  name="'+ i +'">P</span></div><span class="title">'+ arr[i]['name'] +'</span><span class="nowplaying">Niet beschikbaar</span>';
		         		document.getElementsByClassName('content')[0].appendChild(this.station.cloneNode(true));
		         		document.getElementsByClassName('content')[0].lastChild.innerHTML = html;
		         		document.getElementsByClassName('content')[0].lastChild.style.display = 'inline-block';
	         		}	
		         }

         	}

         	function clear(){
         		newcontent = document.getElementsByClassName('station')[0].cloneNode(true);
         		document.getElementsByClassName('content')[0].innerHTML = '';
         		document.getElementsByClassName('content')[0].appendChild(newcontent.cloneNode(true));
         	}

         	me.addStationListerener();
         },
         function(xhr) { console.error(xhr); }
	);


}

NVDS.Player.prototype.addStationListerener = function(){
	
	var playbuttons = document.getElementsByClassName('playbutton');
	var me = this;
	for(var i=0; i<playbuttons.length; i++){
		var elem = playbuttons[i];
		playbuttons[i].addEventListener("click", function(){me.playradio(this), false});
	}
	

	document.getElementsByClassName('station')[0].style.display = 'none';
}

NVDS.Player.prototype.generalListeners = function(){
	var me = this;
	
	var buttons = document.getElementsByClassName('button');
	for(var j=0; j<buttons.length; j++){
		var elm = buttons[j];
		buttons[j].addEventListener("click", function(){me.play(elm)});
	}

	var genres = document.getElementsByTagName('li');
	for (var k=0; k<genres.length; k++){
		genres[k].addEventListener("click", function(){me.selectGenre(this.innerText)})
	}

	document.getElementsByClassName('all')[0].addEventListener("click", function(){me.getStation('all')});
	document.getElementsByTagName('body')[0].addEventListener("keyup", function(){me.onKeyEvents(evt)});

}
NVDS.Player.prototype.onKeyEvents = function(){
	var char = e.which || e.keyCode;
	this.playRadioKey(char);
}

NVDS.Player.prototype.play = function(elem){
	if(elem.innerHTML == 'S'){
		this.currentstation.innerHTML = 'P';
		elem.innerHTML = 'P';
		this.playPause('pause');
	} else {
		this.currentstation.innerHTML = 'S';
		elem.innerHTML = 'S';
		this.playPause('play');
	}
}

NVDS.Player.prototype.playradio = function(elem){
		var controlls = document.getElementsByClassName('button')[0];

		if(this.playing){
			if(elem.className == 'playbutton'){
				this.currentstation.innerHTML = 'P';
				controlls.innerHTML = 'P';
				this.current_audio.pause();
				this.playing = false;
				return;
			} else {
				this.currentstation.innerHTML = 'P';
				controlls.innerHTML = 'P';
				this.current_audio.pause();
			}
		} else {
			var nme = elem.getAttribute('name');

			if(elem.innerHTML == 'S'){
				elem.innerHTML = 'P';
				controlls.innerHTML = 'P';
				this.playPause('pause');
			} else {
				elem.innerHTML = 'S';
				controlls.innerHTML	= 'S';
				this.setCurrentStation(nme, elem);
				this.playPause('play');
			}
		}
}

NVDS.Player.prototype.setCurrentStation = function(nme, elem){
	this.currentstation = elem;
	this.currenstationnme = nme;
	var url = this.allstations[nme]['stream'];
	this.file == '';
	if(this.allstations[nme]['current'] !== ''){
		this.getCurrentSong(this.allstations[nme]['current']);
	}
	this.current_audio = new Audio(url);
}

NVDS.Player.prototype.playPause = function(type){
	if(type == 'play'){
		this.current_audio.play();
		this.playing = true;
	}
	
	if(type == 'pause'){
		this.current_audio.pause();
		this.playing = false;
	}
}

NVDS.Player.prototype.getCurrentSong = function(file){	
	var me = this;
	this.file = file;
	function getinfo(){
	file = '';
		if(me.file == '' || me.file == undefined){
			file = 'undefined.php';
		} else {
			file = me.file;
		}
	
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.status == 200 && xhr.readyState == 4){
				var nowplaying = document.getElementById('current_song');
				nowplaying.innerHTML = xhr.responseText;
			}
		}

		xhr.open('GET', '/assets/api/' + file, true);
		xhr.send();
	}
	getinfo();
	setInterval(getinfo, 20000);
}

NVDS.Player.prototype.selectGenre = function(val){
	this.getStation(val);
}
NVDS.Player.prototype.playRadioKey = function(e){
	var timeout;
	if(e == 32 || e == 179){
		this.playradio(this.currentstation);
	}

	timeout = setTimeout(this.playRadioKey, 5000);
}