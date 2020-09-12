'use strict';

import {App} from './app';
import '@firebase/auth';

export const Auth = App.auth();

export function signUpEmailPassword(email, password, callback_ok, callback_error) {
    Auth.createUserWithEmailAndPassword(email, password)
        .then(data => callback_ok(data.user.uid))
        .catch(error => callback_error(error));
}

export function logInEmailPassword(email, password, callback_ok, callback_error) {
    Auth.signInWithEmailAndPassword(email, password)
        .then(data => callback_ok(data.user.uid))
        .catch(error => callback_error(error));
}