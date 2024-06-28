document.addEventListener('DOMContentLoaded', loadMovies);

document.getElementById('movie-form').addEventListener('submit', addMovie);

function addMovie(e) {
    e.preventDefault();

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;

    if (title === '' || description === '') {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }

    var movie = {
        id: Date.now(), 
        title: title,
        description: description,
        genre: selectedGenre
    };

    var movies = getMovies();
    movies.push(movie);
    saveMovies(movies);

    displayMovie(movie);

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    selectedGenre = ''; 
}

function displayMovie(movie) {
    var movieList = document.getElementById('movie-list');

    var li = document.createElement('li');
    li.setAttribute('data-id', movie.id); 
    li.innerHTML = `
        <strong>${movie.title}</strong>
        <p>${movie.description}</p>
        <span class="genre">${movie.genre}</span>
        <button class="delete-btn" onclick="deleteMovie(${movie.id})">Sil</button>
    `;
    
    movieList.appendChild(li);
}

function deleteMovie(id) {
    var movies = getMovies();
    var updatedMovies = movies.filter(movie => movie.id !== id);
    saveMovies(updatedMovies);
    renderMovies(updatedMovies);
}

function renderMovies(movies) {
    var movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        var li = document.createElement('li');
        li.setAttribute('data-id', movie.id);
        li.innerHTML = `
            <strong>${movie.title}</strong>
            <p>${movie.description}</p>
            <span class="genre">${movie.genre}</span>
            <button class="delete-btn" onclick="deleteMovie(${movie.id})">Sil</button>
        `;
        movieList.appendChild(li);
    });
}

var selectedGenre = ''; 

function selectGenre(genre) {
    selectedGenre = genre;
    var buttons = document.querySelectorAll('.genre-btn');
    buttons.forEach(btn => {
        if (btn.textContent === genre) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function getMovies() {
    var movies = localStorage.getItem('movies');
    if (movies) {
        return JSON.parse(movies);
    } else {
        return [];
    }
}

function saveMovies(movies) {
    localStorage.setItem('movies', JSON.stringify(movies));
}

function loadMovies() {
    var movies = getMovies();
    renderMovies(movies);
}
