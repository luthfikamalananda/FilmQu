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
                          <span>Member</span>
                          <h4>Alan Smithee</h4>
                          <p>You Haven't Gone Live yet. Go Live By Touching The Button Below.</p>
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
                          <li>Favourite Film<span>3</span></li>
                          <li>Film Reviewed<span>16</span></li>
                          <li>Member Since<span>8-16-2023</span></li>
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
    }
}

export default profile;