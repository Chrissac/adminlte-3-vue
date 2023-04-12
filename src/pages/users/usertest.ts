import { useToast } from 'primevue/usetoast';
import {getAllUsers} from '@/services/usersAuth';
import {IUsers} from '@/interfaces/user';
import {ApiManager} from '@/services/ApiManager';
import {defineComponent} from 'vue';
export default defineComponent({
    setup() {
        const toast = useToast();
        return { toast };
    },
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
        this.toast
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
            // const toast = useToast();
            if (response?.status) {
                this.loading = false;
                 this.toast.add({ severity: 'success', summary: 'Update Successfull!', detail: 'User Updated Successfully', life: 3000 });
            } else {
                this.loading = false;
                this.toast.add({ severity: 'success', summary: 'Update Successfull!', detail: 'Message Content', life: 3000 });
            }
            
            
        },
        getStatusLabel(status: boolean | null) {
            switch (status) {
                case true:
                    return 'success';

                case false:
                    return 'danger';

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
