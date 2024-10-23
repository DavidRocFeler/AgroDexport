import { INotificationsProps } from '@/interface/types';
import React from 'react'

const NotificationsModal: React.FC<INotificationsProps> = ({isVisible, onClose}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg transition-transform duration-300 transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Welcome Notifications</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          Close
        </button>
      </div>
    </div>
  )
}

export default NotificationsModal;
