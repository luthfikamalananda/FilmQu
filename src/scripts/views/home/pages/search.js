import { async } from "regenerator-runtime"
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";

const homePage = {
    async render() {
        return `<div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content">

                    <!-- ***** Most Popular Start ***** -->
                    <div class="most-popular">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="heading-section">
                                    <h4>Hasil Pencarian Film</h4>
                                </div>
                                <div class="row" id='searched-film'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ***** Most Popular End ***** -->
                </div>
            </div>
        </div>
    </div>`
    },

    async afterRender() {
        console.log('afterrender jalan');
        const searchedFilm = document.getElementById('searched-film');
        const movies = await TheMovieDbSource.nowPlayingMovies();
        console.log(movies);
        movies.forEach(movie => {
            searchedFilm.innerHTML += `
            <div class="col-lg-3 col-sm-6">
                <div class="item">
                    <img src="${movie.backdrop_path ? tmdbConfig.BASE_IMAGE_URL + movie.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="">
                    <h4 class='titleName'>${movie.title}<br><span>Sandbox</span></h4>
                    <ul>
                        <li><i class="fa fa-star"></i> ${movie.vote_average}</li>
                        <li><i class="fa fa-download"></i> 2.3M</li>
                    </ul>
                </div>
            </div>`
        });

        searchedFilm.innerHTML += `
        <div class="col-lg-12">
            <div class="main-button">
                <a href="browse.html">Discover Popular</a>
            </div>
        </div>`

    }
}

export default homePage;