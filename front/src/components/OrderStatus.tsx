import React from 'react';

interface OrderStatusProps {
  status: string;
  date: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  return (
    <div className='mt-4'>
      <p>Status: {status}</p>
    </div>
  );
};

export default OrderStatus;