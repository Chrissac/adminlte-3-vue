import { Goalies } from "./goalies";

export interface IGames {
    bookingId:number;
    displayName: string;
    email: string;
    phone: string;
    location: string;
    goaliesNeeded: number;
    dateBooked: Date;
    gameDate: Date;
    startTime: string;
    gameLength: string;
    gameInformation: string;
    difficulty: string;
    gameType: string;
    revenueAmount: number;
    amountCharged: number;
    isRefund: boolean;
    isPastDate: boolean;
    isDeleted: boolean;
    goalies: Goalies[];
}