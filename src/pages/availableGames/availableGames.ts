import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
import { defineComponent, ref, onMounted } from 'vue';
import { IGames } from '@/interfaces/gamesList';
import { getAllAvailableGames } from '@/services/gamesAuth';
import { Goalies } from '@/interfaces/goalies';
interface GoalieData {
  displayName: string;
  email: string;
  phone: string;
  // Add other fields if needed
}
export default defineComponent({
  setup() {
    const toast = useToast();
    const games = ref([] as IGames[]);
    const expandedRows = ref([] as Goalies[]);
    const loading = ref(false);
    const filters = ref({
      global: { value: '', matchMode: 'contains' },
    });


    function confirmGoalie(goalieData: GoalieData) {
      const confirmationMessage = `Confirmed goalie: ${goalieData.displayName}`;
      toast.add({ severity: 'success', summary: 'Confirmation', detail: confirmationMessage });
    }

    function exportCSV() {
      // This is not a type error because `this.$refs.dt` is likely to be defined in the component's template
      // If it's not defined, it will throw a runtime error
      this.$refs.dt?.exportCSV();
    }

    const fetchAvailableGames = async () => {
      loading.value = true;
      games.value = (await getAllAvailableGames()).data;
      expandedRows.value = null;
      loading.value = false;
    };

    onMounted(() => {
      // Fetch data when the component is mounted
      fetchAvailableGames();
    });
    

    return {
      games,
      loading,
      filters,
      exportCSV,
      expandedRows,
    };
  },
});
