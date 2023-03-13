import {IAuthState} from '@/interfaces/state';
import {IAdminUser} from '@/interfaces/aminUser';

export default {
    setToken: (state: IAuthState, payload: string): void => {
        state.token = payload;
    },
    setUser: (state: IAuthState, payload: IAdminUser): void => {
        state.user = payload;
    }
};
