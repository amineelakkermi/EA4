import React, {useContext} from 'react';

export type Lang = 'ar' | 'fr';
export const LangContext = React.createContext<Lang>('ar');

const NB = '\u202F'; // narrow no-break space before French ; : ? !

const ar = {
  hook1: 'عندك موقع إلكتروني،',
  hook2: 'لكن ما يطلع في نتائج قوقل؟',
  hookHi: 'قوقل',
  hook3: 'خلّني أوضح لك وش ممكن يكون السبب.',
  hookQuery: 'تصميم مواقع الرياض',
  hookUrl: 'google.com/search?q=تصميم+مواقع+الرياض',
  spResults: [
    {title: 'شركة تصميم مواقع — الرياض', url: 'competitor-one.sa'},
    {title: 'أفضل شركات برمجة المواقع في السعودية', url: 'webagency-ksa.com'},
    {title: 'تصميم موقع احترافي لشركتك', url: 'design-studio.sa'},
  ],
  spTabs: ['الكل', 'صور', 'خرائط', 'أخبار'],
  spGhost: 'موقعك؟',
  spGhostSub: 'غير موجود في النتائج الأولى',
  spPage: 'الصفحة 7+',

  t1Title: 'تأكد إن قوقل فهرس صفحات موقعك.',
  t1Body: 'استخدم Google Search Console، وافحص الصفحات اللي ما ظهرت في نتائج البحث.',
  scNav: ['نظرة عامة', 'فحص عنوان URL', 'الأداء', 'الصفحات'],
  scRows: [
    ['الزحف', 'لم يتم الزحف بعد'],
    ['الفهرسة', 'غير مفهرسة'],
    ['ملاءمة الجوال', 'لم يتم الفحص'],
  ],
  scHint: 'فحص أي عنوان URL في موقعك',
  scInspecting: 'جارٍ فحص الصفحة…',
  scVerdict: 'الصفحة غير موجودة على قوقل',
  scVerdictSub: 'هذه الصفحة ما تمت فهرستها بعد، فما تقدر تظهر في نتائج البحث',
  scRequest: 'طلب الفهرسة',
  scSent: 'تم إرسال طلب الفهرسة',
  scNote: 'قوقل راح يراجع الصفحة، والفهرسة تاخذ وقت',

  t2Title: 'اكتب محتوى يجاوب فعلًا على أسئلة عملائك.',
  t2Body: 'لا تكتفي بتكرار الكلمات المفتاحية؛ قدّم معلومات مفيدة وواضحة.',
  qaQuery: 'كم تكلفة تصميم موقع إلكتروني؟',
  qaBadge: 'سؤال عميل حقيقي',
  qaBadTitle: 'تكرار كلمات بدون فايدة للقارئ',
  qaBadText: 'تصميم مواقع، تصميم مواقع الرياض، أفضل تصميم مواقع، شركة تصميم مواقع، تصميم مواقع رخيص، تصميم مواقع…',
  qaAnswers: 'يجاوب على سؤال العميل',
  qaTitle: 'كم تكلفة تصميم موقع إلكتروني في السعودية؟',
  qaSections: ['وش العوامل اللي تحدد التكلفة؟', 'الفرق بين الموقع التعريفي والمتجر الإلكتروني', 'كيف تختار الباقة المناسبة لنشاطك؟'],

  t3Title: 'اكتب عنوان واضح لكل صفحة، واستخدم وصف مناسب.',
  t3Body: 'وتأكد إن موقعك ما يمنع محركات البحث من الوصول لصفحاتك.',
  tsTitle: 'تصميم مواقع احترافية في السعودية | EA4',
  tsDesc: 'نصمم مواقع سريعة ومتجاوبة تعكس هوية نشاطك، وتساعد عملاءك يوصلون لك بسهولة.',
  tsItems: [
    ['عنوان الصفحة', 'واضح ومحدد'],
    ['وصف الصفحة', 'يلخّص محتوى الصفحة'],
    ['خريطة الموقع', 'مُرسلة لقوقل'],
  ],
  tsPreview: 'معاينة النتيجة في قوقل',
  tsCheck: 'فحص تقني سريع',
  tsRobots: 'ملف robots.txt',
  tsOk: 'محركات البحث تقدر توصل',
  tsBad: 'يمنع محركات البحث!',

  t4Title: 'اهتم بسرعة الموقع، وتأكد إنه يشتغل بشكل ممتاز على الجوال.',
  spFast: 'سريع وجاهز للجوال',
  spSlow: 'بطيء… جارٍ التحميل',
  siteNav: ['الرئيسية', 'خدماتنا', 'أعمالنا', 'تواصل'],
  siteCta: 'ابدأ مشروعك',
  siteTag: 'تطوير وتصميم مواقع',
  siteHero: 'موقع يعكس احترافية شركتك ويظهر في قوقل',
  siteBtn1: 'اطلب عرض سعر',
  siteBtn2: 'شاهد أعمالنا',
  siteCards: ['تصميم UI/UX', 'تطوير مواقع', 'تحسين SEO'],

  f1: 'تذكّر: تحسين SEO يحتاج وقت واستمرار،',
  fHi: 'SEO',
  f2: 'وما فيه ضمان للظهور في المركز الأول.',
  fChartTitle: 'الظهور يتحسّن تدريجيًا مع الاستمرار',
  fBadge: 'بدون ضمان للمركز الأول',
  fMonth1: 'الشهر 1',
  fReveal: 'خلّ حضورك الرقمي يعكس احترافك.',
};

const fr: typeof ar = {
  hook1: 'Vous avez un site web,',
  hook2: `mais il n'apparaît pas sur Google${NB}?`,
  hookHi: 'Google',
  hook3: 'Laissez-moi vous expliquer pourquoi.',
  hookQuery: 'création site web professionnel',
  hookUrl: 'google.com/search?q=création+site+web+professionnel',
  spResults: [
    {
      title: 'Agence de création de sites web — Paris',
      url: 'agence-exemple.fr',
    },
    {
      title: 'Les meilleures agences web pour votre entreprise',
      url: 'webagency-pro.com',
    },
    {
      title: 'Création de site internet professionnel sur mesure',
      url: 'design-studio.fr',
    },
  ],
  spTabs: ['Tous', 'Images', 'Maps', 'Actualités'],
  spGhost: `Votre site${NB}?`,
  spGhostSub: 'Absent des premiers résultats',
  spPage: 'Page 7+',

  t1Title: 'Vérifiez que Google a bien indexé les pages de votre site.',
  t1Body: 'Utilisez Google Search Console et inspectez les pages absentes des résultats de recherche.',
  scNav: ["Vue d'ensemble", "Inspection de l'URL", 'Performances', 'Pages'],
  scRows: [
    ['Exploration', 'Pas encore explorée'],
    ['Indexation', 'Non indexée'],
    ['Ergonomie mobile', 'Non vérifiée'],
  ],
  scHint: "Inspectez n'importe quelle URL de votre site",
  scInspecting: 'Inspection de la page…',
  scVerdict: "La page n'est pas sur Google",
  scVerdictSub: `Cette page n'est pas encore indexée${NB}: elle ne peut pas apparaître dans les résultats.`,
  scRequest: 'Demander une indexation',
  scSent: 'Demande envoyée',
  scNote: `Google examinera la page${NB}; l'indexation prend du temps.`,

  t2Title: 'Rédigez un contenu qui répond vraiment aux questions de vos clients.',
  t2Body: `Ne vous contentez pas de répéter des mots-clés${NB}: apportez des informations utiles et claires.`,
  qaQuery: `Combien coûte la création d'un site web${NB}?`,
  qaBadge: "Vraie question d'un client",
  qaBadTitle: 'Répétition de mots-clés sans valeur pour le lecteur',
  qaBadText: 'création site web, création site web pas cher, meilleure création site web, agence création site web, création site web…',
  qaAnswers: 'Répond à la question du client',
  qaTitle: `Combien coûte la création d'un site web professionnel${NB}?`,
  qaSections: [
    `Quels facteurs déterminent le prix${NB}?`,
    `Site vitrine ou boutique en ligne${NB}: quelle différence${NB}?`,
    `Comment choisir l'offre adaptée à votre activité${NB}?`,
  ],

  t3Title: 'Donnez un titre clair à chaque page, avec une description pertinente.',
  t3Body: "Et assurez-vous que votre site ne bloque pas l'accès des moteurs de recherche à vos pages.",
  tsTitle: 'Création de sites web professionnels | EA4',
  tsDesc: 'Des sites rapides et responsives qui aident vos clients à vous trouver.',
  tsItems: [
    ['Titre de la page', 'Clair et précis'],
    ['Description', 'Résume le contenu de la page'],
    ['Plan du site', 'Envoyé à Google'],
  ],
  tsPreview: 'Aperçu du résultat Google',
  tsCheck: 'Vérification technique rapide',
  tsRobots: 'Fichier robots.txt',
  tsOk: 'Accessible aux moteurs de recherche',
  tsBad: `Bloque les moteurs de recherche${NB}!`,

  t4Title: "Soignez la vitesse de votre site et assurez-vous qu'il fonctionne parfaitement sur mobile.",
  spFast: 'Rapide et prêt pour le mobile',
  spSlow: 'Lent… chargement en cours',
  siteNav: ['Accueil', 'Services', 'Réalisations', 'Contact'],
  siteCta: 'Démarrer un projet',
  siteTag: 'Développement & design web',
  siteHero: "Un site à l'image de votre entreprise, visible sur Google",
  siteBtn1: 'Demander un devis',
  siteBtn2: 'Voir nos réalisations',
  siteCards: ['Design UI/UX', 'Développement web', 'Optimisation SEO'],

  f1: `Rappelez-vous${NB}: le SEO demande du temps et de la régularité,`,
  fHi: 'SEO',
  f2: 'et rien ne garantit la première position.',
  fChartTitle: 'La visibilité progresse avec la régularité',
  fBadge: 'Aucune garantie de 1ʳᵉ place',
  fMonth1: 'Mois 1',
  fReveal: 'Une présence digitale à la hauteur de votre professionnalisme.',
};

export const useLang = () => {
  const lang = useContext(LangContext);
  return {
    lang,
    dir: (lang === 'ar' ? 'rtl' : 'ltr') as 'rtl' | 'ltr',
    /** text-size factor: French runs longer than Arabic */
    k: lang === 'fr' ? 0.86 : 1,
    t: lang === 'ar' ? ar : fr,
  };
};
