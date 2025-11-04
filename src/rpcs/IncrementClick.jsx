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
    <div>
      <div style={{display: 'flex', gap: 8, marginBottom: 12}}>
        <button type="button" onClick={goBack} style={{padding: '6px 10px'}}>Back</button>
      </div>

      <form onSubmit={run} style={{display: 'grid', gap: 8, maxWidth: 480}}>
        <label>
          Short ID
          <input value={shortId} onChange={(e) => setShortId(e.target.value)} style={{width: '100%', padding: 8, marginTop: 6}} />
        </label>
        <div>
          <button type="submit" disabled={loading} style={{padding: '8px 14px'}}>{loading ? 'Incrementing…' : 'Increment Click'}</button>
        </div>
      </form>

      <div style={{marginTop: 12}}>
        {error && <div style={{color: 'crimson'}}><strong>Error:</strong> {error}</div>}
        {clicks !== null && <div><strong>Clicks:</strong> {clicks}</div>}
      </div>
    </div>
  );
}
