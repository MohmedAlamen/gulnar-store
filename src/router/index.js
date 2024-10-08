import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddToCart from "@/components/products/addToCart.vue";
import categoriesPage from "@/components/categories/categoriesPage.vue";
import cartPage from "@/components/cart/cartPage.vue";
import checkoutPage from "@/components/pay/checkoutPage.vue";
import productsDetails from "@/components/products/productsDetails.vue";
import userAccount from "@/components/accounts/userAccount.vue";
import loginPage from "@/components/accounts/loginPage.vue";
import registerPage from "@/components/accounts/registerPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/addtocart",
    name: "addtocart",
    component: AddToCart,
  },
  {
    path: "/categories",
    name: "categories",
    component: categoriesPage,
  },
  {
    path: "/cart",
    name: "cart",
    component: cartPage,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: checkoutPage,
  },
  {
    path: "/productsdetails",
    name: "productsdetails",
    component: productsDetails,
  },
  {
    path: "/account",
    name: "account",
    component: userAccount,
  },
  {
    path: "/login",
    name: "login",
    component: loginPage,
  },
  {
    path: "/register",
    name: "register",
    component: registerPage,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
