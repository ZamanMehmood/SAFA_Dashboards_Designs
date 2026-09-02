import { useState } from 'react';
import Container from '../components/common/Container';
import CartItemCard from '../components/cart/CartItemCard';
import OrderSummary from '../components/cart/OrderSummary';
import { initialCartItems } from '../data/cartItems';
import { useLanguage } from '../context/LanguageContext';

function CartPage() {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleSizeChange = (id, size) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, size } : item)));
  };

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="py-8 pb-16">
      <Container>
        <h1 className="m-0 mb-6 text-2xl font-bold text-ink sm:text-[26px]">
          {t('cart.title')} ({cartItems.length})
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_440px]">
            <div className="flex flex-col gap-5">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onSizeChange={handleSizeChange}
                  onRemove={handleRemove}
                  onMoveToFavorites={handleRemove}
                />
              ))}
            </div>

            <div>
              <OrderSummary subtotal={subtotal} />
            </div>
          </div>
        ) : (
          <p className="py-20 text-center text-sm text-ink-secondary">{t('cart.empty')}</p>
        )}
      </Container>
    </section>
  );
}

export default CartPage;
