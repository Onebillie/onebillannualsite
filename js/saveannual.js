import { initFooter, initHeader, scrollToElement } from './utils/uiHelper.js';

/** Increases input number value
 * @param {HTMLElement} target input DOM element
 */
const increaseValue = element => (element.value = parseInt(element.value) + 1);
/** Decreases input number value
 * @param {HTMLElement} target input DOM element
 */
const decreaseValue = element =>
  (element.value = element.value > 0 ? parseInt(element.value) - 1 : 0);

/** Sets up increment and decrement functionality for an input counter
 * @param {string} inputId - The ID of the input element to be controlled
 * @param {string} incrementBtnId - The ID of the button that increases the value
 * @param {string} decrementBtnId - The ID of the button that decreases the value
 */
const setupCounter = (inputId, incrementBtnId, decrementBtnId) => {
  const inputElement = document.getElementById(inputId);
  const incrementBtn = document.getElementById(incrementBtnId);
  const decrementBtn = document.getElementById(decrementBtnId);

  // validate input (number input only)
  inputElement.addEventListener('input', e => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length > 1 && value[0] === '0') {
      value = value.substring(1);
    }

    if (value === '') {
      value = '0';
    }

    e.target.value = value;
  });

  incrementBtn.addEventListener('click', () => increaseValue(inputElement));
  decrementBtn.addEventListener('click', () => decreaseValue(inputElement));
};

/**
 * Controls the visibility of elements based on the value of a selector element
 * @param {string} selectId - ID of the select element
 * @param {string} targetElemClassName - Class name of the elements to be controlled
 * @param {string} triggerValue - Value that triggers showing the elements
 */
const toggleElementsVisibility = (selectId, targetElemClassName, triggerValue) => {
  const selectorElement = document.getElementById(selectId);
  const targetElements = document.querySelectorAll('.' + targetElemClassName);

  selectorElement.addEventListener('change', () => {
    if (selectorElement.value === triggerValue) {
      targetElements.forEach(element => {
        element.style.display = 'block';
      });
    } else {
      targetElements.forEach(element => {
        element.style.display = 'none';
      });
    }
  });
};

/**
 * Validates a select element to ensure a value has been chosen
 * @param {string} selectId - ID of the select element to validate
 * @param {string} validationSelector - CSS selector for the validation message element
 * @param {boolean} isFirstInvalid - Whether this is the first invalid element (for scrolling)
 * @param {function} scrollFunction - Function to scroll to an element
 * @returns {boolean} - Whether the validation passed
 */
function validateSelectElement(selectId, validationSelector, isFirstInvalid) {
  const selectElement = document.getElementById(selectId);
  const validationElement = document.querySelector(validationSelector);
  let isValid = true;

  // Check if default option is still selected
  if (selectElement.value === 'Please Select') {
    isValid = false;
    validationElement.style.display = 'block'; // Show validation message
    if (isFirstInvalid) {
      scrollToElement(selectElement); // Scroll to this field
    }
  } else {
    validationElement.style.display = 'none'; // Hide validation message
  }

  return isValid;
}

/**
 * Validates the entire form by checking each required select element
 * @returns {boolean} - Whether the entire form is valid
 */
function validateUtilitiesForm() {
  let isValid = true;

  // Validate Smart Meter select
  const smartMeterValid = validateSelectElement('have_smart_meter', '.smartvalidation', isValid);
  isValid = isValid && smartMeterValid;

  // Validate Best Describe select
  const bestDescribeValid = validateSelectElement('best_describe', '.describevalidation', isValid);
  isValid = isValid && bestDescribeValid;

  return isValid;
}

document.addEventListener('DOMContentLoaded', () => {
  // initialize rendering header and footer
  const pathname = window.location.pathname;
  initHeader(pathname);
  initFooter();

  const $continueButton = document.getElementById('continue');

  // Disable the Continue button initially
  // $continueButton.disabled = true;
  // $continueButton.classList.add('btn-disabled'); // Add a class for styling

  // Function to enable/disable the Continue button
  function toggleContinueButton() {
    if (validateUtilitiesForm()) {
      $continueButton.disabled = false; // Enable the Continue button
      $continueButton.classList.remove('btn-disabled'); // Remove the greying out class
    } else {
      $continueButton.disabled = true; // Disable the Continue button
      $continueButton.classList.add('btn-disabled'); // Add the greying out class
    }
  }

  // ===== Your Home (Home Address) =====
  const eircode = localStorage.getItem('eircode');
  const address = localStorage.getItem('address');

  const $eircode = document.getElementById('eir-code');
  const $addressInput = document.getElementById('addressInput');
  const $addressAndEircode = document.getElementById('adressandeircode');
  const $addressDropdown = document.getElementById('addressDropdown');
  const $addressDiv = document.getElementById('addressDiv');
  const $eircodeSearchInput = document.getElementById('eircodeDiv');

  $eircode.innerText = eircode;
  $addressInput.innerText = address;
  $addressAndEircode.innerText = address;

  // Get the radio button and the hidden Eircode search div
  const $yesRadioBtn = document.getElementById('kt_create_account_form_account_type_personal');
  const $noRadioBtn = document.getElementById('kt_create_account_form_account_type_corporate');

  $noRadioBtn.addEventListener('change', () => {
    if ($noRadioBtn.checked) {
      $eircodeSearchInput.style.display = 'block';
    }
  });
  $yesRadioBtn.addEventListener('change', () => {
    if ($yesRadioBtn.checked) {
      $eircodeSearchInput.style.display = 'none';
    }
  });

  // Handle Eircode search
  $eircode.addEventListener('keyup', async () => {
    const eircode = $eircode.value;
    $addressInput.style.display = 'none';
    $addressDiv.style.display = 'none';

    try {
      fetch('https://admin.onebill.ie/api/getAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eircode }),
      })
        .then(response => response.json())
        .then(data => {
          $addressDropdown.style.display = 'block';
          $addressDropdown.innerHTML = '';

          if (data.addresses?.length > 0) {
            data.addresses
              .filter(addrObj => addrObj.address)
              .forEach(addrObj => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'dropdown-item';
                a.href = '#';
                a.id = addrObj.eircode;
                a.textContent = addrObj.address;
                a.dataset.eircode = addrObj.eircode;
                li.appendChild(a);
                $addressDropdown.appendChild(li);
              });
          } else {
            $addressDropdown.innerHTML = 'Address Not Found';
          }
        });
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  });

  // Handle address selection
  $addressDropdown.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      const selectedAddress = event.target.textContent;
      const selectedId = event.target.id;

      $addressInput.value = selectedAddress;
      $eircode.value = selectedId;
      $addressAndEircode.textContent = selectedAddress;

      localStorage.setItem('eircode', selectedId);
      localStorage.setItem('address', selectedAddress);

      $addressInput.style.display = 'block';
      $addressDiv.style.display = 'block';
      $addressDropdown.innerHTML = '';
    }
  });

  /** @description onboarding form validation value */
  let isValid = false;

  // ===== Utilities =====
  const elemIds = ['peopleNumber', 'bedroomNumber', 'solarNumber', 'batteriesNumber', 'evNumber'];

  elemIds.forEach(id => setupCounter(id, `${id}_increment`, `${id}_decrement`));

  toggleElementsVisibility('have_smart_meter', 'have_smart_meter_hide', '1');
  toggleElementsVisibility('best_describe', 'best_describe_hide', 'Home Owner');

  // validation
  const $smartMeterSelect = document.getElementById('have_smart_meter');
  const $bestDescribeSelect = document.getElementById('best_describe');

  const $smartMeterValidation = document.querySelector('.smartvalidation');
  const $describeValidation = document.querySelector('.describevalidation');

  // Attach real-time validation to the form fields
  $smartMeterSelect.addEventListener('change', function () {
    // Hide the validation error as soon as a valid option is chosen
    if ($smartMeterSelect.value !== 'Please Select') {
      $smartMeterValidation.style.display = 'none'; // Hide the validation error
    }
    // FIXME: validation 다시확인
    toggleContinueButton(); // Re-check the form validity
  });

  $bestDescribeSelect.addEventListener('change', function () {
    // Hide the validation error as soon as a valid option is chosen
    if ($bestDescribeSelect.value !== 'Please Select') {
      $describeValidation.style.display = 'none'; // Hide the validation error
    }
    // FIXME: validation 다시확인
    toggleContinueButton(); // Re-check the form validity
  });

  // TODO: continue 버튼 클릭시 validateForm 함수 호출하기, 위에 validateSelectElement 등 유효성검사관련 함수들 다시 살펴보기(중복없나확인)

  // ===== Electricity =====

  const $electricityProviderSelect = document.getElementById('electricity_provider_id');
  const $electricityErrorMsg = document.querySelector('.providervalidation');

  // real-time validation for Electricity Provider dropdown
  $electricityProviderSelect.addEventListener('change', () => {
    if ($electricityProviderSelect.value === 'Please Select') {
      $electricityErrorMsg.style.display = 'block';
      $continueButton.disabled = true;
    } else {
      $electricityErrorMsg.style.display = 'none';
      $continueButton.disabled = false;
    }
  });

  const $electricityPaymentTypeRadios = document.getElementsByName('electricity_payment_type');
  const $paymentErrorMsg = document.querySelector('.paymentvalidation');
  const $payAsYouGoCaveat = document.querySelector('.payasyougovalidation');

  // Real-time validation for Electricity Payment Type radio buttons
  Array.from($electricityPaymentTypeRadios).forEach(radio => {
    radio.addEventListener('change', () => {
      $paymentErrorMsg.style.display = 'none';
      $payAsYouGoCaveat.style.display = radio.value === 'payasyougo' ? 'block' : 'none';
    });
  });

  const $supplyRegionRadios = document.getElementsByName('dg_type_id');
  const $supplyRegionErrorMsg = document.querySelector('.dgvalidation');

  // Real-time validation for Supply Region radio buttons
  Array.from($supplyRegionRadios).forEach(radio => {
    radio.addEventListener('change', () => ($supplyRegionErrorMsg.style.display = 'none'));
  });
});
