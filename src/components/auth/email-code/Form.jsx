"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../common/form/Form";
import Field from "../common/form/Field";
import CodeField from "../common/form/CodeField";
import SubmitButton from "../common/form/SubmitButton";
import LoadingSpinner from "../../general/LoadingSpinner";

import AuthContext from "@/store/auth-ctx";
import validateForm from "./validation";

function EmailCodeForm() {
  const router = useRouter();
  const { confirmOTP, authenticating } = useContext(AuthContext);
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
  });
  const [dataErrors, setDataErrors] = useState({});

  const handleInputChange = (e) => {
    // Handling all other inputs
    setResetData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmitForm = () => {
    const errors = validateForm(resetData);

    if (Object.keys(errors).length === 0) {
      setDataErrors({});

      confirmOTP(resetData);
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
        value={resetData.email}
        error={dataErrors.email || ""}
      >
        البريد الإلكتروني
      </Field>
      <CodeField
        id="code"
        onChange={handleInputChange}
        error={dataErrors.otp || ""}
      >
        أدخل كود التحقق
      </CodeField>

      <SubmitButton>
        {authenticating ? <LoadingSpinner /> : "تأكيد"}
      </SubmitButton>
    </Form>
  );
}

export default EmailCodeForm;
