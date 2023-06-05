import { async } from "regenerator-runtime"
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";

const homePage = {
    async render() {
        return `<div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content">

                    <!-- ***** Banner Start ***** -->
                    <div class="main-banner">
                        <div class="row">
                            <div class="col-lg-7">
                                <div class="header-text">
                                    <h6>Welcome To Cyborg</h6>
                                    <h4><em>Browse</em> Our Popular Games Here</h4>
                                    <div class="main-button">
                                        <a href="browse.html">Browse Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ***** Banner End ***** -->

                    <!-- ***** Most Popular Start ***** -->
                    <div class="most-popular">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="heading-section">
                                    <h4>Film Sedang Tayang</h4>
                                </div>
                                <div class="row" id='sedang-tayang'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ***** Most Popular End ***** -->

                    <!-- ***** Most Popular Start ***** -->
                    <div class="most-popular">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="heading-section">
                                    <h4>Film Rating Tinggi</h4>
                                </div>
                                <div class="row" id='ratingTinggi'>
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
        const sedangTayangContainer = document.getElementById('sedang-tayang');
        const movies = await TheMovieDbSource.nowPlayingMovies();
        console.log(movies);
        movies.forEach(movie => {
            sedangTayangContainer.innerHTML += `
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

        sedangTayangContainer.innerHTML += `
        <div class="col-lg-12">
            <div class="main-button">
                <a href="browse.html">Discover Popular</a>
            </div>
        </div>`

        const ratingTinggiContainer = document.getElementById('ratingTinggi');
        const moviesRating = await TheMovieDbSource.popularMovies();
        console.log(moviesRating);
        moviesRating.forEach(movie => {
            ratingTinggiContainer.innerHTML += `
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

    }
}

export default homePage;