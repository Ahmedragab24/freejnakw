"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import GeneralContext from "@/store/general-ctx";

const ContactContext = React.createContext({});

export function ContactContextProvider({ children }) {
  const { showNotification } = useContext(GeneralContext);
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const handleSendMessage = async (data, nextDestination) => {
    setSending(true);

    let query = `name=${data.name}&phone=${
      data.countryCode + data.phone
    }&email=${data.email}&message=${data.message}&subject=cairo`;

    if (data.question_id) query += `&question_id=${data.question_id}`;

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/contact-us?" + query
      );

      if (response.data.status_code === 200) {
        showNotification("تم إرسال الرسالة بنجاح!");
        router.push(nextDestination);
      }
    } catch (error) {
      showNotification(error.response.data.message, "error");
    }

    setSending(false);
  };

  const context = {
    sending,
    sendMessage: handleSendMessage,
  };

  return (
    <ContactContext.Provider value={context}>
      {children}
    </ContactContext.Provider>
  );
}

export default ContactContext;
