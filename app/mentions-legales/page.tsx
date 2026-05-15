import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales | Maison Praet',
  description: 'Informations légales du site maisonpraet.ch : éditeur, hébergement, données personnelles, propriété intellectuelle.',
  robots: { index: true, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-6">Informations légales</p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-white mb-12 leading-tight">
          Mentions <span className="italic text-brand-gold">légales.</span>
        </h1>

        <div className="space-y-12 font-body text-brand-text leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-white mb-4">Éditeur du site</h2>
            <p>
              Thomas Praet<br />
              Courtier immobilier diplômé USPI<br />
              Golay Immobilier SA<br />
              Grand-Chêne 2, 1003 Lausanne, Suisse<br />
              <br />
              Téléphone : <a href="tel:+41799690191" className="text-brand-gold hover:underline">079 969 01 91</a><br />
              E-mail : <a href="mailto:tpraet@golay-immobilier.ch" className="text-brand-gold hover:underline">tpraet@golay-immobilier.ch</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-4">Hébergement</h2>
            <p>
              Le site maisonpraet.ch est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Les serveurs utilisés pour la distribution du site se situent au sein de l'Union européenne, conformément aux exigences applicables en matière de protection des données.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-4">Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu du site (textes, photographies, graphiques, logos, mise en page) est protégé par le droit d'auteur. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable de Thomas Praet, est interdite et constitue une contrefaçon sanctionnée par les articles applicables du Code pénal suisse et de la Loi fédérale sur le droit d'auteur (LDA).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-4">Données personnelles</h2>
            <p className="mb-4">
              Le présent site collecte des données personnelles uniquement lorsque vous les fournissez volontairement, principalement via le formulaire d'estimation. Les informations recueillies (nom, contact, type de bien, localisation, message) sont utilisées exclusivement pour répondre à votre demande et établir une relation commerciale, conformément à la Loi fédérale suisse sur la protection des données (nLPD, en vigueur depuis le 1<sup>er</sup> septembre 2023).
            </p>
            <p className="mb-4">
              Aucune donnée n'est transmise à des tiers à des fins commerciales. Vos données sont conservées le temps nécessaire au traitement de votre demande puis à des fins légitimes de suivi commercial, dans la limite des durées légales applicables.
            </p>
            <p>
              Conformément à la nLPD, vous disposez à tout moment d'un droit d'accès, de rectification, d'effacement et d'opposition concernant vos données. Pour exercer ces droits, contactez-moi par e-mail à <a href="mailto:tpraet@golay-immobilier.ch" className="text-brand-gold hover:underline">tpraet@golay-immobilier.ch</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-4">Cookies et analyse de trafic</h2>
            <p>
              Ce site utilise Vercel Analytics pour mesurer le trafic de manière anonyme. Aucune donnée nominative n'est collectée à des fins de profilage publicitaire. Aucun cookie tiers n'est déposé sans votre consentement implicite par la poursuite de la navigation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-4">Responsabilité</h2>
            <p>
              Les informations présentées sur ce site sont fournies à titre indicatif. Thomas Praet s'efforce de garantir l'exactitude et la mise à jour des contenus, mais ne peut être tenu responsable des erreurs, omissions ou de l'utilisation qui pourrait en être faite. Les caractéristiques précises des biens présentés (surface, prix, état) sont à confirmer auprès du courtier et ne lient juridiquement les parties qu'à la signature du contrat de courtage ou de l'acte notarié.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-4">Droit applicable et juridiction</h2>
            <p>
              Le présent site est régi par le droit suisse. Tout litige relatif à son utilisation est soumis à la juridiction exclusive des tribunaux du canton de Vaud, Suisse.
            </p>
          </section>

          <p className="font-body text-xs text-brand-muted italic pt-8 border-t border-brand-border">
            Dernière mise à jour : mai 2026.
          </p>
        </div>
      </div>
    </div>
  )
}
