import classes from "@/styles/playground-score.module.css";
import ScoreFooter from "@/components/playground/footer/Footer";
import Scores from "@/components/playground/yamaat/scores/Scores";

export default function Score() {
  return (
    <>
      <main className={classes.main}>
        <Scores />
      </main>
      <ScoreFooter gameMode="yamaat" />
    </>
  );
}
