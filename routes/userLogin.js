const express = require('express');
const passport = require('passport');

const router = express.Router();

//USER TEST
router.get("/test", (req, res) => {
    const json = {
        test: "running - complete",
        outcome: "sucess"
    }
    res.send(json);
});

//GOOGLE LOGIN
router.get('/auth/google',
    passport.authenticate('google', { scope: ['openid', 'email'] }));

router.get('/auth/google/development',
    passport.authenticate('google', { failureRedirect: '/passport-error' }),
    function(req, res) {
      // Successful authentication, send successful json.
      const json = {
        error: "null",
        message: "Logged in successfully", 
        id: req.user.id,
        email: req.user.emails[0].value,
        auth: req.isAuthenticated()
        }
    console.log(json);
    res.send(json);
});

//GITHUB LOGIN
router.get('/auth/github',
    passport.authenticate('github'));

router.get("/auth/github/development",
    passport.authenticate('github', {failureRedirect: '/login'}),
    function(req, res) {
        //Successful authentiaction, redirect home
        if(req.user.id == process.env.ADMIN_ID) {
            const json = {
                error: "null",
                access: "granted", 
                name: req.user.displayName
            }
            console.log('access granted');

            //Log action into database
            const date = new Date().toLocaleString('en-GB', {timeZone: 'UTC'});
            //logAdminAction(date, 'Logged into the admin area');
            res.send(json);
            //res.redirect("http://localhost:3000/administrator");
        } else {
            const json = {
                error: "null",
                access: "denied"
            }
            console.log('access denied');

            //Log action into database
            const date = new Date().toLocaleString('en-GB', {timeZone: 'UTC'});
            //logAdminAction(date, 'Unauthorised login attempted into the admin area');
            res.send(json);
            //res.redirect("http://localhost:3000/administrator");
        }
    }
);

//PASSPORT ERROR
router.get("/passport-error", (req, res) => {
    const json = {error: "passport failure redirect"};
    res.send(json);
});

module.exports = router;