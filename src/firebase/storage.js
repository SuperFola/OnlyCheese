'use strict';

import {App} from './app';
import '@firebase/storage';

export const Storage = App.storage();

export function storeImageAsDataURL(folder, name, image) {
    // resize image
    let newImage = new Image();
    newImage.src = image;
    newImage.onload = function() {
        let maxWidth = 512,
            maxHeight = 512,
            imgWidth = newImage.width,
            imgHeight = newImage.height;

        if (imgWidth > imgHeight) {
            if (imgWidth > maxWidth) {
                imgHeight *= maxWidth / imgWidth;
                imgWidth = maxWidth;
            }
        } else {
            if (imgHeight > maxHeight) {
                imgWidth *= maxHeight / imgHeight;
                imgHeight = maxHeight;
            }
        }

        let canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        newImage.width = imgWidth;
        newImage.height = imgHeight;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0, imgWidth, imgHeight);

        // data_url images start with data:type;base64,data
        // thus we can get the type using this small trick
        image = canvas.toDataURL(image.split(';')[0].split(':')[1]);

        // upload!
        let stoRef = Storage.ref();
        let imgRef = stoRef.child(folder);
        imgRef.fileName = name;
        let spaceRef = imgRef.child(name);
        spaceRef.putString(image, 'data_url');
    };
}

export async function retrieveImageURL(folder, name) {
    // we assume the images we want always exist
    // if you have a strange BUG with IMAGE,
    // this may be the source of it
    return await Storage.ref().child(folder).child(name).getDownloadURL();
}