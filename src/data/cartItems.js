const DESCRIPTION = {
  en: 'A luxurious piece crafted from natural fabric, featuring a modern classic design with delicate embroidery detailing along the edges.',
  ar: 'قطعة فاخرة مصنوعة من قماش طبيعي، بتصميم كلاسيكي عصري وتطريز دقيق على الأطراف.',
};

export const initialCartItems = [
  {
    id: 'linen-summer-set-beige',
    title: { en: 'Linen summer set', ar: 'طقم صيفي من الكتان' },
    brand: { en: 'Amber', ar: 'عنبر' },
    price: 450,
    currency: { en: 'SAR', ar: 'ر.س' },
    description: DESCRIPTION,
    color: { name: { en: 'Beige', ar: 'بيج' }, hex: '#e8ddce' },
    size: 'M',
    quantity: 1,
    stockRemaining: 2,
    href: '/products/linen-summer-set',
  },
  {
    id: 'linen-summer-set-black',
    title: { en: 'Linen summer set', ar: 'طقم صيفي من الكتان' },
    brand: { en: 'Amber', ar: 'عنبر' },
    price: 450,
    currency: { en: 'SAR', ar: 'ر.س' },
    description: DESCRIPTION,
    color: { name: { en: 'Black', ar: 'أسود' }, hex: '#1a1a1a' },
    size: 'M',
    quantity: 1,
    stockRemaining: 2,
    href: '/products/linen-summer-set',
  },
];

export const paymentMethods = ['PayPal', 'tabby', 'tamara', 'Apple Pay', 'Mastercard', 'Visa', 'Amex', 'mada'];
