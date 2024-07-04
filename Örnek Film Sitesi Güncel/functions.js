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
        genre: selectedGenre,
        rating: 0
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
        <div class="rating">
            ${generateStars(movie.id, movie.rating)}
        </div>
        <button class="delete-btn" onclick="deleteMovie(${movie.id})">Sil</button>
    `;

    movieList.appendChild(li);
}

function generateStars(movieId, rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="star" data-movie-id="${movieId}" data-rating="${i}" onclick="rateMovie(${movieId}, ${i})">${i <= rating ? '★' : '☆'}</span>`;
    }
    return starsHtml;
}

function rateMovie(movieId, rating) {
    var movies = getMovies();
    var movie = movies.find(m => m.id === movieId);
    if (movie) {
        movie.rating = rating;
        saveMovies(movies);
        renderMovies(movies);
    }
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
        displayMovie(movie);
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
