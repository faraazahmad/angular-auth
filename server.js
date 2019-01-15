const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const jwtSecret = 'dundermifflin';
const jwtOptions = {
    algorithm: 'HS512', // HS512 = HMAC + SHA-512
    expiresIn: '1d', // 1 day
};

const user = {
    username: "admin",
    password: "admin"
};

// -------------------------------------------------------------------------------

app.use((err, req, res, next) => {
    if (err.name == "UnauthorizedError") {
        res.status(500).send(err.message);
    }
});

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username == user.username && password == user.password) {
        // generate token and send
        res.send(createToken());
    }
    else {
        res.sendStatus(400);
    }
});

app.get("/resource", jwtVerifier({ secret: secret }), (req, res) => {
    res.send("Where we\'re going, we don\'t need roads.");
});

function createToken() {
    var token = jwt.sign({ userID: user.username }, jwtSecret, jwtOptions);
    return token;
}

app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
});