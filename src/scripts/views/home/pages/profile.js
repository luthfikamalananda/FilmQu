import firebaseConfig from "../../../globals/firebaseConfig";
import { getDoc, doc, getFirestore, getDocs, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import tmdbConfig from "../../../globals/tmdbConfig";

const profile = {
    async render() {
        return ` <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content">
    
              <!-- ***** Banner Start ***** -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="main-profile ">
                    <div class="row">
                      <div class="col-lg-4">
                        <img src="assets/images/profile.jpg" alt="" style="border-radius: 23px;">
                      </div>
                      <div class="col-lg-4 align-self-center">
                        <div class="main-info header-text">
                          <span id='statusMember'>Active</span>
                          <h4 id='namaMember'>Alan Smithee</h4>
                          <p id='bioMember'>Hi I'm new here, welcome to my profile</p>
                          <li>
                            <th>
                              <div class="main-border-button">
                                <a href="#/editprofile">Edit Profil</a>
                                <a href="javascript:void(0);" id='logoutBtn' style="background-color:#ec6090;color:white;">Logout</a>
                              </div>
                            </th>
                          </li>
                      </div>
                        <div class="col-lg-12" align="right">
                      </div>
                      </div>
                      <div class="col-lg-4 align-self-center">
                        <ul>
                          <li>Favourite Film<span id='film_favorit'>3</span></li>
                          <li>Film Reviewed<span id='film_review'>16</span></li>
                          <li>Member Since<span id='date_created'>8-16-2023</span></li>
                        </ul>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="clips">
                          <div class="row" id='favoritfilmContainer'>
                            <div class="col-lg-12">
                              <div class="heading-section">
                                <h4>Favourite Film</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ***** Banner End ***** -->
    
              <!-- ***** Gaming Library Start ***** -->
              <!-- ***** Gaming Library End ***** -->
            </div>
          </div>
        </div>
      </div>
      `
    },

    async afterRender() {
        console.log('afterrender jalan');
        const localAccount = JSON.parse(localStorage.getItem('user'))

        const app = initializeApp(firebaseConfig);

        const db = getFirestore(app);
        const docRef = doc(db, "member", localAccount.id);
        const docSnap = await getDoc(docRef);
        const dataMember = docSnap.data();

        const namaContainer = document.getElementById('namaMember');
        const bioContainer = document.getElementById('bioMember');
        const statusContainer = document.getElementById('statusMember');
        const favoritCounter = document.getElementById('film_favorit');
        const reviewCounter = document.getElementById('film_review');
        const dateCreatedContainer = document.getElementById('date_created');

        namaContainer.innerText = dataMember.nama;
        bioContainer.innerText = dataMember.bio ? dataMember.bio : "Hi I'm new here, welcome to my profile";
        statusContainer.innerText = dataMember.status;
        favoritCounter.innerText = dataMember.film_favorit.length;
        reviewCounter.innerText = dataMember.film_review.length;
        dateCreatedContainer.innerText = dataMember.date_created;

        // Favorite Movie Container
        const favoritContainer = document.getElementById('favoritfilmContainer');
        
        const memberFavorite = docSnap.data().film_favorit

        const querySnapshot = await getDocs(collection(db, "film"));
        querySnapshot.forEach((filmDB) => {
            memberFavorite.forEach((idMovie) => {
                if (filmDB.id == idMovie) {
                  favoritContainer.innerHTML += `
                    <div class="col-lg-3 col-sm-6">
                      <div class="item">
                              <div class="thumb">
                                            <img  style="border-radius: 23px;" src="${filmDB.data().backdrop_path ? tmdbConfig.BASE_IMAGE_URL + filmDB.data().backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="">
                                            <a href="#/detail/${filmDB.id}"><i class="fa-solid fa-magnifying-glass fa-fade"></i></a>
                                    </div>
                              <div class="down-content">
                                <h4 class='titleName'><a href="#/detail/${filmDB.id}">${filmDB.data().title}</h4></a>
                                      <a><span><i class="fa fa-star" style="color: yellow;"></i> ${filmDB.data().vote_average}</span>
                              </div>
                            </div>
                    </div>`
                }
            })
            console.log(filmDB.id, '==>', filmDB.data());
        });

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('user');
          Swal.fire({
            icon: 'success',
            title: 'Logout Berhasil',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'Tutup',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.location.href = '#/';
              location.reload();
            } 
          })
        })
        
    }
}

export default profile;