import React, { useEffect } from 'react';

interface ToastNotificationProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export function ToastNotification({ message, show, onClose }: ToastNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3秒後に非表示
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-up">
      {message}
    </div>
  );
}
