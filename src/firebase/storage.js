'use strict';

import {App} from './app';
import '@firebase/storage';

export const Storage = App.storage();

export function storeImageAsDataURL(folder, name, image) {
    // TODO resize image to take less memory
    let stoRef = Storage.ref();
    let imgRef = stoRef.child(folder);
    imgRef.fileName = name;
    let spaceRef = imgRef.child(name);
    spaceRef.putString(image, 'data_url');
}

export async function retrieveImageURL(folder, name) {
    // we assume the images we want always exist
    // if you have a strange BUG with IMAGE,
    // this may be the source of it
    return await Storage.ref().child(folder).child(name).getDownloadURL();
}