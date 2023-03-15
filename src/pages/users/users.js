
import {getAllUsers} from '@/services/usersAuth';
import { FilterMatchMode } from 'primevue/api';
import { IUsers } from '@/interfaces/user';
  
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
        { label: 'E', value: 1 },
        { label: 'D', value: 2 },
        { label: 'C', value: 3 },
        { label: 'B', value: 4 },
        { label: 'A', value: 5 },
        { label: 'AA', value: 6 }
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
          // this.users = (await getAllUsers()).data;
      }
    }
};





