import classes from "./AudioPlayer.module.css";

const AudioPlayer = ({ src, onEnded = () => {} }) => {
  return (
    <div className={classes.main}>
      <audio controls autoPlay onEnded={onEnded}>
        <source src={src} />
      </audio>
    </div>
  );
};

export default AudioPlayer;
