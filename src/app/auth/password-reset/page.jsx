"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import classes from "@/styles/auth.module.css";
import Image from "next/image";
import Title from "@/components/auth/common/Title";
import Desc from "@/components/auth/common/Desc";
import PassResetForm from "@/components/auth/password-reset/Form";

import GeneralContext from "@/store/general-ctx";

export default function PasswordReset() {
  const { confirmingAuth, authData } = useContext(GeneralContext);

  if (!confirmingAuth && authData.token) redirect("/");

  return (
    <main>
      <div className={classes.grid}>
        <Title>هل نسيت كلمة المرور ؟</Title>
        <Desc>أدخل بريدك الإلكتروني وسيتم ارسال كود التحقق</Desc>
        <PassResetForm />
      </div>

      <div className={classes.vectorsContainer}>
        <Image
          className={classes.backVector}
          src="/vectors/pass-reset-vector-1.svg"
          alt="pass-reset"
          width="1300"
          height="1300"
        />
        <Image
          className={classes.frontVector}
          src="/vectors/pass-reset-vector-2.svg"
          alt="pass-reset"
          width="832"
          height="777"
        />
      </div>
    </main>
  );
}
