import React, { useState } from 'react';

export default function DeleteURL({ client, proto, goBack }) {
  const [shortId, setShortId] = useState('');
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
      const req = new proto.DeleteURLRequest();
      req.setShortId(shortId.trim());
      const resp = await client.deleteURL(req);
      const ok = resp.getSuccess ? resp.getSuccess() : false;
      const msg = resp.getMessage ? resp.getMessage() : null;
      setResult({ success: ok, message: msg });
    } catch (err) {
      setError(err && err.message ? err.message : String(err));
      // eslint-disable-next-line no-console
      console.error('DeleteURL error', err);
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
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Deleting…' : 'Delete URL'}</button>
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
