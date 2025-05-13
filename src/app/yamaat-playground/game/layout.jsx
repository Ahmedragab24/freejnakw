import classes from "@/styles/playground-game.module.css";
import GameSidebar from "@/components/playground/yamaat/game/sidebar/Sidebar";

export default function GameLayout({ children }) {
  return (
    <main className={classes.main}>
      <GameSidebar />
      {children}
    </main>
  );
}
