import {IUser} from '@/interfaces/user';
import {Options, Vue} from 'vue-class-component';
import MenuItem from '@/components/menu-item/menu-item.vue';
import {PfImage} from '@profabric/vue-components';
import SidebarSearch from '@/components/sidebar-search/sidebar-search.vue';
import {i18n} from '@/translation';

@Options({
    name: 'app-menu-sidebar',
    components: {
        'app-menu-item': MenuItem,
        'app-sidebar-search': SidebarSearch,
        'pf-image': PfImage
    }
})
export default class MenuSidebar extends Vue {
    public menu = MENU;

    get user(): IUser {
        return this.$store.getters['auth/user'];
    }

    get sidebarSkin() {
        return this.$store.getters['ui/sidebarSkin'];
    }
}

export const MENU = [
    {
        name: i18n.global.t('labels.dashboard'),
        path: '/',
        icon: 'nav-icon fas fa-tachometer-alt'
    },
    {
        name: i18n.global.t('labels.users'),
        path: '/users',
        icon: 'nav-icon fas fa-users'
    },
    {
        name: i18n.global.t('labels.games'),
        icon: 'nav-icon fas fa-hockey-puck',
        children: [
            {
                name: i18n.global.t('labels.activeGames'),
                path: '/sub-menu-1',
                icon: 'nav-icon fas fa-clock'
            },

            {
                name: i18n.global.t('labels.previousGames'),
                path: '/sub-menu-2',
                icon: 'nav-icon fas fa-chevron-left'
            }
        ]
    }
];
