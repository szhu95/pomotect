import { Cart } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { formatDate } from '@/utils';
import React from 'react'
import localFont from 'next/font/local';

const pomotectBoldFont = localFont({
  src: '../../../fonts/pomotect-analog-bold.otf',
});

const pomotectFont = localFont({
  src: '../../../fonts/pomotect-analog-regular.otf',
});

interface CartVariantPageProps {
  params: {
    variantId: string;
  };
}

const CartVariantPage = async ({ params }: CartVariantPageProps) => {
  const { variantId } = params;
  
  // Decode the URL parameter first, then parse multiple variants
  const decodedVariantId = decodeURIComponent(variantId);
  
  // Parse multiple variants in format: variantId1:quantity1,variantId2:quantity2
  const variants = decodedVariantId.split(',').map(variantStr => {
    const [id, quantityStr] = variantStr.split(':');
    return {
      variantId: id,
      quantity: quantityStr ? parseInt(quantityStr, 10) : 1
    };
  }).filter(variant => variant.quantity > 0); // Filter out zero or negative quantities
  
  let lastUpdatedDate = formatDate();
  
  return (
    <div>
      <div className="site-section">
        <div className={`${pomotectBoldFont.className} cart-header`}>Items</div>
        <p className={`${pomotectFont.className} italic`}>Most recently updated on {lastUpdatedDate}</p>
      </div>
      <div className="site-section">
        <Cart variants={variants} />
      </div>
      <div className="hidden md:block">
        <ScrollToTopButton />
      </div>
    </div>
  )
}

export default CartVariantPage 