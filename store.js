'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import localForage from 'localforage';

import { Auth } from './firebase/auth';
// import { DB } from './firebase/db';
import config from './config';
import router from './router';

Vue.use(Vuex);

const vuexStorage = new VuexPersist({
    key: config.VUE_APP_FIREBASE_PROJECT_ID,
    storage: localForage,
});

export default new Vuex.Store({
    plugins: [vuexStorage.plugin],
    state: {
        user: null,

        image: null,
        selectedFilter: null,
    },
    mutations: {
        saveImage(state, image) { state.image = image; },
        saveFilter(state, filter) { state.selectedFilter = filter; },

        login(state, userData) { state.user = userData; },
        logout(state) { state.user = null; },
    },
    actions: {
        saveImage({ commit }, image) { commit('saveImage', image); },
        saveFilter({ commit }, filter) { commit('saveFilter', filter); },

        // -------------------------- login related -----------------------------

        signin({ commit }, authData) {
            Auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(data => {
                console.log(data);
                // auto login the new user
                commit('login', {
                    idToken: data.user.uid,
                    name: data.user.displayName,
                    userImage: data.user.photoURL,
                });
                router.push({ name: 'home', });
            })
            .catch(error => {
                console.log(error.message);
            });
        },

        login({ commit }, authData) {
            Auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(data => {
                console.log(data);
                commit('login', {
                    idToken: data.user.uid,
                    name: data.user.displayName,
                    userImage: data.user.photoURL,
                });
                router.push({ name: 'home', });
            })
            .catch(error => {
                console.log(error.message);
            });
        },

        logout({ commit }) {
            commit('logout');
            router.push({ name: 'login', });
        },

        // -------------------------- end of login related -----------------------------
    },
    getters: {
        loggedIn: store => !!store.user,
        image: store => store.image,
        filter: store => store.selectedFilter,
        userImage: store => store.user.userImage,
    },
});