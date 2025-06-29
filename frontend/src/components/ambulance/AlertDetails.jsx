import React, { useState, useEffect } from 'react';

const AlertDetails = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch alerts from the API
  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5000/alert-details'); // GET endpoint to fetch alerts
      const data = await response.json();
      // Add an "accepted" property for UI purposes (default is false)
      const alertsWithStatus = data.map(alert => ({ ...alert, accepted: false }));
      setAlerts(alertsWithStatus);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('Error fetching alerts.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Handle the acceptance of an alert
  const handleAccept = (alertId) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert._id === alertId ? { ...alert, accepted: true } : alert
      )
    );
    notifyEveryone(alertId);
  };

  // Dummy function to simulate notification logic
  const notifyEveryone = (alertId) => {
    console.log(`Alert ${alertId} accepted - notifying everyone...`);
    // Extend this function to perform API calls or real-time notifications if needed.
  };

  if (loading) return <div>Loading alerts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Accident Alerts</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left', borderBottom: '2px solid #ccc' }}>
            <th>ID</th>
            <th>Camera ID</th>
            <th>Accident Clip</th>
            <th>Timestamp</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alerts.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No alerts found.</td>
            </tr>
          ) : (
            alerts.map(alert => (
              <tr key={alert._id} style={{ borderBottom: '1px solid #ccc' }}>
                <td>{alert._id}</td>
                <td>{alert.cameraId}</td>
                <td>{alert.accidentClip}</td>
                <td>{new Date(alert.timestamp).toLocaleString()}</td>
                <td>{alert.accepted ? 'Accepted' : 'Pending'}</td>
                <td>
                  {alert.accepted ? (
                    <span style={{ color: 'green' }}>Accepted</span>
                  ) : (
                    <button onClick={() => handleAccept(alert._id)}>Accept</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlertDetails;
