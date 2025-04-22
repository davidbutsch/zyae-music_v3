import { ReactNode, createContext, useContext, useState } from "react";

import { NotificationBar } from "@/components";

export type AppNotification = {
  message: string;
  thumbnail?: string;
  icon?: string;
};

const NotificationsContext = createContext<{
  notification: AppNotification | null;
  setNotification: (notification: AppNotification) => void;
  clearNotification: () => void;
}>({
  notification: null,
  setNotification: () => {},
  clearNotification: () => {},
});

export const useNotification = () => {
  return useContext(NotificationsContext);
};

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notification, setNotificationState] = useState<AppNotification | null>(
    null
  );

  const setNotification = (notification: AppNotification) => {
    if (notification) {
      clearNotification();
      setTimeout(() => setNotificationState(notification), 300);
    } else setNotificationState(notification);
  };

  const clearNotification = () => {
    setNotificationState(null);
  };

  const contextValue = {
    notification,
    setNotification,
    clearNotification,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      <NotificationBar />
      {children}
    </NotificationsContext.Provider>
  );
};
