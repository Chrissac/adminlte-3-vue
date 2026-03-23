/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ITeam, ITeamMemberAttendance} from '@/interfaces/team';

const mockTeams: ITeam[] = [
    {
        teamId: 101,
        teamName: 'Downtown Blades',
        division: 'C',
        season: 'Winter 2026',
        location: 'Rink 1',
        contactName: 'Chris Miller',
        contactEmail: 'chris@example.com',
        games: [
            {
                gameId: 5001,
                opponentName: 'North Ice',
                gameDate: '2026-03-24',
                startTime: '8:00 PM',
                venue: 'Arena North',
                status: 'Scheduled',
                members: [
                    {
                        memberId: 'm-101',
                        fullName: 'Alex Turner',
                        email: 'alex@example.com',
                        phone: '555-0110',
                        goingStatus: 'Going',
                        paymentStatus: 'Paid In App',
                        paymentAmount: 25
                    },
                    {
                        memberId: 'm-102',
                        fullName: 'Sam Lee',
                        email: 'sam@example.com',
                        phone: '555-0111',
                        goingStatus: 'Not Going',
                        paymentStatus: 'Pending',
                        paymentAmount: 0
                    }
                ]
            },
            {
                gameId: 5002,
                opponentName: 'Lakeside Hockey',
                gameDate: '2026-03-29',
                startTime: '9:30 PM',
                venue: 'Arena South',
                status: 'Scheduled',
                members: [
                    {
                        memberId: 'm-103',
                        fullName: 'Jordan Pike',
                        email: 'jordan@example.com',
                        phone: '555-0112',
                        goingStatus: 'Going',
                        paymentStatus: 'Handled Offline',
                        paymentAmount: 25
                    }
                ]
            }
        ]
    },
    {
        teamId: 102,
        teamName: 'City Storm',
        division: 'B',
        season: 'Winter 2026',
        location: 'Rink 2',
        contactName: 'Taylor Davis',
        contactEmail: 'taylor@example.com',
        games: [
            {
                gameId: 6001,
                opponentName: 'Ice Guardians',
                gameDate: '2026-03-22',
                startTime: '7:15 PM',
                venue: 'Arena East',
                status: 'Completed',
                members: [
                    {
                        memberId: 'm-201',
                        fullName: 'Jamie Cruz',
                        email: 'jamie@example.com',
                        phone: '555-0210',
                        goingStatus: 'Going',
                        paymentStatus: 'Paid In App',
                        paymentAmount: 30
                    },
                    {
                        memberId: 'm-202',
                        fullName: 'Pat Kim',
                        email: 'pat@example.com',
                        phone: '555-0211',
                        goingStatus: 'No Response',
                        paymentStatus: 'Pending',
                        paymentAmount: 0
                    }
                ]
            }
        ]
    }
];

export const getAllTeams = async () => {
    return {ok: true, data: mockTeams};
};

export const getTeamGameMembers = async (
    teamId: number,
    gameId: number
): Promise<{ok: boolean; data: ITeamMemberAttendance[]}> => {
    const team = mockTeams.find((item) => item.teamId === teamId);
    const game = team?.games.find((item) => item.gameId === gameId);
    return {ok: true, data: game?.members || []};
};
