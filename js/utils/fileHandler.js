import { generateToken } from './common.js';

const MAX_FILES = 5;
const VALID_FILE_TYPES = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];

/**
 * Validates if a file type is allowed
 * @param {File} file - The file to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidFileType = file => {
  return VALID_FILE_TYPES.includes(file.type);
};

/**
 * Handles file selection and validation
 * @param {FileList} files - The files to handle
 * @param {Object} options - Options for handling files
 * @param {Array} options.filesArray - Array to store files
 * @param {Function} options.displayFile - Function to display file in UI
 * @param {Function} options.displayErrorMessage - Function to display error messages
 * @param {Function} options.toggleProcessButton - Function to toggle process button
 * @param {HTMLElement} options.formContainer - Form container element
 * @param {HTMLElement} options.processButton - Process button element
 */
export const handleFiles = (files, options) => {
  const {
    filesArray,
    displayFile,
    displayErrorMessage,
    toggleProcessButton,
    formContainer,
    processButton,
  } = options;

  if (filesArray.length + files.length > MAX_FILES) {
    displayErrorMessage(`You can only upload a maximum of ${MAX_FILES} files.`);
    return;
  }

  Array.from(files).forEach(file => {
    if (isValidFileType(file)) {
      filesArray.push(file);
      displayFile(file);
      formContainer.style.display = 'block'; // Show the form once files are uploaded
      processButton.style.display = 'block'; // Show the Process Bills button
    } else {
      displayErrorMessage(`Invalid file type: ${file.name}`);
    }
  });

  toggleProcessButton();
};

/**
 * Removes a file from the UI and array
 * @param {File} file - The file to remove
 * @param {HTMLElement} fileElement - The file element in the UI
 * @param {Object} options - Options for removing files
 * @param {Array} options.filesArray - Array containing files
 * @param {Function} options.toggleProcessButton - Function to toggle process button
 * @param {HTMLElement} options.fileNamePlaceholder - Element to display file name
 * @param {HTMLElement} options.formContainer - Form container element
 * @param {HTMLElement} options.processButton - Process button element
 */
export const removeFile = (file, fileElement, options) => {
  const { filesArray, toggleProcessButton, fileNamePlaceholder, formContainer, processButton } =
    options;

  const index = filesArray.indexOf(file);
  if (index > -1) {
    filesArray.splice(index, 1);
  }
  fileElement.remove();
  toggleProcessButton();

  if (filesArray.length === 0) {
    fileNamePlaceholder.textContent = 'No file selected';
    formContainer.style.display = 'none'; // Hide form when no files
    processButton.style.display = 'none'; // Hide process button when no files
  }
};

/**
 * Processes files via API
 * @param {Array} filesArray - Array of files to process
 * @param {Object} options - Options for processing files
 * @param {Function} options.showLoader - Function to show loader
 * @param {Function} options.hideLoader - Function to hide loader
 * @param {Function} options.handleFileProcessingResponse - Function to handle API response
 * @param {string} options.emailAddress - User's email address
 * @param {string} options.phoneNumber - User's phone number
 */
export const processFiles = (filesArray, options) => {
  const { showLoader, hideLoader, handleFileProcessingResponse, emailAddress, phoneNumber } =
    options;

  const formData = new FormData();
  filesArray.forEach(file => formData.append('bill[]', file));

  const token = generateToken();
  formData.append('token', token);
  formData.append('phoneNumber', phoneNumber);
  formData.append('emailAddress', emailAddress);

  console.log('Sending data to server...');

  fetch('https://admin.onebill.ie/api/readFile', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      console.log('Response received:', response);
      return response.json();
    })
    .then(data => {
      hideLoader(); // Hide loader after processing
      console.log('Data received from server:', data);
      handleFileProcessingResponse(data);
    })
    .catch(error => {
      alert(
        'Unfortunately we were unable to ready your bills. Please check you savings by entering your eircode below instead.'
      );
      document.getElementById('scrool').scrollIntoView({ behavior: 'smooth' });
      hideLoader(); // Hide loader on error
    });
};

/**
 * Stores customer data in localStorage
 * @param {Object} customerDetails - Customer details from API
 * @param {Object} response - API response
 */
export const storeCustomerData = (customerDetails, response) => {
  localStorage.setItem('electricity', customerDetails.services.electricity);
  localStorage.setItem('gas', customerDetails.services.gas);
  localStorage.setItem('broadband', customerDetails.services.broadband);
  localStorage.setItem('savings', response.integer);
  localStorage.setItem('gastot', response.gasdeg);
  localStorage.setItem('electot', response.elecdeg);
  localStorage.setItem('inttot', response.int);
  localStorage.setItem('elecprovider', response.elecprovider);
  localStorage.setItem('gasprovider', response.gasprovider);
  localStorage.setItem('intprovider', response.intprovider);
  localStorage.setItem('token', generateToken());
};
