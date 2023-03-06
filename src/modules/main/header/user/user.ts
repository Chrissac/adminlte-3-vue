import {IUser} from '@/interfaces/user';
import {Options, Vue} from 'vue-class-component';
import {DateTime} from 'luxon';
import {PfDropdown, PfImage} from '@profabric/vue-components';
import router from '@/router';

@Options({
    name: 'user-dropdown',
    components: {
        'pf-dropdown': PfDropdown,
        'pf-image': PfImage
    }
})
export default class User extends Vue {
    get user(): IUser {
        const user = JSON.parse(localStorage.getItem("auth_user"));
        return user;
    }

    private logout() {
        localStorage.removeItem("auth_user");
        router.replace('/login');
    }

    get readableCreatedAtDate() {
        if (this.user) {
            return DateTime.fromISO(
                this.user.approvalDate?.toString()
            ).toFormat('dd LLLL yyyy');
        }
        return '';
    }
}
