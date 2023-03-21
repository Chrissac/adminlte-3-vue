import {getAllUsers} from '@/services/usersAuth';
import {FilterMatchMode, FilterMatchModeOptions} from 'primevue/api';
import {IUsers} from '@/interfaces/user';
import {ApiManager} from '@/services/ApiManager';
import {defineComponent} from 'vue';

export default defineComponent({
    data() {
        return {
            loading: true,
            users: [] as IUsers[],
            filters: {
                global: {value: null, matchMode: 'contains'}
            },
            editingRows: [] as IUsers[],
            levels: [
                {label: 'N/A', value: 0},
                {label: 'E', value: 1},
                {label: 'D', value: 2},
                {label: 'C', value: 3},
                {label: 'B', value: 4},
                {label: 'A', value: 5},
                {label: 'AA', value: 6}
            ],
            statuses: [
                {label: 'true', value: true},
                {label: 'false', value: false}
            ]
        };
    },
    async mounted() {
        this.users = (await getAllUsers()).data;
        this.loading = false;
    },
    methods: {
        async onRowEditSave(event: {newData: IUsers; index: number}) {
            const {newData, index} = event;
            const userIndex = this.users.findIndex(
                (user: IUsers) => user.id === newData.id
            );
            this.users[userIndex] = newData;
            this.loading = true;
            const userDetails = {
                Id: newData.id,
                IsDeleted: newData.isDeleted,
                IsApproved: newData.approvedFlag,
                DisplayName: newData.displayName,
                Phone: newData.phone,
                IsGoalie: newData.userType === 'Team' ? false : true,
                DifficultyLevel: newData.difficultyLevel,
                Difficulty: newData.difficulty
            };
            const response = await ApiManager.post(
                'Admin/UpdateUserDetails',
                userDetails
            );
            if (response?.status) {
                this.loading = false;
            } else {
                this.loading = false;
            }
        },
        getStatusLabel(status: boolean | null) {
            switch (status) {
                case true:
                    return 'danger';

                case false:
                    return 'success';

                default:
                    return null;
            }
        },
        exportCSV() {
            // This is not a type error because `this.$refs.dt` is likely to be defined in the component's template
            // If it's not defined, it will throw a runtime error
            // You can declare the ref in the component options to get type safety
            this.$refs.dt?.exportCSV();
        }
    }
});
