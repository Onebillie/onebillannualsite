import { isValidEmail, validatePhoneNumber } from './common.js';

/**
 * Validates the form fields
 * @param {Object} formData - Form data to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateForm = formData => {
  const { phoneInput, emailInput, termsCheckbox } = formData;

  const isPhoneFilled = phoneInput.value.trim() !== '';
  const isEmailFilled = emailInput.value.trim() !== '';
  const isTermsChecked = termsCheckbox.checked;

  return isPhoneFilled && isEmailFilled && isTermsChecked;
};

/**
 * Validates the eircode form
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result with errors
 */
export const validateEircodeForm = formData => {
  const { eirCode, addressInput, email, phone, checkbox1, checkbox2, checkbox3 } = formData;

  let isError = false;
  const errors = {};

  if (eirCode === '' || addressInput === '') {
    errors.eircodeError = 'Please enter your address.';
    isError = true;
  }

  if (email === '' || !isValidEmail(email)) {
    errors.emailError = 'Please enter a valid email address (e.g., example@example.com).';
    isError = true;
  }

  if (phone === '' || !validatePhoneNumber(phone)) {
    errors.phoneError = 'Please enter a valid 10-digit phone number.';
    isError = true;
  }

  if (!checkbox1 && !checkbox2 && !checkbox3) {
    errors.servicesError = 'Please select at least one service.';
    isError = true;
  }

  return { isError, errors };
};

/**
 * Shows an error message for a field
 * @param {string} fieldId - ID of the field to show error for
 * @param {string} message - Error message to display
 */
export const showError = (fieldId, message) => {
  const $errorField = document.getElementById(fieldId);
  $errorField.style.display = 'block';
  $errorField.innerHTML = message;
};

/**
 * Clears all error messages
 */
export const clearErrors = () => {
  document.querySelectorAll('.text-danger').forEach(element => {
    element.style.display = 'none';
  });
};

/**
 * Submits the eircode form data to the server
 * @param {Object} formData - Form data to submit
 * @param {Function} onSuccess - Callback for successful submission
 */
export const submitOnboardingForm = (formData, onSuccess) => {
  const { eirCode, phone } = formData;

  const formDataObj = new FormData();
  formDataObj.append('eircode', eirCode);
  formDataObj.append('phone', phone);

  fetch('https://admin.onebill.ie/api/saveData', {
    method: 'POST',
    body: formDataObj,
  })
    .then(data => {
      onSuccess(data);
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
};
