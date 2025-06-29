import React, { useEffect } from 'react';

interface ToastNotificationProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

/**
 * ToastNotification コンポーネント
 * - 短時間表示のトースト通知
 */
export function ToastNotification({ message, show, onClose }: ToastNotificationProps) {
  useEffect(() => {
    if (show) {
      // show=true になったら 3 秒後に onClose コールバックを実行
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  // 非表示時は何もレンダリングしない
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-up">
      {message}
    </div>
  );
}
