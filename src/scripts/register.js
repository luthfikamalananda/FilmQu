import 'regenerator-runtime';

import AppRegister from './views/register/app';


if(localStorage.getItem('user')) {
  window.location.href='/'
}

const appRegister = new AppRegister({
  maincontent: document.querySelector('#mainregister'),
});

window.addEventListener('hashchange', () => {
    appRegister.renderPage();
  });
  
  window.addEventListener('load', () => {
    appRegister.renderPage();
  });
