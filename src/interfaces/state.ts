import {IAdminUser} from './aminUser';
export interface IAuthState {
    token: string;
    user: IAdminUser;
}

export interface IAuthModule {
    namespaced: boolean;
    state: IAuthState;
    mutations: any;
    actions: any;
    getters: any;
}
