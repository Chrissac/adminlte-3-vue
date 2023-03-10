import {calculateWindowSize} from '@/utils/helpers';
import {Options, Vue} from 'vue-class-component';
import actions from '@/store/auth/actions';
@Options({
    watch: {
        currentWindowSize: (value) => {
            console.log(value);
        }
    },
    components: {
        actions
    }
})
export default class App extends Vue {
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
