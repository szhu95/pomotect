import { Cart } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatDate } from '@/utils';
import React from 'react'
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
  src: '../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
  src: '../../fonts/pomotect-analog-regular.otf',
});

const CartPage = async () => {

  let lastUpdatedDate = formatDate();
  return (
    <div>
      <div className="site-section">
        <div className={`${pomotectBoldFont.className} cart-header`}>Items</div>
        <p className={`${pomotectFont.className} italic`}>Most recently updated on {lastUpdatedDate}</p>
      </div>
      <div className="site-section">
        <Cart />
      </div>
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>

  )
}

export default CartPage