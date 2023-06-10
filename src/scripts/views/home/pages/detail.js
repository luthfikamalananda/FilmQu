import { async } from "regenerator-runtime";
import UrlParser from "../../../routes/url-parser";
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";
import firebaseConfig from "../../../globals/firebaseConfig";
import { getDoc, doc, getFirestore, setDoc, deleteDoc, getDocs, collection, updateDoc, query, where, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { customAlphabet  } from "nanoid";

const detailPage = {
  async render() {
    return `<div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content responsive-page-content" id='detailContainer'>
    
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

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

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
              <h2 id='titleMovie' class="responsive-h2">${detailMovie.title}</h2>
            </div>
            <div class="col-lg-12">
              <div class="content">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="left-info">
                    <p align="center" class="responsive-p-judul" style="color:#ec6090;font-weight: bold;">INFO<p>
                    <hr style="color:white;">
                      <div class="left">
                        <h4 class='responsive-h4-detail'>${genreMovie}</h4>
                        <span class="responsive-span">${detailMovie.release_date}</span>
                      </div>
                      <ul>
                        <li><br></li>
                        <li><br></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="right-info" align="center">
                    <p align="center" class="responsive-p-judul" style="color:#ec6090; font-weight: bold;">RATING<p>
                    <hr style="color:white;">
                      <ul>
                        <li class='responsive-li'><i class="fa fa-star"></i> ${
                          detailMovie.vote_average
                        }</li>
                        <li class='responsive-li'><i class="fa fa-star" style="color:white;"></i>[filmqu]</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-12" style="text-align:justify;">
                    <p id='overviewMovie' class="responsive-p">${detailMovie.overview}</p>
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
              <h4>Review Film</h4>
            </div>
          </div>
        </div>
        <hr style="color:white;">
        <div class="row">
        <section>
            <form class="mx-1 mx-md-4" id="reviewForm">
               
            <div class="rate" style="max-width:auto;">
            <h5 style="color:#ec6090;">Rate</h5>
            <input class = 'star-input' type="radio" id="star10" name="rate" value="10" />
            <label for="star10" title="text">10 stars</label>
            <input class = 'star-input' type="radio" id="star9" name="rate" value="9" />
            <label for="star9" title="text">9 stars</label>
            <input class = 'star-input' type="radio" id="star8" name="rate" value="8" />
            <label for="star8" title="text">8 stars</label>
            <input class = 'star-input' type="radio" id="star7" name="rate" value="7" />
            <label for="star7" title="text">7 stars</label>
            <input class = 'star-input' type="radio" id="star6" name="rate" value="6" />
            <label for="star6" title="text">6 stars</label>
            <input class = 'star-input' type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input class = 'star-input' type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input class = 'star-input' type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input class = 'star-input' type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input class = 'star-input' type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
          </div>
          <br>
          <br>
                <div>
                    <div class="darker mt-4 text-justify">
                            <textarea id='review-input' class="form-control" rows="6" placeholder="Komentar..." style="background-color:#27292a;color:white;"></textarea>
                            <br>
                            <div class="mar-top clearfix" style="float:right; padding-bottom:20px;">
                              <button type="submit" class="btn btn-primary btn-lg" style="background-color:#ec6090; border-color:#e75e8d96; font-family:'Poppins', sans-serif;" id='submitBtn'><i class="fa fa-pencil fa-fw"></i>Upload Review</button>
                            </div>
                    </div>
                    </form>    
                </div>
                <div id='review-container'> 
                    <br>
                    <br>
                    
                </div>
            </div>
        </div>
    </section>
        </div>
      </div>`;

    const reviewContainer = document.getElementById('review-container');
      // Like Button Function
      // Authentication for Logged in
    let reviewed_movies;
    let exist;
    if(localStorage.getItem('user')) {
    
      const likeButton = document.getElementById('likeButton');
      const likeContent = document.getElementById('likeContent')

      const docRef = doc(db, "member", memberData.id);
      const docSnap = await getDoc(docRef);
      const memberDataFB = docSnap.data();
      const favorite_movies = memberDataFB.film_favorit;
      reviewed_movies = memberDataFB.film_review;
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
              allowOutsideClick: false
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
              allowOutsideClick: false
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


      // ADD Review Function
        // Take value from star
      let starValue = -1;
      const starReview = document.getElementsByClassName('star-input')
      Array.from(starReview).forEach(function(star) {
        star.addEventListener('click', () => {
          starValue = star.value;
        })
      });
      
      // Take value textarea
      const reviewInput = document.getElementById('review-input');
      let reviewValue;
    
      // Edit Review
      exist = reviewed_movies.findIndex(element => element == idMovie.id)
      let reviewData;
      console.log(exist);
      if (exist > -1) {
        const docRefReview = collection(db, "review");
        const q = query(docRefReview, where("movie_id", "==", idMovie.id), where("member_id", "==", memberData.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          reviewData = doc.data()
        });
        reviewInput.value = reviewData.content
        const star = document.getElementById(`star${reviewData.rating}`);
        star.checked = true;
        starValue = reviewData.rating;
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerText = 'Edit Review'
        // Make sure user reviews always on top
          // Member's own review
        reviewContainer.innerHTML += `
        <div class="comment mt-4 text-justify float-left">
          <hr style="color:white;">
          <div>
            <p style="color:#ec6090;"><i class="fa fa-star" style="color:pink; font-size:14px;"></i> ${reviewData.rating}</p>
            <h5>${reviewData.member_nama} <i id='deleteOwnedReview' class="fas fa-trash-alt" style="color:pink; font-size:25px; float:right;"></i></h5>
            <span style="color:grey; text-align:right;"> ${reviewData.date}</span>
            <br>
            <p style="color: white;padding-left:15px;">${reviewData.content}</p>
          </div>
        </div>
        <br>
        `;
      }

      // Create Review Form
      const reviewForm = document.getElementById('reviewForm');
      reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        reviewValue = reviewInput.value;
        console.log(reviewValue);
        console.log(starValue);
        const data = {
          date: new Date().toISOString().split('T')[0],
          content: reviewValue,
          rating: starValue,
          movie_id: idMovie.id,
          member_id: memberData.id,
          member_nama: memberDataFB.nama,
          member_email: memberDataFB.email
        }
        console.log(data);
        try {
          await setDoc(doc(db, 'film', idMovie.id), detailMovie)
          await setDoc(doc(db, "review", `${memberData.id}_${idMovie.id}`), data);
          reviewed_movies.push(idMovie.id)
          if (exist == -1) {
            await updateDoc(doc(db, "member", memberData.id), {
              film_review: reviewed_movies
            })
          }
          Swal.fire({
            icon: 'success',
            title: 'Review Berhasil',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'Tutup',
            allowOutsideClick: false
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              location.reload();
            } 
          })
        } catch (error) {
          Swal.fire(
            error,
            'Review Gagal',
            'error'
          )
        }
      })

    }

    // Read Review Function
    const docRefReview = collection(db, "review");
    const q = query(docRefReview, where("movie_id", "==", idMovie.id));
    const reviewData = await getDocs(q);
    reviewData.forEach(data => {
      if (localStorage.getItem('user')) {
        if (data.data().member_id != memberData.id) { // Display review without the account who already reviewd
          reviewContainer.innerHTML += `
          <div class="comment mt-4 text-justify float-left">
          <hr style="color:white;">
          <div>
            <p style="color:#ec6090;"><i class="fa fa-star" style="color:pink; font-size:14px;"></i> ${data.data().rating}</p>
            <h5 ><a href='#/profile/${data.data().member_id}' target="_blank">${data.data().member_nama}</a></h5>
            <span style="color:grey; text-align:right;"> ${data.data().date}</span>
            <br>
            <p style="color: white;padding-left:15px;">${data.data().content}</p>
          </div>
        </div>
        <br>
        `
        }
        // Delete Review Button Function
        const deleteBtn = document.getElementById('deleteOwnedReview'); // Delete Review
        if (deleteBtn) { // delete button only created when already reviewd, so that if the user hasn't review system cannot run the eventListener
          deleteBtn.addEventListener('click',  async (e) => {
            e.preventDefault()
            console.log('tes');
            Swal.fire({
              title: 'Apakah Anda Yakin Ingin Menghapus Review',
              showCancelButton: true,
              confirmButtonColor: '#dd3333',
              confirmButtonText: 'Hapus',
              cancelButtonText: 'Batal'
            }).then( async (result) => {
              if (result.isConfirmed) {
                await deleteDoc(doc(db, "review", `${memberData.id}_${idMovie.id}`))
                reviewed_movies.splice(exist, 1)
                await updateDoc(doc(db, "member", memberData.id), {
                  film_review: reviewed_movies
                })
                Swal.fire('Review Berhasil Dihapus', '', 'success').then(() => {
                  location.reload()
                })
              }
            })
          })
        }
        
      } else { // Display all review
        reviewContainer.innerHTML += `
          <div class="comment mt-4 text-justify float-left">
          <hr style="color:white;">
          <div>
            <p style="color:#ec6090;"><i class="fa fa-star" style="color:pink; font-size:14px;"></i> ${data.data().rating}</p>
            <h5 ><a href='#/profile/${data.data().member_id}' target="_blank">${data.data().member_nama}</a> <i id='btnDeleteReview' data-id='${data.data().member_id}' class="fas fa-trash-alt" style="color:pink; font-size:25px; float:right;"></i></h5>
            <span style="color:grey; text-align:right;"> ${data.data().date}</span>
            <br>
            <p style="color: white;padding-left:15px;">${data.data().content}</p>
          </div>
        </div>
        <br>
        `
      }
    })

    // Hide Delete Button
    const btnDeleteReview = document.querySelectorAll('#btnDeleteReview');
    btnDeleteReview.forEach((btn) => {
      btn.setAttribute('style', 'display:none')
    })

    // Authentication (Display Like Button & Display Review Form)
    if(!localStorage.getItem('user')) {
      const likeButtonContainer = document.getElementById('likeButtonContainer');
      likeButtonContainer.setAttribute('style', 'display: none;')
      const reviewForm = document.getElementById('reviewForm');
      reviewForm.setAttribute('style', 'display:none;')
    }

    // Authentication Moderator Display Delete Button
    if (localStorage.getItem('moderator')) {
      btnDeleteReview.forEach((btn) => {
        btn.setAttribute('style', 'color:pink; font-size:25px; float:right;')
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          Swal.fire({
            title: 'Apakah Anda Yakin Ingin Menghapus Review ini?',
            showCancelButton: true,
            confirmButtonColor: '#dd3333',
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal'
          }).then( async (result) => {
            if (result.isConfirmed) {
              const reviewer_id = btn.getAttribute('data-id');
              console.log(reviewer_id);
              await deleteDoc(doc(db, "review", `${reviewer_id}_${idMovie.id}`)) // hapus review pada db review

              const docSnap = await getDoc(doc(db, "member", reviewer_id)) // mengambil film_review
              const reviewerData = docSnap.data();
              const film_review = reviewerData.film_review;
              const index = film_review.findIndex(element => element == idMovie.id) // mencari index id film pada film_review
              
              film_review.splice(index, 1) // menghapus film yang pernah di review pada field film_review

              await updateDoc(doc(db, "member", reviewer_id), { // update database film_review dengan film_review yang telah dihapus filmnya
                film_review: film_review
              })
              Swal.fire('Review Berhasil Dihapus', '', 'success').then(() => {
                location.reload()
              })
            }
          })
          
        })
      })
    }
  }
};

export default detailPage;
