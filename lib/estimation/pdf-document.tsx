/* eslint-disable jsx-a11y/alt-text */
/**
 * Rapport d'estimation vendeur — document PDF (React PDF, rendu serveur).
 *
 * Structure : page de garde · description du bien · méthodologie ·
 * calculs détaillés (4 méthodes) · synthèse · conclusion signée.
 *
 * Fontes : Times-Roman (titres, effet sérif) et Helvetica (corps) — toutes deux
 * intégrées à React PDF, aucun chargement réseau requis.
 */

import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { formatCHF, formatDate, formatM2, formatPct } from '@/lib/format';
import { CHARTE, type IdentiteCourtier } from '@/lib/courtier';
import { DATE_VERIFICATION, MENTIONS } from '@/lib/config/reglementaire';
import { TYPE_BIEN_LABELS } from '@/lib/estimation/types';
import type { EstimationInput, EstimationResultat, LigneCalcul } from '@/lib/estimation/types';

const styles = StyleSheet.create({
  page: {
    paddingTop: 54,
    paddingBottom: 64,
    paddingHorizontal: 54,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: CHARTE.text,
    lineHeight: 1.5,
  },
  // Page de garde
  cover: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 40,
  },
  coverTop: { flexDirection: 'column' },
  coverBrand: { fontFamily: 'Times-Roman', fontSize: 22, color: CHARTE.dark },
  coverBrandGold: { color: CHARTE.gold },
  coverRule: { height: 2, width: 54, backgroundColor: CHARTE.gold, marginVertical: 26 },
  coverKicker: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: CHARTE.muted,
    marginBottom: 14,
  },
  coverTitle: { fontFamily: 'Times-Roman', fontSize: 40, color: CHARTE.dark, lineHeight: 1.1 },
  coverSubtitle: { fontSize: 12, color: CHARTE.muted, marginTop: 18 },
  coverMeta: { flexDirection: 'column', gap: 4 },
  coverMetaLine: { fontSize: 10, color: CHARTE.text },
  coverMetaLabel: { color: CHARTE.muted },

  // Sections
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  sectionNum: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    color: CHARTE.gold,
    marginRight: 8,
  },
  sectionTitle: { fontFamily: 'Times-Roman', fontSize: 17, color: CHARTE.dark },
  paragraph: { marginBottom: 8, textAlign: 'justify' },

  // Grille descriptive
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  gridItem: { width: '50%', paddingVertical: 5, paddingRight: 12 },
  gridLabel: { fontSize: 8, letterSpacing: 1.5, textTransform: 'uppercase', color: CHARTE.muted },
  gridValue: { fontSize: 11, color: CHARTE.dark, marginTop: 2 },

  // Tableaux de calcul
  table: { marginTop: 6, marginBottom: 14 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E8EC',
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: CHARTE.gold,
    marginTop: 2,
  },
  cellLabel: { flex: 1, paddingRight: 12 },
  cellLabelText: { fontSize: 10, color: CHARTE.text },
  cellDetailText: { fontSize: 7.5, color: CHARTE.muted, marginTop: 1 },
  cellMontant: { fontSize: 10, textAlign: 'right' },
  bold: { fontFamily: 'Helvetica-Bold', color: CHARTE.dark },

  methodTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: CHARTE.dark,
    marginTop: 6,
    marginBottom: 2,
  },
  methodValue: { fontFamily: 'Times-Roman', fontSize: 14, color: CHARTE.gold },

  // Synthèse
  synthBox: {
    borderWidth: 1,
    borderColor: CHARTE.gold,
    padding: 18,
    marginTop: 8,
    marginBottom: 12,
  },
  synthRange: { fontFamily: 'Times-Roman', fontSize: 26, color: CHARTE.dark, textAlign: 'center' },
  synthLabel: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: CHARTE.muted,
    textAlign: 'center',
    marginBottom: 8,
  },
  synthCols: { flexDirection: 'row', marginTop: 14 },
  synthCol: { flex: 1, alignItems: 'center' },
  synthColLabel: { fontSize: 8, letterSpacing: 1, textTransform: 'uppercase', color: CHARTE.muted },
  synthColValue: { fontFamily: 'Helvetica-Bold', fontSize: 13, color: CHARTE.dark, marginTop: 3 },

  // Signature
  signature: { marginTop: 22 },
  signatureName: { fontFamily: 'Times-Roman', fontSize: 13, color: CHARTE.dark },
  signatureTitle: { fontSize: 9, color: CHARTE.muted },

  mention: {
    fontSize: 7.5,
    color: CHARTE.muted,
    fontStyle: 'italic',
    marginTop: 10,
    lineHeight: 1.4,
  },

  // Pied de page
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 54,
    right: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: '#E6E8EC',
    paddingTop: 6,
  },
  footerText: { fontSize: 7.5, color: CHARTE.muted },
});

function Footer({ courtier }: { courtier: IdentiteCourtier }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>
        {courtier.nomCommercial} · {courtier.entreprise}
      </Text>
      <Text
        style={styles.footerText}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionNum}>{num}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function TableCalcul({ lignes }: { lignes: LigneCalcul[] }) {
  return (
    <View style={styles.table}>
      {lignes.map((l, i) => (
        <View key={i} style={l.total ? styles.rowTotal : styles.row}>
          <View style={styles.cellLabel}>
            <Text style={[styles.cellLabelText, ...(l.total ? [styles.bold] : [])]}>{l.libelle}</Text>
            {l.detail ? <Text style={styles.cellDetailText}>{l.detail}</Text> : null}
          </View>
          <Text style={[styles.cellMontant, ...(l.total ? [styles.bold] : [])]}>
            {formatCHF(l.montant)}
          </Text>
        </View>
      ))}
    </View>
  );
}

function GridItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.gridItem}>
      <Text style={styles.gridLabel}>{label}</Text>
      <Text style={styles.gridValue}>{value}</Text>
    </View>
  );
}

export interface RapportEstimationProps {
  input: EstimationInput;
  resultat: EstimationResultat;
  courtier: IdentiteCourtier;
  /** Date d'édition (ISO). Fournie par l'appelant pour un rendu déterministe. */
  dateEdition: string;
  reference: string;
}

export function RapportEstimationPDF({
  input,
  resultat,
  courtier,
  dateEdition,
  reference,
}: RapportEstimationProps) {
  const { intrinseque, rendement, comparaison, venale, synthese } = resultat;
  const titreBien = `${TYPE_BIEN_LABELS[input.type]} — ${input.commune}`;

  return (
    <Document
      title={`Rapport d'estimation — ${input.commune}`}
      author={courtier.courtier}
      subject="Estimation immobilière indicative"
    >
      {/* ── Page de garde ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <View style={styles.coverTop}>
            <Text style={styles.coverBrand}>
              {courtier.nomCommercial.split(' ')[0]}{' '}
              <Text style={styles.coverBrandGold}>{courtier.nomCommercial.split(' ').slice(1).join(' ')}</Text>
            </Text>
            <View style={styles.coverRule} />
            <Text style={styles.coverKicker}>Rapport d'estimation</Text>
            <Text style={styles.coverTitle}>{titreBien}</Text>
            {input.adresse ? <Text style={styles.coverSubtitle}>{input.adresse}</Text> : null}
          </View>
          <View style={styles.coverMeta}>
            <Text style={styles.coverMetaLine}>
              <Text style={styles.coverMetaLabel}>Référence : </Text>
              {reference}
            </Text>
            <Text style={styles.coverMetaLine}>
              <Text style={styles.coverMetaLabel}>Établi le : </Text>
              {formatDate(dateEdition)}
            </Text>
            <Text style={styles.coverMetaLine}>
              <Text style={styles.coverMetaLabel}>Par : </Text>
              {courtier.courtier}, {courtier.titre}
            </Text>
            <Text style={styles.coverMetaLine}>
              <Text style={styles.coverMetaLabel}>Valeur vénale retenue : </Text>
              {formatCHF(synthese.valeurRetenue)}
            </Text>
          </View>
        </View>
        <Footer courtier={courtier} />
      </Page>

      {/* ── Description & méthodologie ── */}
      <Page size="A4" style={styles.page}>
        <SectionHeader num="1" title="Description du bien" />
        <View style={styles.grid}>
          <GridItem label="Type" value={TYPE_BIEN_LABELS[input.type]} />
          <GridItem label="Commune" value={input.commune} />
          <GridItem label="Adresse" value={input.adresse || '—'} />
          <GridItem label="Année de construction" value={String(input.anneeConstruction || '—')} />
          <GridItem label="Surface habitable / utile" value={formatM2(input.surfaceHabitable)} />
          <GridItem label="Surface de parcelle" value={formatM2(input.surfaceParcelle)} />
          <GridItem label="Valeur ECA" value={formatCHF(input.valeurEca)} />
          <GridItem label="Prix du terrain retenu" value={`${formatCHF(input.prixTerrainM2)}/m²`} />
        </View>

        <SectionHeader num="2" title="Méthodologie" />
        <Text style={styles.paragraph}>
          L'estimation combine plusieurs approches complémentaires, présentées de manière
          transparente. La valeur intrinsèque part de la valeur d'assurance ECA indexée, dont
          on déduit la vétusté par élément d'ouvrage, avant d'ajouter la valeur du terrain et
          les aménagements extérieurs. La valeur de rendement capitalise l'état locatif net au
          taux du marché. La valeur vénale résulte d'une pondération de ces deux approches,
          adaptée au type de bien. La comparaison de marché confronte le résultat à des
          transactions récentes de biens similaires.
        </Text>
        <Text style={styles.mention}>{MENTIONS.estimation}</Text>
        <Footer courtier={courtier} />
      </Page>

      {/* ── Calculs détaillés ── */}
      <Page size="A4" style={styles.page}>
        <SectionHeader num="3" title="Calculs détaillés" />

        {intrinseque.applicable ? (
          <>
            <Text style={styles.methodTitle}>3.1 Valeur intrinsèque</Text>
            <TableCalcul lignes={intrinseque.lignes} />
          </>
        ) : null}

        {rendement.applicable ? (
          <>
            <Text style={styles.methodTitle}>3.2 Valeur de rendement</Text>
            <TableCalcul lignes={rendement.lignes} />
          </>
        ) : null}

        <Text style={styles.methodTitle}>3.3 Valeur vénale (pondération)</Text>
        <TableCalcul lignes={venale.lignes} />

        {comparaison.applicable ? (
          <>
            <Text style={styles.methodTitle}>3.4 Comparaison de marché</Text>
            <TableCalcul lignes={comparaison.lignes} />
          </>
        ) : null}
        <Footer courtier={courtier} />
      </Page>

      {/* ── Synthèse & conclusion ── */}
      <Page size="A4" style={styles.page}>
        <SectionHeader num="4" title="Synthèse & recommandation" />
        <View style={styles.synthBox}>
          <Text style={styles.synthLabel}>Fourchette de recommandation</Text>
          <Text style={styles.synthRange}>
            {formatCHF(synthese.fourchetteBasse)} – {formatCHF(synthese.fourchetteHaute)}
          </Text>
          <View style={styles.synthCols}>
            <View style={styles.synthCol}>
              <Text style={styles.synthColLabel}>Prix de mise en vente conseillé</Text>
              <Text style={styles.synthColValue}>{formatCHF(synthese.prixMiseEnVente)}</Text>
            </View>
            <View style={styles.synthCol}>
              <Text style={styles.synthColLabel}>Valeur vénale retenue</Text>
              <Text style={styles.synthColValue}>{formatCHF(synthese.valeurRetenue)}</Text>
            </View>
            <View style={styles.synthCol}>
              <Text style={styles.synthColLabel}>Prix plancher</Text>
              <Text style={styles.synthColValue}>{formatCHF(synthese.prixPlancher)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.paragraph}>
          Sur la base des méthodes exposées ci-dessus et de ma connaissance du marché de{' '}
          {input.commune}, je recommande une mise en vente à {formatCHF(synthese.prixMiseEnVente)},
          avec une marge de négociation menant à un prix plancher de{' '}
          {formatCHF(synthese.prixPlancher)}. Ce positionnement vise à maximiser le produit net
          de la vente tout en assurant une commercialisation dans un délai raisonnable.
        </Text>

        <View style={styles.signature}>
          <Text style={styles.signatureName}>{courtier.courtier}</Text>
          <Text style={styles.signatureTitle}>{courtier.titre}</Text>
          <Text style={styles.signatureTitle}>
            {courtier.entreprise} · {courtier.telephone} · {courtier.email}
          </Text>
        </View>

        <Text style={styles.mention}>{MENTIONS.estimation}</Text>
        <Text style={styles.mention}>
          Constantes de référence vérifiées le {formatDate(DATE_VERIFICATION)}.
        </Text>
        <Footer courtier={courtier} />
      </Page>
    </Document>
  );
}

export default RapportEstimationPDF;
