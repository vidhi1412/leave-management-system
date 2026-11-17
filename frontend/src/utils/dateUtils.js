
/**
 * Calculates the number of leave days, including both dates.
 */
export function getLeaveDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}
