function renderList(movies, user) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Filmliste</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <div>
            ${renderUser(user)}
        </div>
        <table>
            <tr>
                <th>Titel</th>
                <th>Jahr</th>
                <th>Öffentlich</th>
                <th>Besitzer</th>
                <th></th>
                <th></th>
            </tr>
            ${movies.map(movie => 
                movie.public || (user && movie.owner === user.username) ? `<tr>
                    <td>${movie.title}</td>
                    <td>${movie.year}</td>
                    <td>${movie.public ? 'Ja' : 'Nein'}</td>
                    <td>${movie.owner ? movie.owner : ""}</td>
                    ${renderActions(movie, user)}
                </tr>` : ''
                ).join('')}
        </table>
    </body>
    </html>
    `;
}

function renderActions(movie, user) {
    if (user && movie && movie.owner && user.username === movie.owner) {
        return `<td><a href="/movie/remove/${movie.id}">Löschen</a></td>
                <td><a href="/movie/edit/${movie.id}">Ändern</a></td>`
    }
    
    return `<td><a href="/movie/details/${movie.id}">Ansehen</a></td>`;                
}

function renderUser(user) {
    if (user) {
        return `
        <div class="user-bar">
            <p class="user-text">Sie sind angemeldet als ${user.username}. Ihr Name lautet ${user.firstname} ${user.lastname}</p>
            <a href="/logout">Abmelden</a>
            <a href="/movie/edit">Neuer Film</a>
            <div class="divider"></div>
        </div>
        `;
    }

    return `
        <div class="user-bar"> 
            <p class="user-text">Melden sie sich an um Ihre Filme hinzuzufügen</p>
            <a href="/login">Anmelden</a>
            <div class="divider"></div>
        </div>
    `;
}

function renderMovie(movie, user) {
    if (!user || !movie || !movie.owner || user.username !== movie.owner) {
        return 'Sie sind nicht berechtigt diesen Film zu ändern<br><a href="/">Zurück</a>';
    }
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Filmliste</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        ${renderUser(user)}
        <form action="/movie/save" method="post">
            <input type="hidden" name="id" value="${movie.id}">
            <div>
                <label for="title">Titel:</label>
                <input type="text" id="title" name="title" value="${movie.title}">
            </div>
            <div>
                <label for="year">Jahr:</label>
                <input type="text" id="year" name="year" value="${movie.year}">
            </div>
            <div>
                <label for="public">Öffentlich:</label>
                <input type="checkbox" id="public" name="public" ${movie.public ? 'checked' : ''}>
            </div>
            <input type="submit" value="Speichern">
            <a href="/movie">Zurück</a>
        </form>
    </body>
    </html>
    `;
}

function renderDetails(movie, user) {
    if (!movie) {
        return '';
    }

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Filmliste</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        ${renderUser(user)}
        <table>
            <tr><td>Titel:</td><td>${movie.title}</td></tr>
            <tr><td>Jahr:</td><td>${movie.year}</td></tr>
            <tr><td>Öffentlich:</td><td>${movie.public}</td></tr>
            <tr><td>Besitzer:</td><td>${movie.owner}</td></tr>
        </table>
        <a href="/movie">Zurück</a>
    </body>
    </html>
    `;
}

module.exports = { renderList, renderMovie, renderDetails };