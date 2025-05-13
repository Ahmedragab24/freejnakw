import classes from "./ContactHeader.module.css";
import Image from "next/image";
import Link from "next/link";

function ContactHeader() {
  return (
    <div className={classes.header}>
      <h1 className={classes.title}>تواصل معنا</h1>
      <p className={classes.description}>
        يمكنك التواصل معنا عبر تعبئة الاستمارة ادناه او ارسال ايميل على
      </p>
      <Link className={classes.emailLink} href="mailto:info@freejnakw.com">
        info@freejnakw.com
        <Image
          src="/icons/email-envelope.svg"
          alt="email envelope"
          width="36"
          height="36"
        />
      </Link>
      <p className={classes.description}>
        او قم بزيارة صفحتنا على الانستقرام
        <Link href="https://www.instagram.com/freejnakw/" target="_blank">
          <Image
            src="/icons/contact-instagram.svg"
            alt="instagram"
            width="36"
            height="36"
          />
        </Link>
      </p>
    </div>
  );
}

export default ContactHeader;
