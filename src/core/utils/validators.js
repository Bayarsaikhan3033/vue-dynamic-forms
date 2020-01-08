const isEmptyInputValue = value => value == null || value.length === 0;

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

const required = control =>
  isEmptyInputValue(control.value) ? { required: true } : null;

const min = min => control => {
  if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
    return null; // don't validate empty values to allow optional controls
  }
  const value = parseFloat(control.value);

  return !isNaN(value) && value < min
    ? { min: { min, actual: +control.value } }
    : null;
};

const max = max => control => {
  if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
    return null; // don't validate empty values to allow optional controls
  }
  const value = parseFloat(control.value);
  // Controls with NaN values after parsing should be treated as not having a
  // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
  return !isNaN(value) && value > max
    ? { max: { max, actual: control.value } }
    : null;
};

const email = control => {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  }
  return EMAIL_REGEXP.test(control.value) ? null : { email: true };
};

const minLength = minLength => control => {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  }
  const length = control.value ? control.value.length : 0;
  return length < minLength
    ? { minlength: { requiredLength: minLength, actualLength: length } }
    : null;
};

const maxLength = maxLength => control => {
  const length = control.value ? control.value.length : 0;
  return length > maxLength
    ? { maxlength: { requiredLength: maxLength, actualLength: length } }
    : null;
};

const pattern = pattern => {
  if (!pattern) return null;
  let regex;
  let regexStr;
  if (typeof pattern === 'string') {
    regexStr = '';

    if (pattern.charAt(0) !== '^') regexStr += '^';

    regexStr += pattern;

    if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';

    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }
  return control => {
    if (isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }
    const value = control.value;
    return regex.test(value)
      ? null
      : { pattern: { requiredPattern: regexStr, actualValue: value } };
  };
};

export default {
  required,
  min,
  max,
  email,
  minLength,
  maxLength,
  pattern,
};
