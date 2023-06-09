import { async } from "regenerator-runtime";
import UrlParser from "../../../routes/url-parser";
import TheMovieDbSource from "../../../data/themoviedb-source";
import tmdbConfig from "../../../globals/tmdbConfig";
import firebaseConfig from "../../../globals/firebaseConfig";
import { getDoc, doc, getFirestore, setDoc, deleteDoc, getDocs, collection, updateDoc, query, where, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const editPassword = {
    async render() {
        return ` 
        <div class="container-fluid">
        <div class="row" >
            <div class="page-content" style="background-color:#27292a;" align="center">
            
            <div class="row">
              </div>
              <div align="center" style="color:#ec6090; max-width:auto; background-color:#1f2122; border-radius:20px" align="center" >
              <div class="heading-section" align="center" style="padding : 20px;">
              <h4>Edit Profil</h4>
              </div>
                <form class="mx-1 mx-md-4" id="editpassform">
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-unlock-alt fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="newPassword" class="form-control" placeholder="Password Baru" required/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="reNewPassword" placeholder="Konfirmasi Password Baru" class="form-control" required/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="oldPassword" placeholder="Password Lama" class="form-control" required/>
                    </div>
                  </div>


                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4" style="padding-bottom:20px;">
                    <button type="submit" class="btn btn-primary btn-lg" style="background-color:#ec6090; border-color:#e75e8d96; font-family:'Poppins', sans-serif;padding">Konfirmasi</button>   
                    </div>

                  <div class="d-flex justify-content-left mx-4 mb-3 mb-lg-4" style="padding-bottom:0px;">
                    
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

        const newPassword = document.getElementById('newPassword');
        const reNewPassword = document.getElementById('reNewPassword');
        const oldPassword = document.getElementById('oldPassword')
        

        const EditPassForm = document.getElementById('editpassform');
        EditPassForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            console.log(newPassword.value);
            console.log(reNewPassword.value);
            console.log(oldPassword.value);
            if (newPassword.value == reNewPassword.value) {
                if (oldPassword.value == data.password) {
                    try {
                        await updateDoc(docRef, {
                            password: reNewPassword.value
                        })
                        Swal.fire({
                            icon: 'success',
                            title: 'Ganti Password Berhasil',
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
                            'Ganti Password Gagal',
                            'error'
                          )
                    }
                    
                } else{
                    Swal.fire(
                        'Password Lama Salah',
                        'Harap ketik ulang password lama anda',
                        'error'
                    )
                }
            } else{
                Swal.fire(
                    'Ganti Password Gagal',
                    'Password Baru Tidak Sama dengan Konfirmasi',
                    'error'
                )
            }
        })
    }
}

export default editPassword;