<template>
  <div class="page container">
    <div class="mx-auto w-full sm:w-1/2 relative mb-24">
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-200 shadow-xl transform -skew-y-3 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"
      ></div>
      <div class="relative card p-6 bg-white">
        <dynamic-form
          :form="form"
          @submitted="handleSubmit"
          @change="valueChanged"
          @error="handleError"
        />
        <button
          data-cy="submit"
          class="btn bg-green-500 text-white hover:bg-green-700 mt-4"
          submit="true"
          :form="form?.id"
        >
          Try me
        </button>
      </div>
    </div>
    <div class="mx-auto w-full sm:w-1/2"><Console :content="formValues" /></div>
  </div>
</template>

<script lang="ts">
import { CheckboxField, TextField } from '@/';
import { computed, defineComponent, reactive } from 'vue';
import Console from '../components/Console.vue';

const components = {
  Console,
};
/* } from '../../dist/as-dynamic-forms.esm'; */
export default defineComponent({
  name: 'BasicDemo',
  components,
  setup() {
    const formValues = reactive({
      hideUsingCustomClass: false,
      hideUsingCustomStyles: false,
    });

    const form = computed(() => ({
      id: 'basic-demo',
      fields: {
        hideUsingCustomClass: CheckboxField({
          label: 'Toggle visibility next field with CustomClass',
        }),
        hideMe: TextField({
          label: 'Using CustomClass',
          customClass: formValues.hideUsingCustomClass
            ? 'invisible'
            : 'visible',
        }),
        hideUsingCustomStyles: CheckboxField({
          label: 'Toggle visibility next field with CustomStyles',
        }),
        hideMe2: TextField({
          label: 'Using CustomStyles',
          customStyles: {
            visibility: formValues.hideUsingCustomStyles ? 'hidden' : 'visible',
          },
        }),
      },
    }));

    function handleSubmit(values) {
      console.log('Values Submitted', values);
    }

    function valueChanged(values) {
      Object.assign(formValues, values);
      console.log('Values', values);
    }

    function handleError(errors) {
      console.error('Errors', errors);
    }

    return {
      form,
      formValues,
      handleSubmit,
      valueChanged,
      handleError,
    };
  },
});
</script>
<style lang="scss"></style>
