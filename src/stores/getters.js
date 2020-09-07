'use strict';

export const getters = {
    loggedIn: store => !!store.user,
    userId: store => store.user.userId,

    image: store => store.image,
    filter: store => store.selectedFilter,
    caption: store => store.caption,

    userImage: store => store.user.userImage,
    fullname: store => store.user.name,
    email: store => store.user.email,
};