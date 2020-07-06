const express = require('express');
const passport = require('passport');
const mysql = require("mysql");

const router = express.Router();

//USER TEST
router.get("/test", (req, res) => {
    const json = {
        test: "running - complete",
        outcome: "sucess"
    }
    res.send(json);
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

//Checks a user is Authenticated
router.get("/auth", async function(req, res) {
    if(req.isAuthenticated()) {
        
        const userDetails = await GetUserByID(req.user);
        
        const json = {
            through: "YES",
            auth: true,
            user: userDetails 
        }
        
        res.send(json);
} else {
    const json = {
        through: "yes",
        auth: false, 
    }
    res.send(json);
}
});

router.get("/login", function(req, res, next) { 

    passport.authenticate('local', function (err, user, info) {
    if(err) {
        const json = {
            error: err,
        }
        res.send(json);
    } else {
        if(!user) {
            res.send({...user, message: "Login unsuccessful", info: info.message});
        } else {
            req.login(user, function(error) {
                if(error) {
                    return res.status(500).json({
                        message: "oops, something happed",
                    });
                }
                return res.json({...user, message: "Logged in successful"});
            });
        }
    }
})(req, res, next);
});

//GOOGLE LOGIN
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/development',
    passport.authenticate('google', { failureRedirect: '/passport-error' }),
    function(req, res) {
      // Successful authentication, send successful json.
      const json = {
        error: "null",
        message: "Logged in successfully", 
        name: req.user.displayName,
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

//LOG OUT OF USER
router.get("/logout", (req, res) => {
    req.logOut();
    const json = {
        error: "null",
        message: "User logged out"
    }
    res.redirect("http://localhost:3000/");
});

//FORCE LOG OUT
router.get("/f/logout", (req, res) => {
    req.logOut();
    const json = {
        error: "null",
        message: "User logged out"
    }
    res.send(json);
})

//FUNCTIONS

//Works alongside the '/auth' route
function GetUserByID(id) {
    return new Promise ((resolve, reject) => {
    
        const data = {id: id}
        const FIND_QUERY = "SELECT * FROM users WHERE ?";

        connection.query(FIND_QUERY, data, (err, result) => {
            if(err) {
                console.log(err);
                reject();
            } else {
                resolve(result[0]);
            }
        });
        })
    
}

module.exports = router;