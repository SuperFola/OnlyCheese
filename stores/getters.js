'use strict';

export const getters = {
    loggedIn: store => !!store.user,
    userId: store => store.user.userId,

    image: store => store.image,
    filter: store => store.selectedFilter,
    caption: store => store.caption,

    userImage: store => store.user.userImage,
    nickname: store => store.user.name,
    email: store => store.user.email,

    historyLastDiff(store) {
        const reversed = store.history.slice().reverse();
        const diff = reversed.findIndex(route => route !== reversed[0]);
        return reversed[diff];
    },
};