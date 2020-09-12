'use strict';

import Vue  from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import localForage from 'localforage';

import config from './config';

import { state }     from './stores/state';
import { mutations } from './stores/mutations';
import { actions }   from './stores/actions';
import { getters }   from './stores/getters';

// set up data persistance
Vue.use(Vuex);

const vuexStorage = new VuexPersist({
    key: config.VUE_APP_FIREBASE_PROJECT_ID,
    storage: localForage,
});

export default new Vuex.Store({
    plugins: [vuexStorage.plugin],
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
});