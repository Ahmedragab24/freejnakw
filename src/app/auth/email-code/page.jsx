"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import classes from "@/styles/auth.module.css";
import Image from "next/image";
import Title from "@/components/auth/common/Title";
import Desc from "@/components/auth/common/Desc";
import EmailCodeForm from "@/components/auth/email-code/Form";

import GeneralContext from "@/store/general-ctx";

export default function EmailCode() {
  const { confirmingAuth, authData } = useContext(GeneralContext);

  if (!confirmingAuth && authData.token) redirect("/");

  return (
    <main>
      <div className={classes.grid}>
        <Title>إسترجاع كلمة المرور</Title>
        <Desc>تم أرسال كود التحقق علي بريدك الإلكتروني</Desc>
        <EmailCodeForm />
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
