'use strict';

export const mutations = {
    // ------- image related ----------
    saveImage(state, image) {
        state.image = image;
    },
    saveFilter(state, filter) {
        state.selectedFilter = filter;
    },
    saveCaption(state, caption) {
        state.caption = caption;
    },
    // ------- END of image related ----------

    // ------- user related ----------
    updateNickname(state, nickname) {
        state.user.nickname = nickname;
    },
    login(state, userData) {
        state.user = userData;
    },
    logout(state) {
        // destroy the user to mark that we logged out
        state.user = null;
    },
    // ------- END of user related ----------

    // ------- history related ------------
    historyPush(state, route) {
        state.history.push(route);
    },
    // ------- END of history related -----------
};