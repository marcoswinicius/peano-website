// Vercel Serverless Function for sending emails via Resend
// Works with any Vite SPA deployed on Vercel

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, phone, name } = req.body || {};

    if (!email || !phone) {
      return res.status(400).json({ error: 'Missing fields', fields: { email: !!email, phone: !!phone, name: !!name } });
    }

    const requestBody = {
      from: 'onboarding@resend.dev',
      to: 'gabriel.franca.melao@gmail.com',
      subject: 'Novo lead do formulário - Peano',
      html: `<h2><strong>Novo contato via site Peano</strong></h2>
      ${name ? `<p><strong>Nome: </strong>${name}</p>` : ''}
      <p><strong>E-mail: </strong>${email}</p>
      <p><strong>Telefone: </strong><a href="tel:${phone}">${phone}</a></p>`
    };

    const apiKey = process.env.RESEND_API_KEY as string | undefined;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing RESEND_API_KEY' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return res.status(502).json({ error: 'Resend error', details: responseData });
    }

    return res.status(200).json({ ok: true, id: responseData.id });
  } catch (err: any) {
    return res.status(500).json({ error: 'Unhandled error', message: err?.message || String(err) });
  }
}
