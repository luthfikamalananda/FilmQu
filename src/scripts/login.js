import 'regenerator-runtime';

import AppLogin from './views/login/app';


if(localStorage.getItem('user')) {
  window.location.href='/'
}

const appLogin = new AppLogin({
  maincontent: document.querySelector('#mainlogin'),
});

window.addEventListener('hashchange', () => {
    appLogin.renderPage();
  });
  
  window.addEventListener('load', () => {
    appLogin.renderPage();
  });
