"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "..//common/form/Form";
import Field from "../common/form/Field";
import SubmitButton from "../common/form/SubmitButton";
import LoadingSpinner from "../../general/LoadingSpinner";

import AuthContext from "@/store/auth-ctx";
import validateEmail from "./validation";

function PassResetForm() {
  const router = useRouter();
  const { sendOTP, authenticating } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitForm = () => {
    const error = validateEmail(email);

    if (error.length === 0) {
      setEmailError("");
      sendOTP(email);
    } else {
      setEmailError(error);
    }
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <Field
        id="email"
        type="email"
        placeholder="أدخل البريد الإلكتروني"
        onChange={handleEmailChange}
        value={email}
        error={emailError || ""}
      >
        البريد الإلكتروني
      </Field>

      <SubmitButton>
        {authenticating ? <LoadingSpinner /> : "تأكيد"}
      </SubmitButton>
    </Form>
  );
}

export default PassResetForm;
