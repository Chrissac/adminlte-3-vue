
import {getAllUsers} from '@/services/usersAuth';
import { FilterMatchMode } from 'primevue/api';

  
export default {
    data() {
      return {
        loading: true,
        users: [],
        filters: {
          global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      },
      editingRows: [],
      }
    },
    
    async mounted() {
        this.users = (await getAllUsers()).data;
        this.loading = false;
    },
    methods: {
      onRowEditSave(event) {
          const { newData, index } = event;

          this.users[index] = newData;
      }
    }
};





