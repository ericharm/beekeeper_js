conn = new Mongo();
db = conn.getDB("beekeeper");

db.highscores.insert([
    {
        initials: "ABC",
        score: 100
    },
    {
        initials: "UZI",
        score: 200
    }
]);

