import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../styles/globals.css";
import Scrollbar from "../components/general/Scrollbar";
import { Suspense } from "react";

import { GeneralContextProvider } from "@/store/general-ctx";
import { PaymentResultContextProvider } from "@/store/payment-result-ctx";
import FirebaseAnalyticsProvider from "@/components/firebase/FirebaseAnalyticsProvider";

const cairo = Cairo({
  subsets: ["arabic", "latin", "latin-ext"],
  variable: "--font-cairo",
});

const ibm = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin", "latin-ext"],
  variable: "--font-ibm",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "فريجنا",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${ibm.variable}`}>
        <Suspense fallback={null}>
          <PaymentResultContextProvider>
            <GeneralContextProvider>{children}</GeneralContextProvider>
          </PaymentResultContextProvider>
        </Suspense>

        <FirebaseAnalyticsProvider />
        <Scrollbar />
      </body>
    </html>
  );
}
