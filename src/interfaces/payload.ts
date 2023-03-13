import {IAdminUser} from './aminUser';
export interface IPayload {
    token: string;
    user: IAdminUser;
}
