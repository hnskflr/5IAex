const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const authController = require('./auth/auth.controller.js');
authController(app);

const movieRouter = require('./movie/movie.router.js');
app.use('/movie', movieRouter);

app.get('/', (req, res) => res.redirect('/movie'));

app.use(express.static(__dirname));

app.listen(8080, () => console.log('Listening on port 8080!'));
