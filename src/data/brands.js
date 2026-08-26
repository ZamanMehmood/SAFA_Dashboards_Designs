const DEFAULT_DESCRIPTION = {
  en: 'A Saudi brand celebrated for its craftsmanship, distinctive designs, and dedication to quality.',
  ar: 'علامة تجارية سعودية تشتهر بحرفيتها وتصاميمها المميزة والتزامها بالجودة.',
};
const DEFAULT_PRODUCT_COUNT = 120;

// Homepage carousel — only the first three highlighted brands.
export const saudiBrands = [
  { id: 'amber', name: { en: 'Amber', ar: 'عنبر' }, href: '/brands/amber' },
  { id: 'juba', name: { en: 'Juba', ar: 'جوبا' }, href: '/brands/juba' },
  { id: 'summer-shop', name: { en: 'Summer_shop', ar: 'سمر_شوب' }, href: '/brands/summer-shop' },
];

// Full directory used by the /brands listing page and individual brand pages.
export const allSaudiBrands = [
  {
    id: 'amber',
    name: { en: 'Amber', ar: 'عنبر' },
    href: '/brands/amber',
    description: {
      en: 'Amber crafts modern abayas and ready-to-wear pieces rooted in Saudi heritage, blending natural fabrics with refined, contemporary silhouettes for everyday elegance.',
      ar: 'تصمم عنبر عبايات وقطع جاهزة عصرية مستوحاة من التراث السعودي، تمزج بين الأقمشة الطبيعية والتصاميم العصرية الراقية لإطلالة أنيقة يومية.',
    },
    productCount: 186,
  },
  {
    id: 'juba',
    name: { en: 'Juba', ar: 'جوبا' },
    href: '/brands/juba',
    description: {
      en: 'Juba brings handcrafted artistry to a collection of pearl-embellished bags. Launched in 2012, the brand offers a wide range of distinctive pieces crafted from organic glass, layered wood, and soft calfskin leather — so you can indulge in finding what suits you best.',
      ar: 'تقدم جوبا فنون الصناعة اليدوية في تشكيلة من الحقائب المزينة باللؤلؤ. أُطلقت جوبا عام 2012 بتشكيلة واسعة من الحقائب المميزة المصنوعة من الزجاج العضوي، الخشب الرقائقي، وجلد العجل الناعم لتدلّل نفسك باختيار ما يناسبك.',
    },
    productCount: 243,
  },
  {
    id: 'summer-shop',
    name: { en: 'Summer_shop', ar: 'سمر_شوب' },
    href: '/brands/summer-shop',
    description: {
      en: 'Summer_shop designs relaxed, minimalist ready-to-wear for the whole family, built around breathable fabrics and a soft, neutral color palette.',
      ar: 'يصمم سمر_شوب ملابس جاهزة بسيطة ومريحة لكل أفراد العائلة، بأقمشة قابلة للتنفس وألوان محايدة هادئة.',
    },
    productCount: 97,
  },
  { id: 'razan', name: { en: 'Razan', ar: 'رزان' }, href: '/brands/razan' },
  { id: 'alkhartoum', name: { en: 'Alkhartoum', ar: 'الخرطوم' }, href: '/brands/alkhartoum' },
  { id: 'laila-sals', name: { en: 'Laila_Sals', ar: 'ليلى_سلس' }, href: '/brands/laila-sals' },
  { id: 'layth', name: { en: 'Layth', ar: 'ليث' }, href: '/brands/layth' },
  { id: 'alkhartoum-bahri', name: { en: 'Alkhartoum_Bahri', ar: 'الخرطوم بحري' }, href: '/brands/alkhartoum-bahri' },
  { id: 'naam-rumman', name: { en: 'Naam_Rumman', ar: 'نعم_رمان' }, href: '/brands/naam-rumman' },
  { id: 'samah', name: { en: 'Samah', ar: 'سماح' }, href: '/brands/samah' },
  { id: 'madani', name: { en: 'Madani', ar: 'مدني' }, href: '/brands/madani' },
  { id: 'rafiqa-nada', name: { en: 'Rafiqa_Nada', ar: 'رفيقة_ندى' }, href: '/brands/rafiqa-nada' },
].map((brand) => ({
  description: DEFAULT_DESCRIPTION,
  productCount: DEFAULT_PRODUCT_COUNT,
  ...brand,
}));
