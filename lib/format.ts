/**
 * Formatage suisse — utilisé PARTOUT dans l'application.
 *   - Montants : « CHF 1'250'000.- » (apostrophe = séparateur de milliers,
 *     suffixe « .- »).
 *   - Dates : JJ.MM.AAAA.
 *   - Pourcentages : « 5.0 % ».
 *
 * Aucune dépendance externe : Intl.NumberFormat('de-CH') produit l'apostrophe.
 */

import { LOCALE } from '@/lib/config/reglementaire';

const nfEntier = new Intl.NumberFormat(LOCALE.nombre, {
  maximumFractionDigits: 0,
});

const nf2 = new Intl.NumberFormat(LOCALE.nombre, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Nombre entier au format suisse : 1'250'000. */
export function formatNombre(n: number): string {
  if (!Number.isFinite(n)) return '—';
  return nfEntier.format(Math.round(n));
}

/**
 * Montant en francs suisses : « CHF 1'250'000.- ».
 * @param n Montant en CHF.
 * @param opts.decimales Affiche 2 décimales (ex. TVA, honoraires).
 * @param opts.sansSuffixe Retire le « .- » final.
 * @param opts.sansDevise Retire le préfixe « CHF ».
 */
export function formatCHF(
  n: number,
  opts: { decimales?: boolean; sansSuffixe?: boolean; sansDevise?: boolean } = {},
): string {
  if (!Number.isFinite(n)) return '—';
  const negatif = n < 0;
  const abs = Math.abs(n);
  const corps = opts.decimales ? nf2.format(abs) : nfEntier.format(Math.round(abs));
  const suffixe = opts.decimales || opts.sansSuffixe ? '' : LOCALE.suffixeMontant;
  const devise = opts.sansDevise ? '' : `${LOCALE.devise} `;
  return `${negatif ? '-' : ''}${devise}${corps}${suffixe}`;
}

/**
 * Pourcentage lisible : formatPct(0.033) → « 3.3 % ».
 * @param ratio Ratio (0.05 = 5 %).
 * @param decimales Nombre de décimales (défaut 1).
 */
export function formatPct(ratio: number, decimales = 1): string {
  if (!Number.isFinite(ratio)) return '—';
  const v = ratio * 100;
  const nf = new Intl.NumberFormat(LOCALE.nombre, {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
  return `${nf.format(v)} %`;
}

/** Surface : formatM2(125.5) → « 125.5 m² ». */
export function formatM2(n: number, decimales = 0): string {
  if (!Number.isFinite(n)) return '—';
  const nf = new Intl.NumberFormat(LOCALE.nombre, {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
  return `${nf.format(n)} m²`;
}

/** Prix au m² : « CHF 1'200.-/m² ». */
export function formatCHFparM2(n: number): string {
  if (!Number.isFinite(n)) return '—';
  return `${formatCHF(n)}/m²`;
}

/**
 * Date au format suisse JJ.MM.AAAA.
 * @param d Date, timestamp, ou chaîne ISO (AAAA-MM-JJ).
 */
export function formatDate(d: Date | string | number): string {
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return '—';
  const jj = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const aaaa = date.getFullYear();
  return `${jj}.${mm}.${aaaa}`;
}

/** Arrondi d'un montant au palier le plus proche (ex. 10'000 pour un prix). */
export function arrondirAuPalier(n: number, palier: number): number {
  if (palier <= 0) return Math.round(n);
  return Math.round(n / palier) * palier;
}
