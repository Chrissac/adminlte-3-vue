export interface ITeamMemberAttendance {
    memberId: string;
    fullName: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    isCaptain: boolean;
    line: string;
    position: string;
    isRosterActive: boolean;
    isUserActive: boolean;
    goingStatus: 'Going' | 'Not Going' | 'Maybe' | 'No Response';
    paymentStatus:
        | 'Paid In App'
        | 'Handled Offline'
        | 'Refunded'
        | 'Pending'
        | 'N/A';
    paymentAmount: number;
}

export interface ITeamGame {
    gameId: number;
    opponentName: string;
    gameDate: string;
    startTime: string;
    gameType: string;
    costPerPlayer: number;
    spotsAvailable: number;
    openSpots: number;
    goingCount: number;
    notGoingCount: number;
    maybeCount: number;
    noResponseCount: number;
    paidViaAppCount: number;
    paidOutsideAppCount: number;
    refundedCount: number;
    unpaidGoingCount: number;
    totalCollectedAppAmount: number;
    venue: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    members: ITeamMemberAttendance[];
}

export interface ITeam {
    teamId: number;
    ownerUserId: string;
    teamName: string;
    description: string;
    logoUrl: string;
    division: string;
    teamType: string;
    location: string;
    createdDate: string;
    ownerDisplayName: string;
    ownerEmail: string;
    ownerPhone: string;
    totalMembers: number;
    activeMembers: number;
    adminCount: number;
    captainCount: number;
    totalSchedules: number;
    activeSchedules: number;
    completedSchedules: number;
    nextGameDate: string;
    nextOpponent: string;
    nextLocation: string;
    isTeamActive: boolean;
    isTeamDeleted: boolean;
    subscriptionType: string;
    subscriptionPrice: number;
    subscriptionIsActive: boolean;
    subscriptionIsExpired: boolean;
    games: ITeamGame[];
}
