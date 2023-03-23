
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
import { defineComponent,ref,Ref } from 'vue';
import {IGames} from '@/interfaces/gamesList';
import { getAllGamesByDates } from '@/services/gamesAuth';
import { stringifyQuery } from 'vue-router';
import { Goalies } from '@/interfaces/goalies';
export default defineComponent({
  setup() {
    const { handleSubmit, resetForm } = useForm();
    const { value: startDate, errorMessage: startDateErrorMessage } = useField(
      'startDate',
      validateStartDateField
    );
    const { value: endDate, errorMessage: endDateErrorMessage } = useField(
      'endDate',
      validateEndDateField
    );
    const toast = useToast();
    const games = ref([] as IGames[]);
    const expandedRows = ref([] as Goalies[]);
    const loading = ref(false);
      const filters = ref({
        global: { value: '', matchMode: 'contains' },
      });

    function validateStartDateField(value: string) {
      if (!value) {
        return '   ';
      }
      return true;
    }

    function validateEndDateField(value: string) {
      if (!value) {
        return '   ';
      }
      return true;
    }
    function exportCSV() {
      // This is not a type error because `this.$refs.dt` is likely to be defined in the component's template
      // If it's not defined, it will throw a runtime error
      // You can declare the ref in the component options to get type safety
      this.$refs.dt?.exportCSV();
  }

    const onSubmit = handleSubmit(async (values) => {
      filters.value.global.value = null;
      if (values.startDate && values.endDate) {
        loading.value = true;
        games.value = (await getAllGamesByDates(values.startDate,values.endDate)).data;
        expandedRows.value = null;
        loading.value = false;
      }
    });

    return {
        startDate,
        endDate,
        startDateErrorMessage,
        endDateErrorMessage,
        onSubmit,
        games,
        loading,
        filters,
        exportCSV,
        expandedRows
      };
    },
  });