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
    <div>
      <div style={{display: 'flex', gap: 8, marginBottom: 12}}>
        <button type="button" onClick={goBack} style={{padding: '6px 10px'}}>Back</button>
      </div>

      <form onSubmit={run} style={{display: 'grid', gap: 8, maxWidth: 600}}>
        <label>
          Short ID
          <input value={shortId} onChange={(e) => setShortId(e.target.value)} style={{width: '100%', padding: 8, marginTop: 6}} />
        </label>
        <label>
          New Original URL (optional)
          <input value={newOriginal} onChange={(e) => setNewOriginal(e.target.value)} style={{width: '100%', padding: 8, marginTop: 6}} />
        </label>
        <label>
          New expire in seconds (optional)
          <input type="number" min="0" value={newExpire} onChange={(e) => setNewExpire(e.target.value)} style={{width: 200, padding: 8, marginTop: 6}} />
        </label>
        <div>
          <button type="submit" disabled={loading} style={{padding: '8px 14px'}}>{loading ? 'Updating…' : 'Update URL'}</button>
        </div>
      </form>

      <div style={{marginTop: 12}}>
        {error && <div style={{color: 'crimson'}}><strong>Error:</strong> {error}</div>}
        {result && (
          <div>
            <p><strong>Success:</strong> {String(result.success)}</p>
            {result.message && <p><strong>Message:</strong> {result.message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
