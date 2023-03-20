import {useToast} from 'vue-toastification';
import {getAllUsers} from '@/services/usersAuth';
import {reactive, ref, defineComponent, Ref, provide} from 'vue';
import {IUsers} from '@/interfaces/user';
import { FilterMatchMode,FilterMatchModeOptions } from 'primevue/api';
interface ComponentData {
    loading: boolean;
    users: Ref<IUsers[]>;
    filters: {
      global: {
        value: string;
        matchMode: string;
      };
    };
    editingRows: Ref<IUsers[]>;
    returnedData: {
        data : Ref<IUsers[]>;
        newData : Ref<IUsers[]>;
        index:number;
    }
  }
  
  export default defineComponent({
    data(): ComponentData {
      return {
        loading: true,
        users: ref<IUsers[]>([]),
        filters: {
          global: {
            value: null,
            matchMode: "contains",
          }
        },
        editingRows: ref<IUsers[]>([]),
        returnedData: {
            data : ref<IUsers[]>([]),
            newData : ref<IUsers[]>([]),
            index: 0
        }
      };
    },
    methods: {
        exportCSV() {
          const test = this.$refs.dt;
          test.exportCSV();
        },
        onRowEditSave(index: number, editingRows: Ref<IUsers[]>) {
            this.returnedData = index;
            const userIndex = this.users.findIndex((user: IUsers) => user.Id === this.returnedData.newData.Id)
            this.users[userIndex] = this.returnedData.newData;
      },
    },
    async mounted() {
        this.users = (await getAllUsers()).data;
        this.loading = false;
    }
});
