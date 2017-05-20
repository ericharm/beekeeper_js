describe("Highscores API", function () {

    var request = require("request");
    var base_url = "http://localhost:8081/";

    describe("GET /highscores", function () {
        it("retrieves the highscores collection", function () {
            request(base_url + "highscores", function(error, response, body) {

                expect(true).toBe(false);
                done();
            });
        });
    });

});

