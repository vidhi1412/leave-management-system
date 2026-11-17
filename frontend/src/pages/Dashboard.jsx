
import { useEffect, useState } from "react";
import LeaveForm from "../components/LeaveForm";
import LeaveHistory from "../components/LeaveHistory";
import { getLeaves, applyLeave } from "../services/leaveService";
import { getLeaveDays } from "../utils/dateUtils";

function Dashboard({ user, onLogout }) {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalBalance = 12;

  // Load leave history for the logged-in employee.
  async function loadLeaves() {
    try {
      const data = await getLeaves(user.email);
      setLeaves(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeaves();
  }, [user.email]);

  // Submit a leave application and refresh the history.
  async function handleApply(formData) {
    try {
      await applyLeave(formData);
      await loadLeaves();
    } catch (err) {
      throw err;
    }
  }

  // Only approved leave days reduce the balance.
  const usedLeaves = leaves
    .filter((leave) => leave.status === "Approved")
    .reduce(
      (total, leave) =>
        total + getLeaveDays(leave.startDate, leave.endDate),
      0
    );

  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const remainingLeaves = Math.max(0, totalBalance - usedLeaves);

  return (
    <div className="dashboard">
      <header className="topbar">
        <div>
          <h1>Leave Management System</h1>
          <p>Welcome, {user.name}</p>
        </div>

        <button className="logout" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <h2>Dashboard</h2>

        <div className="balance-grid">
          <div className="balance-card">
            <p>Total Leaves</p>
            <h2>{totalBalance}</h2>
          </div>

          <div className="balance-card">
            <p>Used Leaves</p>
            <h2>{usedLeaves}</h2>
          </div>

          <div className="balance-card">
            <p>Pending Requests</p>
            <h2>{pendingLeaves}</h2>
          </div>

          <div className="balance-card">
            <p>Remaining Leaves</p>
            <h2>{remainingLeaves}</h2>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <LeaveForm user={user} onApply={handleApply} />

        {loading ? (
          <div className="card">Loading leave history...</div>
        ) : (
          <LeaveHistory leaves={leaves} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
