const express = require('express');
const jwt = require('jsonwebtoken');
const jwtVerifier = require('express-jwt');
const validator = require('express-validator');
const bodyParser = require('body-parser');

var app = express();
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

function createToken() {
    var token = jwt.sign({ userID: user.username }, jwtSecret, jwtOptions);
    return token;
}

// -------------------------------------------------------------------------------

app.use(validator());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
    if (err.name == "UnauthorizedError") {
        res.status(500).send(err.message);
    }
});

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;
        if (username == user.username && password == user.password) {
            // generate token and send
            res.send(createToken());
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (error) {
        throw error;
    }
});

app.get("/resource", jwtVerifier({ secret: jwtSecret }), (req, res) => {
    res.send("Where we\'re going, we don\'t need roads.");
});

app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
});