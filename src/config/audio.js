module.exports = {
    mp3s: {
        menuMusic: "audio/menu.mp3",
        gameMusic: "audio/music.mp3",
        scroll: "audio/scroll.mp3",
        select: "audio/select.mp3",
        sting: "audio/sting.mp3",
        smoke: "audio/smoke.mp3"
    },
    // fix the repetition between this and game over
    stopAudio: function () {
        $("audio").each(function () {
            if ($(this).attr("loop")) this.pause();
        });
    }
};


