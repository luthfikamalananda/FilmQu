import { async } from "regenerator-runtime"
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";
import UrlParser from "../../../routes/url-parser";
import firebaseConfig from "../../../globals/firebaseConfig";
import { getDoc, doc, getFirestore, setDoc, deleteDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const searchPage = {
    async render() {
        return `<div class="container-fluid responsive-container-fluid" >
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content responsive-page-content" style="padding:20px;">

                    <!-- ***** Most Popular Start ***** -->
                    <div id="search-bar-page" class="most-popular responsive-most-popular" style="margin-top:0px;background-color:transparent;display:block;">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="heading-section">
                                    <h4 style='text-align:center;'>Cari Film</h4>
                                </div>
                                <form action="#">
                                        <input style='background-color:#1f2122;color:white;width:100%;height: 50px;border: 0;border-radius: 40px;padding: 10px 70px 10px 32px;' type="text" placeholder="Film yang ingin anda cari.." id='searchTextInSearch' name="searchKeyword" />
                                        <span class="fa fa-search" style="float: right;margin-right: 16px;margin-top: -32px;position: relative;z-index: 2;color:white;"></span>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- ***** Most Popular End ***** -->

                    <!-- ***** Most Popular Start ***** -->
                    <div class="most-popular responsive-most-popular">
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
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const querySnapshotRating = await getDocs(collection(db, "rating"));

        const searchText = document.getElementById('searchTextInSearch');
        searchText.addEventListener('keydown', (e) => {
        // console.log(e);
        if (e.keyCode == 13)  {
            searchText.value;
            e.preventDefault()
            // console.log(searchText.value);
            window.location.href = `#/search/${searchText.value}`
        }
        })

        // console.log('afterrender jalan');
        const query = UrlParser.parseActiveUrlWithoutCombiner();
        // console.log(query.id);
        const searchedMovies = await TheMovieDbSource.searchMovie(query.id);
        const searchMoviesContainer = document.getElementById('searched-film');
        // console.log(searchedMovies);

        searchedMovies.forEach(movie => {
            searchMoviesContainer.innerHTML += `
            <div class="col-lg-3 col-sm-6 col-6">
                <div class="item" style="max-width:auto; padding:13px;">
                    <a href='#/detail/${movie.id}'><img class='lazyload' src="${movie.backdrop_path ? tmdbConfig.BASE_IMAGE_URL + movie.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt=""></a>
                    <a href='#/detail/${movie.id}'><h4 class='responsive-h4-rev-like' style="max-width:auto;">${movie.title}<br><span>${movie.release_date}</span></h4></a>
                    <ul class="star-rating">
                        <li><i class="fa fa-star"></i> ${movie.vote_average}</li>
                        <li id='ratingFilmqu' data-id='${movie.id}'><i class="fa fa-star"></i> -</li>
                    </ul>
                </div>
            </div>`
        });

        // Rating Filmqu
        const ratingFilmquContainer = document.querySelectorAll('#ratingFilmqu');
        ratingFilmquContainer.forEach((container) => {
            const movieId = container.getAttribute('data-id')
            querySnapshotRating.forEach((ratingData) => {
                if (ratingData.data().movie_id == movieId && ratingData.data().rating != 'NaN') {
                    container.innerHTML = `<i class="fa fa-star"></i> ${ratingData.data().rating}`
                }
            })
        })
    }
}

export default searchPage;