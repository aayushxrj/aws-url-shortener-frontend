import React, { useState } from 'react';

export default function HealthCheck({ client, proto, goBack }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function run() {
    setError(null);
    setStatus(null);
    setLoading(true);
    try {
      const req = new proto.HealthCheckRequest();
      const resp = await client.healthCheck(req);
      const s = resp.getStatus ? resp.getStatus() : null;
      setStatus(s);
    } catch (err) {
      setError(err && err.message ? err.message : String(err));
      // eslint-disable-next-line no-console
      console.error('HealthCheck error', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section">
      <div className="toolbar">
        <button type="button" className="btn btn-outline" onClick={goBack}>Back</button>
        <button type="button" className="btn btn-primary" onClick={run} disabled={loading}>
          {loading ? 'Checking…' : 'Run HealthCheck'}
        </button>
      </div>

      {error && <div className="error"><strong>Error:</strong> {error}</div>}
      {status && <div className="result"><strong>Status:</strong> {status}</div>}
    </div>
  );
}
