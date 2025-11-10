import React, { useState } from 'react';

export default function IncrementClick({ client, proto, goBack }) {
  const [shortId, setShortId] = useState('');
  const [clicks, setClicks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function run(e) {
    if (e && e.preventDefault) e.preventDefault();
    setError(null);
    setClicks(null);
    if (!shortId || shortId.trim() === '') {
      setError('Please enter short id');
      return;
    }
    setLoading(true);
    try {
      const req = new proto.IncrementClickRequest();
      req.setShortId(shortId.trim());
      const resp = await client.incrementClick(req);
      const c = resp.getClicks ? resp.getClicks() : null;
      setClicks(c);
    } catch (err) {
      setError(err && err.message ? err.message : String(err));
      // eslint-disable-next-line no-console
      console.error('IncrementClick error', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section">
      <div className="toolbar">
        <button type="button" className="btn btn-outline" onClick={goBack}>Back</button>
      </div>

      <form onSubmit={run} className="form-grid card" style={{maxWidth: 600}}>
        <label className="label">
          <span>Short ID</span>
          <input className="input" value={shortId} onChange={(e) => setShortId(e.target.value)} />
        </label>
        <div>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Incrementing…' : 'Increment Click'}</button>
        </div>
      </form>

      <div className="messages">
        {error && <div className="error"><strong>Error:</strong> {error}</div>}
        {clicks !== null && <div className="result"><strong>Clicks:</strong> {clicks}</div>}
      </div>
    </div>
  );
}
