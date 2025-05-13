import classes from "@/styles/auth.module.css";
import { AuthContextProvider } from "@/store/auth-ctx";

export default function AuthLayout({ children }) {
  return (
    <AuthContextProvider>
      <div className={classes.main}>{children}</div>
    </AuthContextProvider>
  );
}
