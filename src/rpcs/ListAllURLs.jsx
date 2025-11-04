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
    <div>
      <div style={{display: 'flex', gap: 8, marginBottom: 12}}>
        <button type="button" onClick={goBack} style={{padding: '6px 10px'}}>Back</button>
      </div>

      <form onSubmit={run} style={{display: 'grid', gap: 8, maxWidth: 800}}>
        <label>
          Limit
          <input type="number" min="1" value={limit} onChange={(e) => setLimit(e.target.value)} style={{width: 120, padding: 8, marginTop: 6}} />
        </label>
        <label>
          Last evaluated key (optional)
          <input value={lastKey} onChange={(e) => setLastKey(e.target.value)} style={{width: '100%', padding: 8, marginTop: 6}} />
        </label>
        <div>
          <button type="submit" disabled={loading} style={{padding: '8px 14px'}}>{loading ? 'Loading…' : 'List URLs'}</button>
        </div>
      </form>

      <div style={{marginTop: 12}}>
        {error && <div style={{color: 'crimson'}}><strong>Error:</strong> {error}</div>}
        {urls && (
          <div>
            <p><strong>Returned:</strong> {urls.length}</p>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{textAlign: 'left', borderBottom: '1px solid #ddd'}}>Short ID</th>
                  <th style={{textAlign: 'left', borderBottom: '1px solid #ddd'}}>Original URL</th>
                  <th style={{textAlign: 'left', borderBottom: '1px solid #ddd'}}>Clicks</th>
                  <th style={{textAlign: 'left', borderBottom: '1px solid #ddd'}}>Created</th>
                  <th style={{textAlign: 'left', borderBottom: '1px solid #ddd'}}>ExpireAt</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((u) => (
                  <tr key={u.shortId}>
                    <td style={{padding: '6px 8px', borderBottom: '1px solid #f1f1f1'}}>{u.shortId}</td>
                    <td style={{padding: '6px 8px', borderBottom: '1px solid #f1f1f1'}}><a href={u.originalUrl} target="_blank" rel="noreferrer">{u.originalUrl}</a></td>
                    <td style={{padding: '6px 8px', borderBottom: '1px solid #f1f1f1'}}>{u.clicks}</td>
                    <td style={{padding: '6px 8px', borderBottom: '1px solid #f1f1f1'}}>{u.createdAt}</td>
                    <td style={{padding: '6px 8px', borderBottom: '1px solid #f1f1f1'}}>{u.expireAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {lastEvaluatedKey && (
              <p style={{marginTop: 8}}><strong>LastEvaluatedKey:</strong> {lastEvaluatedKey}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
