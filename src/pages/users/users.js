
import {getAllUsers} from '@/services/usersAuth';
import { FilterMatchMode } from 'primevue/api';
import { IUsers } from '@/interfaces/user';
import {ApiManager} from '@/services/ApiManager';
  
export default {
    data() {
      return {
        loading: true,
        users: [],
        filters: {
          global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      },
      editingRows: [],
      levels: [
        { label: 'N/A', value: 0 },
        { label: 'E', value: 1 },
        { label: 'D', value: 2 },
        { label: 'C', value: 3 },
        { label: 'B', value: 4 },
        { label: 'A', value: 5 },
        { label: 'AA', value: 6 }
      ],
      statuses: [
        { label: "true", value: true },
        { label: "false", value: false }
      ]
      }
    },
    async mounted() {
        this.users = (await getAllUsers()).data;
        this.loading = false;
    },
    methods: {
     async onRowEditSave(event) {
          const { newData, index } = event;
          const userIndex = this.users.findIndex(user => user.id === newData.id);
          this.users[userIndex] = newData
          this.loading = true;
          // this.users = (await getAllUsers()).data;
          const userDetails = {
              "Id": newData.id,
              "IsDeleted": newData.isDeleted,
              "IsApproved": newData.approvedFlag,
              "DisplayName": newData.displayName,
              "Phone": newData.phone,
              "IsGoalie": newData.userType === "Team"? false : true,
              "DifficultyLevel" : newData.difficultyLevel,
              "Difficulty" : newData.difficulty
          };
         const response = await ApiManager.post(
          'Admin/UpdateUserDetails',
          userDetails
          );
          if(response?.ok){
            this.loading = false;
          }else{
            this.loading = false;
          }
      },
      getStatusLabel(status) {
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
      this.$refs.dt.exportCSV();
    }
  }
};





