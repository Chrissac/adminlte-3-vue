import {useToast} from 'vue-toastification';
import {getAllUsers} from '@/services/usersAuth';
import {reactive, ref, defineComponent, Ref} from 'vue';
import {IUsers} from '@/interfaces/users';
import { FilterMatchMode,FilterMatchModeOptions } from 'primevue/api';
interface ComponentData {
    loading: boolean;
    data: Ref<IUsers[]>;
    filters: {
      global: {
        value: string;
        matchMode: string;
      };
    };
  }
  
  export default defineComponent({
    data(): ComponentData {
      return {
        loading: true,
        data: ref<IUsers[]>([]),
        filters: {
          global: {
            value: null,
            matchMode: "contains"
          }
        }
      };
    },
    methods: {
        exportCSV() {
            // this.$refs.dt.exportCSV();
        }
    },
    async mounted() {
        this.data = (await getAllUsers()).data;
        this.loading = false;
    }
});
