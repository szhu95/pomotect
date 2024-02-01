import { Cart } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatDate } from '@/utils';
import React from 'react'

const CartPage = async () => {

  let lastUpdatedDate = formatDate();
  return (
    <div>
      <div className="site-section">
        <div className="cart-header">Items</div>
        <p><i>Most recently updated on {lastUpdatedDate}</i></p>
      </div>
      <div className="site-section">
        <Cart />
      </div>
      <ScrollToTopButton />
    </div>

  )
}

export default CartPage