import { fetchAddressesByEircode } from '../api/index.js';
import { showDropdownMenu, selectOption } from './uiHelper.js';
import {
  validateEircodeForm,
  showError,
  clearErrors,
  submitOnboardingForm,
} from './formHandler.js';

export const showAddressDropdown = () => {
  const $dropdownMenu = document.getElementById('dropdown-menu');
  const $input = document.getElementById('eir-code');
  const $eircode = $input.value;

  fetchAddressesByEircode(
    $eircode,
    data => showDropdownMenu(data, selectOption),
    () => $dropdownMenu.classList.remove('show')
  );
};

export const goToOnboard = () => {
  const formElements = {
    eirCode: document.getElementById('eir-code'),
    addressInput: document.getElementById('addressInput'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    input1: document.getElementById('input1'),
    input2: document.getElementById('input2'),
    input3: document.getElementById('input3'),
  };

  const formData = {
    eirCode: formElements.eirCode.value.trim(),
    addressInput: formElements.addressInput.value.trim(),
    email: formElements.email.value.trim(),
    phone: formElements.phone.value.trim(),
    checkbox1: formElements.input1.checked,
    checkbox2: formElements.input2.checked,
    checkbox3: formElements.input3.checked,
  };

  const { isError, errors } = validateEircodeForm(formData);

  clearErrors();

  if (isError) {
    Object.entries(errors).forEach(([fieldId, message]) => {
      showError(fieldId, message);
    });
    return;
  }

  submitOnboardingForm({ eirCode: formData.eirCode, phone: formData.phone }, data => {
    const queryString = `?input1=${formData.checkbox1}&input2=${formData.checkbox2}&input3=${formData.checkbox3}`;

    // Store data in localStorage
    const storage = {
      eircode: formData.eirCode,
      email: formData.email,
      address: formData.addressInput,
      tok: new URLSearchParams(window.location.search).get('reference'),
      services: queryString,
    };

    Object.entries(storage).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    window.location.href = `manual-based-savings.html${queryString}`;
  });
};
