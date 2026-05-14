'use client'
import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, ChevronDown, ArrowRight, Shield, TrendingUp, Users, Menu, X, Camera, BookOpen, Send } from 'lucide-react'
import Link from 'next/link'
import { MANDATS, ARTICLES, STATS, FILTRES } from './data'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#0E1219] to-[#111620]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="font-body text-sm tracking-[0.35em] uppercase text-brand-gold mb-6">Courtage immobilier · Canton de Vaud</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6">
              Thomas<span className="block italic text-brand-gold font-normal">Praet</span>
            </h1>
            <p className="font-body text-lg text-brand-muted max-w-lg leading-relaxed mb-4">Courtier certifié USPI · Plus de 60 transactions sur l&apos;arc lémanique et le canton de Vaud.</p>
            <p className="font-display text-xl italic text-brand-goldLight mb-10">&laquo;&nbsp;Je défends votre bien comme si c&apos;était le mien.&nbsp;&raquo;</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#estimation" className="group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-all duration-300 justify-center">Estimer mon bien<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></a>
              <a href="#nosbiens" className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-all duration-300 justify-center">Voir nos biens</a>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="relative aspect-[3/4] max-h-[80vh] overflow-hidden">
              <img src="/photos/thomas-terrain.jpg" alt="Thomas Praet, courtier immobilier" className="object-cover object-top w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-dark to-transparent" />
              <div className="absolute top-0 left-0 bottom-0 w-1/6 bg-gradient-to-r from-brand-dark/50 to-transparent hidden md:block" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-brand-dark border border-brand-gold/30 px-6 py-4 hidden md:block">
              <p className="font-display text-3xl text-brand-gold font-light">96.8%</p>
              <p className="font-body text-xs text-brand-muted tracking-wider uppercase mt-1">vendus au prix estimé</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown size={20} className="text-brand-muted" /></div>
    </section>
  )
}

function StatsBar() {
  return (
    <section className="border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {STATS.map(s => (<div key={s.label} className="text-center"><p className="font-display text-4xl md:text-5xl font-light text-brand-gold">{s.value}</p><p className="font-body text-sm tracking-widest uppercase text-brand-muted mt-2">{s.label}</p></div>))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="apropos" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] bg-brand-card border border-brand-border overflow-hidden group">
          <img src="/photos/portrait.jpg" alt="Thomas Praet" className="object-cover object-top w-full h-full group-hover:scale-[1.02] transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-dark/80 to-transparent" />
        </div>
        <div>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">À propos</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 leading-tight">Un courtier qui vous dit<br /><span className="italic text-brand-gold">la vérité.</span></h2>
          <div className="space-y-5 font-body text-brand-text leading-relaxed">
            <p>Je ne suis pas un courtier qui promet un prix pour obtenir un mandat, puis le baisse trois mois plus tard. Si je ne suis pas convaincu de pouvoir vendre votre bien dans de bonnes conditions, je vous le dis.</p>
            <p>Depuis plus de six ans, j&apos;accompagne des propriétaires sur l&apos;ensemble de l&apos;arc lémanique et du Gros-de-Vaud. Chaque mandat est traité avec la même rigueur : estimation fondée, stratégie de prix réaliste, suivi transparent jusqu&apos;à la signature chez le notaire.</p>
            <p>Certifié USPI, rattaché à <a href="https://www.golay-immobilier.ch" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Golay Immobilier SA</a>, une régie lausannoise de référence.</p>
            <p className="text-brand-muted text-sm italic">Arrivé de Belgique il y a 9 ans. Formé sur le terrain, pas dans un bureau.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Approach() {
  const services = [
    { icon: <TrendingUp size={28} />, title: 'Estimation & stratégie de prix', desc: "Analyse complète : valeur intrinsèque, valeur de rendement, valeur vénale. Un rapport structuré qui vous donne les clés pour décider en connaissance de cause." },
    { icon: <Shield size={28} />, title: 'Mise en vente & commercialisation', desc: "Dossier acquéreur premium, shooting professionnel, diffusion ciblée sur les portails et dans mon réseau. Chaque bien mérite une présentation à sa hauteur." },
    { icon: <Users size={28} />, title: 'Négociation & closing', desc: "Sélection des acquéreurs, accompagnement de la négociation, coordination notariale. Vous êtes informé à chaque étape, sans surprise." },
  ]
  return (
    <section id="approche" className="bg-brand-card/50 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Mon approche</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">Trois étapes,<br /><span className="italic text-brand-gold">un seul objectif.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group bg-brand-dark border border-brand-border p-8 hover:border-brand-gold/30 transition-all duration-500">
              <div className="text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
              <h3 className="font-display text-2xl font-medium text-white mb-4">{s.title}</h3>
              <p className="font-body text-brand-muted leading-relaxed">{s.desc}</p>
              <div className="w-12 h-px bg-brand-gold/30 mt-6 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MandatsSection() {
  const [filtre, setFiltre] = useState<string>('all')
  const catOrder = { en_vente: 0, reserve: 1, vendu: 2 } as Record<string, number>
  const filtered = (filtre === 'all' ? MANDATS : MANDATS.filter(m => m.categorie === filtre)).filter(m => m.photos.length > 0).sort((a, b) => (catOrder[a.categorie] ?? 9) - (catOrder[b.categorie] ?? 9))
  const badgeLabel = (cat: string) => cat === 'en_vente' ? 'En vente' : cat === 'reserve' ? 'Réservé' : 'Vendu'
  const badgeColor = (cat: string) => cat === 'en_vente' ? 'bg-brand-gold text-brand-dark' : cat === 'reserve' ? 'bg-amber-700/60 text-amber-200' : 'bg-green-800/60 text-green-200'
  return (
    <section id="nosbiens" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-12">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Portefeuille</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-white">Nos biens <span className="italic text-brand-gold">en cours</span></h2>
      </div>
      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {FILTRES.map(f => (<button key={f.key} onClick={() => setFiltre(f.key)} className={`font-body text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${filtre === f.key ? 'border-brand-gold text-brand-gold bg-brand-gold/10' : 'border-brand-border text-brand-muted hover:border-brand-gold/50 hover:text-brand-gold'}`}>{f.label}</button>))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(m => (
          <Link href={`/biens/${m.slug}`} key={m.id} className="group bg-brand-card border border-brand-border overflow-hidden hover:border-brand-gold/30 transition-all duration-500 block">
            <div className="relative aspect-[4/3] bg-brand-dark overflow-hidden">
              {m.img ? (<img src={m.img} alt={m.titre} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
              ) : (<div className="absolute inset-0 flex flex-col items-center justify-center gap-3"><Camera size={32} className="text-brand-muted/30" /><p className="font-body text-xs tracking-widest uppercase text-brand-muted/40">Photos à venir</p></div>)}
              <div className="absolute top-4 right-4"><span className={`px-3 py-1 font-body text-xs font-medium tracking-widest uppercase ${badgeColor(m.categorie)}`}>{badgeLabel(m.categorie)}</span></div>
              {m.photos.length > 0 && (<div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1"><Camera size={12} className="text-white/80" /><span className="font-body text-xs text-white/80">{m.photos.length}</span></div>)}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-card to-transparent" />
            </div>
            <div className="p-6">
              <p className="font-body text-xs tracking-widest uppercase text-brand-gold mb-2">{m.lieu}</p>
              <h3 className="font-display text-2xl text-white mb-3">{m.titre}</h3>
              <div className="flex items-baseline gap-1 mb-4"><span className="font-body text-sm text-brand-muted">CHF</span><span className="font-display text-xl text-white">{m.prix}.-</span></div>
              <div className="flex gap-4 text-brand-muted font-body text-sm">
                {m.pieces !== '-' && <span>{m.pieces} pièces</span>}
                {m.surface !== '-' && <span>{m.surface}</span>}
                {m.terrain !== '-' && <span>Terrain {m.terrain}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function EstimationForm() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [form, setForm] = useState({ nom: '', contact: '', type: '', localisation: '', message: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = async () => {
    if (!form.nom || !form.contact) return
    setSending(true)
    setError(false)
    try {
      const res = await fetch('/api/estimation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) setSent(true)
      else setError(true)
    } catch { setError(true) }
    setSending(false)
  }
  return (
    <section id="estimation" className="bg-brand-card/50 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Estimation gratuite</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 leading-tight">Quelle est la valeur<br /><span className="italic text-brand-gold">de votre bien ?</span></h2>
            <p className="font-body text-brand-text leading-relaxed mb-6">Recevez une estimation professionnelle, fondée sur les données du marché vaudois et une analyse rigoureuse de votre bien. Sans engagement, en toute confidentialité.</p>
            <div className="space-y-4 font-body text-brand-muted text-sm">
              <div className="flex items-start gap-3"><div className="w-1 h-1 rounded-full bg-brand-gold mt-2 shrink-0" /><span>Analyse complète en 3 méthodes (intrinsèque, rendement, vénale)</span></div>
              <div className="flex items-start gap-3"><div className="w-1 h-1 rounded-full bg-brand-gold mt-2 shrink-0" /><span>Rapport PDF structuré remis sous 48h</span></div>
              <div className="flex items-start gap-3"><div className="w-1 h-1 rounded-full bg-brand-gold mt-2 shrink-0" /><span>Recommandation de prix honnête, pas une promesse gonflée</span></div>
            </div>
          </div>
          <div className="bg-brand-dark border border-brand-border p-8">
            {sent ? (
              <div className="text-center py-12"><div className="w-16 h-16 border-2 border-brand-gold rounded-full flex items-center justify-center mx-auto mb-6"><Send size={24} className="text-brand-gold" /></div><h3 className="font-display text-2xl text-white mb-3">Demande envoyée</h3><p className="font-body text-brand-muted">Je vous recontacte dans les 24 heures.</p></div>
            ) : (
              <div className="space-y-5">
                <h3 className="font-display text-xl text-white mb-2">Demander une estimation</h3>
                <div><label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-2">Nom</label><input type="text" value={form.nom} onChange={set('nom')} className="w-full bg-transparent border border-brand-border px-4 py-3 font-body text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="Votre nom" /></div>
                <div><label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-2">Email ou téléphone</label><input type="text" value={form.contact} onChange={set('contact')} className="w-full bg-transparent border border-brand-border px-4 py-3 font-body text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="Pour vous recontacter" /></div>
                <div><label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-2">Type de bien</label><select value={form.type} onChange={set('type')} className="w-full bg-brand-dark border border-brand-border px-4 py-3 font-body text-brand-muted text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"><option value="">Sélectionnez</option><option value="villa">Villa / Maison individuelle</option><option value="appartement">Appartement / PPE</option><option value="immeuble">Immeuble de rendement</option><option value="terrain">Terrain</option><option value="autre">Autre</option></select></div>
                <div><label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-2">Localisation</label><input type="text" value={form.localisation} onChange={set('localisation')} className="w-full bg-transparent border border-brand-border px-4 py-3 font-body text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors" placeholder="Commune ou adresse" /></div>
                <div><label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-2">Message (optionnel)</label><textarea rows={3} value={form.message} onChange={set('message')} className="w-full bg-transparent border border-brand-border px-4 py-3 font-body text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors resize-none" placeholder="Précisions sur votre projet" /></div>
                {error && <p className="font-body text-xs text-red-400 text-center">Une erreur est survenue. Réessayez ou contactez-moi directement.</p>}
                <button onClick={submit} disabled={sending || !form.nom || !form.contact} className="w-full bg-brand-gold text-brand-dark py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{sending ? 'Envoi en cours...' : 'Envoyer ma demande'}</button>
                <p className="font-body text-xs text-brand-muted/60 text-center">Sans engagement · Réponse sous 24h</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function JournalPreview() {
  const recent = ARTICLES.slice(0, 3)
  return (
    <section id="journal" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-16">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Journal</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-white">Conseils & <span className="italic text-brand-gold">analyses</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {recent.map(a => (
          <Link href={`/journal/${a.slug}`} key={a.slug} className="group bg-brand-card border border-brand-border p-8 hover:border-brand-gold/30 transition-all duration-500 block">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-body text-xs tracking-widest uppercase text-brand-gold">{a.categorie}</span>
              <span className="w-1 h-1 rounded-full bg-brand-border" />
              <span className="font-body text-xs text-brand-muted">{new Date(a.date).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <h3 className="font-display text-xl text-white mb-4 group-hover:text-brand-gold transition-colors leading-snug">{a.titre}</h3>
            <p className="font-body text-sm text-brand-muted leading-relaxed line-clamp-3">{a.chapeau}</p>
            <div className="flex items-center gap-2 mt-6 font-body text-sm text-brand-gold"><span>Lire</span><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/journal" className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-all duration-300"><BookOpen size={16} />Tous les articles</Link>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-brand-card/50 border-y border-brand-border">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Contact</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 leading-tight">Parlons de<br /><span className="italic text-brand-gold">votre projet.</span></h2>
        <p className="font-body text-brand-muted leading-relaxed mb-12">Que vous souhaitiez vendre, obtenir une estimation ou simplement un avis sur votre situation immobilière, je suis à votre disposition pour un premier échange sans engagement.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12">
          <a href="tel:+41799690191" className="flex items-center gap-4 group"><div className="w-12 h-12 border border-brand-border flex items-center justify-center group-hover:border-brand-gold transition-colors"><Phone size={18} className="text-brand-gold" /></div><div className="text-left"><p className="font-body text-xs tracking-widest uppercase text-brand-muted">Téléphone</p><p className="font-body text-white group-hover:text-brand-gold transition-colors">+41 79 969 01 91</p></div></a>
          <a href="mailto:tpraet@golay-immobilier.ch" className="flex items-center gap-4 group"><div className="w-12 h-12 border border-brand-border flex items-center justify-center group-hover:border-brand-gold transition-colors"><Mail size={18} className="text-brand-gold" /></div><div className="text-left"><p className="font-body text-xs tracking-widest uppercase text-brand-muted">Email</p><p className="font-body text-white group-hover:text-brand-gold transition-colors">tpraet@golay-immobilier.ch</p></div></a>
          <a href="https://maps.google.com/?q=Golay+Immobilier+SA+Grand-Chêne+2+1003+Lausanne" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group"><div className="w-12 h-12 border border-brand-border flex items-center justify-center group-hover:border-brand-gold transition-colors"><MapPin size={18} className="text-brand-gold" /></div><div className="text-left"><p className="font-body text-xs tracking-widest uppercase text-brand-muted">Bureau</p><p className="font-body text-white group-hover:text-brand-gold transition-colors">Golay Immobilier SA · Lausanne</p></div></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-display text-lg text-white">Maison <span className="text-brand-gold">Praet</span></p>
      <p className="font-body text-xs text-brand-muted tracking-wider">© {new Date().getFullYear()} Thomas Praet · Golay Immobilier SA · Tous droits réservés</p>
    </footer>
  )
}

const TEMOIGNAGES = [
  {
    nom: 'Francis Reymond',
    texte: "Vendre un bien à Lausanne en pilotant l'opération depuis l'Australie aurait pu être un casse-tête. Avec Thomas Praet, tout a été fluide, du premier rendez-vous à la signature chez le notaire. Disponible malgré le décalage, franc dans ses conseils, efficace dans l'exécution.",
    etoiles: 5,
  },
  {
    nom: 'Pascal Périllard',
    texte: "J'ai eu à faire avec M. Thomas Praet, courtier immobilier, chargé de la vente d'un appartement appartenant à ma famille. Toujours courtois, à l'écoute, prêt à aider en cas de besoin, même des mois après l'aboutissement du projet. Un vrai plaisir de traiter avec M. Praet.",
    etoiles: 5,
  },
  {
    nom: 'Aurélien Despland',
    texte: "Une belle expérience lors de l'achat de notre bien, grâce au professionnalisme de M. Praet. Un grand merci pour le suivi et la bonne humeur tout au long des négociations. À recommander !",
    etoiles: 5,
  },
  {
    nom: 'Nadine Thévoz',
    texte: "Je recommande Monsieur Praet pour son professionnalisme. Il a su mettre notre bien en valeur. Je le remercie pour sa patience et son écoute.",
    etoiles: 5,
  },
]

function Testimonials() {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-brand-gold/3 blur-[120px]" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-gold mb-4">Témoignages</p>
        <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-16">Ce qu'ils en disent.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {TEMOIGNAGES.map((t, i) => (
            <div key={i} className="bg-brand-card/50 border border-brand-border/50 p-8 hover:border-brand-gold/30 transition-colors">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.etoiles }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-body text-brand-text text-[15px] leading-relaxed mb-8 italic">&ldquo;{t.texte}&rdquo;</p>
              <p className="font-body text-sm text-white font-medium">{t.nom}</p>
              <p className="font-body text-xs text-brand-muted mt-1">Avis Google</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (<main><Hero /><StatsBar /><About /><Approach /><MandatsSection /><Testimonials /><EstimationForm /><JournalPreview /><Contact /><Footer /></main>)
}
