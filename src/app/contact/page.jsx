import classes from "../../styles/contact.module.css";
import Image from "next/image";
import ContactHeader from "../../components/contact/ContactHeader";
import ContactForm from "../../components/contact/Form";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

import { ContactContextProvider } from "@/store/contact-ctx";

export default function Contact() {
  return (
    <main className={classes.main}>
      <div className={classes.backgroundVectors}>
        <Image
          className={classes.topRightVector}
          src="/vectors/contact-vector-1.svg"
          alt="contact"
          width="718"
          height="718"
        />
        <Image
          className={classes.bottomRightVector}
          src="/vectors/contact-vector-2.svg"
          alt="contact"
          width="340"
          height="340"
        />
        <Image
          className={classes.bottomLeftVector}
          src="/vectors/contact-vector-3.svg"
          alt="contact"
          width="610"
          height="445"
        />
      </div>

      <Header />

      <ContactHeader />

      <ContactContextProvider>
        <ContactForm />
      </ContactContextProvider>

      <Footer />
    </main>
  );
}
