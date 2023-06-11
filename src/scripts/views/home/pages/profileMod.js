import firebaseConfig from "../../../globals/firebaseConfig";
import { getDoc, doc, getFirestore, getDocs, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import tmdbConfig from "../../../globals/tmdbConfig";

const profileMod = {
    async render() {
        return ` <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content" style="padding:20px;">
    
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
                          <h3 id='namaMember'>Alan Smithee</h3>
                          <p id='bioMember' class="responsive-p" style="margin-top: 10px;">Hi I'm new here, welcome to my profile</p>
                          <li>
                          <div class="main-border-button">
                            <a href="javascript:void(0);" id='logoutBtn' style="background-color:#ec6090;color:white;">Logout</a>
                          </div>
                      </li>
                      </div>
                        <div class="col-lg-12" align="right">
                      </div>
                      </div>
                      <div class="col-lg-4 align-self-center">
                        <ul>
                          <li>Member Since<span id='date_created'>8-16-2023</span></li>
                        </ul>
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
        // console.log('afterrender jalan');
        const localAccount = JSON.parse(localStorage.getItem('moderator'))

        const app = initializeApp(firebaseConfig);

        const db = getFirestore(app);
        const docRef = doc(db, "moderator", localAccount.id);
        const docSnap = await getDoc(docRef);
        const dataMember = docSnap.data();

        const namaContainer = document.getElementById('namaMember');
        const bioContainer = document.getElementById('bioMember');
        const statusContainer = document.getElementById('statusMember');
        const dateCreatedContainer = document.getElementById('date_created');

        namaContainer.innerText = dataMember.nama;
        bioContainer.innerText = dataMember.bio ? dataMember.bio : "Hi I'm new here, welcome to my profile";
        statusContainer.innerText = dataMember.status;
        dateCreatedContainer.innerText = dataMember.date_created;

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('moderator');
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

export default profileMod;