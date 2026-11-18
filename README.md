# Auto-École de la Préfecture — site vitrine

Site one-page de l'Auto-École de la Préfecture (Nanterre, 92). Astro (statique), aucune dépendance JS côté client hormis un petit moteur d'animations maison (`src/scripts/motion.ts`).

## Développement

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/ (à déployer sur Netlify, Vercel, OVH…)
```

## Modifier le contenu

Tout le contenu (coordonnées, horaires, tarifs, formations, FAQ, avis, chiffres clés) est dans **`src/data/site.ts`**.
Les valeurs marquées `TODO` sont des exemples à remplacer **avant la mise en ligne** :

- adresse, téléphone, WhatsApp, e-mail, réseaux sociaux
- n° d'agrément préfectoral et SIRET (obligatoires)
- grille tarifaire
- chiffres clés (taux de réussite réel — publié sur securite-routiere.gouv.fr)
- **avis clients** : remplacer par de vrais avis (publier de faux avis est interdit)
- domaine dans `astro.config.mjs` et `site.url`
- page `src/pages/mentions-legales.astro` (hébergeur, gérant)
- image de partage `public/og.png` (1200×630)

## Formulaire

`site.formEndpoint` vide : le formulaire ouvre WhatsApp avec le message pré-rempli.
Pour recevoir les demandes par e-mail, renseigner un endpoint (Formspree, Web3Forms, etc.) qui accepte un POST JSON.
