import classes from "./SigninButton.module.css";
import Link from "next/link";
import Image from "next/image";

function SigninButton() {
  return (
    <Link href="/auth/signin" className={classes.main}>
      <Image
        className={classes.userIcon}
        src="/icons/user.svg"
        alt="user"
        width="30"
        height="30"
      />
      تسجيل الدخول
    </Link>
  );
}

export default SigninButton;
