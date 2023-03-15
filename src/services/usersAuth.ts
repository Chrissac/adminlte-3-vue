/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ApiManager} from './ApiManager';
const getError = (error: any) => {
    const message = error.message || 'Failed';
    return new Error(message);
};

export const getAllUsers = async () => {
    try {
        const response = await ApiManager.post('Admin/AdminGetAllusers', null);
        return response;
    } catch (error: any) {
        throw getError(error);
    }
};
