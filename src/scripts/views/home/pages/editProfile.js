import { async } from "regenerator-runtime";
import UrlParser from "../../../routes/url-parser";
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";
import firebaseConfig from "../../../globals/firebaseConfig";
import { getDoc, doc, getFirestore, setDoc, deleteDoc, getDocs, collection, updateDoc, query, where, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const editProfile = {
    async render() {
        return ` 
        <div class="container-fluid" style="max-width:45%;">
        <div class="row" >
            <div class="page-content" style="background-color:#27292a;" align="center">
            <div class="row">
              </div>
              <div align="center" style="color:#ec6090; max-width:auto; background-color:#1f2122; border-radius:20px" align="center" >
              <div class="heading-section" align="center" style="padding : 20px;">
              <h4>Edit Profil</h4>
              </div>
                <form class="mx-1 mx-md-4" id="editprofform">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="email" class="form-control" placeholder="E-mail" style="background-color: #dbdada;opacity: 1;" disabled />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="name" placeholder="name" class="form-control" required/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-vcard fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <textarea id="bio" class="form-control" placeholder="Bio" rows="4"></textarea>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4" style="padding-bottom:20px;">
                    <button type="submit" class="btn btn-primary btn-lg" style="background-color:#ec6090; border-color:#e75e8d96; font-family:'Poppins', sans-serif;padding">Konfirmasi</button>
                  </div>

              </form>
                </div>
                </div>
            </div>
        </div>
        </div>
        </div>
            </div>
          </div>
        </div>
        `
    },

    async afterRender() {
        console.log('afterrender jalan');
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
    
        const memberData = JSON.parse(localStorage.getItem('user'));
        const docRef = doc(db, 'member', memberData.id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        const emailContainer = document.getElementById('email');
        const nameContainer = document.getElementById('name');
        const bioContainer = document.getElementById('bio')
        
        
        emailContainer.value = data.email;
        nameContainer.value = data.nama;
        bioContainer.value = data.bio;

        const EditProfileForm = document.getElementById('editprofform');
        EditProfileForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            try {
              await updateDoc(docRef, {
                bio: bioContainer.value,
                nama: nameContainer.value
              })
              Swal.fire({
                icon: 'success',
                title: 'Berhasil Update Profil',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Tutup',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  window.location.href = '#/profile';
                  location.reload();
                } 
              })
            } catch (error) {
              Swal.fire(
                error,
                'Update Profil Gagal',
                'error'
              )
            }
        })


    }
}

export default editProfile;