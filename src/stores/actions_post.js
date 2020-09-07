'use strict';

import crypto from 'crypto';
import { storeImageAsDataURL } from '../firebase/storage';

export const actionsPost = {
    uploadImage() {
        // save profile pic on firebase storage, + don't forget to resize it!!
        let randomImgName = crypto.randomBytes(16).toString('hex');

        storeImageAsDataURL('posts', randomImgName, this.getters.image);

        // save post
        DB.collection('posts').doc(randomImgName).set({
            likes: 0,
            time: new Date() / 1000,
            userId: this.getters.idToken,
            caption: this.getters.caption,
            filter: this.getters.filter,
        });

        // reset all image related stuff
        this.dispatch('resetImage');
    },
};