import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Owing from '../views/Owing.vue';
import Vanquished from '../views/Vanquished.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/owing',
    name: 'Owing',
    component: Owing,
  },
  {
    path: '/vanquished',
    name: 'Vanquished',
    component: Vanquished,
  },
  {
    path: '/paid',
    name: 'paid',
    // route level code-splitting
    // this generates a separate chunk (infoPaid.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "infoPaid" */ '../views/Paid.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
