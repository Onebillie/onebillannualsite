import { createFooter } from '../components/footer.js';
import { createHomeHeader } from '../components/header.js';
import { createHeader } from '../components/header2.js';

/** Initializes the header. Render two different headers depends on the current page's pathname
 * @param {string} pathname - current page's pathname
 */
export const initHeader = pathname => {
  const $headerContainer = document.querySelector('header');
  const newHeader =
    pathname === '/' || pathname === '/index.html' ? createHomeHeader() : createHeader();

  // Add 'active' class to the matching link
  const links = newHeader.querySelectorAll('a[href]');
  const $dropdownBtn = newHeader.querySelector('.dropdown-toggle');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pathname) {
      if (href.includes('/guides')) {
        $dropdownBtn.classList.add('active');
      }
      link.classList.add('active');
    }
    if (
      (href === '/index.html' && pathname === '/faqs.html') ||
      (href === '/index.html' && pathname === '/privacy-policy.html')
    ) {
      link.classList.add('active');
    }
  });

  if (!$headerContainer) {
    console.warn('No header container found in the page. Creating one automatically.');

    const $body = document.querySelector('body');
    $body.insertBefore(newHeader, $body.firstChild);
    return;
  }

  $headerContainer.replaceWith(newHeader);
};

const setUpCookieConsentModal = () => {
  const $cookieConsentModal = document.getElementById('cookieConsentModal');
  const modal = new bootstrap.Modal($cookieConsentModal);

  const $acceptBtn = $cookieConsentModal.querySelector('#acceptCookies');
  const $rejectBtn = $cookieConsentModal.querySelector('#rejectCookies');

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value || ''}; expires=${date.toUTCString()}; path=/`;
  };

  const getCookie = name => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  };

  if (!getCookie('cookieConsent')) {
    modal.show();
  }

  $acceptBtn.addEventListener('click', () => {
    setCookie('cookieConsent', 'accepted', 365);
    modal.hide();
  });

  $rejectBtn.addEventListener('click', () => {
    setCookie('cookieConsent', 'rejected', 365);
    modal.hide();
  });
};

/** Initializes the footer */
export const initFooter = () => {
  const $footerContainer = document.querySelector('footer');
  const newFooter = createFooter();

  if (!$footerContainer) {
    console.warn('No footer container found in the page. Creating one automatically.');

    const $body = document.querySelector('body');
    $body.insertBefore(newFooter, null);
    return;
  }

  $footerContainer.replaceWith(newFooter);

  setUpCookieConsentModal();
};

/**
 * Shows the loader
 * @param {HTMLElement} loaderContainer - The loader container element
 */
export const showLoader = loaderContainer => {
  loaderContainer.style.display = 'flex';
};

/**
 * Hides the loader
 * @param {HTMLElement} loaderContainer - The loader container element
 */
export const hideLoader = loaderContainer => {
  loaderContainer.style.display = 'none';
};

/**
 * Displays an error message
 * @param {string} message - The error message to display
 * @param {HTMLElement} uploadArea - The upload area element
 */
export const displayErrorMessage = (message, uploadArea) => {
  const $errorMessage = document.createElement('div');
  $errorMessage.classList.add('error-message');
  $errorMessage.textContent = message;

  uploadArea.appendChild($errorMessage);
  setTimeout(() => $errorMessage.remove(), 5000);
};

/**
 * Displays a file in the UI
 * @param {File} file - The file to display
 * @param {Object} options - Options for displaying the file
 * @param {HTMLElement} options.fileNamePlaceholder - Element to display file name
 * @param {HTMLElement} options.uploadedFilesContainer - Container for uploaded files
 * @param {Function} options.removeFile - Function to remove a file
 * @param {Object} options.removeFileOptions - Options for removing a file
 */
export const displayFile = (file, options) => {
  const { fileNamePlaceholder, uploadedFilesContainer, removeFile, removeFileOptions } = options;

  fileNamePlaceholder.textContent = '';

  const $fileElement = document.createElement('div');
  $fileElement.classList.add('file-item');

  let fileName = file.name;
  if (fileName.length > 50) {
    fileName = `${fileName.substring(0, 50)}...`;
  }

  const $fileNameSpan = document.createElement('span');
  $fileNameSpan.classList.add('file-name');
  $fileNameSpan.textContent = fileName;

  const $removeButton = document.createElement('button');
  $removeButton.textContent = 'X';
  $removeButton.classList.add('remove-file-button');
  $removeButton.onclick = () => {
    removeFile(file, $fileElement, removeFileOptions);
  };

  $fileElement.appendChild($fileNameSpan);
  $fileElement.appendChild($removeButton);
  uploadedFilesContainer.appendChild($fileElement);
};

/**
 * Toggles the process button based on form validation
 * @param {Object} options - Options for toggling the button
 * @param {Array} options.filesArray - Array of files
 * @param {Function} options.validateForm - Function to validate the form
 * @param {HTMLElement} options.processButton - Process button element
 */
export const toggleProcessButton = options => {
  const { filesArray, validateForm, processButton } = options;

  const hasFiles = filesArray.length > 0;
  processButton.disabled = !(hasFiles && validateForm());
};

/**
 * Shows the dropdown menu for eircode addresses
 * @param {Object} data - Address data from API
 * @param {Function} selectOption - Function to handle option selection
 */
export const showDropdownMenu = (data, selectOption) => {
  const $dropdownMenu = document.getElementById('dropdown-menu');
  $dropdownMenu.innerHTML = '';

  if (data.addresses && data.addresses.length > 0) {
    $dropdownMenu.classList.add('show');

    data.addresses.forEach(addrObj => {
      if (addrObj.address) {
        const $newItem = document.createElement('a');
        $newItem.classList.add('dropdown-item');
        $newItem.href = '#';
        $newItem.textContent = addrObj.address;
        $newItem.id = addrObj.eircode;
        $newItem.dataset.eircode = addrObj.eircode;

        $newItem.addEventListener('click', event => {
          event.preventDefault();
          selectOption(event);
        });

        $dropdownMenu.appendChild($newItem);
      }
    });
  } else {
    $dropdownMenu.classList.remove('show');
  }
};

/**
 * Handles selection of an address from the dropdown
 * @param {Event} event - The click event
 */
export const selectOption = event => {
  const selectedEircode = event.target.dataset.eircode;
  const selectedText = event.target.textContent;
  const $eirCodeInput = document.getElementById('eir-code');
  const $addressInput = document.getElementById('addressInput');
  const $addressDiv = document.getElementById('addressDiv');

  $eirCodeInput.value = selectedEircode;
  $addressInput.value = selectedText;
  $addressDiv.style.display = 'block';

  const $dropdownMenu = document.getElementById('dropdown-menu');
  $dropdownMenu.classList.remove('show');
};

/** Scrolls to a specific element
 * @param {HTMLElement} element - target DOM element
 */
export const scrollToElement = element => {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
