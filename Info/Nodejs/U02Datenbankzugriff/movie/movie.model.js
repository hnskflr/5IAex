const Database = require('../utils/database');

const connectionProperties = {
    host: 'localhost',
    user: 'hannes',
    password: '69696996',
    database: 'movie-db'
};

function getAll() {
    const db = new Database(connectionProperties);
    return db.queryClose('SELECT m.id, m.title, m.year, m.published, m.owner, u.username FROM movies m, users u WHERE m.owner = u.id');
}

function remove(id) {
    const db = new Database(connectionProperties);
    db.queryClose('DELETE FROM movies WHERE id = ?', [id]).then();
}

function get(id) {
    const db = new Database(connectionProperties);
    return db.queryClose('SELECT m.id, m.title, m.year, m.published, m.owner, u.username FROM movies m, users u WHERE m.id = ? AND m.owner = u.id', [id]);
}

function save(movie) {
    return new Promise((resolve, reject) => {
        movieExists(movie.title).then(async exists => {
            if (exists.length > 0 && exists[0].id !== movie.id) {
                reject(`Film mit Titel ${movie.title} bereits vorhanden`);
                return;
            }

            const db = new Database(connectionProperties);
            if (movie.id === '-1') {
                db.queryClose('INSERT INTO movies (title, year, published, owner) VALUES (?, ?, ?, ?)', [movie.title, movie.year, movie.published, movie.owner])
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            } else {
                db.queryClose('UPDATE movies SET title = ?, year = ?, published = ?, owner = ? WHERE id = ?', [movie.title, movie.year, movie.published, movie.owner, movie.id])
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            }
        });
    });
}

function movieExists(title) {
    const db = new Database(connectionProperties);
    return db.queryClose('SELECT * FROM movies WHERE title = ?', [title]);
}

function importMovies(movies, user) {
    return new Promise(async (resolve, reject) => {
        const db = new Database(connectionProperties);
        db.queryClose('START TRANSACTION').then();

        for (let i = 0; i < movies.length; i++) {
            try {
                var result = await this.save({ id: '-1', title: movies[i].title, year: movies[i].year, published: false, owner: user.id });
                console.log(result);
            } catch (error) {
                const db = new Database(connectionProperties);
                db.queryClose('ROLLBACK').then();
                reject(error);
                return;
            }
        }
        db = new Database(connectionProperties);
        db.queryClose('COMMIT').then();
        resolve("Filme erfolgreich importiert");
    });
}

module.exports = { getAll, remove, get, save, importMovies };