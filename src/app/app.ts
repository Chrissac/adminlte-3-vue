import {calculateWindowSize} from '@/utils/helpers';
import {Options, Vue} from 'vue-class-component';
import actions from '@/store/auth/actions';
import router from '@/router/index';
@Options({
    watch: {
        currentWindowSize: (value) => {
            console.log(value);
        }
    },
    components: {
        actions
       },
})

export default class App extends Vue {
    // created() {
    //     // Check if the session token is present and has not expired
    //     const sessionCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('session_token='));
    //     if (sessionCookie) {
    //       const cookieValue = sessionCookie.split('=')[1];
    //       const [sessionToken, expirationTime] = cookieValue.split('|');
    //       if (new Date() < new Date(expirationTime)) {
    //         // The session token is valid, set it in the Vuex store
    //         this.$store.dispatch('auth/token', sessionToken);
            
    //       }else{
    //         localStorage.removeItem('user_token');
    //         localStorage.removeItem('auth_user');
    //         router.replace('/login');
    //       }
    //     }
    //   }
    get currentWindowSize() {
        if (this.$store.getters['ui/screenSize'] !== this.windowSize) {
            this.$store.dispatch('ui/setWindowSize', this.windowSize);
        }
        return this.windowSize;
    }

    get windowSize() {
        return calculateWindowSize(this.$windowWidth);
    }
}
