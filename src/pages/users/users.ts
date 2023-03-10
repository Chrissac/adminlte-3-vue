import {Options, Vue} from 'vue-class-component';
import {useToast} from 'vue-toastification';
import {getAllUsers} from '@/services/usersAuth';
import { reactive,ref,onMounted  } from 'vue';
import {
    defineComponent,
    provide,
}               from "vue"
export default defineComponent({
    name: "usersList",
    setup() {

        const columns = [
            {
              data: 'id',
              title: 'Id',
              visible:false
            },
            {
              data: 'firstName',
              title: 'First Name',
            },
            {
              data: 'lastName',
              title: 'Last name',
            },
            {
                data: 'email',
                title: 'Email',
              },
          ];
          
        interface vAdminUsers {
            Id: string;
            FirstName: string;
            LastName: string;
            Email: string;
            DisplayName: string;
            Phone: string;
            Distance?: number | null;
            Address: string;
            AddressLat: number;
            AddressLng: number;
            CurrentLat?: number | null;
            CurrentLng?: number | null;
            SquareCustomerId: string;
            FcmId: string;
            ImageUrl: string;
            About: string;
            IsProfileCompleted?: boolean | null;
            HasEmailNotification?: boolean | null;
            HasFirebaseNotification?: boolean | null;
            IsDeleted?: boolean | null;
            IsActive?: boolean | null;
            ApprovedFlag?: boolean | null;
            LoginTypeId: number;
            WithdrawBalance?: number | null;
            Difficulty: string;
            DifficultyLevel: number;
        }
        const state = reactive({
            tableData: ref<vAdminUsers[]>([]),
            tableHeader: [{
                name: "Naam",
                key: "name",
                sortable: true,
            }]
        });


       async function getListings() {
            const responseData = (await getAllUsers()).data;
            state.tableData = responseData;
            const test = '';
        }

        onMounted(async () => {
            getListings()
        });

        return { state,getListings,columns };

    },
});
// const columns = [
//     { data: 'name' },
//     { data: 'position' },
//     { data: 'office' },
//     { data: 'extn' },
//     { data: 'start_date' },
//     { data: 'salary' },
//   ];
// @Options({
//     components: {
//         'app-input': Input,
//         'pf-checkbox': PfCheckbox,
//         'pf-button': PfButton
//     }
// })

// export default class Users extends Vue {
//     public isUsersLoading: boolean = false;
//     public async getAllUsers(): Promise<void> {
//         try {
//             this.isUsersLoading = true;
//             const responseData = (await getAllUsers()).data;
//             this.isUsersLoading = false;
//         } catch (error: any) {
//             this.isUsersLoading = false;
//         }
//     }
    
// }
