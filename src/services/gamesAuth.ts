/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ApiManager} from './ApiManager';
const getError = (error: any) => {
    const message = error.message || 'Failed';
    return new Error(message);
};

export const getAllGamesByDates = async (startDate:string, endDate:string) => {
    try {
        const data = {
          startDate : startDate,
          endDate : endDate   
        };
        const response = await ApiManager.post('Admin/GetAllGamesByDates', data);
        return response;
    } catch (error: any) {
        throw getError(error);
    }
};
