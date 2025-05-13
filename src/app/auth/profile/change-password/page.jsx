"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import classes from "@/styles/auth-profile.module.css";

import ChangePass from "@/components/auth/profile/change-password/ChangePassword";

import GeneralContext from "@/store/general-ctx";

function ChangePassword() {
  const { confirmingAuth, authData } = useContext(GeneralContext);

  if (!confirmingAuth && !authData.token) redirect("/");

  return (
    <>
      <ChangePass />
    </>
  );
}

export default ChangePassword;
