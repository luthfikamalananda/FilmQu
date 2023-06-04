import { async } from "regenerator-runtime";
// import registerFunctions from "../../../scripts/utils/registerFunctions";

const mainRegister = {
    async render() {
        return `<section class="vh-100" style="background-image:url('../assets/images/bglogin.jpg');">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11" border-radius: 23px";>
            <div class="card text-black" style="background-color:#1f2122; border-radius: 23px;">
                <div class="card-body p-md-5" style="background-color:#1f2122; border-radius: 23px;">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style="background-color:#27292a; border-radius: 23px;" >
      
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style="color:#ec6090; font-family:'Poppins', sans-serif;" >REGISTER</p>
      
                      <form class="mx-1 mx-md-4" id="registerForm">
      
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" placeholder="Your Name" class="form-control" required />
                          </div>
                        </div>
      
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" class="form-control" placeholder="Your Email" required />
                          </div>
                        </div>
      
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" class="form-control" placeholder="Password" required />
                          </div>
                        </div>
      
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4cd" class="form-control" placeholder="Repeat your Password" required />
                          </div>
                        </div>

                        <div class="form-check d-flex justify-content-center mb-4" style="color:white;">
                        <label class="form-check-label" for="form2Example3">
                        Sudah memiliki akun? silahkan <a href="../login">Login Disini</a>
                        </label>
                        </div>
      
                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" class="btn btn-primary btn-lg" style="background-color:#ec6090; border-color:#e75e8d96; font-family:'Poppins', sans-serif;"">Register</button>
                        </div>
      
                      </form>
      
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src=../assets/images/Filmqu.png class="img-fluid" alt="Sample image">
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </section>`;
    },

    async afterRender(){
        console.log('afterrender jalan..');
        

        // const registerForm=document.getElementById('registerForm');
        // registerForm.addEventListener('submit', async(e) => {
        //     const inputNama = document.getElementById('form3Example1c')
        //     const inputEmail = document.getElementById('form3Example3c')
        //     const inputPassword = document.getElementById('form3Example4c')
        //     const inputPasswordRepeat = document.getElementById('form3Example4cd');
        //     e.preventDefault();
        //     if (inputPassword.value !== inputPasswordRepeat.value) {
        //         Swal.fire(
        //             'Konfirmasi Password Tidak Sama',
        //             'Silahkan tulis ulang password konfirmasi',
        //             'error'
        //           )
        //         setTimeout(() => {
        //             location.reload();
        //         }, 2000);
        //     }else {
        //         const data = {
        //             email: inputEmail.value,
        //             nama: inputNama.value,
        //             password: inputPassword.value
        //         }
        //         await registerFunctions.init(data);   
        //     }  
        // })
    }
}
export default mainRegister;