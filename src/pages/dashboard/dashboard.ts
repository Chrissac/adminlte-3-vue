import {Options, Vue} from 'vue-class-component';
import{ref,Ref} from 'vue'
import {getAdminSalesData} from '@/services/dashboardAuth';
import {IDashboardData} from '@/interfaces/dashboardData';
@Options({})
export default class Dashboard extends Vue {
    public isLoading: boolean = false;
    public dashboardData: Ref<IDashboardData[]> = ref([]);
    public startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    public endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
    public async mounted(): Promise<void> {

        this.dashboardData = (await getAdminSalesData(this.startDate, this.endDate)).data;
        const test = ';'
    }
}
