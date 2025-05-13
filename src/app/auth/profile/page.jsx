"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import classes from "@/styles/auth-profile.module.css";

import Prof from "@/components/auth/profile/Profile";

import GeneralContext from "@/store/general-ctx";

function Profile() {
  const { confirmingAuth, authData } = useContext(GeneralContext);

  if (!confirmingAuth && !authData.token) redirect("/");

  return (
    <>
      <Prof />
    </>
  );
}

export default Profile;
