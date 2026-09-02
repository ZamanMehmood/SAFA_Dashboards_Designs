export const refundTransactions = [
  {
    id: 'txn-1',
    type: 'credit',
    amount: 2500,
    description: 'Refund for order #100234',
    customerId: 'cust-sara-abdulaziz',
    customerName: 'Sara Abdulaziz',
    date: '2026-05-15',
  },
  {
    id: 'txn-2',
    type: 'debit',
    amount: 1300,
    description: 'Wallet balance applied to order #2245',
    customerId: 'cust-sara-abdulaziz',
    customerName: 'Sara Abdulaziz',
    date: '2026-05-04',
  },
  {
    id: 'txn-3',
    type: 'credit',
    amount: 780,
    description: 'Refund for order #902144',
    customerId: 'cust-noura-alotaibi',
    customerName: 'Noura Al-Otaibi',
    date: '2026-06-30',
  },
  {
    id: 'txn-4',
    type: 'credit',
    amount: 320.5,
    description: 'Refund for order #344990 (partial)',
    customerId: 'cust-lina-alghamdi',
    customerName: 'Lina Al-Ghamdi',
    date: '2026-07-29',
  },
  {
    id: 'txn-5',
    type: 'debit',
    amount: 450,
    description: 'Withdrawn to bank account',
    customerId: 'cust-sara-abdulaziz',
    customerName: 'Sara Abdulaziz',
    date: '2026-04-02',
  },
  {
    id: 'txn-6',
    type: 'credit',
    amount: 2500,
    description: 'Refund for order #3889278',
    customerId: 'cust-sara-abdulaziz',
    customerName: 'Sara Abdulaziz',
    date: '2023-10-24',
  },
]

export function getWalletBalance() {
  return refundTransactions.reduce(
    (sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount),
    0,
  )
}
