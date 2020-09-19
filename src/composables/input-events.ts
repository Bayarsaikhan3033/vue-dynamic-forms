import { FormControl } from '@/core/models';

export function useInputEvents(control: FormControl<any> | undefined, emit) {
  function onChange($event) {
    if (control) {
      control.value = $event.target.value;
      control.dirty = true;
    }
    emit('changed', $event.target.value);
  }
  function onCheck($event) {
    if (control) {
      control.value = $event.target.checked;
      control.dirty = true;
    }
    emit('changed', $event.target.checked);
  }
  function onFocus() {
    emit('focus');
  }
  function onBlur() {
    emit('blur');
    if (control) {
      control.touched = true;
    }
  }
  return {
    onFocus,
    onChange,
    onBlur,
    onCheck,
  };
}
