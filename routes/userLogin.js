require('dotenv').config();
const express = require('express');
const passport = require('passport');
const mysql = require("mysql");
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const generatePass = require('generate-password');

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
        
        if(req.user == process.env.ADMIN_ID) {
            const json = {
                through: "YES",
                auth: true,
                role: "superAdmin",
            }
            res.send(json);
        } else {

            const userDetails = await GetUserByID(req.user);
            const json = {
                through: "YES",
                auth: true,
                role: "user",
                user: userDetails 
            }
            res.send(json);
        }
        
        
} else {
    const json = {
        through: "yes",
        auth: false, 
    }
    res.send(json);
}
});

// Admin - check if user is authenticated and has permission
router.get("/administrator/auth", (req, res) => {
    if(req.isAuthenticated()) {
        if(req.user != process.env.ADMIN_ID) {
            const json = {
                auth: true,
                access: "denied"
            }
            res.send(json);
        } else {
            const json = {
                auth: true,
                access: "granted"
            }
            res.send(json);
        }
    } else {
        const json = {
            auth: false
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
                return res.json({...user, role: "user", message: "Logged in successful"}); //NEEDS CHANGING WHEN ADDING ROLE TO DATABASE
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
    //res.redirect(process.env.REDIRECT_URL);
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
            //res.send(json);
            res.redirect(process.env.REDIRECT_URL);
        } else {
            const json = {
                error: "null",
                access: "denied"
            }
            console.log('access denied');

            //Log action into database
            const date = new Date().toLocaleString('en-GB', {timeZone: 'UTC'});
            //logAdminAction(date, 'Unauthorised login attempted into the admin area');
            //res.send(json);
            res.redirect(process.env.REDIRECT_URL);
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
    console.log("LO");
    req.logOut();
    const json = {
        error: "null",
        message: "User logged out"
    }
    res.send(json);
});

//LOG OUT OF ADMINISTRATOR
router.get("/administrator/logout", (req, res) => {
    req.logOut();
    const json = {
        error: "null",
        message: "User logged out"
    }
    res.redirect("/administrator");
});

//FORCE LOG OUT
router.get("/f/logout", (req, res) => {
    req.logOut();
    const json = {
        error: "null",
        message: "User logged out"
    }
    res.send(json);
});

//REGISTER
router.get("/register/:name/:email/:password/:confirmPassword", async (req, res) => {
    console.log("There's a hit!");
    try {
            const name = req.params.name;
            const email = req.params.email;
            const password = req.params.password;
            const confirmPassword = req.params.confirmPassword;
            const uid = uuid();
            
            if(/^[a-zA-Z0-9- ]*$/.test(name) == false) 
            {
                const json = {
                    error: "null",
                    userError: "Yes",
                    message: "You cannot have any special characters in your name"
                }
                res.send(json);
            } else if (!ValidateEmail(email)) {
                const json = {
                    error: "null",
                    userError: "Yes",
                    message: "The email address you have provided is not valid"
                }
                res.send(json);
            } else if (!ValidatePassword(password)) {
                const json = {
                    error: "null",
                    userError: "Yes",
                    message: "Your password is not strong enough"
                }
                res.send(json);
            } else if(confirmPassword != password){
                const json = {
                    error: "null",
                    userError: "Yes",
                    message: "Your passwords do not match"
                }
                res.send(json);
            } else {
                console.log("Registering...");
                const hashedPassword = await bcrypt.hash(password, 10);
                const data = {id: uid, strategy: "local", displayName: name, email: email, password: hashedPassword}
                const INSERT_QUERY = "INSERT INTO users SET ?";
                connection.query(INSERT_QUERY, data, (err) => {
                    if(err) {
                        console.error(err);
                    } else {
                        const json = {
                            error: "null",
                            userError: "null",
                            message: "User registered successfully"
                        }
                        res.send(json);
                    }
                })}            
    } catch(e) {
        console.log(e);
    }
    //console.log(users);
});

//TEST REGISTER POST
router.post("/registerPost", async (req, res) => {
    
    const orgName = req.body.orgName;
    const orgRooms = req.body.orgRooms;
    const authLocal = req.body.authLocal;
    const authGoogle = req.body.authGoogle;
    const pName = req.body.pName;
    const pEmail = req.body.pEmail;
    
    // console.log(orgName + '/' + orgRooms + '/' + authLocal + '/' + authGoogle + '/' + pName + '/' + pEmail)

    if(!ValidateNumber(orgRooms)) {
        const json = {
            error: "null",
            userError: "Yes",
            message: "The allocated rooms can only contain numbers"
        }
        res.send(json);
    } else if(!ValidateEmail(pEmail)) {
        const json = {
            error: "null",
            userError: "Yes",
            message: "The email address you have provided is not valid"
        }
        res.send(json);
    }else if(authLocal == 'false' && authGoogle == 'false') {
        const json = {
            error: "null",
            userError: "Yes",
            message: "Please select a login option"
        }
        res.send(json);
    }else {
        
        const user = await GetUserByEmail(pEmail);
        
        if(user != null) {
            const json = {
                error: "null",
                userError: "Yes",
                message: "The email address you have provided has already been used"
            }
            res.send(json);
        }
        else {
            try {
                // console.log("HERE!!");
                const password = generatePass.generate({length: 10, numbers: true, uppercase: true});
                const orgID = generatePass.generate({length: 10, numbers: true, uppercase: false, lowercase: false, symbols: false});

                const resultOrg = await addOrganisation(orgName, orgRooms, authLocal, authGoogle, pName, pEmail, orgID);
                const resultUser = await addUser(pName, pEmail, authLocal, password, authGoogle, "seniorAdmin", orgID);
        
                if(resultOrg == "Success" && resultUser == "Success") {

                    //Send email
                    let mailOptions = {
                        from: '"My STAFF" <staff-development@high-view-studios.co.uk>', // sender address
                        to: pEmail, // list of receivers
                        subject: "Welcome to My STAFF", // Subject line
                        template: 'organisationReg',
                        context: {
                            name: pName,
                            email: pEmail,
                            orgName: orgName,
                            authLocal: authLocal,
                            authGoogle: authGoogle,
                            localPassword: password,
                            orgID: orgID
                        }
                    };
                    //send mail with defined transport object
                    // email.mail.sendMail(mailOptions, (error, info) => {
                    //     if(error) {
                    //         return console.log(error);
                    //     }
                    // console.log("Message sent: %s", info.messageId);
                    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                    // console.log("Email has been sent");
                    // });

                    const json = {
                        error: "null",
                        userError: "null",
                        message: "Successfully added"
                    }
                    res.send(json);
                } else {
                    const json = {
                        error: "YES",
                        userError: "null",
                        message: "There was an error"
                    }
                    res.send(json);
                } 
                }
                catch (err) {
                    console.log(err);
                }
            }
    }
});

router.get('/administrator/addOrganisation/:orgName/:orgRooms/:authLocal/:authGoogle/:pName/:pEmail', async (req, res) => {
    
    const orgName = req.params.orgName;
    const orgRooms = req.params.orgRooms;
    const authLocal = req.params.authLocal;
    const authGoogle = req.params.authGoogle;
    const pName = req.params.pName;
    const pEmail = req.params.pEmail;

    if(!ValidateNumber(orgRooms)) {
        const json = {
            error: "null",
            userError: "Yes",
            message: "The allocated rooms can only contain numbers"
        }
        res.send(json);
    } else if(!ValidateEmail(pEmail)) {
        const json = {
            error: "null",
            userError: "Yes",
            message: "The email address you have provided is not valid"
        }
        res.send(json);
    }else if(authLocal == 'false' && authGoogle == 'false') {
        const json = {
            error: "null",
            userError: "Yes",
            message: "Please select a login option"
        }
        res.send(json);
    }else {
        
        const user = await GetUserByEmail(pEmail);

        if(user != null) {
            const json = {
                error: "null",
                userError: "Yes",
                message: "The email address you have provided has already been used"
            }
            res.send(json);
        }
        else {
            try {
                const password = generatePass.generate({length: 10, numbers: true, uppercase: true});
                const orgID = generatePass.generate({length: 10, numbers: true, uppercase: false, lowercase: false, symbols: false});

                const resultOrg = await addOrganisation(orgName, orgRooms, authLocal, authGoogle, pName, pEmail, orgID);
                const resultUser = await addUser(pName, pEmail, authLocal, password, authGoogle, "seniorAdmin", orgID);
        
                if(resultOrg == "Success" && resultUser == "Success") {

                    //Send email
                    let mailOptions = {
                        from: '"My STAFF" <staff-development@high-view-studios.co.uk>', // sender address
                        to: pEmail, // list of receivers
                        subject: "Welcome to My STAFF", // Subject line
                        template: 'organisationReg',
                        context: {
                            name: pName,
                            email: pEmail,
                            orgName: orgName,
                            authLocal: authLocal,
                            authGoogle: authGoogle,
                            localPassword: password,
                            orgID: orgID
                        }
                    };
                    //send mail with defined transport object
                    // email.mail.sendMail(mailOptions, (error, info) => {
                    //     if(error) {
                    //         return console.log(error);
                    //     }
                    // console.log("Message sent: %s", info.messageId);
                    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                    // console.log("Email has been sent");
                    // });

                    const json = {
                        error: "null",
                        userError: "null",
                        message: "Successfully added"
                    }
                    res.send(json);
                } else {
                    const json = {
                        error: "YES",
                        userError: "null",
                        message: "There was an error"
                    }
                    res.send(json);
                } 
                }
                catch (err) {
                    console.log(err);
                }
            }
    }

});

//FUNCTIONS

function ValidateEmail(mail) 
{
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
{
    return (true)
}
    return (false)
}

function ValidateNumber(number) 
{
    if (!/[0-9]/.test(number))
    {
        return false;
    } else {
        return true;
    }
}

function ValidatePassword(password) {
    let check = true;
    
    if(password.length <= 8) {
        check = false;
    } else if(!/[a-z]/.test(password)) {
        check = false;
    } else if(!/[A-Z]/.test(password)){
        check = false;
    } else if(!/\d/.test(password)) {
        check = false;
    } else if(!password.match(/[!@#$%^&*()]/)) {
        check = false;
    }
    
    return check;
}

function GetUserByEmail(email) {
    return new Promise ((resolve, reject) => {
    
        const data = {email: email}
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

function addOrganisation(orgName, orgRooms, authLocal, authGoogle, pName, pEmail, orgID) {

    return new Promise ((resolve, reject) => {
       
        const data = {name: orgName, POC_Name: pName, POC_Email: pEmail, auth_Local: authLocal, auth_Google: authGoogle, allocatedRooms: orgRooms, orgID: orgID};
        const query = "INSERT INTO organisations SET ?";
        connection.query(query, data, (err) => {
            if(err) {
                reject();
            } else {
                resolve("Success");
            }
        });
    });
    
}

function addUser(name, email, authLocal, localPassword, authGoogle, role, orgID) {
    return new Promise(async (resolve, reject) => {

        const uid = uuid();
        let hashedPassword = ''; 
        if(authLocal == "true") {
            hashedPassword = await bcrypt.hash(localPassword, parseInt(process.env.SALT));
        }

        const data = {id: uid, displayName: name, email: email, password: hashedPassword, requestedPassword: 'false', new: "true", role: role, orgID: orgID}
        const query = "INSERT users SET ?";
        connection.query(query, data, (err, result) => {
            if(err) {
                console.log(err);
                reject();
            } else {
                resolve("Success");
            }
        })


    });
}

module.exports = router;