
import { useState } from "react";

function LeaveForm({ user, onApply }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!startDate || !endDate || !reason.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (endDate < startDate) {
      setError("End date cannot be before start date.");
      return;
    }

    setLoading(true);

    try {
      await onApply({
        name: user.name,
        email: user.email,
        startDate,
        endDate,
        reason: reason.trim()
      });

      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className="card">
      <h2>Apply for Leave</h2>

      <form onSubmit={handleSubmit}>
        <label>Start Date</label>
        <input
          type="date"
          min={today}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label>End Date</label>
        <input
          type="date"
          min={startDate || today}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <label>Reason for Leave</label>
        <textarea
          placeholder="Enter your reason for leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default LeaveForm;
