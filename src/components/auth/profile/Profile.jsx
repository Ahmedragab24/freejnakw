"use client";

import { useContext, useState, useEffect } from "react";
import classes from "./Profile.module.css";
import Image from "next/image";

import Title from "../common/Title";
import Field from "../common/form/Field";
import DateField from "../common/form/DateField/DateField";
import SubmitButton from "../common/form/SubmitButton";
import LoadingSpinner from "../../general/LoadingSpinner";

import AuthContext from "@/store/auth-ctx";
import GeneralContext from "@/store/general-ctx";
import validateForm from "./validation";

function Profile() {
  const { authData } = useContext(GeneralContext);
  const { updateProfile, updating, logout, deleteAccount } =
    useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "male",
    countryCode: "+965",
  });
  const [dataErrors, setDataErrors] = useState({});

  useEffect(() => {
    if (authData.user) {
      setProfileData({
        name: authData.user.name,
        username: authData.user.username,
        email: authData.user.email,
        phone: authData.user.phone,
        birthDate: authData.user.date,
        gender: authData.user.gender,
        countryCode: authData.user.code,
      });
    }
  }, [authData]);

  const handleInputChange = (e) => {
    // 1. handling radio buttons inputs
    if (e.target.type === "radio") {
      setProfileData((prev) => ({ ...prev, gender: e.target.value }));
      return;
    }

    // 2. Handling all other inputs
    setProfileData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCountryCodeChange = (newCode) => {
    setProfileData((prev) => ({ ...prev, countryCode: newCode }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const errors = validateForm(profileData);

    if (Object.keys(errors).length === 0) {
      setDataErrors({});
      updateProfile(profileData);
    } else {
      setDataErrors(errors);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.dataPreviewAndPhoto}>
        {/* <div className={classes.imageContainer}>
          <Image src="/images/userAvatar.png" alt="user photo" fill />
          <label htmlFor="userPhoto">
            <Image
              className={classes.changePhotoIcon}
              src="/icons/change-user-photo.svg"
              alt="change user photo"
              width="18"
              height="18"
            />
          </label>
          <input type="file" id="userPhoto" />
        </div> */}
        <h4 className={classes.name}>{profileData.name}</h4>
        <div className={classes.email}>{profileData.email}</div>
        <button type="button" className={classes.logoutBtn} onClick={logout}>
          <Image src="/icons/logout.svg" alt="logout" width="24" height="24" />
          تسجيل الخروج
        </button>
        {/* <button
          type="button"
          className={classes.deleteAccountBtn}
          onClick={deleteAccount}
        >
          حذف الحساب
        </button> */}
      </div>
      <form className={classes.dataForm} onSubmit={handleSubmitForm}>
        <Field
          id="name"
          type="text"
          placeholder="الاسم"
          onChange={handleInputChange}
          value={profileData.name}
          error={dataErrors.name || ""}
        >
          أدخل الاسم
        </Field>
        <Field
          id="username"
          type="text"
          placeholder="اسم المستخدم"
          onChange={handleInputChange}
          value={profileData.username}
          error={dataErrors.username || ""}
        >
          أدخل اسم المستخدم
        </Field>
        <Field
          id="email"
          type="email"
          placeholder="أدخل البريد الإلكتروني"
          onChange={handleInputChange}
          value={profileData.email}
          error={dataErrors.email || ""}
        >
          البريد الإلكتروني
        </Field>
        <Field
          id="phone"
          type="tel"
          placeholder="أدخل رقم التليفون"
          onChange={handleInputChange}
          value={profileData.phone}
          // error={dataErrors.phone || ""}
          onCountryCodeChange={handleCountryCodeChange}
          countryCode={profileData.countryCode}
        >
          رقم التليفون
        </Field>
        <DateField
          id="birthDate"
          placeholder="يوم - شهر - سنة"
          onChange={handleInputChange}
          value={profileData.birthDate}
          // error={dataErrors.birthDate || ""}
        >
          تاريخ الميلاد
        </DateField>
        <div className={classes.genderFieldsContainer}>
          <div className={classes.genderLabel}>حدد الجنس</div>
          <div className={classes.genderFields}>
            <Field
              id="male"
              type="radio"
              name="gender"
              placeholder="حدد الجنس"
              value="male"
              onChange={handleInputChange}
              defaultChecked={profileData.gender === "male"}
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
              defaultChecked={profileData.gender === "female"}
            >
              أنثى
            </Field>
          </div>
        </div>
        <SubmitButton>{updating ? <LoadingSpinner /> : "حفظ"}</SubmitButton>
      </form>
    </div>
  );
}

export default Profile;
