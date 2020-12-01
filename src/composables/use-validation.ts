/* eslint-disable */

import { isPromise, removeEmpty } from '@/core/utils/helpers';
import { computed, ref } from 'vue';

export function useInputValidation(props: any, emit: any) {
  const isPendingValidation = ref(false);
  const isRequired = computed(() => {
    return props.control.validations.some(
      validation => validation.type === 'required',
    );
  });

  const requiresValidation = computed(() => {
    return props.control.validations.length > 0;
  });

  async function validate(): Promise<void> {
    if (
      (props.control.touched || props.control.dirty) &&
      requiresValidation.value
    ) {
      let errors = {};
      const syncValidations = [];
      const asyncValidations = [];
      props.control.validations.forEach(element => {
        const validation = element.validator(props.control.value);
        if (validation.constructor.name === 'Promise') {
          asyncValidations.push({
            validation: element.validator,
            text: element.text,
          });
        } else {
          syncValidations.push({ validation, text: element.text });
        }
      });

      console.log({
        sync: syncValidations,
        async: asyncValidations,
      });
      if(asyncValidations.length > 0) {
        isPendingValidation.value = true;

        Promise.all(
            asyncValidations.map(async ({ validation, text }) => ({
              validation: await validation(props.control.value),
              text,
            })),
          ).then(errorsArr => {
            errorsArr.forEach(({ validation, text }) => {
              const [key, value] = Object.entries(validation)[0];
              errors[key] = value
                ? {
                    value,
                    text,
                  }
                : null;
            });
            isPendingValidation.value = false;
            emit('validate', {
              name: props.control.name,
              errors,
              valid: Object.keys(removeEmpty(errors)).length === 0,
            });
          });
      }
      syncValidations.forEach(({ validation, text }) => {
        if (validation) {
          const [key, value] = Object.entries(validation)[0];
          errors[key] = value
            ? {
                value,
                text,
              }
            : null;
        }
      });

      emit('validate', {
        name: props.control.name,
        errors,
        valid: Object.keys(removeEmpty(errors)).length === 0,
      });
    }
  }

  const getValidationClasses = computed(() => {
    return [
      {
        'form-control--success':
          !isPendingValidation.value &&
          requiresValidation.value &&
          props.control.errors &&
          props.control.valid &&
          props.control.dirty &&
          props.control.touched,
      },
      {
        'form-control--error': !isPendingValidation.value && !props.control.valid,
      },
    ];
  });

  return {
    isPendingValidation,
    validate,
    getValidationClasses,
    isRequired,
    requiresValidation,
  };
}
