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
    },
    {
        initials: "LOU",
        score: 300
    },
    {
        initials: "ASH",
        score: 400
    },
    {
        initials: "JFK",
        score: 500
    },
    {
        initials: "KFC",
        score: 600
    },
    {
        initials: "FBI",
        score: 700
    },
    {
        initials: "NYC",
        score: 800
    },
    {
        initials: "EEH",
        score: 900
    },
    {
        initials: "WTF",
        score: 1000
    }
]);

