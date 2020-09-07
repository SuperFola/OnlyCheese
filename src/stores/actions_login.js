'use strict';

export const actionsLogin = {
    signup({ commit }, authData) {
        // error handling
        if (!authData.firstname)
            return 'First name must be provided';
        if (!authData.lastname)
            return 'Last name must be provided';
        if (!authData.email)
            return 'Email must be provided';
        if (!authData.password)
            return 'Password must be provided';
        if (!authData.picture)
            return 'A profile picture must be provided';

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

        return null;  // no error
    },

    login({ commit }, authData) {
        if (!authData.email)
            return 'Email must be provided';
        if (!authData.password)
            return 'Password must be provided';

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

        return null;  // no errors
    },

    logout({ commit }) {
        commit('logout');
        router.push({ name: 'login', });
    },
};