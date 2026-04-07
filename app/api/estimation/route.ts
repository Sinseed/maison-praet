import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { nom, contact, type, localisation, message } = await req.json()

    if (!nom || !contact) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const typeLabels: Record<string, string> = {
      villa: 'Villa / Maison individuelle',
      appartement: 'Appartement / PPE',
      immeuble: 'Immeuble de rendement',
      terrain: 'Terrain',
      autre: 'Autre',
    }

    await resend.emails.send({
      from: 'Maison Praet <noreply@maisonpraet.ch>',
      to: 'tpraet@golay-immobilier.ch',
      subject: `Nouvelle demande d'estimation – ${nom}`,
      html: `
        <h2>Nouvelle demande d'estimation</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Nom</td><td style="padding:8px 0;">${nom}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Contact</td><td style="padding:8px 0;">${contact}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Type de bien</td><td style="padding:8px 0;">${typeLabels[type] || type || 'Non précisé'}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Localisation</td><td style="padding:8px 0;">${localisation || 'Non précisée'}</td></tr>
          ${message ? `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;vertical-align:top;">Message</td><td style="padding:8px 0;">${message}</td></tr>` : ''}
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
