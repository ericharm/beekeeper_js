Sound = function (src) {

    var sound = {
        src: src,
        element: null,

        init: function () {
            this.element = document.createElement("audio");
            document.body.appendChild(this.element);
            this.element.setAttribute("preload", "auto");
            this.element.setAttribute("controls", "none");
            this.element.style.display = "none";
            this.element.type = "audio/mpeg";
            this.element.src = this.src;
        },

        play: function () {
            this.element.play();
        },

        stop: function(){
            this.element.pause();
        }
    };

    sound.init();
    return sound;

};

module.exports = Sound;
