import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

interface FormValues {
value: Date;
}

const { handleSubmit, resetForm } = useForm<FormValues>();
const { value, errorMessage } = useField('value', validateField);
const toast = useToast();

function validateField(value: Date | null): boolean | string {
if (!value) {
return 'Date is required.';
}

return true;
}

const onSubmit = handleSubmit((values: FormValues) => {
if (values.value) {
toast.add({
severity: 'info',
summary: 'Form Submitted',
detail: values.value.toLocaleDateString(),
life: 3000,
});
resetForm();
}
});