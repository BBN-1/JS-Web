import { logout } from './api/api.js';
import {page, render} from './lib.js';
import { getUserData } from './utils.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';



/*debug*/
//import * as api from './api/data.js';
//window.api = api;


const root = document.querySelector('#site-content')

const logoutBtn = document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/profile', profilePage);
updateUserNav();

page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
  
    next();
  }





  function onLogout() {
    logout();
    updateUserNav();
    page.redirect("/");
  }

  
  function updateUserNav() {

    const userData = getUserData();

    if(userData){
      document.querySelector('#profile').style.display = 'block';
      document.querySelector('#guest').style.display = 'none';
      document.querySelector('#welcome').textContent = `Welcome, ${userData.username}`;
      
    }else {
      document.querySelector('#profile').style.display = 'none';
      document.querySelector('#guest').style.display = 'block';
    }

  }