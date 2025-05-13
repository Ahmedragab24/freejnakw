import classes from "../../styles/start-game.module.css";
import StartGame from "../../components/start-game/StartGame";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

import { StartGameContextProvider } from "@/store/start-game-ctx";

export default function StartGamePage() {
  return (
    <main className={classes.main}>
      <StartGameContextProvider>
        <Header />
        <StartGame />
        <Footer />
      </StartGameContextProvider>
    </main>
  );
}
