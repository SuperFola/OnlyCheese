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
    },
    mutations: {
        saveImage(state, image) {
            state.image = image;
        },
    },
    actions: {
        saveImage({commit}, image) {
            commit('saveImage', image);
        },
    },
    getters: {
        loggedIn: () => true,  // TODO FIX ME
    },
});