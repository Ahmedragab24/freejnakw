import Quest from "@/components/playground/yamaat/game/question/Question";

import { ContactContextProvider } from "@/store/contact-ctx";

export default function Question() {
  return (
    <>
      <ContactContextProvider>
        <Quest />
      </ContactContextProvider>
    </>
  );
}
