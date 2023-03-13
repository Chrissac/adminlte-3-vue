import {IAuthState} from '@/interfaces/state';
import {IAdminUser} from '@/interfaces/aminUser';

export default {
    user: (state: IAuthState): IAdminUser => state.user,
    token: (state: IAuthState): string => state.token
};
