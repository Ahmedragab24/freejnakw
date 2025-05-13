import classes from "@/styles/playground.module.css";
import PlaygroundHeader from "@/components/playground/header/Header";
import ReloadWarning from "@/components/general/ReloadWarning";
import RoabIntro from "@/components/playground/roab/general/RoabIntro";

import { PlaygroundContextProvider } from "@/store/playground-ctx";

export default function RoabPlaygroundLayout({ children }) {
  return (
    <div className={classes.main}>
      <PlaygroundContextProvider>
        <PlaygroundHeader gameMode="roab" />
        {children}

        <ReloadWarning />
        <RoabIntro />
      </PlaygroundContextProvider>
    </div>
  );
}
