'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import localForage from 'localforage';

import { Auth } from './firebase/auth';
import { Storage } from './firebase/storage';
import { DB } from './firebase/db';

import config from './config';
import router from './router';

Vue.use(Vuex);

const vuexStorage = new VuexPersist({
    key: config.VUE_APP_FIREBASE_PROJECT_ID,
    storage: localForage,
});

function retrieveURLFromRef(ref, callback) {
    ref.getDownloadURL()
    .then(url => {
        callback(url);
    });
}

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

        signup({ commit }, authData) {
            Auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(data => {
                // save profile pic on firebase storage
                let stoRef = Storage.ref();
                let imagesRef = stoRef.child('images');
                imagesRef.fileName = data.user.uid;
                let spaceRef = imagesRef.child(data.user.uid);
                spaceRef.putString(authData.picture, 'data_url');

                commit('login', {});

                // save user first/last name
                DB.collection('users').doc(authData.email).set({
                    firstname: authData.firstname,
                    lastname: authData.lastname,
                });

                this.dispatch('login', {
                    email: authData.email,
                    password: authData.password,
                });

            })
            .catch(error => {
                console.log(error);
            });
        },

        login({ commit }, authData) {
            Auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(data => {
                // retrieve user profile picture + login
                retrieveURLFromRef(Storage.ref().child('images').child(data.user.uid), url => {
                    DB.collection('users').doc(authData.email).get()
                    .then(doc => {
                        commit('login', {
                            idToken: data.user.uid,
                            name: `${doc.data().firstname} ${doc.data().lastname}`,
                            userImage: url,
                        });
                        router.push({ name: 'home', });
                    });
                });
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
        fullname: store => store.user.name,
    },
});