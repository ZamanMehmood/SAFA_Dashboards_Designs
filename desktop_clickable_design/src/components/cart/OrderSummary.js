import { useState } from 'react';
import Icon from '../common/Icon';
import CollapsibleRow from './CollapsibleRow';
import PaymentBadges from './PaymentBadges';
import { paymentMethods } from '../../data/cartItems';
import { useLanguage } from '../../context/LanguageContext';

function OrderSummary({ subtotal }) {
  const { t } = useLanguage();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    setCouponMessage(t('cart.couponInvalid'));
  };

  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <CollapsibleRow icon="gift" label={t('cart.giftWrap')}>
        <p className="text-xs text-ink-secondary">{t('cart.giftWrapDesc')}</p>
      </CollapsibleRow>

      <CollapsibleRow icon="percent" label={t('cart.discountCode')} defaultOpen>
        <label className="mb-2 block text-xs text-ink-secondary">{t('cart.couponLabel')}</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(event) => {
              setCouponCode(event.target.value);
              setCouponMessage('');
            }}
            className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none"
            placeholder={t('cart.couponPlaceholder')}
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="shrink-0 rounded-lg border border-ink px-5 py-2.5 text-sm font-semibold text-ink"
          >
            {t('cart.apply')}
          </button>
        </div>
        {couponMessage && <p className="mt-2 text-xs text-red-600">{couponMessage}</p>}
      </CollapsibleRow>

      <div className="flex items-center justify-between py-4 text-sm text-ink-secondary">
        <span>
          {subtotal.toLocaleString()} {t('common.currency')}
        </span>
        <span>{t('cart.subtotal')}</span>
      </div>
      <div className="flex items-center justify-between border-b border-line pb-5 text-base font-bold text-ink">
        <span>
          {subtotal.toLocaleString()} {t('common.currency')}
        </span>
        <span>{t('cart.total')}</span>
      </div>

      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3.5 text-sm font-semibold text-white"
      >
        <Icon name="bag" size={18} />
        {t('cart.checkout')}
      </button>

      <div className="mt-4">
        <PaymentBadges methods={paymentMethods} />
      </div>
    </div>
  );
}

export default OrderSummary;
