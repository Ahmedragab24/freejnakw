import { redirect } from "next/navigation";
import classes from "@/styles/auth.module.css";
import Image from "next/image";
import Title from "@/components/auth/common/Title";
import Desc from "@/components/auth/common/Desc";
import NewPassForm from "@/components/auth/new-password/Form";

export default function NewPassword() {
  return (
    <main>
      <div className={classes.grid}>
        <Title>إسترجاع كلمة المرور</Title>
        <Desc>أدخل كلمة المرور الجديدة</Desc>
        <NewPassForm />
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
