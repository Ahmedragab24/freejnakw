"use client";

import { useState, useContext } from "react";
import classes from "./Form.module.css";
import Field from "../auth/common/form/Field";
import SubmitButton from "../auth/common/form/SubmitButton";
import LoadingSpinner from "../general/LoadingSpinner";

import ContactContext from "@/store/contact-ctx";
import validateForm from "./validation";

function Form() {
  const { sendMessage, sending } = useContext(ContactContext);
  const [data, setData] = useState({
    name: "",
    phone: "",
    countryCode: "+965",
    email: "",
    message: "",
  });
  const [dataErrors, setDataErrors] = useState({});

  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCountryCodeChange = (newCode) => {
    setData((prev) => ({ ...prev, countryCode: newCode }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const errors = validateForm(data);

    if (Object.keys(errors).length === 0) {
      setDataErrors({});
      sendMessage(data, "/");
    } else {
      setDataErrors(errors);
    }
  };

  return (
    <form className={classes.main} onSubmit={handleSubmitForm}>
      <Field
        id="name"
        type="text"
        placeholder="الاسم"
        onChange={handleInputChange}
        value={data.name}
        error={dataErrors.name || ""}
      >
        أدخل الاسم
      </Field>
      <Field
        id="phone"
        type="tel"
        placeholder="أدخل رقم التليفون"
        onChange={handleInputChange}
        value={data.phone}
        error={dataErrors.phone || ""}
        onCountryCodeChange={handleCountryCodeChange}
        countryCode={data.countryCode}
      >
        رقم التواصل
      </Field>
      <Field
        id="email"
        type="email"
        placeholder="أدخل البريد الإلكتروني"
        onChange={handleInputChange}
        value={data.email}
        error={dataErrors.email || ""}
      >
        البريد الإلكتروني
      </Field>

      <div
        className={`${classes.messageField} ${
          dataErrors.message ? classes.error : ""
        }`}
      >
        <label htmlFor="message">الرسالة</label>
        <textarea
          id="message"
          placeholder="اكتب رسالتك  هنا"
          rows="5"
          onChange={handleInputChange}
          value={data.message}
        ></textarea>

        {dataErrors.message ? (
          <p className={classes.error}>{dataErrors.message}</p>
        ) : null}
      </div>

      <SubmitButton>{sending ? <LoadingSpinner /> : "إرسال"}</SubmitButton>
    </form>
  );
}

export default Form;
