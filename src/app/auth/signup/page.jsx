"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import classes from "@/styles/auth.module.css";
import Image from "next/image";
import Title from "@/components/auth/common/Title";
import Desc from "@/components/auth/common/Desc";
import SignupForm from "@/components/auth/signup/Form";

import GeneralContext from "@/store/general-ctx";

export default function Signup() {
  const { confirmingAuth, authData } = useContext(GeneralContext);

  if (!confirmingAuth && authData.token) redirect("/");

  return (
    <main>
      <div className={classes.grid}>
        <Title>يا هلا فيك !</Title>
        <Desc>سجل حسابك و عيش المتعة !</Desc>
        <SignupForm />
      </div>

      <div className={classes.vectorsContainer}>
        <Image
          className={classes.backVector}
          src="/vectors/signup-vector-1.svg"
          alt="signup"
          width="1500"
          height="1500"
        />
        <Image
          className={classes.frontVector}
          src="/vectors/signup-vector-2.svg"
          alt="signup"
          width="782"
          height="727"
        />
      </div>
    </main>
  );
}
