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
    <div>
      <div style={{display: 'flex', gap: 8, marginBottom: 12}}>
        <button type="button" onClick={goBack} style={{padding: '6px 10px'}}>Back</button>
        <button type="button" onClick={run} style={{padding: '6px 10px'}} disabled={loading}>
          {loading ? 'Checking…' : 'Run HealthCheck'}
        </button>
      </div>

      {error && <div style={{color: 'crimson'}}><strong>Error:</strong> {error}</div>}
      {status && <div><strong>Status:</strong> {status}</div>}
    </div>
  );
}
