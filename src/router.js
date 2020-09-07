'use strict';

import Vue from 'vue';
import Router from 'vue-router';

// components
import Login      from './components/Login';
import Signup     from './components/Signup';
import Home       from './components/Home';
import EditImage  from './components/EditImage';
import ShareImage from './components/ShareImage';
import Profile    from './components/Profile';

import store from './store';
import config from './config';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: config.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresNotLoggedIn: true,
            },
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
            meta: {
                requiresNotLoggedIn: true,
            },
        },
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
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                requiresAuth: true,
            },
        },
    ],
});

// checking routes to know if the user needs to be logged in or not
// and redirecting them as needed
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