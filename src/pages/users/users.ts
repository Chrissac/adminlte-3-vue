import {Options, Vue} from 'vue-class-component';
import {useToast} from 'vue-toastification';
import {getAllUsers} from '@/services/usersAuth';
import { reactive,ref,onMounted  } from 'vue';
import {IUsers} from '@/interfaces/users';
import {
    defineComponent,
    provide,
}from "vue"

// export default defineComponent({
//     name: "usersList",
//     setup() {
//         const columns = [
//             {
//               data: 'id',
//               title: 'Id',
//               visible:false
//             },
//             {
//               data: 'firstName',
//               title: 'First Name',
//             },
//             {
//               data: 'lastName',
//               title: 'Last name',
//             },
//             {
//                 data: 'email',
//                 title: 'Email',
//                 isEditable: true
//             },
//             {
//                 data: 'displayName',
//                 title: 'Display Name',
//             },
//             {
//                 data: 'phone',
//                 title: 'Phone',
//             },
//             {
//                 data: 'hasEmailNotification',
//                 title: 'Has Email Notification',
//             },
//             {
//                 data: 'hasFirebaseNotification',
//                 title: 'Has phone notification',
//             },
//             {
//                 data: 'isDeleted',
//                 title: 'Is Profile deleted',
//             },
//             {
//                 data: 'approvedFlag',
//                 title: 'Is Banned',
//             },
//             {
//                 data: 'withdrawBalance',
//                 title: 'Amount owed this month.',
//             },
//           ];
//         //   const onRowEditInit = (event) => {
//         //     originalRows.value[event.index] = { ...entries.value[event.index] };
//         // }
//         const state = reactive({
//             tableData: ref<IUsers[]>([]),
//             tableHeader: [{
//                 name: "Naam",
//                 key: "name",
//                 sortable: true,
//             }]
//         });

//        async function getListings() {
//             const responseData = (await getAllUsers()).data;
//             state.tableData = responseData;
//         }
        

//         onMounted(async () => {
//             getListings()
//         });

//         return { state,getListings,columns };

//     },
// });


export default {
    data() {
      return {
         columns : [
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
                title: 'Email'
            },
            {
                data: 'displayName',
                title: 'Display Name',
            },
            {
                data: 'phone',
                title: 'Phone',
                isEditable: true
            },
            {
                data: 'hasEmailNotification',
                title: 'Has Email Notification',
            },
            {
                data: 'hasFirebaseNotification',
                title: 'Has phone notification',
            },
            {
                data: 'isDeleted',
                title: 'Is Profile deleted',
            },
            {
                data: 'approvedFlag',
                title: 'Is Banned',
            },
            {
                data: 'withdrawBalance',
                title: 'Amount owed this month.',
            },
          ],
        data: ref<IUsers[]>([])
      };
    },
    async mounted() {
                    const responseData = (await getAllUsers()).data;
                    this.data = responseData;
      }
  };
  