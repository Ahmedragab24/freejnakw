"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import classes from "@/styles/auth.module.css";
import Image from "next/image";
import Title from "@/components/auth/common/Title";
import Desc from "@/components/auth/common/Desc";
import SigninForm from "@/components/auth/signin/Form";

import GeneralContext from "@/store/general-ctx";

export default function Signin() {
  const { confirmingAuth, authData } = useContext(GeneralContext);

  if (!confirmingAuth && authData.token) redirect("/");

  return (
    <main>
      <div className={classes.grid}>
        <Title>حياك الله في فريجنا !</Title>
        <Desc>منو نوخذة فريجنا ؟ سجل دخولك وخلنا نشوف !</Desc>
        <SigninForm />
      </div>

      <div className={classes.vectorsContainer}>
        <Image
          className={classes.backVector}
          src="/vectors/signin-vector-1.svg"
          alt="signin"
          width="1300"
          height="1300"
        />
        <Image
          className={classes.frontVector}
          src="/vectors/signin-vector-2.svg"
          alt="signin"
          width="682"
          height="627"
        />
      </div>
    </main>
  );
}
