"use client";

import { useContext, useState } from "react";
import classes from "./Form.module.css";
import Link from "next/link";
import Form from "..//common/form/Form";
import Field from "../common/form/Field";
import SubmitButton from "../common/form/SubmitButton";
import DateField from "../common/form/DateField/DateField";
import LoadingSpinner from "../../general/LoadingSpinner";

import AuthContext from "@/store/auth-ctx";
import validateForm from "./validation";

function SignupForm() {
  const { register, authenticating } = useContext(AuthContext);
  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    passwordConfirm: "",
    gender: "male",
    countryCode: "+965",
  });
  const [dataErrors, setDataErrors] = useState({});

  const handleInputChange = (e) => {
    // 1. handling radio buttons inputs
    if (e.target.type === "radio") {
      setRegisterData((prev) => ({ ...prev, gender: e.target.value }));
      return;
    }

    // 2. Handling all other inputs
    setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCountryCodeChange = (newCode) => {
    setRegisterData((prev) => ({ ...prev, countryCode: newCode }));
  };

  const handleSubmitForm = () => {
    const errors = validateForm(registerData);

    if (Object.keys(errors).length === 0) {
      setDataErrors({});
      register(registerData);
    } else {
      setDataErrors(errors);
    }
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <Field
        id="name"
        type="text"
        placeholder="الاسم"
        onChange={handleInputChange}
        value={registerData.name}
        error={dataErrors.name || ""}
      >
        أدخل الاسم
      </Field>
      <Field
        id="username"
        type="text"
        placeholder="اسم المستخدم"
        onChange={handleInputChange}
        value={registerData.username}
        error={dataErrors.username || ""}
      >
        أدخل اسم المستخدم
      </Field>
      <Field
        id="email"
        type="email"
        placeholder="أدخل البريد الإلكتروني"
        onChange={handleInputChange}
        value={registerData.email}
        error={dataErrors.email || ""}
      >
        البريد الإلكتروني
      </Field>
      <Field
        id="phone"
        type="tel"
        placeholder="أدخل رقم التليفون"
        onChange={handleInputChange}
        value={registerData.phone}
        // error={dataErrors.phone || ""}
        onCountryCodeChange={handleCountryCodeChange}
        countryCode={registerData.countryCode}
      >
        رقم التليفون
      </Field>
      {/* <DateField
        id="birthDate"
        placeholder="يوم - شهر - سنة"
        onChange={handleInputChange}
        value={registerData.birthDate}
        // error={dataErrors.birthDate || ""}
      >
        تاريخ الميلاد
      </DateField> */}
      <Field
        id="password"
        type="password"
        placeholder="أدخل كلمة السر"
        onChange={handleInputChange}
        value={registerData.password}
        error={dataErrors.password || ""}
      >
        كلمة السر
      </Field>
      <Field
        id="passwordConfirm"
        type="password"
        placeholder="أدخل كلمة السر مرة أخرى"
        onChange={handleInputChange}
        value={registerData.passwordConfirm}
        error={dataErrors.passwordConfirm || ""}
      >
        تأكيد كلمة السر
      </Field>

      {/* <p className={classes.radioLabel}>حدد الجنس</p>
      <Field
        id="male"
        type="radio"
        name="gender"
        placeholder="حدد الجنس"
        value="male"
        onChange={handleInputChange}
        defaultChecked
      >
        ذكر
      </Field>
      <Field
        id="female"
        type="radio"
        name="gender"
        placeholder="حدد الجنس"
        value="female"
        onChange={handleInputChange}
      >
        أنثى
      </Field> */}

      <SubmitButton>
        {authenticating ? <LoadingSpinner /> : "تسجيل"}
      </SubmitButton>

      <p className={classes.haveAccount}>
        <Link href="/auth/signin" className={classes.signinLink}>
          لديك حساب بالفعل ؟
        </Link>
      </p>
    </Form>
  );
}

export default SignupForm;
