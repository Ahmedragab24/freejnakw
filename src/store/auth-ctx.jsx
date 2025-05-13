"use client";

import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import GeneralContext from "./general-ctx";
import { storeAuthData } from "../utils/local-storage";

const AuthContext = React.createContext({});

export function AuthContextProvider({ children }) {
  const router = useRouter();
  const { authData, showNotification, setAuthData } =
    useContext(GeneralContext);
  const [authenticating, setAuthenticating] = useState(false);
  const [updating, setUpdating] = useState(false);

  // ^ Handling register a new user
  const handleRegister = async (data) => {
    setAuthenticating(true);

    // 1. Preparing the request body
    const requestBody = {
      name: data.name,
      username: data.username,
      phone: data.countryCode + data.phone,
      email: data.email,
      password: data.password,
      login_type: "normal",
      code: data.countryCode,
      gander: data.gender,
      date: data.birthDate,
    };

    // 2. Making the register request
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/register?lang=en",
        requestBody
      );
      // 3. Handling the response (if successful, store the token in local storage)
      if (response.data.status_code === 200) {
        const authData = {
          token: response.data.token,
          user: response.data.user,
        };

        storeAuthData(authData);

        showNotification("تم التسجيل بنجاح!");
        router.replace("/");
      }

      setAuthenticating(false);
    } catch (error) {
      if (!error.response.data.errors) return;

      if (error.response.data.errors.email)
        showNotification(error.response.data.errors.email[0], "error");
      if (error.response.data.errors.username)
        showNotification(error.response.data.errors.username[0], "error");
      if (error.response.data.errors.phone)
        showNotification(error.response.data.errors.phone[0], "error");

      setAuthenticating(false);
    }
  };

  const handleSignIn = async (data) => {
    setAuthenticating(true);

    // 1. Preparing the request body
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    // 2. Making the signin request
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/login",
        requestBody
      );
      // 3. Handling the response (if successful, store the token in local storage)
      if (response.data.status_code === 200) {
        const authData = {
          token: response.data.token,
          user: response.data.user,
        };

        storeAuthData(authData);

        showNotification("تم التسجيل بنجاح!");
        router.replace("/");
      }

      setAuthenticating(false);
    } catch (error) {
      if (error.response.data.message)
        showNotification(error.response.data.message, "error");

      if (error.response.data.errors) {
        if (error.response.data.errors.email)
          showNotification(error.response.data.errors.email[0], "error");
        if (error.response.data.errors.password)
          showNotification(error.response.data.errors.password[0], "error");
      }

      setAuthenticating(false);
    }
  };

  const handleSendOTP = async (email) => {
    setAuthenticating(true);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/verification-notification",
        { email }
      );

      // Handling the response
      if (response.data.status_code === 200) {
        router.push("/auth/email-code");
      }
    } catch (error) {
      if (error.response.data.errors) {
        showNotification(
          "عذرا، لا يوجد مستخدم بهذا البريد الإلكتروني.",
          "error"
        );
      }
    }

    setAuthenticating(false);
  };

  const handleConfirmOTP = async (data) => {
    setAuthenticating(true);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/verify-code",
        data
      );

      // * Verifying the OTP
      if (response.data.status_code === 200) {
        const authData = {
          token: response.data.token,
          user: response.data.user,
        };
        storeAuthData(authData);
        showNotification("تم التسجيل بنجاح!");
        router.push("/auth/new-password");
      }
    } catch (error) {
      showNotification(error.response.data.message, "error");
    }

    setAuthenticating(false);
  };

  const handleResetPassword = async (data) => {
    setAuthenticating(true);

    const requestBody = {
      new_password: data.password,
      new_password_confirmation: data.passwordConfirm,
    };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/reset-password",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      if (response.data.status_code === 200) {
        showNotification(response.data.message);
        router.push("/auth/signin");
      }
    } catch (error) {
      showNotification(error.response.data.message, "error");
    }

    setAuthenticating(false);
  };

  // ^ Handling updating the profile of the user
  const handleUpdateProfile = async (data) => {
    setUpdating(true);

    // 1. Preparing the request body
    const requestBody = {
      name: data.name,
      username: data.username,
      phone: data.countryCode + data.phone,
      email: data.email,
      gander: data.gender,
      date: data.birthDate,
    };

    // 2. Making the register request
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/profile/update",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      // 3. Handling the response (if successful, store the token in local storage)
      if (response.data.status_code === 200) {
        const data = {
          token: authData.token,
          user: response.data.data,
        };

        storeAuthData(data);

        showNotification("تم تغيير البيانات بنجاح!");
        router.replace("/");
      }

      setUpdating(false);
    } catch (error) {
      if (!error.response.data.errors) return;

      if (error.response.data.errors.email)
        showNotification(error.response.data.errors.email[0], "error");
      if (error.response.data.errors.username)
        showNotification(error.response.data.errors.username[0], "error");
      if (error.response.data.errors.phone)
        showNotification(error.response.data.errors.phone[0], "error");

      setUpdating(false);
    }
  };

  const handleChangePassword = async (data) => {
    setUpdating(true);

    const requestBody = {
      current_password: data.oldPassword,
      new_password: data.newPassword,
      new_password_confirmation: data.newPasswordConfirm,
    };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/profile/change-password",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      if (response.data.status_code === 200) {
        showNotification(response.data.message);
        router.replace("/");
      }
    } catch (error) {
      showNotification(error.response.data.message, "error");
    }

    setUpdating(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    localStorage.removeItem("otp");
    router.replace("/");
  };

  const handleDeleteAccount = () => {
    showNotification("سيتم حذف الحساب خلال 90 يوم");
  };

  const context = {
    authenticating,
    updating,
    // * METHODs
    register: handleRegister,
    signIn: handleSignIn,
    sendOTP: handleSendOTP,
    confirmOTP: handleConfirmOTP,
    resetPassword: handleResetPassword,
    updateProfile: handleUpdateProfile,
    logout: handleLogout,
    deleteAccount: handleDeleteAccount,
    changePassword: handleChangePassword,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
