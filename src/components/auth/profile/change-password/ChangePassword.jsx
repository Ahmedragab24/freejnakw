"use client";

import { useContext, useState } from "react";
import classes from "./ChangePassword.module.css";

import Field from "../../common/form/Field";
import SubmitButton from "../../common/form/SubmitButton";
import LoadingSpinner from "../../../general/LoadingSpinner";

import validateForm from "./validation";
import AuthContext from "@/store/auth-ctx";

function ChangePassword() {
  const { changePassword, updating } = useContext(AuthContext);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [dataErrors, setDataErrors] = useState({});

  const handleInputChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const errors = validateForm(passwordData);

    if (Object.keys(errors).length === 0) {
      setDataErrors({});
      changePassword(passwordData);
    } else {
      setDataErrors(errors);
    }
  };

  return (
    <form className={classes.main} onSubmit={handleSubmitForm}>
      <Field
        id="oldPassword"
        type="password"
        placeholder="كلمة السر الحالية"
        onChange={handleInputChange}
        value={passwordData.oldPassword}
        error={dataErrors.oldPassword || ""}
        noLabel
      ></Field>
      <Field
        id="newPassword"
        type="password"
        placeholder="كلمة السر الجديدة"
        onChange={handleInputChange}
        value={passwordData.newPassword}
        error={dataErrors.newPassword || ""}
        noLabel
      ></Field>
      <Field
        id="newPasswordConfirm"
        type="password"
        placeholder="تأكيد كلمة السر"
        onChange={handleInputChange}
        value={passwordData.newPasswordConfirm}
        error={dataErrors.newPasswordConfirm || ""}
        noLabel
      ></Field>

      <SubmitButton>{updating ? <LoadingSpinner /> : "حفظ"}</SubmitButton>
    </form>
  );
}

export default ChangePassword;
