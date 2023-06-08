import firebaseConfig from "../../../globals/firebaseConfig";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";;

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
                          <div class="main-border-button">
                            <a href="#/editprofile">Edit Profil</a>
                            <a href="#">Logout</a>
                        </div>
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
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="heading-section">
                                <h4>Favourite Film</h4>
                              </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                              <div class="item">
                                <div class="thumb">
                                  <img src="assets/images/clip-01.jpg" alt="" style="border-radius: 23px;">
                                  <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i class="fa fa-play"></i></a>
                                </div>
                                <div class="down-content">
                                  <h4>First Clip</h4>
                                  <span><i class="fa fa-eye"></i> 250</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                              <div class="item">
                                <div class="thumb">
                                  <img src="assets/images/clip-02.jpg" alt="" style="border-radius: 23px;">
                                  <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i class="fa fa-play"></i></a>
                                </div>
                                <div class="down-content">
                                  <h4>Second Clip</h4>
                                  <span><i class="fa fa-eye"></i> 183</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                              <div class="item">
                                <div class="thumb">
                                  <img src="assets/images/clip-03.jpg" alt="" style="border-radius: 23px;">
                                  <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i class="fa fa-play"></i></a>
                                </div>
                                <div class="down-content">
                                  <h4>Third Clip</h4>
                                  <span><i class="fa fa-eye"></i> 141</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                              <div class="item">
                                <div class="thumb">
                                  <img src="assets/images/clip-04.jpg" alt="" style="border-radius: 23px;">
                                  <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"><i class="fa fa-play"></i></a>
                                </div>
                                <div class="down-content">
                                  <h4>Fourth Clip</h4>
                                  <span><i class="fa fa-eye"></i> 91</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="main-button">
                                <a href="#">Load More Film</a>
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

    }
}

export default profile;