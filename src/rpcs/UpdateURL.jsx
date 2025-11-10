import React, { useState } from 'react';

export default function UpdateURL({ client, proto, goBack }) {
  const [shortId, setShortId] = useState('');
  const [newOriginal, setNewOriginal] = useState('');
  const [newExpire, setNewExpire] = useState('0');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function run(e) {
    if (e && e.preventDefault) e.preventDefault();
    setError(null);
    setResult(null);
    if (!shortId || shortId.trim() === '') {
      setError('Please enter short id');
      return;
    }
    setLoading(true);
    try {
      const req = new proto.UpdateURLRequest();
      req.setShortId(shortId.trim());
      if (newOriginal && newOriginal.trim() !== '') req.setNewOriginalUrl(newOriginal.trim());
      const secs = Number(newExpire) || 0;
      if (secs > 0) req.setNewExpireInSeconds(secs);
      const resp = await client.updateURL(req);
      const ok = resp.getSuccess ? resp.getSuccess() : false;
      const msg = resp.getMessage ? resp.getMessage() : null;
      setResult({ success: ok, message: msg });
    } catch (err) {
      setError(err && err.message ? err.message : String(err));
      // eslint-disable-next-line no-console
      console.error('UpdateURL error', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section">
      <div className="toolbar">
        <button type="button" className="btn btn-outline" onClick={goBack}>Back</button>
      </div>

      <form onSubmit={run} className="form-grid card" style={{maxWidth: 700}}>
        <label className="label">
          <span>Short ID</span>
          <input className="input" value={shortId} onChange={(e) => setShortId(e.target.value)} />
        </label>
        <label className="label">
          <span>New Original URL (optional)</span>
          <input className="input" value={newOriginal} onChange={(e) => setNewOriginal(e.target.value)} />
        </label>
        <label className="label inline">
          <span>New expire in seconds (optional)</span>
          <input className="input input-number" type="number" min="0" value={newExpire} onChange={(e) => setNewExpire(e.target.value)} />
        </label>
        <div>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Updating…' : 'Update URL'}</button>
        </div>
      </form>

      <div className="messages">
        {error && <div className="error"><strong>Error:</strong> {error}</div>}
        {result && (
          <div className="stats-card">
            <p><strong>Success:</strong> {String(result.success)}</p>
            {result.message && <p><strong>Message:</strong> {result.message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
