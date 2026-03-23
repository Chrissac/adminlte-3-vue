export interface ITeamMemberAttendance {
    memberId: string;
    fullName: string;
    email: string;
    phone: string;
    goingStatus: 'Going' | 'Not Going' | 'No Response';
    paymentStatus: 'Paid In App' | 'Handled Offline' | 'Pending';
    paymentAmount: number;
}

export interface ITeamGame {
    gameId: number;
    opponentName: string;
    gameDate: string;
    startTime: string;
    venue: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    members: ITeamMemberAttendance[];
}

export interface ITeam {
    teamId: number;
    teamName: string;
    division: string;
    season: string;
    location: string;
    contactName: string;
    contactEmail: string;
    games: ITeamGame[];
}
