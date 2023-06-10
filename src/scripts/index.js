import 'regenerator-runtime';
import AppHome from './views/home/app';


// Authentication
const navFavourite = document.getElementById('favouriteNavLI');
const navReview = document.getElementById('reviewedNavLI');
if(localStorage.getItem('user')) {
  const user = localStorage.getItem('user');
  const data = JSON.parse(user)
  if (data.status == 'moderator') {
    navFavourite.setAttribute('style', 'display: none;')
    navReview.setAttribute('style', 'display: none;')
  }
  document.getElementById('profileNav').innerHTML = ` ${data.nama.split(' ')[0]} <img src="assets/images/profile-header.jpg" alt="">`;
} else {
  const navProfile = document.getElementById('profileNav');
  navFavourite.setAttribute('style', 'display: none;')
  navReview.setAttribute('style', 'display: none;')
  navProfile.setAttribute('href', '/login')
}

const appHome = new AppHome({
  maincontent: document.querySelector('#mainhome'),
});

window.addEventListener('hashchange', () => {
    appHome.renderPage();
  });
  
  window.addEventListener('load', () => {
    appHome.renderPage();
  });


// Search Function
const searchText = document.getElementById('searchText');
searchText.addEventListener('keydown', (e) => {
  console.log(e);
  if (e.keyCode == 13)  {
    searchText.value;
    e.preventDefault()
    console.log(searchText.value);
    window.location.href = `#/search/${searchText.value}`
  }
  
})

// Navbar Hamburger
const hamburgerButton = document.getElementById('hamburger');
const navbarContents = document.getElementById('navbar');
hamburgerButton.addEventListener('click', (e) => {
  const hamburgerAtrributes = hamburgerButton.getAttribute('class')
  console.log(hamburgerAtrributes);
  hamburgerButton.setAttribute('class', 'menu-trigger active')
  navbarContents.setAttribute('style', 'display: block;')
  if (hamburgerAtrributes == 'menu-trigger active') {
    hamburgerButton.setAttribute('class', 'menu-trigger')
    navbarContents.setAttribute('style', 'display: none;')
  }
})