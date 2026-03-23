import {defineComponent} from 'vue';
import {ITeam, ITeamGame, ITeamMemberAttendance} from '@/interfaces/team';
import {getAllTeams, getTeamGameMembers, getTeamRosterMembers} from '@/services/teamsAuth';

export default defineComponent({
    data() {
        return {
            loading: true,
            teams: [] as ITeam[],
            expandedRows: [] as ITeam[],
            filters: {
                global: {value: null, matchMode: 'contains'}
            },
            membersDialogVisible: false,
            selectedTeamName: '',
            selectedGameLabel: '',
            selectedGameMembers: [] as ITeamMemberAttendance[],
            membersDialogMode: 'team' as 'team' | 'game'
        };
    },
    async mounted() {
        await this.fetchTeams();
    },
    methods: {
        async fetchTeams() {
            this.loading = true;
            const response = await getAllTeams();
            this.teams = response.data || [];
            this.loading = false;
        },
        async openMembersDialog(team: ITeam, game: ITeamGame) {
            const response = await getTeamGameMembers(team.teamId, game.gameId);
            this.selectedTeamName = team.teamName;
            this.selectedGameLabel = `${game.gameDate} vs ${game.opponentName}`;
            this.selectedGameMembers = response.data || [];
            this.membersDialogMode = 'game';
            this.membersDialogVisible = true;
        },
        async openTeamMembersDialog(team: ITeam) {
            const response = await getTeamRosterMembers(team.teamId);
            this.selectedTeamName = team.teamName;
            this.selectedGameLabel = '';
            this.selectedGameMembers = response.data || [];
            this.membersDialogMode = 'team';
            this.membersDialogVisible = true;
        },
        getGameStatusSeverity(status: string) {
            switch (status) {
                case 'Scheduled':
                    return 'info';
                case 'Completed':
                    return 'success';
                case 'Cancelled':
                    return 'danger';
                default:
                    return 'secondary';
            }
        },
        getGoingSeverity(status: string) {
            switch (status) {
                case 'Going':
                    return 'success';
                case 'Not Going':
                    return 'danger';
                case 'Maybe':
                    return 'warning';
                case 'No Response':
                    return 'secondary';
                default:
                    return 'warning';
            }
        },
        getPaymentSeverity(status: string) {
            switch (status) {
                case 'Paid In App':
                    return 'success';
                case 'Handled Offline':
                    return 'info';
                case 'Refunded':
                    return 'danger';
                case 'N/A':
                    return 'secondary';
                default:
                    return 'warning';
            }
        },
        exportCSV() {
            this.$refs.dt?.exportCSV();
        }
    }
});
