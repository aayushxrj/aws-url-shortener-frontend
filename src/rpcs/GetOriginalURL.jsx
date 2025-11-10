import React, { useState } from 'react';

export default function GetOriginalURL({ client, proto, goBack }) {
  const [shortId, setShortId] = useState('');
  const [original, setOriginal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function run(e) {
    if (e && e.preventDefault) e.preventDefault();
    setError(null);
    setOriginal(null);
    if (!shortId || shortId.trim() === '') {
      setError('Please enter short id');
      return;
    }
    setLoading(true);
    try {
      const req = new proto.GetOriginalURLRequest();
      req.setShortId(shortId.trim());
      const resp = await client.getOriginalURL(req);
      const o = resp.getOriginalUrl ? resp.getOriginalUrl() : null;
      setOriginal(o);
    } catch (err) {
      setError(err && err.message ? err.message : String(err));
      // eslint-disable-next-line no-console
      console.error('GetOriginalURL error', err);
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
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Fetching…' : 'Get Original URL'}</button>
        </div>
      </form>

      <div className="messages">
        {error && <div className="error"><strong>Error:</strong> {error}</div>}
        {original && (
          <div className="stats-card">
            <p><strong>Original URL:</strong> <a href={original} target="_blank" rel="noreferrer">{original}</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
