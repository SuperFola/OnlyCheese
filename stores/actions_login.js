'use strict';

import { signUpEmailPassword, logInEmailPassword } from '../firebase/auth';
import { storeImageAsDataURL, retrieveImageURL } from '../firebase/storage';
import { saveNewUser, retrieveUserData } from '../firebase/db';
import router from '../router';

export const actionsLogin = {
    signup({ commit }, authData) {
        // error handling
        if (!authData.firstname)    return 'First name must be provided';
        if (!authData.lastname)     return 'Last name must be provided';
        if (!authData.email)        return 'Email must be provided';
        if (!authData.password)     return 'Password must be provided';
        if (!authData.picture)      return 'A profile picture must be provided';

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
                // TODO improve error management
                console.log(error.message);
            },
        );

        return null;  // no errors
    },

    login({ commit }, authData) {
        if (!authData.email)        return 'Email must be provided';
        if (!authData.password)     return 'Password must be provided';

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
                // TODO improve error management
                console.log(error.message);
            },
        );

        return null;  // no errors
    },

    logout({ commit }) {
        commit('logout');
        router.push({ name: 'login', });
    },
};