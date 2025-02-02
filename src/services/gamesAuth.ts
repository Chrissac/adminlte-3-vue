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
export const getAllAvailableGames= async () => {
    try {
        const response = await ApiManager.get('Admin/GetAllAvailableGames');
        return response;
    } catch (error: any) {
        throw getError(error);
    }
};
export const confirmPlayerRequest = async (bookingId:number, userId:string) => {
    try {
        const data = {
            bookingId : bookingId,
            userId : userId   
          };
        const response = await ApiManager.post('Player/ConfirmPlayerRequest', data);
        return response;
    } catch (error: any) {
        throw getError(error);
    }
};
