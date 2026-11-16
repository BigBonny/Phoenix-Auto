/**
 * ─────────────────────────────────────────────────────────────
 *  PHOENIX PERMIS — Contenu du site
 *  Toutes les informations de l'agence sont ici.
 *  ⚠️ Les valeurs marquées TODO sont des EXEMPLES à remplacer
 *     par les vraies données avant la mise en ligne.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Phoenix Permis',
  tagline: 'Auto-école à Bobigny',
  url: 'https://www.phoenix-permis.fr', // TODO : nom de domaine définitif
  description:
    "Phoenix Permis, auto-école à Bobigny (93), 44 avenue Jean Jaurès : permis B en boîte manuelle ou automatique, conduite accompagnée, code de la route. Noté 4,8/5 sur Google par plus de 390 élèves.",

  // Coordonnées — source : fiche Google Maps « Phoenix Permis Bobigny » (relevée le 13/11/2026)
  phone: '09 87 75 75 73',
  phoneHref: '+33987757573',
  whatsapp: '', // TODO : numéro WhatsApp (format 336XXXXXXXX). Vide = boutons WhatsApp masqués
  email: '', // TODO : e-mail de l'agence. Vide = lien e-mail masqué
  address: {
    street: '44 avenue Jean Jaurès',
    postalCode: '93000',
    city: 'Bobigny',
    lat: 48.901329,
    lng: 2.4412152,
  },
  hours: [
    { days: 'Lundi, mercredi', time: '15h00 – 20h00' },
    { days: 'Mardi, jeudi, vendredi', time: '10h00 – 13h00 · 15h00 – 20h00' },
    { days: 'Samedi', time: '10h00 – 14h00' },
    { days: 'Dimanche', time: 'Fermé' },
  ],
  /** Mêmes horaires, au format schema.org (référencement Google) */
  openingHoursSpec: [
    { days: ['Monday', 'Wednesday'], opens: '15:00', closes: '20:00' },
    { days: ['Tuesday', 'Thursday', 'Friday'], opens: '10:00', closes: '13:00' },
    { days: ['Tuesday', 'Thursday', 'Friday'], opens: '15:00', closes: '20:00' },
    { days: ['Saturday'], opens: '10:00', closes: '14:00' },
  ],
  drivingHours: 'Horaires d’accueil de l’agence. Leçons de conduite sur rendez-vous.',

  /** Note Google (fiche Maps, relevée le 13/11/2026) */
  google: {
    rating: 4.8,
    reviews: 392,
    fiveStars: 370,
    url: 'https://maps.google.com/?cid=15798944696892170854',
  },

  /**
   * Endpoint du formulaire (Formspree, Netlify, Web3Forms, API maison…).
   * Vide : le formulaire ouvre WhatsApp (si renseigné), sinon un e-mail (si renseigné), sinon invite à appeler.
   */
  formEndpoint: '',

  social: {
    instagram: '', // TODO (vide = icône masquée)
    tiktok: '', // TODO (vide = icône masquée)
    google: 'https://maps.google.com/?cid=15798944696892170854',
  },

  // Agrément préfectoral — obligatoire sur le site d'une auto-école. TODO
  agrement: 'E 00 093 0000 0',
  siret: '000 000 000 00000', // TODO
};

/**
 * Chiffres clés — issus de la fiche Google Maps.
 * TODO : ajouter le taux de réussite officiel (publié sur securite-routiere.gouv.fr), ex.
 *   { value: 80, suffix: '%', label: 'de réussite à l’examen pratique' }
 */
export type Stat = { value: number; suffix: string; label: string; decimals?: number; note?: string };
export const stats: Stat[] = [
  { value: site.google.rating, suffix: '/5', decimals: 1, label: 'note moyenne sur Google' },
  { value: site.google.reviews, suffix: '', label: 'avis d’élèves sur Google' },
  { value: Math.round((site.google.fiveStars / site.google.reviews) * 100), suffix: '%', label: 'des avis sont à 5 étoiles' },
];

export type Formation = {
  id: string;
  title: string;
  kicker: string;
  text: string;
  points: string[];
  icon: 'car' | 'auto' | 'family' | 'book' | 'bolt' | 'switch';
  featured?: boolean;
};

export const formations: Formation[] = [
  {
    id: 'permis-b',
    title: 'Permis B — boîte manuelle',
    kicker: 'Le classique',
    text: 'La formation complète pour conduire tous les véhicules légers, avec un suivi pédagogique personnalisé du premier cours à l’examen.',
    points: ['20 h de conduite minimum', 'Code en ligne illimité', 'Accompagnement à l’examen'],
    icon: 'car',
    featured: true,
  },
  {
    id: 'boite-auto',
    title: 'Permis boîte automatique',
    kicker: 'Plus rapide',
    text: 'Moins d’heures, moins de stress : idéal pour se concentrer sur la route. Permis en 13 h minimum.',
    points: ['13 h minimum', 'Passerelle vers la manuelle possible'],
    icon: 'auto',
  },
  {
    id: 'aac',
    title: 'Conduite accompagnée',
    kicker: 'Dès 15 ans',
    text: 'L’AAC, c’est jusqu’à 3 000 km d’expérience avant l’examen et un meilleur taux de réussite. Période probatoire réduite à 2 ans.',
    points: ['Rendez-vous pédagogiques inclus', 'Assurance simplifiée'],
    icon: 'family',
  },
  {
    id: 'code',
    title: 'Code de la route',
    kicker: 'En ligne & en salle',
    text: 'Plateforme d’entraînement en ligne illimitée, cours thématiques en agence et inscription à l’examen du code.',
    points: ['Accès 24h/24', 'Examens blancs'],
    icon: 'book',
  },
  {
    id: 'accelere',
    title: 'Stage accéléré',
    kicker: 'Permis en quelques semaines',
    text: 'Une formation intensive pour ceux qui ont besoin du permis rapidement : planning dédié et date d’examen anticipée.',
    points: ['Planning intensif', 'Moniteur référent'],
    icon: 'bolt',
  },
  {
    id: 'passerelle',
    title: 'Passerelle auto → manuelle',
    kicker: '7 h, sans examen',
    text: 'Vous avez le permis boîte auto depuis 3 mois : 7 heures de formation suffisent pour conduire en boîte manuelle.',
    points: ['Attestation remise', 'Sans repasser l’examen'],
    icon: 'switch',
  },
];

export const steps = [
  {
    title: 'Évaluation de départ',
    text: 'Une heure au volant avec un moniteur pour estimer précisément le nombre d’heures dont vous aurez besoin. Pas de mauvaise surprise.',
  },
  {
    title: 'Le code, à votre rythme',
    text: 'Entraînement en ligne illimité et cours en agence. Nous vous inscrivons à l’examen dès que vous êtes prêt.',
  },
  {
    title: 'La conduite, en confiance',
    text: 'Des leçons sur véhicules récents à double commande, avec des moniteurs patients qui vous suivent du premier cours à l’examen.',
  },
  {
    title: 'L’examen… et l’envol',
    text: 'Examens blancs, réservation de la date et accompagnement le jour J. Il ne reste plus qu’à prendre la route.',
  },
];

export const reasons = [
  {
    title: 'Moniteurs diplômés d’État',
    text: 'Une équipe patiente et bienveillante, formée à la pédagogie et à la gestion du stress.',
    icon: 'shield',
  },
  {
    title: 'Véhicules récents',
    text: 'Citadines modernes, climatisées et équipées de double commande, en manuelle comme en automatique.',
    icon: 'car',
  },
  {
    title: 'Réservation en ligne',
    text: 'Planifiez vos leçons depuis votre téléphone, en quelques secondes, et suivez votre progression.',
    icon: 'calendar',
  },
  {
    title: 'Financement facilité',
    text: 'CPF, permis à 1 € par jour, paiement en 4× sans frais, aides France Travail et Région.',
    icon: 'wallet',
  },
] as const;

/** Tarifs — TODO : remplacer par la grille tarifaire réelle */
export const pricing = {
  manuelle: [
    {
      name: 'Code',
      price: 249,
      unit: 'forfait',
      desc: 'Pour obtenir le code de la route en toute sérénité.',
      features: ['Frais de dossier & ANTS', 'Code en ligne illimité 6 mois', 'Cours thématiques en agence', 'Examens blancs'],
      cta: 'Je commence le code',
    },
    {
      name: 'Permis B — 20 h',
      price: 1290,
      unit: 'forfait',
      desc: 'La formule complète, la plus choisie par nos élèves.',
      features: [
        'Frais de dossier & ANTS',
        'Code en ligne illimité',
        'Évaluation de départ',
        '20 h de conduite',
        '1 accompagnement à l’examen',
      ],
      cta: 'Je réserve ma place',
      featured: true,
    },
    {
      name: 'Conduite accompagnée',
      price: 1490,
      unit: 'forfait',
      desc: 'Dès 15 ans, pour arriver à l’examen avec de l’expérience.',
      features: [
        'Code en ligne illimité',
        '20 h de conduite',
        'Rendez-vous préalable',
        '2 rendez-vous pédagogiques',
        '1 accompagnement à l’examen',
      ],
      cta: 'Je me renseigne',
    },
  ],
  automatique: [
    {
      name: 'Code',
      price: 249,
      unit: 'forfait',
      desc: 'Pour obtenir le code de la route en toute sérénité.',
      features: ['Frais de dossier & ANTS', 'Code en ligne illimité 6 mois', 'Cours thématiques en agence', 'Examens blancs'],
      cta: 'Je commence le code',
    },
    {
      name: 'Permis BEA — 13 h',
      price: 990,
      unit: 'forfait',
      desc: 'Le permis boîte automatique, plus rapide et plus serein.',
      features: [
        'Frais de dossier & ANTS',
        'Code en ligne illimité',
        'Évaluation de départ',
        '13 h de conduite',
        '1 accompagnement à l’examen',
      ],
      cta: 'Je réserve ma place',
      featured: true,
    },
    {
      name: 'Passerelle BEA → B',
      price: 420,
      unit: '7 heures',
      desc: 'Passez en boîte manuelle sans repasser l’examen.',
      features: ['7 h de formation', 'Attestation de fin de formation', 'Démarches ANTS incluses'],
      cta: 'Je me renseigne',
    },
  ],
  extras: [
    { label: 'Heure de conduite supplémentaire', price: '55 €' },
    { label: 'Accompagnement à l’examen pratique', price: '110 €' },
    { label: 'Évaluation de départ seule', price: '49 €' },
    { label: 'Leçon de perfectionnement / reprise', price: '55 €' },
  ],
};

export const funding = [
  { title: 'CPF', text: 'Financez votre permis avec votre Compte Personnel de Formation.' },
  { title: 'Permis à 1 €/jour', text: 'Un prêt à taux zéro pour les 15–25 ans, en partenariat avec l’État.' },
  { title: 'Paiement 4× sans frais', text: 'Étalez le coût de votre formation sans aucun frais.' },
  { title: 'Aides France Travail', text: 'Jusqu’à 1 200 € d’aide sous conditions pour les demandeurs d’emploi.' },
];

/**
 * Avis réels — extraits de la fiche Google Maps (avis 5 étoiles, relevés le 13/11/2026).
 * Textes raccourcis (« […] ») ; prénom + initiale uniquement.
 */
export const reviews = [
  {
    name: 'Frei D.',
    tag: 'Permis obtenu du 1er coup',
    text: 'Excellente auto-école ! Une équipe au top, professionnelle, à l’écoute et toujours encourageante. Les moniteurs sont très pédagogues, patients et prennent le temps de bien expliquer pour nous mettre en confiance. […] J’ai eu mon permis du premier coup.',
  },
  {
    name: 'Nelia M.',
    tag: 'Avis Google',
    text: 'Les moniteurs sont super gentils, patients et surtout très rassurants. […] J’ai vraiment apprécié mon apprentissage avec eux, notamment avec Reda et Amadou. Leurs conseils m’ont beaucoup aidée à progresser et à prendre confiance en moi.',
  },
  {
    name: 'Fateh A.',
    tag: 'Avis Google',
    text: 'Une auto-école incroyable, de confiance, avec des personnes très humaines ! Merci à tous les moniteurs, Amadou, Lionel, Sadi et Reda, ils sont vraiment tous gentils et veulent votre réussite. Merci aussi à Myriam, elle m’a toujours aidé et conseillé pour le planning.',
  },
  {
    name: 'Kenny F.',
    tag: 'Permis obtenu',
    text: 'Une excellente auto-école ! L’équipe est très pédagogue, à l’écoute et patiente. J’ai eu des moniteurs top qui m’ont bien préparé à l’examen sans me stresser. Les voitures sont propres et faciles à conduire. Je recommande les yeux fermés !',
  },
  {
    name: 'Élève Phoenix',
    tag: 'Permis obtenu du 1er coup',
    text: 'Je recommande vivement cette auto-école ! Les moniteurs sont patients, pédagogues et mettent vraiment en confiance. Meilleure secrétaire, très patiente et à l’écoute. Grâce à leur accompagnement, j’ai obtenu mon permis rapidement et du premier coup.',
  },
];

export const faq = [
  {
    q: 'À partir de quel âge peut-on commencer ?',
    a: 'La conduite accompagnée (AAC) est accessible dès 15 ans. Le permis B traditionnel peut se passer dès 17 ans, avec une conduite seule autorisée à partir de 18 ans.',
  },
  {
    q: 'Combien d’heures faut-il pour obtenir le permis ?',
    a: 'La loi impose 20 heures minimum en boîte manuelle et 13 heures en boîte automatique. L’évaluation de départ nous permet d’estimer précisément le nombre d’heures adapté à votre profil.',
  },
  {
    q: 'Puis-je financer mon permis avec mon CPF ?',
    a: 'Oui. Nos formations au permis B sont éligibles au CPF. Nous vous accompagnons dans les démarches sur moncompteformation.gouv.fr. Le permis à 1 € par jour et le paiement en 4× sans frais sont aussi possibles.',
  },
  {
    q: 'Boîte manuelle ou automatique : que choisir ?',
    a: 'La boîte automatique est plus rapide à apprendre (13 h minimum) et souvent moins stressante. Après 3 mois, une passerelle de 7 h permet de conduire en boîte manuelle sans repasser l’examen.',
  },
  {
    q: 'Quels documents faut-il pour s’inscrire ?',
    a: 'Une pièce d’identité, une photo e-photo, un justificatif de domicile de moins de 6 mois, l’ASSR 2 ou l’attestation de JDC selon votre âge. Nous nous occupons des démarches ANTS pour vous.',
  },
  {
    q: 'Où se déroulent les leçons de conduite ?',
    a: 'Les leçons démarrent de l’agence à Bobigny et se déroulent sur les parcours d’examen du secteur, en ville, sur voie rapide et en périphérie, pour vous préparer aux conditions réelles.',
  },
];

export const navLinks = [
  { href: '#formations', label: 'Formations' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#avis', label: 'Avis' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];
