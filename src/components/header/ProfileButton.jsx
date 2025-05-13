import { useContext, useState, useEffect } from "react";
import classes from "./ProfileButton.module.css";
import Link from "next/link";
import Image from "next/image";

import GeneralContext from "@/store/general-ctx";
import detectLanguage from "@/utils/detect-language";

function ProfileButton() {
  const { authData } = useContext(GeneralContext);
  const [nameLanguage, setNameLanguage] = useState("ar");

  useEffect(() => {
    if (authData.user) {
      setNameLanguage(detectLanguage(authData.user.name));
    }
  }, [authData]);

  return (
    <Link href="/auth/profile" className={classes.main}>
      <Image
        className={classes.userIcon}
        src="/icons/user.svg"
        alt="user"
        width="30"
        height="30"
      />
      <span
        className={`${classes.name} ${
          nameLanguage === "en" ? classes.alignLeft : ""
        }`}
        title={authData.user.name}
      >
        {authData.user.name}
      </span>
    </Link>
  );
}

export default ProfileButton;
