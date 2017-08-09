var Config = require("../../config/app.js");
var Keys = require("../../config/keys.js");

var GameOver = function (context, score) {

    //private
    var canvas = context.canvas;
    var font="30px PressStart";
    canvas.font = font;
    var currentLetter = 0;

    String.prototype.replaceAt=function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    };

    var nextLetter = function (s, backwards) {
        return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a){
            var c= a.charCodeAt(0);
            if (backwards) {
                return String.fromCharCode(--c);
            } else {
                return String.fromCharCode(++c);
            }
            //switch(c){
                //case 90: return 'A';
                //case 122: return 'a';
                //default: return String.fromCharCode(++c);
            //}
        });
    };

    var addInitialsField = function () {
        var input = document.createElement("input");
        input.type = "text";
        input.className = "initials";
        input.setAttribute('maxlength', 3);
        input.value = "AAA";
        document.getElementById("canvas-div").appendChild(input);
        $(".initials:first").focus();
    };

    var postToHighscores = function (score, initials) {
        var csrfToken = $("#csrf-token").val();
        $.ajax({
            type: "POST",
            url: "/highscores",
            data: { score: score, initials: initials, _csrf: csrfToken },
            dataType: "text",
            success: function(data) {
                console.log("Highscore saved.");
            },
            failure: function(errMsg) {
                console.log(errMsg);
            }
        });
    };

    var self = {
        update: function (deltaTime) {
            //world.update(deltaTime);
        },
        draw: function (canvas) {
            //world.render();
            canvas.globalAlpha = 0.5;
            canvas.fillStyle = "#222200";
            canvas.fillRect(0, 0, Config.canvasWidth, Config.canvasHeight);
            canvas.globalAlpha = 1.0;
            canvas.fillStyle = "#aaaa33";
            canvas.fillText("GAME OVER", 250, 200);

            canvas.fillStyle = "#ffffff";
            canvas.fillText(score, 300, 300);
        },
        processRealtimeInput: function (event, isKeyPressed) {
            //player.processRealtimeInput(event, isKeyPressed); 
            if (event.keyCode == Keys.Enter) {
                var initials = $(".initials:first").val();
                postToHighscores(score, initials);
                $(".initials").remove();
                var MainMenu = require("./main_menu.js");
                context.stateStack.pop();
                context.stateStack.push(MainMenu(context));
            }
            else if (event.keyCode == Keys.Up && isKeyPressed) {
                event.preventDefault();
                var initialsBefore = $(".initials:first").val();
                letter = nextLetter(initialsBefore[currentLetter]);
                if (initialsBefore[currentLetter] !== "Z") {
                    var initialsNow = initialsBefore.replaceAt(currentLetter, letter);
                    $(".initials:first").val(initialsNow);
                }
            }
            else if (event.keyCode == Keys.Down && isKeyPressed) {
                event.preventDefault();
                var initialsBefore = $(".initials:first").val();
                letter = nextLetter(initialsBefore[currentLetter], true);
                if (initialsBefore[currentLetter] !== "A") {
                    var initialsNow = initialsBefore.replaceAt(currentLetter, letter);
                    $(".initials:first").val(initialsNow);
                }
            }
            else if (event.keyCode == Keys.Right && isKeyPressed) {
                event.preventDefault();
                if (currentLetter < 2) currentLetter += 1;
            }
            else if (event.keyCode == Keys.Left && isKeyPressed) {
                event.preventDefault();
                if (currentLetter > 0) currentLetter -= 1;
            }
        },
        processEvent: function (event) {
            //if (event.keyCode == Keys.Enter) {
                //var initials = $(".initials:first").val();
                //postToHighscores(score, initials);
                //$(".initials").remove();
                //var MainMenu = require("./main_menu.js");
                //context.stateStack.pop();
                //context.stateStack.push(MainMenu(context));
            //}
            //else if (event.keyCode == Keys.Up) {
                //event.preventDefault();
                //console.log("up");
            //}
            //else if (event.keyCode == Keys.Down) {
                //event.preventDefault();
                //console.log("down");
            //}
        }
    };

    addInitialsField();

    return self;
};

module.exports = GameOver;

