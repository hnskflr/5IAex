const movieModel = require('./movie.model.js');
const movieView = require('./movie.view.js');

function listAction(request, response) {
    movieModel.getAll()
        .then(movies => response.send(movieView.renderList(movies, request.user)))
        .catch(error => response.send(movieView.renderrenderDatabaseError()));
}

function detailsAction(request, response) {
    movieModel.get(request.params.id)
        .then(movie => response.send(movieView.renderDetails(movie[0], request.user)))
        .catch(error => response.send(movieView.renderDatabaseError()));
}

function removeAction(request, response) {
    movieModel.get(request.params.id)
        .then(movie => {

            if (movie[0].owner !== request.user.id) {
                response.status(403).send('Sie sind nicht berechtigt diesen Film zu löschen<br><a href="/">Zurück</a>');
            }

            else {
                movieModel.remove(request.params.id);
                response.redirect(request.baseUrl);
            }
        });

}

function editAction(request, response) {
    if (request.params.id) {
        movieModel.get(request.params.id).then(movie =>
            response.send(movieView.renderMovie(movie[0], request.user))
        );
    }
    else {
        let movie = { id: '-1', title: '', year: '', published: false, owner: request.user.id };
        response.send(movieView.renderMovie(movie, request.user));
    }
}

function saveAction(request, response) {
    const movie = {
        id: request.body.id,
        title: request.body.title,
        year: request.body.year,
        published: request.body.published === 'on',
        owner: request.user.id,
    };

    try {
        movieModel.save(movie);
    } catch (error) {
        console.log(error);
    }
    response.redirect(request.baseUrl);
}

function importAction(request, response) {
    try {
        const movies = JSON.parse(request.files.importfile.data.toString('ascii'));
        console.log(movies);
        movieModel.importMovies(movies, request.user)
            .then((result) => response.send(movieView.renderImportMessage(result)))
            .catch((error) => response.send(movieView.renderImportMessage(error)));
    } catch (error) {
        response.send('Falsches JSON-Format');
    }
}

module.exports = { listAction, removeAction, editAction, saveAction, detailsAction, importAction };