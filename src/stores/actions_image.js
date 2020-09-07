'use strict';

export const actionsImage = {
    saveImage({ commit }, image) {
        commit('saveImage', image);
    },

    saveFilter({ commit }, filter) {
        commit('saveFilter', filter);
    },

    saveCaption({ commit }, caption) {
        commit('saveCaption', caption);
    },

    resetImage({ commit }) {
        commit('saveImage', null);
        commit('saveFilter', null);
        commit('saveCaption', null);
    },
};