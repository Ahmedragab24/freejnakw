"use client";

import { useContext, useState } from "react";
import classes from "./Form.module.css";
import Link from "next/link";
import Form from "..//common/form/Form";
import Field from "../common/form/Field";
import SubmitButton from "../common/form/SubmitButton";
import LoadingSpinner from "../../general/LoadingSpinner";

import AuthContext from "@/store/auth-ctx";
import validateForm from "./validation";

function SigninForm() {
  const { signIn, authenticating } = useContext(AuthContext);
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [dataErrors, setDataErrors] = useState({});

  const handleInputChange = (e) => {
    setSignInData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmitForm = () => {
    const errors = validateForm(signInData);

    if (Object.keys(errors).length === 0) {
      setDataErrors({});
      signIn(signInData);
    } else {
      setDataErrors(errors);
    }
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <Field
        id="email"
        type="email"
        placeholder="أدخل البريد الإلكتروني"
        onChange={handleInputChange}
        value={signInData.email}
        error={dataErrors.email || ""}
      >
        البريد الإلكتروني
      </Field>
      <Field
        id="password"
        type="password"
        placeholder="أدخل كلمة السر"
        onChange={handleInputChange}
        value={signInData.password}
        error={dataErrors.password || ""}
      >
        كلمة السر
      </Field>

      <Link href="/auth/password-reset" className={classes.forgotPassLink}>
        هل نسيت كلمة السر ؟
      </Link>

      <SubmitButton>
        {authenticating ? <LoadingSpinner /> : "تسجيل الدخول"}
      </SubmitButton>

      <p className={classes.dontHaveAccount}>
        ليس لديك حساب ؟{" "}
        <Link href="/auth/signup" className={classes.registerLink}>
          سجل الآن
        </Link>
      </p>
    </Form>
  );
}

export default SigninForm;
