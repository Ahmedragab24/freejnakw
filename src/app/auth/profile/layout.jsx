import classes from "@/styles/auth-profile.module.css";

import ProfileWrapper from "@/components/auth/profile/ProfileWrapper";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function ProfileLayout({ children }) {
  return (
    <>
      <Header />

      <main className={classes.main}>
        <ProfileWrapper>{children}</ProfileWrapper>
      </main>

      <Footer />
    </>
  );
}
