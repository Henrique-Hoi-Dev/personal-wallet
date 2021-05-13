import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './registerServiceWorker';
import './style/global.css';
import './plugins/bootstrap-vue';
import './plugins/axios';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
