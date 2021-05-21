import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Owing from '../views/Owing.vue';
import Vanquished from '../views/Vanquished.vue';
import Edit from '../views/Edit.vue';
import Paid from '../views/Paid.vue';

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
    component: Paid,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    props: true,
    component: Edit,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
