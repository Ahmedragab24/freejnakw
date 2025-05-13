import classes from "./LoadingSpinner.module.css";

// const LoadingSpinner = ({ fullscreen }) => {
//   return (
//     <div
//       className={`${classes.container} ${fullscreen ? classes.fullscreen : ""}`}
//     >
//       <div className={classes.spinner}></div>
//     </div>
//   );
// };

function LoadingSpinner({ fullscreen }) {
  return (
    <div
      className={`${classes.container} ${fullscreen ? classes.fullscreen : ""}`}
    >
      <div className={classes.vjsLoadingSpinner}>
        <div>
          <div className={classes.vjsLoadingSpinnerContainer}>
            <div className={classes.vjsLoadingSpinnerRotator}>
              <div className={classes.vjsLoadingSpinnerLeft}>
                <div className={classes.vjsLoadingSpinnerCircle}></div>
              </div>
              <div className={classes.vjsLoadingSpinnerRight}>
                <div className={classes.vjsLoadingSpinnerCircle}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
