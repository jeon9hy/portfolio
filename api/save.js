export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const adminCode = process.env.ADMIN_CODE;
  const githubToken = process.env.GITHUB_TOKEN;
  if (!adminCode || !githubToken) {
    res.status(500).json({ ok: false, error: 'Server missing ADMIN_CODE or GITHUB_TOKEN env var' });
    return;
  }

  const { code, content, posts } = req.body || {};
  if (code !== adminCode) {
    res.status(401).json({ ok: false, error: 'Invalid admin code' });
    return;
  }
  if (typeof content !== 'object' || content === null || !Array.isArray(posts)) {
    res.status(400).json({ ok: false, error: 'Malformed payload' });
    return;
  }

  const owner = 'jeon9hy';
  const repo = 'portfolio';
  const path = 'content.json';
  const branch = 'master';
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const ghHeaders = {
    Authorization: `Bearer ${githubToken}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-admin-save',
  };

  try {
    const getRes = await fetch(`${apiBase}?ref=${branch}`, { headers: ghHeaders });
    if (!getRes.ok) {
      throw new Error(`Could not read current content.json (${getRes.status})`);
    }
    const current = await getRes.json();

    const payload = JSON.stringify({ content, posts }, null, 2);
    const contentB64 = Buffer.from(payload, 'utf-8').toString('base64');

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Update site content via admin panel',
        content: contentB64,
        sha: current.sha,
        branch,
      }),
    });
    if (!putRes.ok) {
      const errBody = await putRes.text();
      throw new Error(`GitHub commit failed (${putRes.status}): ${errBody.slice(0, 300)}`);
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: String((err && err.message) || err) });
  }
}
