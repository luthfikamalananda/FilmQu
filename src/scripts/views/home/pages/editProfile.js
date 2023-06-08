const editProfile = {
    async render() {
        return ` 
        <div class="container-fluid">
        <div class="row" >
          <div class="col-lg-12 col-xl-11" border-radius: 23px";">
            <div class="page-content" style="background-color:#27292a;">
            <div class="container rounded mt-5 mb-5">
            <div class="row">
            <div class="col-md-3">
            <div class="text-center">
              <img src="//placehold.it/100" class="avatar img-circle" alt="avatar">
              <h6>Upload a different photo...</h6>
              
              <input type="file" class="form-control">
            </div>
          </div>
                <div class="col-md-5 border-right" style="color: white;">
                <form class="mx-1 mx-md-4" id="editprofform">
      
                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <input type="text" id="name" placeholder="Nama" class="form-control" disabled />
                  </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <input type="email" id="email" class="form-control" placeholder="E-mail" disabled />
                  </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <input type="password" id="password" class="form-control" placeholder="Password" required />
                  </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <input type="password" id="repeatpw" class="form-control" placeholder="Repeat your Password" required />
                  </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-vcard fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <textarea id="repeatpw" class="form-control" placeholder="Bio" rows="4"></textarea>
                  </div>
                </div>

                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button type="submit" class="btn btn-primary btn-lg" style="background-color:#ec6090; border-color:#e75e8d96; font-family:'Poppins', sans-serif;"">Edit</button>
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
        `
    },

    async afterRender() {
        console.log('afterrender jalan');
    }
}

export default editProfile;