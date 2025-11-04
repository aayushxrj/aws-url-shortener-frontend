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
          <button type="submit" disabled={loading} style={{padding: '8px 14px'}}>{loading ? 'Deleting…' : 'Delete URL'}</button>
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
