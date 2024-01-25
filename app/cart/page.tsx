import { Cart } from '@/components';
import { formatDate } from '@/utils';
import React from 'react'

const page = async () => {

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
    </div>

  )
}

export default page