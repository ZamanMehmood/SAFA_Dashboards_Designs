import { placeholderImage } from '../utils/placeholder'

const img = (name, bg) => placeholderImage(name.split(' ')[0], { w: 200, h: 200, bg })

export const returnReasons = [
  'Wrong size',
  'Wrong color',
  'Item damaged',
  'Not as described',
  'Changed my mind',
  'Other',
]

export const returnRequests = [
  {
    id: 'RET-234558',
    returnNumber: '234558-R1',
    orderId: 'ORD-234558',
    orderNumber: '234558',
    customerId: 'cust-sara-almutairi',
    customerName: 'Sara Al-Mutairi',
    date: '2026-08-02',
    status: 'order_confirmed',
    amount: 1300,
    reason: 'Wrong size',
    notes: 'The size runs larger than expected, requesting a refund instead of exchange.',
    confirmedAt: '2026-08-02T12:00:00',
    refundedAt: null,
    items: [
      {
        productId: 'prod-crepe-abaya',
        name: 'Modern Crepe Abaya',
        brand: 'Anbar',
        price: 1300,
        size: 'M',
        color: 'Black',
        image: img('Crepe Abaya', 'A97C2F'),
      },
    ],
  },
  {
    id: 'RET-3889278',
    returnNumber: '3889278-R1',
    orderId: 'ORD-3889278',
    orderNumber: '3889278',
    customerId: 'cust-sara-abdulaziz',
    customerName: 'Sara Abdulaziz',
    date: '2023-10-24',
    status: 'refunded',
    amount: 2500,
    reason: 'Changed my mind',
    notes: '',
    confirmedAt: '2023-10-24T12:00:00',
    refundedAt: '2023-10-24T12:45:00',
    items: [
      {
        productId: 'prod-desert-rose',
        name: 'Embroidered Desert Rose Abaya',
        brand: 'Joba',
        price: 1250,
        size: 'M',
        color: 'Blush Pink',
        image: img('Desert Rose', '5C1A3B'),
      },
      {
        productId: 'prod-desert-rose',
        name: 'Embroidered Desert Rose Abaya',
        brand: 'Joba',
        price: 1250,
        size: 'M',
        color: 'Sage Green',
        image: img('Desert Rose', '5C1A3B'),
      },
    ],
  },
  {
    id: 'RET-902144',
    returnNumber: '902144-R1',
    orderId: 'ORD-902144',
    orderNumber: '902144',
    customerId: 'cust-noura-alotaibi',
    customerName: 'Noura Al-Otaibi',
    date: '2026-06-30',
    status: 'requested',
    amount: 780,
    reason: 'Item damaged',
    notes: 'Stitching came loose on the sleeve on arrival.',
    confirmedAt: null,
    refundedAt: null,
    items: [
      {
        productId: 'prod-crepe-abaya',
        name: 'Modern Crepe Abaya',
        brand: 'Anbar',
        price: 780,
        size: 'S',
        color: 'Grey',
        image: img('Crepe Abaya', 'A97C2F'),
      },
    ],
  },
  {
    id: 'RET-556230',
    returnNumber: '556230-R1',
    orderId: 'ORD-556230',
    orderNumber: '556230',
    customerId: 'cust-hind-aldosari',
    customerName: 'Hind Al-Dosari',
    date: '2026-05-24',
    status: 'rejected',
    amount: 210,
    reason: 'Changed my mind',
    notes: 'Return window had already closed at time of request.',
    confirmedAt: '2026-05-24T09:00:00',
    refundedAt: null,
    items: [
      {
        productId: 'prod-kids-thobe',
        name: "Kids' Occasion Thobe",
        brand: 'Thawbi',
        price: 210,
        size: '6Y',
        color: 'White',
        image: img('Kids Thobe', 'F5F5F0'),
      },
    ],
  },
]

export function getReturnById(id) {
  return returnRequests.find((r) => r.id === id)
}
