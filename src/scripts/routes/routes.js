// import dashboardHome from "../../views/dashboard/pages/dashboard";
// import accountsAdmin from "../../views/home/pages/akun";
// import dashboardAdmin from "../../views/home/pages/dashboard";
// import dataAdmin from "../../views/home/pages/data";
// import editData from "../../views/home/pages/editData";
// import editMenu from "../../views/home/pages/editMenu";
// import menuAdmin from "../../views/home/pages/menu";
// import profil from "../../views/home/pages/profil";
// import mainLogin from "../../views/login/pages/main-login";
import detailPage from "../views/home/pages/detail";
import favourite from "../views/home/pages/favourite";
import homePage from "../views/home/pages/homepage";
import profile from "../views/home/pages/profile";
import reviewed from "../views/home/pages/reviewed";
import searchPage from "../views/home/pages/search";
import mainLogin from "../views/login/pages/main-login";
import mainRegister from "../views/register/pages/main-register";



// Register routes
const registerRoutes = {
  '/': mainRegister,
};

// Login routes
const loginRoutes ={
  '/': mainLogin,
};

const homeRoutes = {
  '/': homePage,
  '/profile': profile,
  '/favourite': favourite,
  '/reviewed': reviewed,
  '/search/:id': searchPage,
  '/detail/:id':detailPage,
  '/editdata/:id': 'dsd',
}

// const HomeRoutes = {
//   '/': dashboardHome,
// }

export {
   loginRoutes, registerRoutes, homeRoutes
};
