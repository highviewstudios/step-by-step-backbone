const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');

const initialisePassport = require('./passport/passport-config');
initialisePassport(passport);

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //NEED THIS AS WELL AS THE LINE ABOVE TO RECIEVE DATA FROM REACT USING AXIOS
app.use(cookieSession({
    name: 'session',
    keys: ['key1, key2'],
}));
app.use(passport.initialize());
app.use(passport.session());

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

//ROUTE THAT ACCESSES OTHER COMPONENTS IN REACT - NEEDS TO GO BELOW EVERY OTHER ROUTE
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on port 8080");
});