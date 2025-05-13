"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import PaymentResult from "@/components/general/PaymentResult";

const PaymentResultContext = React.createContext({});

export function PaymentResultContextProvider({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    gifUrl: "",
    descriptionJSX: null,
    isSuccess: false,
  });

  useEffect(() => {
    if (searchParams.get("success") === null) return;

    setIsModalActive(true);
    const isPaymentSuccessful =
      searchParams.get("success").toLowerCase() === "true";
    let data = {};

    if (isPaymentSuccessful) {
      data = {
        title: "تمت العملية بنجاح",
        gifUrl: "/vectors/payment-success.gif",
        descriptionJSX: (
          <>
            <span>ادخل فريجك ..</span>
            &nbsp;
            <span>و عيش المتعة !</span>
          </>
        ),
        isSuccess: true,
      };
    } else {
      data = {
        title: "فشلت عملية الدفع",
        gifUrl: "/vectors/payment-failure.gif",
        descriptionJSX: <>حاول مرة أخري</>,
        isSuccess: false,
      };
    }

    console.log(data);

    setModalData(data);
  }, [searchParams]);

  const handleCloseModal = () => {
    router.replace(window.location.pathname, { scroll: false });
    setIsModalActive(false);
  };

  const context = {};

  return (
    <PaymentResultContext.Provider value={context}>
      {children}
      <PaymentResult
        active={isModalActive}
        title={modalData.title}
        gifUrl={modalData.gifUrl}
        descriptionJSX={modalData.descriptionJSX}
        isSuccess={modalData.isSuccess}
        onClose={handleCloseModal}
      />
    </PaymentResultContext.Provider>
  );
}

export default PaymentResultContext;
