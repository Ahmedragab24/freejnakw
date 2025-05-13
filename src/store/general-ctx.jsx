"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

import Notification from "@/components/general/Notification";

import { getAuthData, storeAuthData } from "../utils/local-storage";

const GeneralContext = React.createContext({});

export function GeneralContextProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [confirmingAuth, setConfirmingAuth] = useState(true);
  const [authData, setAuthData] = useState({});
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notification, setNotification] = useState({
    type: "normal",
    message: "",
  });

  useEffect(() => {
    handleUpdateUserData();
  }, [pathname]);

  const handleUpdateUserData = async () => {
    setConfirmingAuth(true);

    const currentAuthData = getAuthData();

    setAuthData(currentAuthData);

    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/user/data",
        {
          headers: {
            Authorization: `Bearer ${currentAuthData.token}`,
          },
        }
      );

      if (response.data.status_code === 200) {
        const newUserData = response.data.data.user;
        const newAuthData = {
          token: currentAuthData.token,
          user: newUserData,
        };
        storeAuthData(newAuthData);
        setAuthData(newAuthData);
      }
    } catch (error) {
      if (error.response.status === 401) {
        const newAuthData = {};
        storeAuthData(newAuthData);
        setAuthData(newAuthData);
      }
    }

    setConfirmingAuth(false);
  };

  const handleShowNotification = (message, type = "normal") => {
    setIsNotificationVisible(true);
    setNotification({ type, message });
    setTimeout(() => {
      setIsNotificationVisible(false);
    }, 5000);
  };

  const context = {
    confirmingAuth,
    authData,
    // * METHODs:
    showNotification: handleShowNotification,
    updateUserData: handleUpdateUserData,
    // * END OF METHODS *
  };

  return (
    <GeneralContext.Provider value={context}>
      {children}

      {/* * GENERAL NOTIFICATION * */}
      {isNotificationVisible ? (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      ) : null}
      {/* ************************ */}
    </GeneralContext.Provider>
  );
}

export default GeneralContext;
