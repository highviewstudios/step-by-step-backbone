const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

const initialisePassport = require('./passport/passport-config');
initialisePassport(passport);

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

app.get('/ping', (req, res) => {
    res.send('pong');
});

//MAIN ROUTE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//ROUTE FILES
const userLogin = require('./routes/userLogin');
app.use(userLogin);


app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on port 8080");
});