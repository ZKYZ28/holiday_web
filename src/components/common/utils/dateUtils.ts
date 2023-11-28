/**
 * Returns the current date and optionally the time in the format YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS.
 * Can also return the date/time one week later based on the provided parameters.
 *
 * @param {boolean} oneWeekAfter - If true, the returned date/time will be one week after the current date/time.
 * @param {boolean} includeTime - If true, the returned string will include the time.
 * @returns {string} The formatted date or date-time string.
 */
export const formattedDate = (
  oneWeekAfter: boolean = false,
  includeTime: boolean = false,
  additionalMinutes: number = 0
): string => {
  const currentDate = new Date();

  if (additionalMinutes > 0) {
    currentDate.setMinutes(currentDate.getMinutes() + additionalMinutes);
  }

  if (oneWeekAfter) {
    currentDate.setDate(currentDate.getDate() + 7);
  }

  const year = currentDate.getFullYear();
  const month = toPaddedTwoDigitString(currentDate.getMonth() + 1);
  const day = toPaddedTwoDigitString(currentDate.getDate());

  let formattedDate = `${year}-${month}-${day}`;

  if (includeTime) {
    const hours = toPaddedTwoDigitString(currentDate.getHours());
    const minutes = toPaddedTwoDigitString(currentDate.getMinutes());
    const seconds = toPaddedTwoDigitString(currentDate.getSeconds());
    formattedDate = `${formattedDate}T${hours}:${minutes}:${seconds}`;
  }

  return formattedDate;
};
/**
 * Converts a number into a string and ensure it has two digits.
 * @param {number} value - The number to be converted and padded.
 * @returns {string} The padded string representation of the number.
 */
function toPaddedTwoDigitString(value: number): string {
  return String(value).padStart(2, '0');
}
