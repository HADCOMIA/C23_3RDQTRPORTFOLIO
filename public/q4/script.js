let selectedRating = 0;

    // Handle star clicks
    document.querySelectorAll(".star").forEach(star => {
      star.addEventListener("click", function() {
        selectedRating = this.getAttribute("data-value");
        updateStars(selectedRating);
      });
    });

    function updateStars(rating) {
      document.querySelectorAll(".star").forEach(star => {
        star.classList.remove("selected");
        if (star.getAttribute("data-value") <= rating) {
          star.classList.add("selected");
        }
      });
    }

movieList = JSON.parse(localStorage.getItem("savedMovies")) || [];
dispMovies(movieList);

const form = document.querySelector('form');
form.reset();

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (confirm("Confirm to save")) {

        const titleValue = title.value;
        const dateValue = year.value;
        const genreValue = genre.value;
        const ratingValue = Number(selectedRating);

        let found = false;

        for (let i = 0; i<movieList.length; i++) {
            if (movieList[i].title === titleValue) {
                movieList[i].date = dateValue;
                movieList[i].genre = genreValue;

                movieList[i].total += ratingValue;
                movieList[i].count ++;

                found = true;
                break;
            }
        }

        if (!found) {
            movieList.push ({
                title: titleValue,
                date: dateValue,
                genre: genreValue,
                total: ratingValue,
                count: 1
            });
        }

        localStorage.setItem("savedMovies", JSON.stringify(movieList));
        dispMovies(movieList);

        form.reset();
    }
});

let star = rating;
var dispstar = 0;

for (let i = 0; i < star.length; i++){
    dispstar += "★";
}

movieList.rating = dispstar;

function dispMovies(movieList) {
    let dispList = "";
    let listMovies = document.getElementById("listMovies")

    for (let movie=0; movie < movieList.length; movie++) {
        
        let avg = movieList[movie].total / movieList[movie].count;
        let ratingcontainer = "";

        for (let i = 0; i< Math.round(avg); i++) {
            ratingcontainer += '<span style="color: gold;">★</span>';
        }

        dispList += `
            <div class="movie-container">
                ${movieList[movie].title}
                <span> (</span>
                ${movieList[movie].date}
                <span>)</span>
                ${movieList[movie].genre}
                <span>, Rating: </span> 
                ${ratingcontainer}

                <button class="delete-btn" onclick="deleteMovie(${movie})">
                    Delete
                </button>

            </div>`;
    }

    listMovies.innerHTML = dispList;
}

function deleteMovie(index) {
    if(!confirm ("Delete this rating?")) return;

    movieList.splice(index, 1);
    localStorage.setItem("savedMovies", JSON.stringify(movieList));

    dispMovies(movieList);
}