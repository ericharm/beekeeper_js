Sound = function (src) {

    var removeExpiredElements = function (className) {
        $("." + className).each(function () {
            if (this.ended) $(this).remove();
        });
    };

    var sound = {
        src: src,
        element: null,

        addToDOM: function () {
            this.element = document.createElement("audio");
            document.body.appendChild(this.element);
            this.element.setAttribute("preload", "auto");
            this.element.setAttribute("controls", "none");
            this.element.style.display = "none";
            this.element.type = "audio/mpeg";
            this.element.src = this.src;
            this.element.className = src.split("/")[1].split(".")[0];
        },

        playing: function () {
            return !player.paused && !player.ended && 0 < player.currentTime;
        },

        play: function () {
            this.addToDOM();
            removeExpiredElements(this.element.className);
            this.element.play();
        },

        stop: function(){
            this.element.pause();
        }
    };

    //sound.init();
    return sound;

};

module.exports = Sound;
