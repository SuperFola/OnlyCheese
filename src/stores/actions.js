'use strict';

import { actionsImage } from './actions_image';
import { actionsLogin } from './actions_login';
import { actionsPost  } from './actions_post';

export const actions = {
    ...actionsImage,
    ...actionsLogin,
    ...actionsPost,
};