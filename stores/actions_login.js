'use strict';

import { signUpEmailPassword, logInEmailPassword } from '../firebase/auth';
import { storeImageAsDataURL, retrieveImageURL } from '../firebase/storage';
import { saveNewUser, retrieveUserData } from '../firebase/db';
import router from '../router';

export const actionsLogin = {
    signup({ commit }, authData) {
        // error handling
        if (!authData.firstname) {
            authData.on_error('First name must be provided');
            return;
        }
        if (!authData.lastname) {
            authData.on_error('Last name must be provided');
            return;
        }
        if (!authData.email) {
            authData.on_error('Email must be provided');
            return;
        }
        if (!authData.password) {
            authData.on_error('Password must be provided');
            return;
        }
        if (!authData.picture) {
            authData.on_error('A profile picture must be provided');
            return;
        }

        signUpEmailPassword(authData.email, authData.password,
            userId => {
                storeImageAsDataURL('images', userId, authData.picture);
                saveNewUser(userId, authData.firstname, authData.lastname);
                // useless but otherwise authData isn't what we expect it to be
                commit('login', {});
                // do the login stuff
                this.dispatch('login', {
                    email: authData.email,
                    password: authData.password,
                });
            },
            error => {
                authData.on_error(error.message);
            },
        );
    },

    login({ commit }, authData) {
        if (!authData.email) {
            authData.on_error('Email must be provided');
            return;
        }
        if (!authData.password) {
            authData.on_error('Password must be provided');
            return;
        }

        logInEmailPassword(authData.email, authData.password,
            async userId => {
                // url of the profile picture of the current authenticated user
                let url = await retrieveImageURL('images', userId);
                let user = await retrieveUserData(userId);

                commit('login', {
                    userId: userId,
                    name: user.data().nickname,
                    userImage: url,
                    email: authData.email,
                });

                router.push({ name: 'home', });
            },
            error => {
                authData.on_error(error.message);
            },
        );
    },

    logout({ commit }) {
        commit('logout');
        router.push({ name: 'login', });
    },
};