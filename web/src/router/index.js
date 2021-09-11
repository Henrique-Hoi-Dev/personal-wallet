import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Owing from "../views/Owing.vue";
import Vanquished from "../views/Vanquished.vue";
import Edit from "../views/Edit.vue";
import Paid from "../views/Paid.vue";
import Profile from "../views/Profile.vue";
import CreateParcelas from "../views/dadosParcelamento/CreateParcelas.vue";
import ListeParcelas from "../views/dadosParcelamento/ListeParcelas.vue";
import EditarParcela from "../views/dadosParcelamento/Editar.vue";
import Auth from "@/auth/Auth.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/profile/:id/:prop",
    name: "profile",
    props: true,
    component: Profile
  },
  {
    path: "/owing",
    name: "Owing",
    component: Owing
  },
  {
    path: "/vanquished",
    name: "Vanquished",
    component: Vanquished
  },
  {
    path: "/paid",
    name: "paid",
    component: Paid
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: Edit
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth
  },
  {
    path: "/createParcela/:id",
    name: "createParcela",
    component: CreateParcelas
  },
  {
    path: "/listeParcela/:id",
    name: "listeParcela",
    component: ListeParcelas
  },
  {
    path: "/editarParcela/:id",
    name: "editarParcela",
    component: EditarParcela
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
