import React, { useState } from 'react';

export default function GetURLStats({ client, proto, goBack }) {
  const [shortId, setShortId] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function run(e) {
    if (e && e.preventDefault) e.preventDefault();
    setError(null);
    setStats(null);
    if (!shortId || shortId.trim() === '') {
      setError('Please enter short id');
      return;
    }
    setLoading(true);
    try {
      const req = new proto.GetURLStatsRequest();
      req.setShortId(shortId.trim());
      const resp = await client.getURLStats(req);
      const out = {
        shortId: resp.getShortId ? resp.getShortId() : null,
        originalUrl: resp.getOriginalUrl ? resp.getOriginalUrl() : null,
        clicks: resp.getClicks ? resp.getClicks() : null,
        createdAt: resp.getCreatedAt ? resp.getCreatedAt() : null,
        expireAt: resp.getExpireAt ? resp.getExpireAt() : null,
      };
      setStats(out);
    } catch (err) {
      setError(err && err.message ? err.message : String(err));
      // eslint-disable-next-line no-console
      console.error('GetURLStats error', err);
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
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading…' : 'Get URL Stats'}</button>
        </div>
      </form>

      <div className="messages">
        {error && <div className="error"><strong>Error:</strong> {error}</div>}
        {stats && (
          <div className="stats-card">
            <p><strong>Short ID:</strong> {stats.shortId}</p>
            <p><strong>Original URL:</strong> <a href={stats.originalUrl} target="_blank" rel="noreferrer">{stats.originalUrl}</a></p>
            <p><strong>Clicks:</strong> {stats.clicks}</p>
            <p><strong>Created At:</strong> {stats.createdAt}</p>
            <p><strong>Expire At:</strong> {stats.expireAt}</p>
          </div>
        )}
      </div>
    </div>
  );
}
