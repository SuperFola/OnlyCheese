'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tokenId: null,
        userId: null,
        user: null,

        image: null,
        selectedFilter: null,
    },
    mutations: {
        saveImage(state, image) { state.image = image; },
        saveFilter(state, filter) { state.selectedFilter = filter; },
    },
    actions: {
        saveImage({commit}, image) { commit('saveImage', image); },
        saveFilter({commit}, filter) { commit('saveFilter', filter); },
    },
    getters: {
        loggedIn: () => true,  // TODO FIX ME
        image: store => store.image,
    },
});