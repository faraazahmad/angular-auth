const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require("cors");
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

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request.')
    }
    let token  = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.status(401).send('Unauthorized request.')
    }
    let payload = jwt.verify(token, jwtSecret);
    if (!payload) {
        return res.status(401).send('Unauthorized request.')
    }
    req.username = payload.subject;
    next();
}

// -------------------------------------------------------------------------------

app.use(cors());
app.use(validator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
            res.send({ token: createToken() });
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (error) {
        throw error;
    }
});

app.get("/resource", verifyToken, (req, res) => {
    res.send({ resource: "Roads? Where we\'re going, we don\'t need roads." });
});

app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
});