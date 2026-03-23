/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ITeam, ITeamGame, ITeamMemberAttendance} from '@/interfaces/team';
import {ApiManager} from './ApiManager';

const getError = (error: any) => {
    const message = error?.message || 'Failed';
    return new Error(message);
};

export const getAllTeams = async () => {
    try {
        const [teamsResponse, schedulesResponse] = await Promise.all([
            ApiManager.get('Admin/GetAdminTeams'),
            ApiManager.get('Admin/GetAdminTeamSchedules')
        ]);

        const teamRows = teamsResponse?.data || [];
        const scheduleRows = schedulesResponse?.data || [];
        const schedulesByTeam = groupSchedulesByTeam(scheduleRows);

        return {
            ok: true,
            data: teamRows.map((row: any) =>
                mapAdminTeamRow(row, schedulesByTeam.get(Number(row?.TeamId || 0)) || [])
            )
        };
    } catch (error: any) {
        throw getError(error);
    }
};

export const getTeamGameMembers = async (
    teamId: number,
    gameId: number
): Promise<{ok: boolean; data: ITeamMemberAttendance[]}> => {
    try {
        const [rosterResponse, paymentStatusResponse] = await Promise.all([
            ApiManager.get('Admin/GetAdminTeamRoster'),
            ApiManager.get('Admin/GetAdminTeamScheduleMemberPaymentStatus')
        ]);

        const rosterRows = rosterResponse?.data || [];
        const paymentRows = paymentStatusResponse?.data || [];
        const rosterByUserId = new Map<string, any>(
            rosterRows
                .filter((item: any) => Number(item?.TeamId || 0) === teamId)
                .map((item: any) => [String(item?.UserId || ''), item])
        );

        return {
            ok: true,
            data: paymentRows
                .filter(
                    (item: any) =>
                        Number(item?.TeamId || 0) === teamId &&
                        Number(item?.TeamScheduleId || 0) === gameId
                )
                .map((item: any) =>
                    mapAdminTeamSchedulePaymentRow(
                        item,
                        rosterByUserId.get(String(item?.UserId || ''))
                    )
                )
        };
    } catch (error: any) {
        throw getError(error);
    }
};

export const getTeamRosterMembers = async (
    teamId: number
): Promise<{ok: boolean; data: ITeamMemberAttendance[]}> => {
    try {
        const rosterResponse = await ApiManager.get('Admin/GetAdminTeamRoster');
        const rosterRows = rosterResponse?.data || [];
        return {
            ok: true,
            data: rosterRows
                .filter((item: any) => Number(item?.TeamId || 0) === teamId)
                .map(mapAdminTeamRosterRow)
        };
    } catch (error: any) {
        throw getError(error);
    }
};

const mapAdminTeamRow = (row: any, games: ITeamGame[]): ITeam => {
    const nextGameDate = normalizeDateOnly(row?.NextGameDate);
    const nextOpponent = row?.NextOpponent || '';
    const nextLocation = row?.NextLocation || '';

    return {
        teamId: Number(row?.TeamId || 0),
        ownerUserId: String(row?.OwnerUserId || ''),
        teamName: String(row?.TeamName || ''),
        description: String(row?.Description || ''),
        logoUrl: String(row?.LogoUrl || ''),
        division: String(row?.Division || ''),
        teamType: String(row?.TeamType || ''),
        location: String(row?.Location || ''),
        createdDate: String(row?.CreatedDate || ''),
        ownerDisplayName: String(row?.OwnerDisplayName || ''),
        ownerEmail: String(row?.OwnerEmail || ''),
        ownerPhone: String(row?.OwnerPhone || ''),
        totalMembers: Number(row?.TotalMembers || 0),
        activeMembers: Number(row?.ActiveMembers || 0),
        adminCount: Number(row?.AdminCount || 0),
        captainCount: Number(row?.CaptainCount || 0),
        totalSchedules: Number(row?.TotalSchedules || 0),
        activeSchedules: Number(row?.ActiveSchedules || 0),
        completedSchedules: Number(row?.CompletedSchedules || 0),
        nextGameDate: String(nextGameDate),
        nextOpponent: String(nextOpponent),
        nextLocation: String(nextLocation),
        isTeamActive: Boolean(row?.IsTeamActive),
        isTeamDeleted: Boolean(row?.IsTeamDeleted),
        subscriptionType: String(row?.SubscriptionType || ''),
        subscriptionPrice: Number(row?.SubscriptionPrice || 0),
        subscriptionIsActive: Boolean(row?.SubscriptionIsActive),
        subscriptionIsExpired: Boolean(row?.SubscriptionIsExpired),
        games
    };
};

const mapAdminTeamRosterRow = (row: any): ITeamMemberAttendance => {
    return {
        memberId: String(row?.UserId || ''),
        fullName:
            String(row?.DisplayName || '').trim() ||
            `${String(row?.FirstName || '').trim()} ${String(
                row?.LastName || ''
            ).trim()}`.trim(),
        email: String(row?.Email || ''),
        phone: String(row?.Phone || ''),
        squareCustomerId: String(row?.SquareCustomerId || ''),
        lastTransactionApiId: '',
        isAdmin: Boolean(row?.IsAdmin),
        isCaptain: Boolean(row?.IsCaptain),
        line: String(row?.Line || ''),
        position: String(row?.Position || ''),
        isRosterActive: Boolean(row?.IsRosterActive),
        isUserActive: Boolean(row?.IsUserActive),
        // Placeholder until game attendance/payment view is wired.
        goingStatus: 'No Response',
        paymentStatus: 'Pending',
        paymentAmount: 0
    };
};

const mapAdminTeamSchedulePaymentRow = (
    row: any,
    rosterRow: any
): ITeamMemberAttendance => {
    const paymentStatus = normalizePaymentStatus(String(row?.PaymentStatusText || ''));
    const paidAmountFromTransaction = Number(row?.LatestTransactionAmount || 0);
    const defaultCost = Number(row?.CostPerPlayer || 0);

    return {
        memberId: String(row?.UserId || ''),
        fullName:
            String(row?.DisplayName || '').trim() ||
            `${String(row?.FirstName || '').trim()} ${String(
                row?.LastName || ''
            ).trim()}`.trim(),
        email: String(row?.Email || ''),
        phone: String(row?.Phone || ''),
        squareCustomerId: String(row?.SquareCustomerId || rosterRow?.SquareCustomerId || ''),
        lastTransactionApiId: String(row?.LatestTransactionApiId || ''),
        isAdmin: Boolean(rosterRow?.IsAdmin),
        isCaptain: Boolean(rosterRow?.IsCaptain),
        line: String(row?.Line || rosterRow?.Line || ''),
        position: String(row?.Position || rosterRow?.Position || ''),
        isRosterActive:
            rosterRow?.IsRosterActive !== undefined
                ? Boolean(rosterRow?.IsRosterActive)
                : true,
        isUserActive:
            rosterRow?.IsUserActive !== undefined
                ? Boolean(rosterRow?.IsUserActive)
                : true,
        goingStatus: normalizeGoingStatus(Number(row?.AvailabilityTypeId || 4)),
        paymentStatus,
        paymentAmount:
            paidAmountFromTransaction > 0
                ? paidAmountFromTransaction
                : paymentStatus === 'Handled Offline'
                  ? defaultCost
                  : 0
    };
};

const normalizeGoingStatus = (
    availabilityTypeId: number
): ITeamMemberAttendance['goingStatus'] => {
    switch (availabilityTypeId) {
        case 1:
            return 'Going';
        case 2:
            return 'Not Going';
        case 3:
            return 'Maybe';
        default:
            return 'No Response';
    }
};

const normalizePaymentStatus = (
    paymentStatusText: string
): ITeamMemberAttendance['paymentStatus'] => {
    switch (paymentStatusText.toLowerCase()) {
        case 'paid via app':
            return 'Paid In App';
        case 'paid outside app':
            return 'Handled Offline';
        case 'refunded':
            return 'Refunded';
        case 'n/a - not going':
            return 'N/A';
        default:
            return 'Pending';
    }
};

const groupSchedulesByTeam = (rows: any[]): Map<number, ITeamGame[]> => {
    const grouped = new Map<number, ITeamGame[]>();

    for (const row of rows) {
        const teamId = Number(row?.TeamId || 0);
        if (!grouped.has(teamId)) {
            grouped.set(teamId, []);
        }
        grouped.get(teamId)?.push(mapAdminTeamScheduleRow(row));
    }

    grouped.forEach((games: ITeamGame[]) => {
        games.sort((a: ITeamGame, b: ITeamGame) => {
            const aTime = Date.parse(a.gameDate || '');
            const bTime = Date.parse(b.gameDate || '');
            return bTime - aTime;
        });
    });

    return grouped;
};

const mapAdminTeamScheduleRow = (row: any): ITeamGame => {
    const isDeleted = Boolean(row?.IsDeleted);
    const isCompleted = Boolean(row?.IsCompleted);

    return {
        gameId: Number(row?.TeamScheduleId || 0),
        opponentName: String(row?.OpposingTeamName || ''),
        gameDate: normalizeDateOnly(row?.GameStartDate),
        startTime: formatTime12Hour(row?.GameStartTime),
        gameType: String(row?.GameType || ''),
        costPerPlayer: Number(row?.CostPerPlayer || 0),
        spotsAvailable: Number(row?.SpotsAvailable || 0),
        openSpots: Number(row?.OpenSpots || 0),
        goingCount: Number(row?.GoingCount || 0),
        notGoingCount: Number(row?.NotGoingCount || 0),
        maybeCount: Number(row?.MaybeCount || 0),
        noResponseCount: Number(row?.NoResponseCount || 0),
        paidViaAppCount: Number(row?.PaidViaAppCount || 0),
        paidOutsideAppCount: Number(row?.PaidOutsideAppCount || 0),
        refundedCount: Number(row?.RefundedCount || 0),
        unpaidGoingCount: Number(row?.UnpaidGoingCount || 0),
        totalCollectedAppAmount: Number(row?.TotalCollectedAppAmount || 0),
        venue: String(row?.Location || ''),
        status: isDeleted ? 'Cancelled' : isCompleted ? 'Completed' : 'Scheduled',
        members: []
    };
};

const normalizeDateOnly = (value: any): string => {
    if (!value) {
        return '';
    }
    const raw = String(value);
    if (raw.includes('T')) {
        return raw.split('T')[0];
    }
    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed.toISOString().split('T')[0];
    }
    return raw;
};

const formatTime12Hour = (value: any): string => {
    if (!value) {
        return '';
    }

    const raw = String(value).trim();
    const match = raw.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (match) {
        const hour24 = Number(match[1]);
        const minute = match[2];
        if (Number.isNaN(hour24) || hour24 < 0 || hour24 > 23) {
            return raw;
        }
        const suffix = hour24 >= 12 ? 'PM' : 'AM';
        const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
        return `${hour12}:${minute} ${suffix}`;
    }

    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
        const hours = parsed.getHours();
        const minutes = String(parsed.getMinutes()).padStart(2, '0');
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 === 0 ? 12 : hours % 12;
        return `${hour12}:${minutes} ${suffix}`;
    }

    return raw;
};
