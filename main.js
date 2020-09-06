'use strict';

import Vue from 'vue';
import VueDragscroll from 'vue-dragscroll';
import { firestorePlugin } from 'vuefire';

import App from './App';
import router from './router';
import store from './store';

// TODO remove
// store.dispatch('login', { email: 'admin@onlycheese.web.app', password: 'admin12', });

Vue.use(VueDragscroll);
Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');