import {IUser} from '@/interfaces/user';
import router from '@/router/index';

export default {
    login: (context: any, payload: string): void => {
        context.commit('setToken', payload);
        router.replace('/');
    },
    getUser: (context: any, payload: IUser): void => {
        context.commit('setUser', payload);
    }
};
