'use strict';

import crypto from 'crypto';
import { storeImageAsDataURL } from '../firebase/storage';
import { saveNewPost } from '../firebase/db';

export const actionsPost = {
    uploadImage() {
        let randomImgName = crypto.randomBytes(16).toString('hex');
        storeImageAsDataURL('posts', randomImgName, this.getters.image);
        saveNewPost(randomImgName, this.getters.userId, this.getters.caption, this.getters.filter);

        // reset all image related stuff
        this.dispatch('resetImage');
    },
};