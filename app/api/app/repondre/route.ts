/**
 * « Proposer une réponse » — brouillon de réponse à un email reçu.
 *
 * POST { texte } → un brouillon de réponse, à la voix du courtier, prêt à
 * relire, corriger et coller dans sa messagerie. Rien n'est envoyé : c'est un
 * point de départ, pas un envoi automatique.
 *
 * Le brouillon est calibré pour NE PAS avoir l'air écrit par une IA : pas de
 * tirets cadratins, pas de formules creuses, pas d'emphase mécanique, ton
 * mesuré de courtier vaudois. Le courtier reste l'auteur : il valide.
 */

import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { COURTIER } from '@/lib/courtier'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const signature =
  `${COURTIER.courtier}\n${COURTIER.titre}\n${COURTIER.entreprise}\n` +
  `${COURTIER.telephone}\n${COURTIER.email}\n${COURTIER.siteWeb}`

export async function POST(req: Request) {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const texte = (body.texte as string)?.trim()
  if (!texte) return NextResponse.json({ error: 'Colle d’abord le mail auquel répondre.' }, { status: 400 })

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Rédaction non configurée (clé ANTHROPIC_API_KEY manquante côté serveur)." }, { status: 503 })
  }

  try {
    const client = new Anthropic()
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1200,
      system:
        `Tu rédiges, à la place de ${COURTIER.courtier} (${COURTIER.titre}, ${COURTIER.entreprise}), ` +
        "un BROUILLON de réponse à un email reçu. Tu réponds en français, du point de vue du courtier. " +
        "Ta sortie est le texte de la réponse seul (objet non compris), prêt à relire, corriger et coller " +
        "dans une messagerie. N'ajoute aucun commentaire avant ou après, aucune balise, aucune explication.\n\n" +
        "TON ET STYLE — indispensables :\n" +
        "· Courtois, sobre, professionnel, à la manière d'un courtier vaudois expérimenté. Bref et concret. " +
        "Tu accuses réception, tu confirmes ce qui est fait ou la prochaine étape réaliste, tu restes disponible. " +
        "Pas de bavardage.\n" +
        "· N'INVENTE RIEN. N'annonce ni délai, ni chiffre, ni décision, ni engagement qui ne figure pas déjà " +
        "dans le mail reçu. Si une information manque, reste général (par exemple « je reviendrai vers vous dès " +
        "que j'aurai du nouveau ») plutôt que de promettre.\n\n" +
        "ÉCRIS COMME UN HUMAIN, PAS COMME UNE IA. Respecte strictement :\n" +
        "· Aucun tiret cadratin (—) ni demi-cadratin (–). Utilise la virgule, le point, les parenthèses ou deux-points.\n" +
        "· Pas de formule d'ouverture toute faite du genre « J'espère que ce message vous trouve en bonne santé ». " +
        "Commence par une salutation normale (« Bonjour Monsieur X, » / « Cher Monsieur, ») puis entre dans le vif.\n" +
        "· Pas d'adjectifs promotionnels ou emphatiques (magnifique, exceptionnel, ravi, chaleureusement…), " +
        "pas de superlatifs inutiles, pas de flatterie ni de remerciements répétés.\n" +
        "· Évite les énumérations par groupes de trois et les tournures « non seulement… mais aussi… ».\n" +
        "· Varie la longueur des phrases. Privilégie des tournures simples et directes (« je vous confirme », " +
        "« j'ai transmis », « je reste à disposition »).\n" +
        "· Pas de gras, pas d'emoji, pas de liste à puces sauf si le contenu l'exige vraiment. Guillemets droits.\n\n" +
        "Termine par une formule de politesse suisse habituelle (par exemple « Meilleures salutations » ou " +
        "« Je vous adresse mes meilleures salutations ») suivie du bloc de signature EXACT ci-dessous, tel quel :\n\n" +
        signature,
      messages: [
        { role: 'user', content: `Mail reçu auquel répondre :\n"""${texte}"""` },
      ],
    })
    const bloc = message.content.find((b) => b.type === 'text')
    const reponse = bloc && bloc.type === 'text' ? bloc.text.trim() : ''
    if (!reponse) return NextResponse.json({ error: 'Rédaction impossible. Réessaie.' }, { status: 502 })
    return NextResponse.json({ ok: true, reponse })
  } catch {
    return NextResponse.json({ error: 'Rédaction impossible. Réessaie.' }, { status: 502 })
  }
}
