const passport = require('passport');
const expressSession = require('express-session');
const localStrategy = require('passport-local');

const authView = require('./auth.view');
const authModel = require('./auth.model');

module.exports = function (app) {
    app.use(
        expressSession({
            secret: 'mySecretKey',
            resave: false,
            saveUninitialized: false
        })
    );

    passport.serializeUser((user, done) => done(null, user.username));
    passport.deserializeUser((id, done) => {
        const user = authModel.get(id);
        if (user) { done(null, user); }
        else { done(null, false); }
    });

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new localStrategy(
        (username, password, done) => {
            const user = authModel.get(username);
            if (user && user.password == password) {
                user.password = '';
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
    ));

    app.get('/login', (req, res) => res.send(authView.login(req.query.error)));
    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/login?error=Notallowed' }),
        (req, res) => res.redirect(req.session.returnTo ? req.session.returnTo : '/')
    );
    app.get('/logout',
    (req, res) => {
        req.logout(req.user, err => {
            req.session.returnTo = undefined;
            if(err) return next(err);
            res.redirect("/");
        });
    });
};