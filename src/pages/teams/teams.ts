import {defineComponent} from 'vue';
import {ITeam, ITeamGame, ITeamMemberAttendance} from '@/interfaces/team';
import {getAllTeams, getTeamGameMembers} from '@/services/teamsAuth';

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
            selectedGameMembers: [] as ITeamMemberAttendance[]
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
                default:
                    return 'warning';
            }
        },
        exportCSV() {
            this.$refs.dt?.exportCSV();
        }
    }
});
