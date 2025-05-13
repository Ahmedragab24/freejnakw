import classes from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className={classes.main}>
      <Image src="/icons/logo.svg" alt="logo" width="79" height="60" />

      <div className={classes.socials}>
        <Link
          href="https://play.google.com/store/apps/details?id=com.freejna.app"
          className={classes.socialLink}
        >
          <Image
            src="/icons/android.svg"
            alt="android"
            width="40"
            height="40"
          />
        </Link>
        <Link
          href="https://apps.apple.com/kw/app/freejna-%D9%81%D8%B1%D9%8A%D8%AC%D9%86%D8%A7/id6741396213"
          className={classes.socialLink}
        >
          <Image src="/icons/apple.svg" alt="apple" width="40" height="40" />
        </Link>
        <Link
          href="https://www.instagram.com/freejnakw?igsh=dGU5dzgzcnowdTd5"
          className={classes.socialLink}
        >
          <Image
            src="/icons/instagram.svg"
            alt="instagram"
            width="40"
            height="40"
          />
        </Link>
        <Link
          href="https://www.tiktok.com/@freejnakw?_t=ZS-8ud5sPTK4nK&_r=1"
          className={classes.socialLink}
        >
          <Image src="/icons/tiktok.svg" alt="tiktok" width="40" height="40" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
