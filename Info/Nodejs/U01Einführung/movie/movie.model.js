const { v4: uuid } = require('uuid');

let data = [
    { id: uuid(), title: 'Iron Man', year: '2008', owner: 'sepp', public: true, },
    { id: uuid(), title: 'Thor', year: '2011', owner: 'resi', public: true },
    { id: uuid(), title: 'Capitain America', year: '2001', owner: 'rudi', public: true }
];

function getAll() {
    return data.sort((a, b) => a.title.localeCompare(b.title));
}

function remove(id) {
    data = data.filter(movie => movie.id !== id);
}

function get(id) {
    return data.find(movie => movie.id === id);
}

function save(movie) {
    if (movie.id === '-1') {
        movie.id = uuid();
        data.push(movie);
    } else {
        data = data.map(item => item.id === movie.id ? movie : item);
    }
}

module.exports = { getAll, remove, get, save };