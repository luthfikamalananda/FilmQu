import { async } from "regenerator-runtime"
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";

const homePage = {
    async render() {
        return `<div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content">


                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="max-height:auto; ">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img src="../../../assets/images/banner-bg.jpg" class="d-block w-100 h-50" id='carousel01' alt="..." style="max-height: 400px; border-radius:25px; color:#fff; opacity:0.4;">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p style="color:white;">Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                        <img src="../../../assets/images/banner-bg.jpg" class="d-block w-100 h-50" id='carousel02' alt="..." style="max-height: 400px; border-radius:25px; color:#fff; opacity:0.4;">
                            <div class="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p style="color:white;">Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                        <img src="../../../assets/images/banner-bg.jpg" class="d-block w-100 h-50" id='carousel03' alt="..." style="max-height: 400px; border-radius:25px; color:#fff; opacity:0.4;">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p style="color:white;">Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    </div>

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

        ratingTinggiContainer.innerHTML += `
        <div class="col-lg-12">
            <div class="main-button">
                <a href="browse.html">Discover Popular</a>
            </div>
        </div>`

        const carousel1 = document.getElementById('carousel01');
        const carousel2 = document.getElementById('carousel02');
        const carousel3 = document.getElementById('carousel03');

        carousel1.setAttribute('src', `${movies[0].backdrop_path ? tmdbConfig.ORIGINAL_IMAGE_URL + movies[0].backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}`)
        carousel2.setAttribute('src', `${movies[1].backdrop_path ? tmdbConfig.ORIGINAL_IMAGE_URL + movies[1].backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}`)
        carousel3.setAttribute('src', `${movies[2].backdrop_path ? tmdbConfig.ORIGINAL_IMAGE_URL + movies[2].backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}`)

    }
}

export default homePage;