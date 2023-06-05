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
