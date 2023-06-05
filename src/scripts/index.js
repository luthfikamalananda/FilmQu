import 'regenerator-runtime';

import AppHome from './views/home/app';



// if(localStorage.getItem('user')) {
//   window.location.href='/'
//   const userAdmin = localStorage.getItem('user');
//   const data = JSON.parse(userAdmin);
//   document.getElementById('username').innerText = data.nama;
//   document.getElementById('namauser').innerText = data.nama;
//   document.getElementById('user').innerText = data.user;
// }

const appHome = new AppHome({
  maincontent: document.querySelector('#mainhome'),
});

window.addEventListener('hashchange', () => {
    appHome.renderPage();
  });
  
  window.addEventListener('load', () => {
    appHome.renderPage();
  });

const searchNamaFilm = document.getElementById('searchNamaFilm');
searchNamaFilm.addEventListener('keydown', (e) => {
  console.log(e);
  if (e.keyCode == 13)  {
    searchNamaFilm.value;
    e.preventDefault()
    console.log(searchNamaFilm.value);
    window.location.href = `#/search/${searchNamaFilm.value}`
  }
  
}) 
