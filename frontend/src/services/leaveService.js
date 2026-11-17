
const API_URL = "http://localhost:5000/api/leaves";

/**
 * Fetches leave applications for an employee.
 * @param {string} email - Employee email address
 */
export async function getLeaves(email) {
  const response = await fetch(
    `${API_URL}?email=${encodeURIComponent(email)}`
  );

  if (!response.ok) {
    throw new Error("Unable to load leave history.");
  }

  return response.json();
}

/**
 * Sends a leave application to the backend.
 * @param {Object} leaveData - Leave application details
 */
export async function applyLeave(leaveData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(leaveData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to submit leave.");
  }

  return result.leave;
}
