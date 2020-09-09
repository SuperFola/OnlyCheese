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

    // save post in user profile
    DB.collection('users').doc(fromUserId).get()
    .then(data => {
        let new_data = data.data();
        if (!new_data.posts)
            new_data.posts = [imageName];
        else
            new_data.posts.unshift(imageName);
        DB.collection('users').doc(fromUserId).set(new_data);
    });
}

export function saveNewUser(userId, firstname, lastname) {
    DB.collection('users').doc(userId).set({
        firstname: firstname,
        lastname: lastname,
        nickname: `${firstname} ${lastname}`,
        posts: [],
    });
}

export async function updateUser(userId, content) {
    let user = await retrieveUserData(userId);
    let data = user.data();
    Object.keys(content).forEach(key => {
        data[key] = content[key];
    });
    await DB.collection('users').doc(userId).set(data);
}

export async function deleteUser(userId) {
    let user = await retrieveUserData(userId);
    let posts = user.data().posts;
    if (posts.length > 0) {
        for (let i=0; i < posts.length; ++i) {
            await DB.collections('posts').doc(posts[i]).delete();
        }
    }
    DB.collection('users').doc(userId).delete();
}

export async function retrieveUserData(userId) {
    return await DB.collection('users').doc(userId).get();
}