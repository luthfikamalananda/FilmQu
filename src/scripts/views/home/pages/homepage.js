import { async } from "regenerator-runtime"
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";

const homePage = {
    async render() {
        return `<div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content" style="padding:20px;">


                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="max-height:auto; ">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../../../assets/images/banner-bg.jpg" class="d-block w-100 h-50" id='carousel01' alt="..." style="max-height: 400px; border-radius:25px; opacity:0.2;">
                            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style="border-radius: 23px;" >
                                <div class="carousel-caption d-none d-md-block">
                                <h1 style="color:#ec6090; font-size:80px;">FilmQu</h1>
                                <p style="color:white;">Tempatnya Review Film Yang Menarik Bagi Pecinta Film</p>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                        <img src="../../../assets/images/banner-bg.jpg" class="d-block w-100 h-50" id='carousel02' alt="..." style="max-height: 400px; border-radius:25px; color:#fff; opacity:0.2;">
                            <div class="carousel-caption d-none d-md-block" align="top">
                            <h1>Cari Tempat Review Buat Pemula? <h1>Ya Hanya di</h1><h1 style="color:#ec6090;">FilmQu</h1></h1>
                            <p style="color:white;">Tempatnya Review Film Yang Asik Menarik Bagi Pecinta Film</p>
                            <br>
                            <br>
                            <br>
                            </div>
                        </div>
                        <div class="carousel-item">
                        <img src="../../../assets/images/banner-bg.jpg" class="d-block w-100 h-50" id='carousel03' alt="..." style="max-height: 400px; border-radius:25px; color:#fff; opacity:0.2;">
                            <div class="carousel-caption d-none d-md-block">
                            <h1>Mau Nonton Film Bagus? <h1>Tapi Ga Tau Mau Nyari Rekomen Dimana? </h1><h1 style="color:#ec6090;">FilmQu</h1></h1>
                            <p style="color:white;">Tempatnya Review Film Yang Asik Menarik Bagi Pecinta Film</p>
                            <br>
                            <br>
                            <br>
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
                        <div class="row" >
                            <div class="col-lg-12" >
                                <div class="heading-section">
                                    <h4>Film Sedang Tayang</h4>
                                </div>
                                <div class="row" id='sedang-tayang' >
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
            <div class="col-lg-3 col-sm-6 col-6">
                <div class="item" style="max-width:auto;">
                    <a href='#/detail/${movie.id}'><img src="${movie.backdrop_path ? tmdbConfig.BASE_IMAGE_URL + movie.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt=""></a>
                    <a href='#/detail/${movie.id}'><h4 class='titleName' style="max-width:auto;">${movie.title}<br><span>${movie.release_date}</span></h4></a>
                    <ul class='star-rating'>
                        <li><i class="fa fa-star"></i> ${movie.vote_average}</li>
                        <li><i class="fa fa-star"></i></li>
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
                <div class="item" style="max-height:auto;">
                    <a href='#/detail/${movie.id}'><img src="${movie.backdrop_path ? tmdbConfig.BASE_IMAGE_URL + movie.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt=""></a>
                    <a href='#/detail/${movie.id}'><h4 class='titleName'>${movie.title}<br><span>${movie.release_date}</span></h4></a>
                    <ul>
                        <li><i class="fa fa-star"></i> ${movie.vote_average}</li>
                        <li><i class="fa fa-star"></i></li>
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