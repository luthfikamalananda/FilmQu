import { async } from "regenerator-runtime"
import UrlParser from "../../../routes/url-parser";
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";

const detailPage = {
    async render() {
        return `<div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content" id='detailContainer'>
    
              <!-- ***** Featured Start ***** -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="feature-banner header-text">
                    <div class="row">
                      <div class="col-lg-4">
                        <img src="assets/images/feature-left.jpg" alt="" style="border-radius: 23px;" id='posterMovie'>
                      </div>
                      <div class="col-lg-8">
                        <div class="thumb">
                            <img src="assets/images/feature-left.jpg" alt="" style="border-radius: 23px;" id='backdropMovie'>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ***** Featured End ***** -->
    
              <!-- ***** Details Start ***** -->
              <div class="game-details">
                <div class="row">
                  <div class="col-lg-12">
                    <h2 id='titleMovie'>Fortnite Details</h2>
                  </div>
                  <div class="col-lg-12">
                    <div class="content">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="left-info">
                            <div class="left">
                              <h4>Fortnite</h4>
                              <span>Sandbox</span>
                            </div>
                            <ul>
                              <li id='ratingMovie'><i class="fa fa-star"></i> 4.8</li>
                              <li><i class="fa fa-download"></i> 2.3M</li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="right-info">
                            <ul>
                              <li><i class="fa fa-star"></i> 4.8</li>
                              <li><i class="fa fa-download"></i> 2.3M</li>
                              <li><i class="fa fa-server"></i> 36GB</li>
                              <li><i class="fa fa-gamepad"></i> Action</li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <img src="assets/images/details-01.jpg" alt="" style="border-radius: 23px; margin-bottom: 30px;">
                        </div>
                        <div class="col-lg-4">
                          <img src="assets/images/details-02.jpg" alt="" style="border-radius: 23px; margin-bottom: 30px;">
                        </div>
                        <div class="col-lg-4">
                          <img src="assets/images/details-03.jpg" alt="" style="border-radius: 23px; margin-bottom: 30px;">
                        </div>
                        <div class="col-lg-12">
                          <p id='overviewMovie'>Cyborg Gaming is free HTML CSS website template provided by TemplateMo. This is Bootstrap v5.2.0 layout. You can make a <a href="https://paypal.me/templatemo" target="_blank">small contribution via PayPal</a> to info [at] templatemo.com and thank you for supporting. If you want to get the PSD source files, please contact us. Lorem ipsum dolor sit consectetur es dispic dipiscingei elit, sed doers eiusmod lisum hored tempor.</p>
                        </div>
                        <div class="col-lg-12">
                          <div class="main-border-button">
                            <a href="#">Download Fortnite Now!</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ***** Details End ***** -->
    
            </div>
          </div>
        </div>
      </div>`
    },

    async afterRender() {
        console.log('afterrender jalan');
        const idMovie = UrlParser.parseActiveUrlWithoutCombiner();
        const detailMovie = await TheMovieDbSource.detailMovie(idMovie.id);
        console.log(detailMovie);
        
        const detailMovieContainer = document.getElementById('detailContainer');
        detailMovieContainer.innerHTML = 
        `<!-- ***** Featured Start ***** -->
        <div class="row">
          <div class="col-lg-12">
            <div class="feature-banner header-text">
              <div class="row">
                <div class="col-lg-2">
                  <img src="${detailMovie.poster_path ? tmdbConfig.BASE_IMAGE_URL + detailMovie.poster_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="" style="border-radius: 23px;height:100%;object-fit:fill;" id='posterMovie'>
                </div>
                <div class="col-lg-10">
                  <div class="thumb">
                      <img src="${detailMovie.backdrop_path ? tmdbConfig.ORIGINAL_IMAGE_URL + detailMovie.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="" alt="" style="border-radius: 23px;height: 305px;" id='backdropMovie'>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ***** Featured End ***** -->

        <!-- ***** Details Start ***** -->
        <div class="game-details">
          <div class="row">
            <div class="col-lg-12">
              <h2 id='titleMovie'>${detailMovie.title}</h2>
            </div>
            <div class="col-lg-12">
              <div class="content">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="left-info">
                      <div class="left">
                        <h4>[ISI GENRE]</h4>
                        <span>[ISI TAHUN FILM]</span>
                      </div>
                      <ul>
                        <li><br></li>
                        <li><br></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="right-info" align="center">
                      <ul>
                        <li><i class="fa fa-star"></i> ${detailMovie.vote_average}</li>
                        <li><i class="fa fa-star" style="color:white;"></i>[rating filmqu]</li>
                        <li><i class="fa fa-server"></i>${detailMovie.budget}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-12" style="text-align:justify;">
                    <p id='overviewMovie'>${detailMovie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ***** Details End ***** -->

        <div class="other-games">
        <div class="row">
          <div class="col-lg-12">
            <div class="heading-section" align="center">
              <h4><em>Review</em> Film</h4>
            </div>
          </div>
        </div>
        <div class="row">
        <section>
        <div class="container">
            <div>
                <div>
                    <div class="comment mt-4 text-justify float-left">
                      <div>
                          <h4>Jhon Doe</h4>
                          <span style="color:white; text-align:right;"> 20 October, 2018</span>
                          <br>
                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                      </div>
                    </div>
                    <br>
                    <div class="text-justify darker mt-4 float-right">
                        <h4>Rob Simpson</h4>
                        <span style="color:white; text-align:right;"> 20 October, 2018</span>
                        <br>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                    </div>
                    <br>
                    <div class="comment mt-4 text-justify">
                        <h4>Jhon Doe</h4>
                        <span style="color:white; text-align:right;"> 20 October, 2018</span>
                        <br>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                    </div>
                    <br>
                    <div class="darker mt-4 text-justify">
                        <h4>Rob Simpson</h4>
                        <span style="color:white; text-align:right;"> 20 October, 2018</span>
                        <br>
                        <p >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                    </div>
                    <br>
                    <div class="darker mt-4 text-justify">
                            <textarea class="form-control" rows="2" placeholder="Komentar..." style="background-color:#27292a;color:white;"></textarea>
                            <br>
                            <div class="mar-top clearfix">
                              <button class="btn btn-sm btn-primary pull-right" type="submit"><i class="fa fa-pencil fa-fw"></i>Comment</button>
                              <a class="btn btn-trans btn-icon fa fa-video-camera add-tooltip" href="#" style="color:white; padding:10px;"></a>
                              <a class="btn btn-trans btn-icon fa fa-camera add-tooltip" href="#" style="color:white; padding:10px;"></a>
                              <a class="btn btn-trans btn-icon fa fa-file add-tooltip" href="#" style="color:white; padding:10px;"></a>
                      </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
        </div>
      </div>`
        // const sedangTayangContainer = document.getElementById('sedang-tayang');
        // const movies = await TheMovieDbSource.nowPlayingMovies();
        // console.log(movies);
        // movies.forEach(movie => {
        //     sedangTayangContainer.innerHTML += `
        //     <div class="col-lg-3 col-sm-6">
        //         <div class="item">
        //             <img src="${movie.backdrop_path ? tmdbConfig.BASE_IMAGE_URL + movie.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="">
        //             <h4 class='titleName'>${movie.title}<br><span>Sandbox</span></h4>
        //             <ul>
        //                 <li><i class="fa fa-star"></i> ${movie.vote_average}</li>
        //                 <li><i class="fa fa-download"></i> 2.3M</li>
        //             </ul>
        //         </div>
        //     </div>`
        // });

        // sedangTayangContainer.innerHTML += `
        // <div class="col-lg-12">
        //     <div class="main-button">
        //         <a href="browse.html">Discover Popular</a>
        //     </div>
        // </div>`

        // const ratingTinggiContainer = document.getElementById('ratingTinggi');
        // const moviesRating = await TheMovieDbSource.popularMovies();
        // console.log(moviesRating);
        // moviesRating.forEach(movie => {
        //     ratingTinggiContainer.innerHTML += `
        //     <div class="col-lg-3 col-sm-6">
        //         <div class="item">
        //             <img src="${movie.backdrop_path ? tmdbConfig.BASE_IMAGE_URL + movie.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="">
        //             <h4 class='titleName'>${movie.title}<br><span>Sandbox</span></h4>
        //             <ul>
        //                 <li><i class="fa fa-star"></i> ${movie.vote_average}</li>
        //                 <li><i class="fa fa-download"></i> 2.3M</li>
        //             </ul>
        //         </div>
        //     </div>`
        // });

        // ratingTinggiContainer.innerHTML += `
        // <div class="col-lg-12">
        //     <div class="main-button">
        //         <a href="browse.html">Discover Popular</a>
        //     </div>
        // </div>`

        // const carousel1 = document.getElementById('carousel01');
        // const carousel2 = document.getElementById('carousel02');
        // const carousel3 = document.getElementById('carousel03');

        // carousel1.setAttribute('src', `${movies[0].backdrop_path ? tmdbConfig.ORIGINAL_IMAGE_URL + movies[0].backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}`)
        // carousel2.setAttribute('src', `${movies[1].backdrop_path ? tmdbConfig.ORIGINAL_IMAGE_URL + movies[1].backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}`)
        // carousel3.setAttribute('src', `${movies[2].backdrop_path ? tmdbConfig.ORIGINAL_IMAGE_URL + movies[2].backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}`)

    }
}

export default detailPage;