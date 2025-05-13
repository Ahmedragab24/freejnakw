"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import classes from "./ProfileWrapper.module.css";
import Link from "next/link";

function ProfileWrapper({ children }) {
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>حسابي</h1>
      <div className={classes.pagesContainer}>
        <nav className={classes.pagesNav}>
          <span className={classes.activeBackground} />
          <Link
            href="/auth/profile"
            className={`${classes.navItem} ${
              pathname === "/auth/profile" ? classes.active : ""
            }`}
          >
            حسابي
          </Link>
          <Link
            href="/auth/profile/change-password"
            className={`${classes.navItem} ${
              pathname === "/auth/profile/change-password" ? classes.active : ""
            }`}
          >
            تغيير كلمة المرور
          </Link>
        </nav>
        <div className={classes.pageForm}>{children}</div>
      </div>
    </div>
  );
}

export default ProfileWrapper;
