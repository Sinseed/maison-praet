/**
 * Génération serveur du rapport d'estimation PDF.
 * POST { input: EstimationInput, reference?: string }
 * → application/pdf (téléchargement).
 */

import { NextResponse } from 'next/server';
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer';
import React from 'react';
import { RapportEstimationPDF } from '@/lib/estimation/pdf-document';
import { estimer } from '@/lib/estimation/moteur';
import { COURTIER } from '@/lib/courtier';
import type { EstimationInput } from '@/lib/estimation/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { input?: EstimationInput; reference?: string };
    const input = body.input;

    if (!input || typeof input !== 'object' || !input.commune) {
      return NextResponse.json({ error: 'Entrée d\'estimation invalide.' }, { status: 400 });
    }

    const resultat = estimer(input);
    const dateEdition = new Date().toISOString();
    const reference =
      body.reference ||
      `EST-${new Date().getFullYear()}-${input.commune.slice(0, 3).toUpperCase()}-${String(
        Math.abs(Math.round(resultat.synthese.valeurRetenue / 1000)),
      )}`;

    const element = React.createElement(RapportEstimationPDF, {
      input,
      resultat,
      courtier: COURTIER,
      dateEdition,
      reference,
    }) as unknown as React.ReactElement<DocumentProps>;

    const buffer = await renderToBuffer(element);

    const nomFichier = `estimation-${input.commune.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${nomFichier}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Erreur génération PDF estimation:', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la génération du PDF.' }, { status: 500 });
  }
}
