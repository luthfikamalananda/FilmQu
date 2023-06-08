import { async } from "regenerator-runtime";
import UrlParser from "../../../routes/url-parser";
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";
import firebaseConfig from "../../../globals/firebaseConfig";
import { getDoc, doc, getFirestore, setDoc, deleteDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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
      <div id="likeButtonContainer">
      <button aria-label="like this movie" id="likeButton" class="like">
      <i class="fa-sharp fa-regular fa-heart fa-beat" aria-hidden="true" id='likeContent'></i>
      </button>
      </div>
      </div>
      `;
  },

  async afterRender() {
    console.log("afterrender jalan");

    // Authentication (Display Like Button)
    if(!localStorage.getItem('user')) {
      const likeButtonContainer = document.getElementById('likeButtonContainer');
      likeButtonContainer.setAttribute('style', 'display: none;')
    }

    const memberData = JSON.parse(localStorage.getItem('user'));

    const idMovie = UrlParser.parseActiveUrlWithoutCombiner();
    const detailMovie = await TheMovieDbSource.detailMovie(idMovie.id);
    // console.log(detailMovie);

    let genreMovie;
    const genreList = detailMovie.genres
    // console.log(genreList);
    genreList.forEach(element => {
      if (genreMovie == undefined) {
        genreMovie = element.name
      } else {
        genreMovie += ', ' + element.name
      }
    });

    const detailMovieContainer = document.getElementById("detailContainer");
    detailMovieContainer.innerHTML = `<!-- ***** Featured Start ***** -->
        <div class="row">
          <div class="col-lg-12">
            <div class="feature-banner header-text">
              <div class="row" align="center">
                <div class="col-lg-2">
                  <img src="${
                    detailMovie.poster_path
                      ? tmdbConfig.BASE_IMAGE_URL + detailMovie.poster_path
                      : "https://picsum.photos/id/666/800/450?grayscale"
                  }" alt="" style="border-radius: 23px;height:100%; object-fit:cover;" id='posterMovie'>
                </div>
                <div class="col-lg-10">
                  <div class="thumb">
                      <img src="${
                        detailMovie.backdrop_path
                          ? tmdbConfig.ORIGINAL_IMAGE_URL +
                            detailMovie.backdrop_path
                          : "https://picsum.photos/id/666/800/450?grayscale"
                      }" alt="" alt="" style="border-radius: 23px;height: 305px;" id='backdropMovie'>
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
                    <p align="center" style="color:#ec6090;font-size: 20px; font-weight: bold;">INFO<p>
                    <hr style="color:white;">
                      <div class="left">
                        <h4>${genreMovie}</h4>
                        <span>${detailMovie.release_date}</span>
                      </div>
                      <ul>
                        <li><br></li>
                        <li><br></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="right-info" align="center">
                    <p align="center" style="color:#ec6090;font-size: 20px; font-weight: bold;">RATING<p>
                    <hr style="color:white;">
                      <ul>
                        <li><i class="fa fa-star"></i> ${
                          detailMovie.vote_average
                        }</li>
                        <li><i class="fa fa-star" style="color:white;"></i>[filmqu]</li>
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
        <hr style="color:white;">
        <div class="row">
        <section>
        <div class="container">
            <div>
            <div class="rate" style="max-width:auto;">
            <h5 >Rate</h5>
            <input type="radio" id="star10" name="rate" value="10" />
            <label for="star10" title="text">10 stars</label>
            <input type="radio" id="star9" name="rate" value="9" />
            <label for="star9" title="text">9 stars</label>
            <input type="radio" id="star8" name="rate" value="8" />
            <label for="star8" title="text">8 stars</label>
            <input type="radio" id="star7" name="rate" value="7" />
            <label for="star7" title="text">7 stars</label>
            <input type="radio" id="star6" name="rate" value="6" />
            <label for="star6" title="text">6 stars</label>
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
          </div>
          <br>
          <br>
          <br>
          <br>
                <div>
                    <div class="darker mt-4 text-justify">
                            <textarea class="form-control" rows="6" placeholder="Komentar..." style="background-color:#27292a;color:white;"></textarea>
                            <br>
                            <div class="mar-top clearfix" style="float:right;">
                              <button class="btn btn-sm btn-primary pull-right" type="submit" "><i class="fa fa-pencil fa-fw"></i>Comment</button>
                            </div>
                    </div>
                    <br>
                    <br>
                    <div class="comment mt-4 text-justify float-left">
                    <hr style="color:white;">
                      <div>
                          <h5>Jhon Doe</h5>
                          <span style="color:grey; text-align:right;"> 20 October, 2018</span>
                          <br>
                          <p style="color: white;padding-left:50px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                      </div>
                    </div>
                    <br>
                    <div class="text-justify darker mt-4 float-right">
                    <hr style="color:white;">
                        <h5>Rob Simpson</h5>
                        <span style="color:grey; text-align:right;"> 20 October, 2018</span>
                        <br>
                        <div style="color:white;">
                          <p style="color: white;padding-left:50px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                        </div>
                    </div>
                    <br>
                    <div class="comment mt-4 text-justify">
                    <hr style="color:white;">
                        <h5>Jhon Doe</h5>
                        <span style="color:grey; text-align:right;"> 20 October, 2018</span>
                        <br>
                        <p style="color: white;padding-left:50px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                    </div>
                    <br>
                    <div class="darker mt-4 text-justify">
                    <hr style="color:white;">
                        <h5>Rob Simpson</h5>
                        <span style="color:grey; text-align:right;"> 20 October, 2018</span>
                        <br>
                        <p style="color: white;padding-left:50px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </section>
        </div>
      </div>`;

    if(localStorage.getItem('user')) {
       const likeButtonContainer = document.getElementById('likeButtonContainer');
       likeButtonContainer.setAttribute('style', 'display: none;')
    
      const likeButton = document.getElementById('likeButton');
      const likeContent = document.getElementById('likeContent')

      const app = initializeApp(firebaseConfig);

      const db = getFirestore(app);
      const docRef = doc(db, "member", memberData.id);
      const docSnap = await getDoc(docRef);
      const favorite_movies = docSnap.data().film_favorit;
      const found = favorite_movies.findIndex(element => element == idMovie.id)
      if (found > -1) {
        likeContent.setAttribute('class', 'fa-sharp fa-solid fa-heart fa-beat')
        likeButton.addEventListener('click', async () => {
          try {
            favorite_movies.splice(found, 1);
            await updateDoc(docRef, {
              film_favorit: favorite_movies
            })
            Swal.fire({
              icon: 'success',
              title: 'Berhasil Unlike Film',
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: 'Tutup',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                location.reload();
              } 
            })
          } catch (error) {
            
          }
        })
      } else {
        likeButton.addEventListener('click', async () => {
          try {
            favorite_movies.push(idMovie.id);
            await updateDoc(docRef, {
              film_favorit: favorite_movies
            })
            await setDoc(doc(db, 'film', idMovie.id), detailMovie)
            Swal.fire({
              icon: 'success',
              title: 'Like Berhasil',
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: 'Tutup',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                location.reload();
              } 
            })
          } catch (error) {
            Swal.fire(
              error,
              'Like Gagal',
              'error'
            )
          }
          
        })
      }

  }

  },
};

export default detailPage;
