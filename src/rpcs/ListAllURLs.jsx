import React, { useState } from 'react';

export default function ListAllURLs({ client, proto, goBack }) {
  const [limit, setLimit] = useState('20');
  const [lastKey, setLastKey] = useState('');
  const [urls, setUrls] = useState(null);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function run(e) {
    if (e && e.preventDefault) e.preventDefault();
    setError(null);
    setUrls(null);
    setLastEvaluatedKey(null);
    setLoading(true);
    try {
      const req = new proto.ListAllURLsRequest();
      const n = Number(limit) || 0;
      if (n > 0) req.setLimit(n);
      if (lastKey && lastKey.trim() !== '') req.setLastEvaluatedKey(lastKey.trim());
      const resp = await client.listAllURLs(req);
      const list = resp.getUrlsList ? resp.getUrlsList() : [];
      const mapped = list.map((u) => ({
        shortId: u.getShortId ? u.getShortId() : null,
        originalUrl: u.getOriginalUrl ? u.getOriginalUrl() : null,
        createdAt: u.getCreatedAt ? u.getCreatedAt() : null,
        expireAt: u.getExpireAt ? u.getExpireAt() : null,
        clicks: u.getClicks ? u.getClicks() : null,
      }));
      setUrls(mapped);
      const lek = resp.getLastEvaluatedKey ? resp.getLastEvaluatedKey() : null;
      setLastEvaluatedKey(lek);
    } catch (err) {
      setError(err && err.message ? err.message : String(err));
      // eslint-disable-next-line no-console
      console.error('ListAllURLs error', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section">
      <div className="toolbar">
        <button type="button" className="btn btn-outline" onClick={goBack}>Back</button>
      </div>

      <form onSubmit={run} className="form-grid card" style={{maxWidth: 800}}>
        <label className="label inline">
          <span>Limit</span>
          <input className="input input-number" type="number" min="1" value={limit} onChange={(e) => setLimit(e.target.value)} />
        </label>
        <label className="label">
          <span>Last evaluated key (optional)</span>
          <input className="input" value={lastKey} onChange={(e) => setLastKey(e.target.value)} />
        </label>
        <div>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading…' : 'List URLs'}</button>
        </div>
      </form>

      <div className="messages">
        {error && <div className="error"><strong>Error:</strong> {error}</div>}
        {urls && (
          <div>
            <p style={{marginBottom: '16px', fontSize: '1.1rem'}}><strong>Returned:</strong> {urls.length} URL(s)</p>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Short ID</th>
                    <th>Original URL</th>
                    <th>Clicks</th>
                    <th>Created</th>
                    <th>Expire At</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map((u) => (
                    <tr key={u.shortId}>
                      <td>{u.shortId}</td>
                      <td><a href={u.originalUrl} target="_blank" rel="noreferrer" title={u.originalUrl}>{u.originalUrl}</a></td>
                      <td>{u.clicks}</td>
                      <td>{u.createdAt}</td>
                      <td>{u.expireAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {lastEvaluatedKey && (
              <p className="muted" style={{marginTop: 16, padding: '12px', background: 'rgba(138, 92, 255, 0.05)', borderRadius: '8px'}}><strong>LastEvaluatedKey:</strong> {lastEvaluatedKey}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
