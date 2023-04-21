const passport = require('passport');
const expressSession = require('express-session');
const localStrategy = require('passport-local');
const crypto = require('crypto');

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

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => done(null, user.username));
    passport.deserializeUser((username, done) => {
        authModel.get(username)
            .then(user => {
                if (user[0])
                    done(null, user[0])
                else
                    done(null, false);
            })
            .catch(err => done(null, false));
    });

    passport.use(new localStrategy(
        (username, password, done) => {
            authModel.get(username)
                .then(user => {
                    user = user[0];

                    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
                    
                    if (user && user.passwordhash == passwordHash) {
                        user.passwordhash = '';
                        done(null, user);
                    }

                    else {
                        done(null, false);
                    }
                })
                .catch(err => done(null, false));
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
                if (err) return next(err);
                res.redirect("/");
            });
        });
};