'use strict';

import Vue from 'vue';
import Router from 'vue-router';

// components
import Home from './components/Home';
import EditImage from './components/EditImage';
import ShareImage from './components/ShareImage';

import store from './store';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/edit',
            name: 'edit',
            component: EditImage,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/share',
            name: 'share',
            component: ShareImage,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/login',
            name: 'login',
            // component: Login,
            meta: {
                requiresNotLoggedIn: true,
            },
        }
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresNotLoggedIn)) {
        if (store.getters.loggedIn) {
            next('/');
            return;
        }
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.loggedIn) {
            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
});

export default router;