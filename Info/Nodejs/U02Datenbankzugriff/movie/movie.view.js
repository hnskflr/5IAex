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
                ${movies ? movies.map(movie => 
                    movie.published || (user && movie.owner === user.id) ? `<tr>
                        <td>${movie.title}</td>
                        <td>${movie.year}</td>
                        <td>${movie.published ? 'Ja' : 'Nein'}</td>
                        <td>${movie.username ? movie.username : movie.owner}</td>
                        ${renderActions(movie, user)}
                    </tr>` : ''
                    ).join('')
                : ""}
            </table>
        </body>
        </html>
    `;
}

function renderActions(movie, user) {
    if (user && movie && movie.owner && user.id === movie.owner) {
        return `<td><a href="/movie/remove/${movie.id}">Löschen</a></td>
                <td><a href="/movie/edit/${movie.id}">Ändern</a></td>`;
    }
    
    return `<td><a href="/movie/details/${movie.id}">Ansehen</a></td>`;                
}

function renderUser(user) {
    if (user) {
        return `
            <div class="user-bar">
                <p class="user-text">Sie sind angemeldet als ${user.username}. Ihr Name lautet ${user.firstname} ${user.secondname}</p>
                <a href="/logout">Abmelden</a>
                <a href="/movie/edit">Neuer Film</a>
                <form action="/movie/import " method="post" enctype="multipart/form-data">
                    <label for="importfile">Import-Datei:</label>
                    <input type="file" id="importfile" name="importfile">
                    <input type="submit" value="Importieren">
                </form>
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
    if (!user || !movie || !movie.owner || user.id !== movie.owner) {
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
                    <label for="published">Öffentlich:</label>
                    <input type="checkbox" id="published" name="published" ${movie.published ? 'checked' : ''}>
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
                <tr><td>Öffentlich:</td><td>${movie.published}</td></tr>
                <tr><td>Besitzer:</td><td>${movie.username ? movie.username : movie.owner}</td></tr>
            </table>
            <a href="/movie">Zurück</a>
        </body>
        </html>
    `;
}

function renderDatabaseError() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>

            <meta charset="UTF-8">
            <title>Filmliste</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Meldung</h1>
            <p>Die Web-Anwendung ist momentan überlastet. Probieren Sie es später wieder...</p>
            <a href="/movie">Wiederholen</a>
        </body>
        </html>
    `;
}

function renderImportMessage(message) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Filmliste</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Meldung</h1>
            <p>Import meldet:</p>
            <p>${message}</p>
            <a href="/movie">Zurück</a>
        </body>
        </html>
    `;
}

module.exports = { renderList, renderMovie, renderDetails, renderDatabaseError, renderImportMessage };