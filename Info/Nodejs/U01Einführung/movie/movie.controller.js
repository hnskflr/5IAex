const movieModel = require('./movie.model.js');
const movieView = require('./movie.view.js');

function listAction(request, response) {
    response.send(movieView.renderList(movieModel.getAll(), request.user));
}

// TODO:
function detailsAction(request, response) {
    const movie = movieModel.get(request.params.id);
    response.send(movieView.renderDetails(movie, request.user));
}

function removeAction(request, response) {
    const movie = movieModel.get(request.params.id);
    if (movie.owner !== request.user.username) {
        response.status(403).send('Sie sind nicht berechtigt diesen Film zu löschen<br><a href="/">Zurück</a>');
        return;
    }
    
    movieModel.remove(request.params.id);
    response.redirect(request.baseUrl);
}

function editAction(request, response) {
    let movie = { id: '-1', title: '', year: '' };
    if (request.params.id) {
        movie = movieModel.get(request.params.id);
    }
    response.send(movieView.renderMovie(movie, request.user));
}

function saveAction(request, response) {
    const movie = {
        id: request.body.id,
        title: request.body.title,
        year: request.body.year,
        owner: request.user.username,
        public: request.body.public === 'on'
    };

    movieModel.save(movie);
    response.redirect(request.baseUrl);
}

module.exports = { listAction, removeAction, editAction, saveAction, detailsAction };