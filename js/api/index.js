/**
 * Fetches addresses based on eircode
 * @param {string} eircode - The eircode to search for
 * @param {Function} onSuccess - Callback for successful response
 * @param {Function} onError - Callback for error response
 */
export const fetchAddressesByEircode = (eircode, onSuccess, onError) => {
  if (eircode === '') {
    onError();
    return;
  }

  const formData = new FormData();
  formData.append('eircode', eircode);

  fetch('https://admin.onebill.ie/api/getAddress', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      onSuccess(data);
    })
    .catch(error => {
      console.error('Error fetching addresses:', error);
      onError();
    });
};

/**
 * Handles the response from file processing
 * @param {Object} response - The API response
 * @returns {Object} - Processed response data
 */
export const handleFileProcessingResponse = response => {
  console.log('Response received:', response);

  if (!response || !response.data) {
    alert('There is missing data on the bill. Please enter details manually.');
    return null;
  }

  const customerDetails = response.data.bills.cus_details;
  console.log('Customer details:', customerDetails);

  // Check if services are available
  const hasServices =
    customerDetails.services.electricity === 'true' ||
    customerDetails.services.gas === 'true' ||
    customerDetails.services.broadband === 'true';

  return {
    customerDetails,
    hasServices,
  };
};
