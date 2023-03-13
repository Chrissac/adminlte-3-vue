import {IAdminUser} from '@/interfaces/aminUser';
import router from '@/router/index';

export default {
    login: (context: any, payload: string): void => {
        context.commit('setToken', payload);
        router.replace('/');
    },
    getUser: (context: any, payload: IAdminUser): void => {
        context.commit('setUser', payload);
    }
};
