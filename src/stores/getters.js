'use strict';

export const getters = {
    loggedIn: store => !!store.user,
    idToken: store => store.user.idToken,

    image: store => store.image,
    filter: store => store.selectedFilter,
    caption: store => store.caption,

    userImage: store => store.user.userImage,
    fullname: store => store.user.name,
    email: store => store.user.email,
};