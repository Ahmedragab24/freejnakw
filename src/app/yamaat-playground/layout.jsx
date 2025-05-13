import classes from "@/styles/playground.module.css";
import PlaygroundHeader from "@/components/playground/header/Header";
import ReloadWarning from "@/components/general/ReloadWarning";

import { PlaygroundContextProvider } from "@/store/playground-ctx";

export default function YamaatPlaygroundLayout({ children }) {
  return (
    <div className={classes.main}>
      <PlaygroundContextProvider>
        <PlaygroundHeader gameMode="yamaat" />
        {children}

        <ReloadWarning />
      </PlaygroundContextProvider>
    </div>
  );
}
