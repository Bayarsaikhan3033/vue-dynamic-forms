<template>
  <div class="page container">
    <div class="mx-auto w-full sm:w-2/3 relative mb-24">
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
          Submit
        </button>
      </div>
    </div>
    <div class="mx-auto w-full sm:w-2/3"><Console :content="formValues" /></div>
  </div>
</template>

<script lang="ts">
import {
  FormValidator,
  Validator,
  TextAreaField,
  required,
  minLength,
} from '@/';
import { computed, defineComponent, reactive } from 'vue';
import Console from '../components/Console.vue';

const components = {
  Console,
};
/* } from '../../dist/as-dynamic-forms.esm'; */
export default defineComponent({
  name: 'TextAreaFieldsDemo',
  components,
  setup() {
    const formValues = reactive({});
    const minLengthValidator: FormValidator = Validator({
      validator: minLength(10),
      text: 'Text must be greater than 10 characters long',
    });

    const form = computed(() => ({
      id: 'text-fields-demo',
      fields: {
        bio: TextAreaField({
          label: 'Bio',
        }),
        aboutMe: TextAreaField({
          label: 'About Me',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
        interests: TextAreaField({
          label: 'Interests',
          col: 5,
          rows: 10,
          validations: [Validator(minLengthValidator)],
        }),
        disabled: TextAreaField({
          label: 'Disabled',
          value:
            'Arepa ipsum dolor amet risus pretium polar ni lava ni presta la batea ¿Vas a seguir Abigail? ron!',
          disabled: true,
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
