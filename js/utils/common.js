/**
 * Validates a phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidPhone = phone => {
  const phoneRegex = /^(08|09)\d{8}$/; // Must be exactly 10 digits starting with 08 or 09
  return phoneRegex.test(phone.trim());
};

/**
 * Validates an email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = email => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates a phone number format (alternative version)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validatePhoneNumber = phone => {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
};

/**
 * Generates a random token
 * @returns {string} - A random token
 */
export const generateToken = () => {
  return Math.random().toString(36).substring(2);
};
