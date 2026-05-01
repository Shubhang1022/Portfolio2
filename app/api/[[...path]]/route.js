import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {

    // ── Contact form — POST /api/contact ──────────────────────────
    if (route === '/contact' && method === 'POST') {
      const body = await request.json()
      if (!body.name || !body.email || !body.message) {
        return handleCORS(NextResponse.json({ error: 'name, email, message required' }, { status: 400 }))
      }
      const doc = {
        id: uuidv4(),
        name: String(body.name).slice(0, 120),
        email: String(body.email).slice(0, 160),
        message: String(body.message).slice(0, 4000),
      }
      const { error } = await supabase.from('contact_messages').insert(doc)
      if (error) throw error

      // Send email notification
      try {
        const nodemailer = await import('nodemailer')
        const transporter = nodemailer.default.createTransport({
          service: 'gmail',
          auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
        })
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
          to: process.env.NOTIFY_EMAIL,
          replyTo: doc.email,
          subject: `📬 New message from ${doc.name}`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0f2c;color:#f5f5f5;border-radius:12px;overflow:hidden;">
              <div style="background:#E11D2E;padding:20px 28px;">
                <h2 style="margin:0;font-size:20px;color:#fff;">New Contact Message</h2>
              </div>
              <div style="padding:28px;">
                <p style="margin:0 0 8px;font-size:13px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">From</p>
                <p style="margin:0 0 20px;font-size:16px;font-weight:600;">${doc.name} &lt;${doc.email}&gt;</p>
                <p style="margin:0 0 8px;font-size:13px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">Message</p>
                <div style="background:#ffffff10;border-left:3px solid #E11D2E;padding:16px;border-radius:6px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${doc.message}</div>
                <div style="margin-top:24px;">
                  <a href="mailto:${doc.email}" style="display:inline-block;background:#E11D2E;color:#fff;padding:10px 22px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600;">Reply to ${doc.name}</a>
                </div>
                <p style="margin-top:24px;font-size:12px;color:#555;">Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('Email send failed:', emailErr.message)
      }

      return handleCORS(NextResponse.json({ ok: true, id: doc.id }))
    }

    // ── Reviews — GET /api/reviews ────────────────────────────────
    if (route === '/reviews' && method === 'GET') {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, name, place, review, rating, created_at')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(50)
      if (error) throw error
      return handleCORS(NextResponse.json(data))
    }

    // ── Reviews — POST /api/reviews ───────────────────────────────
    if (route === '/reviews' && method === 'POST') {
      const body = await request.json()
      if (!body.name || !body.place || !body.review) {
        return handleCORS(NextResponse.json({ error: 'name, place, review required' }, { status: 400 }))
      }
      const doc = {
        id: uuidv4(),
        token: uuidv4(),
        name: String(body.name).slice(0, 80),
        place: String(body.place).slice(0, 100),
        review: String(body.review).slice(0, 1000),
        rating: Math.min(5, Math.max(1, parseInt(body.rating) || 5)),
        approved: true,
      }
      const { error } = await supabase.from('reviews').insert(doc)
      if (error) throw error
      return handleCORS(NextResponse.json({ ok: true, id: doc.id, token: doc.token }))
    }

    // ── Reviews — PUT /api/reviews/:id ────────────────────────────
    if (route.startsWith('/reviews/') && method === 'PUT') {
      const id = route.split('/')[2]
      const body = await request.json()
      if (!body.token) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))

      const { data: existing } = await supabase.from('reviews').select('token').eq('id', id).single()
      if (!existing) return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }))
      if (existing.token !== body.token) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))

      const { error } = await supabase.from('reviews').update({
        name: String(body.name).slice(0, 80),
        place: String(body.place).slice(0, 100),
        review: String(body.review).slice(0, 1000),
        rating: Math.min(5, Math.max(1, parseInt(body.rating) || 5)),
        updated_at: new Date().toISOString(),
      }).eq('id', id)
      if (error) throw error
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // ── Reviews — DELETE /api/reviews/:id ─────────────────────────
    if (route.startsWith('/reviews/') && method === 'DELETE') {
      const id = route.split('/')[2]
      const body = await request.json()
      if (!body.token) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))

      const { data: existing } = await supabase.from('reviews').select('token').eq('id', id).single()
      if (!existing) return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }))
      if (existing.token !== body.token) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))

      const { error } = await supabase.from('reviews').delete().eq('id', id)
      if (error) throw error
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // ── Messages — GET /api/messages (admin) ──────────────────────
    if (route === '/messages' && method === 'GET') {
      const key = request.headers.get('x-admin-key') || new URL(request.url).searchParams.get('key')
      if (key !== (process.env.ADMIN_KEY || 'spidey')) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200)
      if (error) throw error
      return handleCORS(NextResponse.json(data))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
