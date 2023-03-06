import {Options, Vue} from 'vue-class-component';
import {loginByAuth} from '@/services/auth';

import Input from '@/components/input/input.vue';
import {useToast} from 'vue-toastification';
import {PfButton, PfCheckbox} from '@profabric/vue-components';
import { IUser } from '@/interfaces/user';
import router from '@/router';
@Options({
    components: {
        'app-input': Input,
        'pf-checkbox': PfCheckbox,
        'pf-button': PfButton
    }
})
export default class Login extends Vue {
    private appElement: HTMLElement | null = null;
    public email: string = '';
    public password: string = '';
    public rememberMe: boolean = false;
    public isAuthLoading: boolean = false;
    public isFacebookLoading: boolean = false;
    public isGoogleLoading: boolean = false;
    private toast = useToast();

    public mounted(): void {
        this.appElement = document.getElementById('app') as HTMLElement;
        this.appElement.classList.add('login-page');
    }

    public unmounted(): void {
        (this.appElement as HTMLElement).classList.remove('login-page');
    }

    public async loginByAuth(): Promise<void> {
        try {
            this.isAuthLoading = true;
            const responseData = (await loginByAuth(this.email, this.password))
                .data;
            if (responseData.isSuccessfulResponse) {
                const expirationTime = new Date(Date.now() + 3600000).toUTCString(); // Expires in 1 hour
                const cookieValue = `${responseData.id}|${expirationTime}`;
                document.cookie = `session_token=${cookieValue}; expires=${expirationTime}; path=/`;
                // this.$store.dispatch('auth/token', responseData.id);
                localStorage.setItem('user_token',responseData.id);
                localStorage.setItem("auth_user", JSON.stringify(responseData));

                this.$store.dispatch('auth/login', responseData.id);
                this.$store.dispatch('auth/getUser', responseData);
                this.$store.dispatch('auth/user', responseData);

                this.toast.success('Login succeeded');
                router.replace('/');
            } else {
                this.toast.error(responseData.descriptionResponse);
            }
            this.isAuthLoading = false;
        } catch (error: any) {
            this.toast.error(error.message);
            this.isAuthLoading = false;
        }
    }

    // public async loginByFacebook(): Promise<void> {
    //     try {
    //         this.isFacebookLoading = true;
    //         const token = await loginByFacebook();
    //         this.$store.dispatch('auth/login', token);
    //         this.toast.success('Login succeeded');
    //         this.isFacebookLoading = false;
    //     } catch (error: any) {
    //         this.toast.error(error.message);
    //         this.isFacebookLoading = false;
    //     }
    // }

    // public async loginByGoogle(): Promise<void> {
    //     try {
    //         this.isGoogleLoading = true;
    //         const token = await loginByGoogle();
    //         this.$store.dispatch('auth/login', token);
    //         this.toast.success('Login succeeded');
    //         this.isGoogleLoading = false;
    //     } catch (error: any) {
    //         this.toast.error(error.message);
    //         this.isGoogleLoading = false;
    //     }
    // }
}
