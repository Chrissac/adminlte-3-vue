/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ApiManager} from './ApiManager';

const getNotImplementedError = (methodName: string) => {
    return new Error(
        `${methodName} is not configured for this project build.`
    );
};

const Gatekeeper = {
    async registerByAuth(email: string, password: string) {
        const data = {
            Email: email,
            Password: password
        };
        return ApiManager.post('Admin/CreateUserAdminAccount', data);
    },
    async loginByGoogle() {
        throw getNotImplementedError('Google login');
    },
    async registerByGoogle() {
        throw getNotImplementedError('Google registration');
    },
    async loginByFacebook() {
        throw getNotImplementedError('Facebook login');
    },
    async registerByFacebook() {
        throw getNotImplementedError('Facebook registration');
    },
    async getProfile() {
        return ApiManager.get('Admin/GetProfile');
    }
};
const getError = (error: any) => {
    const message = error.message || 'Failed';
    return new Error(message);
};

export const loginByAuth = async (email: string, password: string) => {
    try {
        const data = {
            Email: email,
            Password: password
        };
        const response = await ApiManager.post(
            'Admin/GetUserAdminAccount',
            data
        );
        // const response = await Gatekeeper.loginByAuth(email, password);
        return response;
    } catch (error: any) {
        throw getError(error);
    }
};

export const registerByAuth = async (email: string, password: string) => {
    try {
        const token = await Gatekeeper.registerByAuth(email, password);
        return token;
    } catch (error: any) {
        throw getError(error);
    }
};

export const loginByGoogle = async () => {
    try {
        const token = await Gatekeeper.loginByGoogle();
        return token;
    } catch (error: any) {
        throw getError(error);
    }
};

export const registerByGoogle = async () => {
    try {
        const token = await Gatekeeper.registerByGoogle();
        return token;
    } catch (error: any) {
        throw getError(error);
    }
};

export const loginByFacebook = async () => {
    try {
        const token = await Gatekeeper.loginByFacebook();
        return token;
    } catch (error: any) {
        throw getError(error);
    }
};

export const registerByFacebook = async () => {
    try {
        const token = await Gatekeeper.registerByFacebook();
        return token;
    } catch (error: any) {
        throw getError(error);
    }
};
export const getProfile = async () => {
    try {
        const user = await Gatekeeper.getProfile();
        return user;
    } catch (error: any) {
        throw getError(error);
    }
};
