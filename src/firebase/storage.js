'use strict';

import {App} from './app';
import '@firebase/storage';

export const Storage = App.storage();

export function storeImageAsDataURL(folder, name, image) {
    let stoRef = Storage.ref();
    let imgRef = stoRef.child(folder);
    imgRef.fileName = name;
    let spaceRef = imgRec.child(name);
    spaceRef.putString(image, 'data_url');
}