"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "..//common/form/Form";
import Field from "../common/form/Field";
import SubmitButton from "../common/form/SubmitButton";
import LoadingSpinner from "../../general/LoadingSpinner";

import AuthContext from "@/store/auth-ctx";
import validateForm from "./validation";

function NewPassForm() {
  const router = useRouter();
  const { resetPassword, authenticating } = useContext(AuthContext);
  const [passwordData, setPasswordData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [dataErrors, setDataErrors] = useState({});

  const handleInputChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmitForm = () => {
    const errors = validateForm(passwordData);

    if (Object.keys(errors).length === 0) {
      setDataErrors({});
      resetPassword(passwordData);
    } else {
      setDataErrors(errors);
    }
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <Field
        id="password"
        type="password"
        placeholder="أدخل كلمة السر"
        onChange={handleInputChange}
        value={passwordData.password}
        error={dataErrors.password || ""}
      >
        كلمة السر
      </Field>
      <Field
        id="passwordConfirm"
        type="password"
        placeholder="أدخل كلمة السر مرة أخرى"
        onChange={handleInputChange}
        value={passwordData.passwordConfirm}
        error={dataErrors.passwordConfirm || ""}
      >
        تأكيد كلمة السر
      </Field>

      <SubmitButton>
        {authenticating ? <LoadingSpinner /> : "تأكيد"}
      </SubmitButton>
    </Form>
  );
}

export default NewPassForm;
