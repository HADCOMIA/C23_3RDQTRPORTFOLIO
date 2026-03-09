movieList = JSON.parse(localStorage.getItem("savedMovies")) || [];
dispMovies(movieList);

const form = document.querySelector('form');
form.reset();

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (confirm("Confirm to save")) {
        movieList.push ({
            title: title.value,
            date: year.value,
            genre: genre.value
        });

        localStorage.setItem("savedMovies", JSON.stringify(movieList));
        dispMovies(movieList);
    }
});

function dispMovies(movieList) {
    let dispList = "";
    let listMovies = document.getElementById("listMovies");

    for (let movie=0; movie < movieList.length; movie++) {
        dispList += `<p>${movieList[movie].title}<span> (</span>${movieList[movie].date}<span>) </span>
                    ${movieList[movie].genre}</p>`;
    }

    listMovies.innerHTML = dispList;
}