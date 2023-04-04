import {Options, Vue} from 'vue-class-component';
import{ref,Ref} from 'vue'
import {getAdminSalesData} from '@/services/dashboardAuth';
import {IDashboardData} from '@/interfaces/dashboardData';
import DataTable from 'primevue/datatable';
@Options({})
export default class Dashboard extends Vue {
    public isLoading: boolean = true;
    public dashboardData: Ref<IDashboardData[]> = ref([]);
    public dt: Ref<DataTable> = ref();
    public filters: Ref<{
        global: {
          value: null | string;
          matchMode: string;
        };
      }> = ref({
        global: { value: null, matchMode: 'contains' },
      });
    // public startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    // public endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
    public startDate = new Date(2019, 10, 1); // November 1, 2019
    public endDate = new Date(2019, 10, 30, 23, 59, 59, 999); // November 30, 2019, 23:59:59.999

    public async beforeMount(): Promise<void> {
        this.dashboardData = (await getAdminSalesData(this.startDate, this.endDate)).data;
        this.isLoading = false;
    }
    public async getSales(): Promise<void> {
        this.isLoading = true;
        this.dashboardData = (await getAdminSalesData(this.startDate, this.endDate)).data;
        this.isLoading = false;
    }
    public exportCSV() {
        if (this.dt && this.dt.value.exportCSV) {
          this.dt.value.exportCSV()
        } else {
          console.error('Error: exportCSV method not found on datatable component');
        }
      }

}
