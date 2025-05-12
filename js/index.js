import { isValidPhone, isValidEmail, validatePhoneNumber } from './utils/common.js';
import { handleFiles, removeFile, processFiles, storeCustomerData } from './utils/fileHandler.js';
import { validateForm } from './utils/formHandler.js';
import { handleFileProcessingResponse } from './api/index.js';
import {
  showLoader,
  hideLoader,
  displayErrorMessage,
  displayFile,
  toggleProcessButton,
  initHeader,
  initFooter,
  scrollToElement,
} from './utils/uiHelper.js';
import { showAddressDropdown, goToOnboard } from './utils/eircodeHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  // if reference code is present in the URL, store it in localStorage
  const params = new URLSearchParams(window.location.search);
  const tok = params.get('reference');
  localStorage.setItem('tok', tok);

  const $fileInput = document.getElementById('fileInput');
  const $uploadArea = document.querySelector('.upload-area');
  const $uploadedFilesContainer = document.getElementById('uploadedFilesContainer');
  const $processButton = document.getElementById('processButton');
  const $fileNamePlaceholder = document.getElementById('fileName');
  const $loaderContainer = document.querySelector('.loader-container');
  const $phoneInput = document.getElementById('phoneNumber');
  const $emailInput = document.getElementById('emailAddress');
  const $termsCheckbox = document.getElementById('termsCheckbox');
  const $formContainer = document.getElementById('formContainer');

  // Create error elements
  const $phoneError = document.createElement('small');
  $phoneError.classList.add('text-danger');
  $phoneInput.parentNode.appendChild($phoneError);

  const $emailError = document.createElement('small');
  $emailError.classList.add('text-danger');
  $emailInput.parentNode.appendChild($emailError);

  // Initialize header
  initHeader(window.location.pathname);
  // Initialize footer
  initFooter();

  let filesArray = [];

  // Handle file input change
  $fileInput.addEventListener('change', event => {
    handleFiles(event.target.files, {
      filesArray,
      displayFile: file =>
        displayFile(file, {
          fileNamePlaceholder: $fileNamePlaceholder,
          uploadedFilesContainer: $uploadedFilesContainer,
          removeFile,
          removeFileOptions: {
            filesArray,
            toggleProcessButton: () =>
              toggleProcessButton({
                filesArray,
                validateForm: () =>
                  validateForm({
                    phoneInput: $phoneInput,
                    emailInput: $emailInput,
                    termsCheckbox: $termsCheckbox,
                  }),
                processButton: $processButton,
              }),
            fileNamePlaceholder: $fileNamePlaceholder,
            formContainer: $formContainer,
            processButton: $processButton,
          },
        }),
      displayErrorMessage: message => displayErrorMessage(message, $uploadArea),
      toggleProcessButton: () =>
        toggleProcessButton({
          filesArray,
          validateForm: () =>
            validateForm({
              phoneInput: $phoneInput,
              emailInput: $emailInput,
              termsCheckbox: $termsCheckbox,
            }),
          processButton: $processButton,
        }),
      formContainer: $formContainer,
      processButton: $processButton,
    });
  });

  // Handle drag-and-drop
  $uploadArea.addEventListener('dragover', event => event.preventDefault());
  $uploadArea.addEventListener('dragleave', () => $uploadArea.classList.remove('dragging'));
  $uploadArea.addEventListener('drop', event => {
    event.preventDefault();
    $uploadArea.classList.remove('dragging');
    const files = event.dataTransfer.files;
    handleFiles(files, {
      filesArray,
      displayFile: file =>
        displayFile(file, {
          fileNamePlaceholder: $fileNamePlaceholder,
          uploadedFilesContainer: $uploadedFilesContainer,
          removeFile,
          removeFileOptions: {
            filesArray,
            toggleProcessButton: () =>
              toggleProcessButton({
                filesArray,
                validateForm: () =>
                  validateForm({
                    phoneInput: $phoneInput,
                    emailInput: $emailInput,
                    termsCheckbox: $termsCheckbox,
                  }),
                processButton: $processButton,
              }),
            fileNamePlaceholder: $fileNamePlaceholder,
            formContainer: $formContainer,
            processButton: $processButton,
          },
        }),
      displayErrorMessage: message => displayErrorMessage(message, $uploadArea),
      toggleProcessButton: () =>
        toggleProcessButton({
          filesArray,
          validateForm: () =>
            validateForm({
              phoneInput: $phoneInput,
              emailInput: $emailInput,
              termsCheckbox: $termsCheckbox,
            }),
          processButton: $processButton,
        }),
      formContainer: $formContainer,
      processButton: $processButton,
    });
  });

  // Validate phone number on blur
  $phoneInput.addEventListener('blur', () => {
    if (!isValidPhone($phoneInput.value)) {
      $phoneError.textContent = 'Phone number must be exactly 10 digits and start with 08 or 09.';
    } else {
      $phoneError.textContent = '';
    }
  });

  // Validate email on blur
  $emailInput.addEventListener('blur', () => {
    if (!isValidEmail($emailInput.value)) {
      $emailError.textContent = 'Enter a valid email address (e.g., example@domain.com).';
    } else {
      $emailError.textContent = '';
    }
  });

  // Process button click event
  $processButton.addEventListener('click', () => {
    if (
      filesArray.length > 0 &&
      validateForm({
        phoneInput: $phoneInput,
        emailInput: $emailInput,
        termsCheckbox: $termsCheckbox,
      })
    ) {
      console.log('Files uploaded and form valid. Proceeding to process files...');
      showLoader($loaderContainer);
      processFiles(filesArray, {
        showLoader: () => showLoader($loaderContainer),
        hideLoader: () => hideLoader($loaderContainer),
        handleFileProcessingResponse: data => {
          const result = handleFileProcessingResponse(data);
          if (result) {
            const { customerDetails, hasServices } = result;

            // Store customer data
            storeCustomerData(customerDetails, data);

            // Redirect based on services
            if (hasServices) {
              console.log('Redirection to save3annual.html triggered');
              window.location.href = 'http://onebill.ie/save3annual.html';
            } else {
              alert('Bill not found, please make sure you have uploaded a valid bill!');
            }
          }
        },
        emailAddress: $emailInput.value,
        phoneNumber: $phoneInput.value,
      });
    } else {
      alert('Please upload files and complete the form.');
      console.log('Validation failed. Make sure files are uploaded and form is filled.');
    }
  });

  // Event listeners for form fields
  $phoneInput.addEventListener('input', () =>
    toggleProcessButton({
      filesArray,
      validateForm: () =>
        validateForm({
          phoneInput: $phoneInput,
          emailInput: $emailInput,
          termsCheckbox: $termsCheckbox,
        }),
      processButton: $processButton,
    })
  );

  $emailInput.addEventListener('input', () =>
    toggleProcessButton({
      filesArray,
      validateForm: () =>
        validateForm({
          phoneInput: $phoneInput,
          emailInput: $emailInput,
          termsCheckbox: $termsCheckbox,
        }),
      processButton: $processButton,
    })
  );

  $termsCheckbox.addEventListener('change', () =>
    toggleProcessButton({
      filesArray,
      validateForm: () =>
        validateForm({
          phoneInput: $phoneInput,
          emailInput: $emailInput,
          termsCheckbox: $termsCheckbox,
        }),
      processButton: $processButton,
    })
  );

  // Initialize eircode form event listeners
  initEircodeForm();
});

/**
 * Initialize the eircode form event listeners
 */
function initEircodeForm() {
  const $eirCodeInput = document.getElementById('eir-code');
  const $addressInput = document.getElementById('addressInput');
  const $emailInput = document.getElementById('email');
  const $phoneInput = document.getElementById('phone');

  // Eircode input event listener
  $eirCodeInput.addEventListener('input', () => {
    if ($eirCodeInput.value.trim() !== '') {
      document.getElementById('eircodeError').style.display = 'none';
    }
  });

  // Address input event listener
  $addressInput.addEventListener('input', () => {
    if ($addressInput.value.trim() !== '') {
      document.getElementById('eircodeError').style.display = 'none';
    }
  });

  // Email input event listener
  $emailInput.addEventListener('input', () => {
    if (isValidEmail($emailInput.value.trim())) {
      document.getElementById('emailError').style.display = 'none';
    }
  });

  // Phone input event listener
  $phoneInput.addEventListener('input', () => {
    if (validatePhoneNumber($phoneInput.value.trim())) {
      document.getElementById('phoneError').style.display = 'none';
    }
  });

  // Services checkboxes event listener
  document.querySelectorAll("input[name='services']").forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (document.querySelector("input[name='services']:checked")) {
        document.getElementById('servicesError').style.display = 'none';
      }
    });
  });

  // Process button click event handler
  const $processButton = document.getElementById('processButton');
  if ($processButton) {
    $processButton.addEventListener('click', () => {
      // Save the phone number and email to localStorage
      const phoneNumber = document.getElementById('phoneNumber').value;
      const emailAddress = document.getElementById('emailAddress').value;

      localStorage.setItem('savedPhoneNumber', phoneNumber);
      localStorage.setItem('savedEmailAddress', emailAddress);
    });
  }

  const $signMeUpBtn = document.getElementById('signMeUpBtn');
  const $scroolAlert = document.getElementById('scrool-alert');

  if ($signMeUpBtn) {
    // scrolls to the onboarding form section when the sign me up button is clicked
    $signMeUpBtn.addEventListener('click', () => scrollToElement($scroolAlert));
  }

  // Add event listener for the dropdown trigger
  const $dropdownTrigger = document.getElementById('eir-code');
  if ($dropdownTrigger) {
    $dropdownTrigger.addEventListener('input', showAddressDropdown);
  }

  // Add event listener for the Start button in the onboarding form
  const $startBtn = document.querySelector('.btn-start');
  if ($startBtn) {
    $startBtn.addEventListener('click', e => {
      e.preventDefault();
      goToOnboard();
    });
  }

  const params = new URLSearchParams(window.location.search);
  const tok = params.get('reference');
  localStorage.setItem('tok', tok);
}
