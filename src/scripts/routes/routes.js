// import dashboardHome from "../../views/dashboard/pages/dashboard";
// import accountsAdmin from "../../views/home/pages/akun";
// import dashboardAdmin from "../../views/home/pages/dashboard";
// import dataAdmin from "../../views/home/pages/data";
// import editData from "../../views/home/pages/editData";
// import editMenu from "../../views/home/pages/editMenu";
// import menuAdmin from "../../views/home/pages/menu";
// import profil from "../../views/home/pages/profil";
// import mainLogin from "../../views/login/pages/main-login";
import homePage from "../views/home/pages/homepage";
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
  '/editdata/:id': 'dsd',
}

// const HomeRoutes = {
//   '/': dashboardHome,
// }

export {
   loginRoutes, registerRoutes, homeRoutes
};
