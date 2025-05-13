import classes from "../../styles/my-games.module.css";
import MyGames from "../../components/my-games/MyGames";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

import { MyGamesContextProvider } from "@/store/my-games-ctx";

export default function MyGamesPage() {
  return (
    <main className={classes.main}>
      <MyGamesContextProvider>
        <Header />
        <MyGames />
        <Footer />
      </MyGamesContextProvider>
    </main>
  );
}
