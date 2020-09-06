'use strict';

import Vue from 'vue';
import App from './App';
import VueDragscroll from 'vue-dragscroll';

Vue.use(VueDragscroll);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    render: h => h(App),
});