import React from 'react';

interface OrderStatusProps {
  status: string;
  date: string;
}

const OrderDate: React.FC<OrderStatusProps> = ({date }) => {
  return (
    <div className=" flex flex-row mt-[2.5rem] ">
      <p>Date: {date}</p>
    </div>
  );
};

export default OrderDate;