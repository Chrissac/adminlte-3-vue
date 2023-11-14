import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
import { defineComponent, ref, onMounted } from 'vue';
import { IGames } from '@/interfaces/gamesList';
import { getAllAvailableGames } from '@/services/gamesAuth';
import { confirmPlayerRequest } from '@/services/gamesAuth';
import { Goalies } from '@/interfaces/goalies';
import { ColumnSlots } from 'primevue/column';

export default {
  data() {
    return {
      games: [] as IGames[],
      expandedRows: [] as Goalies[],
      loading: false,
      filters: {
        global: { value: '', matchMode: 'contains' },
      },
      selectedGoalie: Goalies, // Add a new data property to store the selected goalie
    };
  },
  methods: {
    async confirmGoalie(goalie : Goalies) {
      if (goalie) {
        // lets call the API
        await confirmPlayerRequest(goalie.bookingId,goalie.id);
        const confirmationMessage = `Goalie has been Confirmed!: ${goalie.displayName}`;
        this.$toast.add({ severity: 'success', summary: 'Confirmation', detail: confirmationMessage });
      } else {
        console.error('No goalie data available.');
      }
    },
    exportCSV() {
      this.$refs.dt?.exportCSV();
    },
    async fetchAvailableGames() {
      this.loading = true;
      this.games = (await getAllAvailableGames()).data;
      this.expandedRows = null; // You can remove this line
      this.loading = false;
    },
  },
  async mounted() {
    await this.fetchAvailableGames();
  },
};
