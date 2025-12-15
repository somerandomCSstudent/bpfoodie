/**
 * @function isValidEmail
 * Basic utility function to validate email format.
 * @param {string} email The email string to validate.
 * @returns {boolean} True if the email format is valid.
 */
export function isValidEmail(email: string): boolean {
    // Use let for the regular expression
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * @function isValidRating
 * Checks if a rating is between 1 and 5.
 * @param {number} rating The rating value.
 * @returns {boolean} True if the rating is valid.
 */
export function isValidRating(rating: number): boolean {
    return rating >= 1 && rating <= 5;
}