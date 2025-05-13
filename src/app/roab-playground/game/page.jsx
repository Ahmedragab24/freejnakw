import Quest from "@/components/playground/roab/game/question/Question";

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
