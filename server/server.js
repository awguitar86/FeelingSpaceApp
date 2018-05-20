const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;
const getDb = require('./bootstrap.database');
const usersRouter = require('./controller');
require('dotenv').config()
const session = require('express-session')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
// auth0 strategy
const strategy = new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/login",
    scope: 'openid email profile'
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        // console.log('profile', profile)
        // get name and other relevant data
        const user = {
            auth_id: profile.id,
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            name: profile._json.name
        }
        return done(null, user)
    }
)
passport.use(strategy)
passport.serializeUser(function (user, done) {
    console.log('serializing user to session: user: ', user)
    //req.session.passport.user
    done(null, user)
})
passport.deserializeUser(function (user, done) {
//from database this would be app.db.get_all_users or whatever it would be.
    console.log('deserializing user: ', user);
    done(null, user)
})

// ENDPOINTS
//auth endpoint
app.get('/login', passport.authenticate('auth0', {
    successRedirect: (process.env.NODE_ENV == 'dev' ? 'http://localhost:3000' : '' ) + "/home",
    failureRedirect: (process.env.NODE_ENV == 'dev' ? 'http://localhost:3000' : '' ) + "/"
}))
// check for logged in user
app.get('/check', function (req, res) {
    console.log('checking for logged in user')
    //check if user has logged in
    if (req.session.passport) {
        const db = getDb();
        console.log(req.session.passport.user.name);
        const { name } = req.session.passport.user;
        db.get_user([name])
            .then( user => res.status(200).send(user))
            .catch( err => res.status(500).send(err));
        // console.log(req.user.email);
        // res.status(200).send(req.session.passport.user)
    } else res.status(401).send('unauthorized')
})
//logout
app.get('/logout', function (req, res) {
    //req.logout()
    console.log('loggin out')
    req.session.destroy(function () { res.send(200) })
})

app.use('/api/users', usersRouter);

// app.get('*', (req, res) => {
//     res.sendFile('index.html', {root: path.join(__dirname, '../build')});
// });

app.listen(port, () =>
    console.log(`===================================\n Server is listening on port ${port}.\n===================================`
));