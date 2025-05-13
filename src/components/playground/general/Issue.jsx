"use client";

import { useState, useContext } from "react";
import { usePathname } from "next/navigation";
import classes from "./Issue.module.css";
import Image from "next/image";

import LoadingSpinner from "../../general/LoadingSpinner";

import ContactContext from "@/store/contact-ctx";
import GeneralContext from "@/store/general-ctx";
import PlaygroundContext from "@/store/playground-ctx";

function Issue() {
  const pathname = usePathname();
  const { sendMessage } = useContext(ContactContext);
  const { authData } = useContext(GeneralContext);
  const { currentQuestion } = useContext(PlaygroundContext);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [message, setMessage] = useState("");

  const handleToggleIssueForm = () => {
    setShowIssueForm((prev) => !prev);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const reqData = {
      name: authData.user.name,
      phone: authData.user.phone,
      countryCode: authData.user.code,
      email: authData.user.email,
      message,
      question_id: currentQuestion.id,
    };

    sendMessage(reqData, pathname);
    handleToggleIssueForm();
  };

  return (
    <>
      <button
        type="button"
        className={classes.IssueBtn}
        onClick={handleToggleIssueForm}
      >
        <Image
          src="/icons/issue.svg"
          alt="question issue"
          width="30"
          height="30"
        />
      </button>
      <form
        className={`modal ${showIssueForm ? "active" : ""}`}
        onSubmit={handleSubmitMessage}
      >
        <p className={classes.formTitle}>
          فضلاً، وضّح الخطأ المطلوب لتتم معالجته وتصحيحه
        </p>
        <textarea
          className={classes.issueDescTextarea}
          placeholder="الوصف"
          rows="5"
          value={message}
          onChange={handleMessageChange}
          required
          onInvalid={(e) => {
            e.target.setCustomValidity("من فضلك وضح الخطأ المطلوب");
          }}
          onInput={(e) => {
            e.target.setCustomValidity("");
          }}
        ></textarea>

        <div className={classes.action}>
          <button className={classes.sendBtn}>ارسال</button>
          <button
            type="button"
            className={classes.cancelBtn}
            onClick={handleToggleIssueForm}
          >
            الغاء
          </button>
        </div>
      </form>
      <div
        className={`backdrop ${showIssueForm ? "active" : ""}`}
        onClick={handleToggleIssueForm}
      />
    </>
  );
}

export default Issue;
