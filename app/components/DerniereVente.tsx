import { MANDATS } from '../data'

export default function DerniereVente() {
  const vendu = MANDATS
    .filter(m => m.categorie === 'vendu' && m.datevente)
    .sort((a, b) => (b.datevente! > a.datevente! ? 1 : -1))
    [0]

  if (!vendu) return null

  const details = [
    vendu.titre,
    vendu.pieces !== '-' ? `${vendu.pieces} pièces` : null,
    vendu.surface !== '-' ? vendu.surface : null,
  ].filter(Boolean)

  return (
    <section
      aria-label="Dernière vente"
      className="bg-brand-card border-y border-brand-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">

        {/* Photo */}
        <div className="w-full md:w-72 md:shrink-0 aspect-[4/3] overflow-hidden">
          <img
            src={vendu.img}
            alt={`Dernière vente Maison Praet - ${vendu.titre} à ${vendu.lieu}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texte */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-brand-gold" />
            <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-gold">
              Dernière vente
            </p>
          </div>

          <h2
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: 1 }}
            className="font-display font-light text-white mb-6"
          >
            {vendu.lieu}
          </h2>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            {details.map((d, i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span className="w-px h-3 bg-brand-border block" />}
                <span className="font-body text-xs tracking-widest uppercase text-brand-muted">{d}</span>
              </span>
            ))}
          </div>

          <span className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-brand-dark bg-brand-gold px-3 py-1.5">
            Vendu
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-brand-gold via-brand-gold/20 to-transparent" />
    </section>
  )
}
