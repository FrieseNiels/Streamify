if(!window.NVDS) window.NVDS = new Object();

NVDS.ScreenSaver = function NVDS_ScreenSaver(){
    this.init();
    this.ScreenSaver = 'closed';
}

NVDS.ScreenSaver.prototype.constructor = NVDS.ScreenSaver;

NVDS.ScreenSaver.prototype.init = function(){
    this.videos = [];
    this.addEventListeners();
    this.setVideos();
}

NVDS.ScreenSaver.prototype.addEventListeners = function(){
    var me = this;
    var btn = document.getElementById('screensaver-btn');
    if(btn != null){
        btn.addEventListener('click', function(){
            me.toggleScreenSaver();
        }, false);
    }

    var fullscreen = document.getElementsByClassName('fullscreen');
    if(fullscreen != null && fullscreen.length >= 0){
        for(var i=0; i<fullscreen.length; i++){
            fullscreen[i].addEventListener('click', function(){
                me.toggleScreenSaver();
            }, false)
        }
    }
}

NVDS.ScreenSaver.prototype.toggleScreenSaver = function(){
    var fullscreen = document.getElementsByClassName('fullscreen');
    if(fullscreen != null && fullscreen.length >= 0){
        for(var i=0; i<fullscreen.length; i++){
            var curr = fullscreen[i].style.display;
            if(curr == "none"){
                fullscreen[i].style.display = "block";
                this.ScreenSaver = 'opened';
                this.loadVideos();
            } else if(curr == "block"){
                fullscreen[i].style.display = "none";
                this.ScreenSaver = 'closed';
                this.unloadVideos();
            }
        }
    }
}
 
NVDS.ScreenSaver.prototype.setVideos = function(){
    this.videos = [
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_C007_C011_08244D_001_v01_6M_HB_tag0.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_C002_C005_0818SC_001_v01_6M_HB_tag0.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_C007_C004_0824AJ_001_v01_6M_HB_tag0.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D002_C003_t9_6M_HB_tag0.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D001_C005_t9_6M_HB_tag0.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D008_C010_v04_6Mbps.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D001_C001_v03_6Mbps.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D011_D009_SIGNCMP_v15_6Mbps.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D011_C010_v10_6Mbps.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_GL_G004_C010_v03_6Mbps.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/plate_G002_C002_BG_t9_6M_HB_tag0.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_GL_G010_C006_v08_6Mbps.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_LW_L001_C006_t9_6M_tag0.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_LA_A005_C009_v05_t9_6M.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_LA_A006_C008_t9_6M_HB_tag0.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_LA_A008_C004_ALT_v33_6Mbps.mov',
        'http://a1.v2.phobos.apple.com.edgesuite.net/eu/r1000/000/Features/atv/AutumnResources/videos/comp_LA_A009_C009_t9_6M_tag0.mov'

    ];
}

NVDS.ScreenSaver.prototype.getRandomVideo = function(){
    var videos = this.videos;
    var count = videos.length;
    var key = Math.floor(count * Math.random());
    return this.videos[key];
}

NVDS.ScreenSaver.prototype.replaceVideo = function(){
    if(document.getElementById('bgvid') != null){
        document.getElementById('bgvid').outerHTML = "";
        var fullscreen = document.getElementsByClassName('fullscreen');
        var video = this.createVideoElement(this.getRandomVideo());    
        for(var i=0; i<fullscreen.length; i++){
            fullscreen[i].appendChild(video);
        }
    }
}

NVDS.ScreenSaver.prototype.createVideoElement = function (url){
    var me = this;
    var mp4 = document.createElement('video');
    mp4.id = "bgvid";
    mp4.src = url;
    mp4.autoplay = true;
    mp4.onended = this.replaceVideo(this);
    mp4.addEventListener('ended', function(){
        me.replaceVideo();
    })
    return mp4;
}

NVDS.ScreenSaver.prototype.loadVideos = function()
{
    if(this.ScreenSaver != 'closed'){
        var fullscreen = document.getElementsByClassName('fullscreen');
        var video = this.createVideoElement(this.getRandomVideo());    
        for(var i=0; i<fullscreen.length; i++){
            fullscreen[i].appendChild(video);
        }
    }
}

NVDS.ScreenSaver.prototype.unloadVideos = function(){
    if(this.ScreenSaver != 'opened'){
        var video = document.getElementById('bgvid');
        video.outerHTML = "";
    }
}
