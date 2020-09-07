'use strict';

import {App} from './app';
import '@firebase/firestore';

export const DB = App.firestore();

export function saveNewPost(imageName, fromUserId, caption, filter) {
    DB.collection('posts').doc(imageName).set({
        likes: 0,
        time: Math.floor(new Date() / 1000),
        userId: fromUserId,
        caption: caption,
        filter: filter,
    });
}

export function saveNewUser(userId, firstname, lastname) {
    DB.collection('users').doc(userId).set({
        firstname: firstname,
        lastname: lastname,
        nickname: `${firstname} ${lastname}`,
    });
}

export async function retrieveUserData(userId) {
    return await DB.collection('users').doc(userId).get();
}