# Portfolio de Ferreol

Site portfolio de Ferreol, développeur full-stack freelance.
**Fast sites. Smart apps. Zero headaches.**

Pages : Accueil, Avis (`/reviews`), Contact (`/contact`), plus une page 404.

## Technologies

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (couleurs et polices dans `src/app/globals.css`)
- **Supabase** : avis, messages du formulaire de contact, comptage des visites
- **zod** pour vérifier les formulaires
- **GSAP + Lenis** pour les animations et le défilement doux (règles dans `CLAUDE.md`)

## Lancer le site sur ton ordinateur

1. Installer les dépendances :

   ```bash
   npm install
   ```

2. Copier `.env.example` en `.env.local`, puis y coller l'adresse et la clé **publishable** de ton
   projet Supabase (Supabase → Project Settings → API).
   `.env.local` n'est jamais envoyé sur GitHub : ne colle jamais ces valeurs ailleurs.

3. Démarrer :

   ```bash
   npm run dev
   ```

   Puis ouvrir http://localhost:3000.

Autres commandes : `npm run lint` (vérifie le code), `npm run build` (prépare la version en ligne),
`npm run start` (lance cette version).

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Nom, slogan, email, adresse du site, photo, langues | `src/config/site.ts` |
| Liens Fiverr, GitHub, LinkedIn, Instagram | `src/config/links.ts` |
| Numéro WhatsApp | `src/config/site.ts` (`whatsapp`) |
| Mes projets (textes, captures, liens) | `src/config/projects.ts` |
| Tous les textes du site (titres, FAQ, boutons…) | `src/content/en.ts` |
| La couleur orange | `--accent` dans `src/app/globals.css` |
| L'icône d'onglet « F » | `src/app/icon.svg` et `src/app/apple-icon.tsx` |
| L'image de partage (WhatsApp, LinkedIn…) | `src/app/opengraph-image.tsx` |
| Les pages listées pour Google | `src/app/sitemap.ts` |
| Les en-têtes de sécurité | `next.config.ts` |

Tout ce qui contient encore `[PLACEHOLDER]` ou `[ENTRE CROCHETS]` reste à remplir.
Les liens sociaux non remplis sont masqués automatiquement.

## Supabase

Trois tables, protégées par Row Level Security (RLS) :

- **reviews** : les visiteurs peuvent ajouter un avis (toujours avec `approved = false`) et lire
  seulement les avis approuvés. Tu approuves un avis dans Supabase → Table Editor → `reviews` →
  coche `approved`.
- **messages** : les visiteurs peuvent seulement envoyer un message ; toi seul peux les lire.
- **visits** : une ligne par page ouverte (adresse de la page + date), seulement si le visiteur a
  cliqué « Yes » dans la bannière de consentement. Les visites depuis `localhost` ne sont jamais
  envoyées.

Formulaires : vérification zod, champ piège anti-robots (honeypot) et 30 secondes d'attente entre
deux envois.

## Checklist avant la mise en ligne

### Infos à recevoir de Ferreol

- [ ] Lien **Fiverr** → `FIVERR_URL` dans `src/config/links.ts`
- [x] Numéro **WhatsApp** → `whatsapp` dans `src/config/site.ts` (affiché en bas de chaque page)
- [ ] **Projets** + **captures d'écran** → `src/config/projects.ts` (captures dans `public/projects/`, idéalement 1600×1000)
- [ ] **Vraie photo** (l'actuelle est générée par IA) → `photo` dans `src/config/site.ts`
- [ ] **Délai habituel** pour un site → question « How long does it take? » dans `src/content/en.ts`
- [ ] **Nom de domaine** → `url` dans `src/config/site.ts` (sinon sitemap et partages pointent vers example.com)
- [ ] Logo « F » définitif (optionnel) → remplace `src/app/icon.svg` et `src/app/apple-icon.tsx`

### Vérifications techniques

- [ ] Plus aucun `[PLACEHOLDER]` visible sur le site
- [ ] `npm run lint` et `npm run build` passent sans erreur
- [ ] Variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` ajoutées chez l'hébergeur
- [ ] Test en ligne : envoyer un avis, un message, accepter la bannière, puis vérifier dans Supabase
- [ ] Aperçu de partage vérifié (coller l'adresse du site dans WhatsApp ou LinkedIn)
- [ ] `https://ton-domaine/sitemap.xml` et `/robots.txt` s'affichent
- [ ] Site ajouté à Google Search Console avec le sitemap
- [ ] Test sur téléphone, en thème clair et sombre, et avec « réduire les animations »

## Versions

Chaque version est décrite dans le dossier [`releases/`](releases/README.md).
