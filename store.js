'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import localForage from 'localforage';
import crypto from 'crypto';

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
        caption: null,
    },
    mutations: {
        saveImage(state, image) { state.image = image; },
        saveFilter(state, filter) { state.selectedFilter = filter; },
        saveCaption(state, caption) { state.caption = caption; },

        login(state, userData) { state.user = userData; },
        logout(state) { state.user = null; },
    },
    actions: {
        saveImage({ commit }, image) { commit('saveImage', image); },
        saveFilter({ commit }, filter) { commit('saveFilter', filter); },
        saveCaption({ commit }, caption) { commit('saveCaption', caption); },

        // -------------------------- login related -----------------------------

        signup({ commit }, authData) {
            Auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(data => {
                // save profile pic on firebase storage, + don't forget to resize it!!
                let img = authData.picture;

                let stoRef = Storage.ref();
                let imagesRef = stoRef.child('images');
                imagesRef.fileName = data.user.uid;
                let spaceRef = imagesRef.child(data.user.uid);
                spaceRef.putString(img, 'data_url');

                commit('login', {});

                // save user first/last name
                DB.collection('users').doc(data.user.uid).set({
                    firstname: authData.firstname,
                    lastname: authData.lastname,
                    picture: data.user.uid,
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
                    DB.collection('users').doc(data.user.uid).get()
                    .then(doc => {
                        commit('login', {
                            idToken: data.user.uid,
                            name: `${doc.data().firstname} ${doc.data().lastname}`,
                            userImage: url,
                            email: authData.email,
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

        // -------------------------- posts related -----------------------------

        uploadImage() {
            // save profile pic on firebase storage, + don't forget to resize it!!
            let randomImgName = crypto.randomBytes(16).toString('hex');

            let stoRef = Storage.ref();
            let imagesRef = stoRef.child('posts');
            imagesRef.fileName = randomImgName;
            let spaceRef = imagesRef.child(randomImgName);
            spaceRef.putString(this.getters.image, 'data_url');

            // save post
            DB.collection('posts').doc(randomImgName).set({
                likes: 0,
                time: new Date() / 1000,
                userId: this.getters.idToken,
                caption: this.getters.caption,
                filter: this.getters.filter,
            });

            // reset all
            this.dispatch('saveImage', null);
            this.dispatch('saveCaption', null);
            this.dispatch('saveFilter', null);
        },
    },
    getters: {
        loggedIn: store => !!store.user,
        idToken: store => store.user.idToken,

        image: store => store.image,
        filter: store => store.selectedFilter,
        caption: store => store.caption,

        userImage: store => store.user.userImage,
        fullname: store => store.user.name,
        email: store => store.user.email,
    },
});