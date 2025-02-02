import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import store from '@/store/index';

import Main from '@/modules/main/main.vue';
import Login from '@/modules/login/login.vue';
import Register from '@/modules/register/register.vue';

import Dashboard from '@/pages/dashboard/dashboard.vue';
import AvailableGames from '@/pages/availableGames/availableGames.vue';
import Profile from '@/pages/profile/profile.vue';
import ForgotPassword from '@/modules/forgot-password/forgot-password.vue';
import RecoverPassword from '@/modules/recover-password/recover-password.vue';
import PrivacyPolicy from '@/modules/privacy-policy/privacy-policy.vue';
import SubMenu from '@/pages/main-menu/sub-menu/sub-menu.vue';
import Blank from '@/pages/blank/blank.vue';
import Games from '@/pages/games/games.vue';
import Users from '@/pages/users/users.vue';
import actions from '@/store/auth/actions';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'profile',
                name: 'Profile',
                component: Profile,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'users',
                name: 'users',
                component: Users,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'blank',
                name: 'Blank',
                component: Blank,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'games',
                name: 'Games',
                component: Games,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'sub-menu-1',
                name: 'Sub Menu 1',
                component: SubMenu,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'sub-menu-2',
                name: 'Sub Menu 2',
                component: Blank,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'availableGames',
                name: 'Available Games',
                component: AvailableGames,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/recover-password',
        name: 'RecoverPassword',
        component: RecoverPassword,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/privacy-policy',
        name: 'RecoverPassword',
        component: PrivacyPolicy
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        // Check if the session token is present and has not expired
        const sessionCookie = document.cookie
            .split('; ')
            .find((cookie) => cookie.startsWith('session_token='));
        if (sessionCookie) {
            const cookieValue = sessionCookie.split('=')[1];
            const [sessionToken, expirationTime] = cookieValue.split('|');
            if (
                new Date() < new Date(expirationTime) &&
                localStorage.getItem('auth_user') != null
            ) {
                const expirationTime = new Date(
                    Date.now() + 3600000
                ).toUTCString(); // Expires in 1 hour
                const cookieValue = `${sessionToken}|${expirationTime}`;
                document.cookie = `session_token=${cookieValue}; expires=${expirationTime}; path=/`;
                next();
                return;
            } else {
                localStorage.removeItem('user_token');
                localStorage.removeItem('auth_user');
                store.commit('auth/login', null);
                store.commit('auth/getUser', null);
                store.commit('auth/user', null);
                document.cookie = ``;
                next('/login');
            }
        }
        next('/login');
    } else {
        // The route does not require authentication, proceed to the route
        next();
    }

    // const token = localStorage.getItem('user_token');

    // if (to.meta.requiresAuth && !store.getters['auth/token']) {
    //     next('/login');
    // } else if (to.meta.requiresUnauth && !!store.getters['auth/token']) {
    //     next('/');
    // } else {
    //     next();
    // }
});

// router.beforeEach((to, from, next) => {
//     // Check if the route requires authentication
//     if (to.meta.requiresAuth) {
//       // Check if the session token is present and has not expired
//       const sessionCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('session_token='));
//       if (sessionCookie) {
//         const cookieValue = sessionCookie.split('=')[1];
//         const [sessionToken, expirationTime] = cookieValue.split('|');
//         if (new Date() < new Date(expirationTime)) {
//           // The session token is valid, set it in the Vuex store and proceed to the route
//           store.commit('auth/setToken', sessionToken);
//           next();
//           return;
//         }
//       }
//       // The session token is not valid, redirect to the login page
//       next('/login');
//     } else {
//       // The route does not require authentication, proceed to the route
//       next();
//     }
//   });

export default router;
