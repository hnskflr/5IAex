const Database = require('../utils/database');

const connectionProperties = {
    host: 'localhost',
    user: 'hannes',
    password: '69696996',
    database: 'movie-db'
};

function get(username) {
    const db = new Database(connectionProperties);
    const user = db.queryClose('SELECT * FROM users WHERE username = ?', [username]);
    return user;
}

module.exports = { get };