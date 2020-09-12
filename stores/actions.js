'use strict';

import { actionsImage } from './actions_image';
import { actionsLogin } from './actions_login';
import { actionsPost  } from './actions_post';
import { actionsUser  } from './actions_user';

export const actions = {
    ...actionsImage,
    ...actionsLogin,
    ...actionsPost,
    ...actionsUser,

    // history action
    historyPush({ commit }, route) {
        commit('historyPush', route);
    },
};