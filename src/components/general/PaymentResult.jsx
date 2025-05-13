import classes from "./PaymentResult.module.css";

import Image from "next/image";

function PaymentResult({
  active,
  title,
  gifUrl,
  descriptionJSX,
  isSuccess,
  onClose,
}) {
  return (
    <>
      <div
        className={`modal ${active ? "active" : ""} ${classes.modal} ${
          active ? classes.active : ""
        } ${isSuccess ? classes.success : ""}`}
      >
        <Image
          className={classes.logo}
          src="/icons/logo.svg"
          alt="logo"
          width="90"
          height="80"
        />
        <h2 className={classes.title}>{title}</h2>
        <div className={classes.gifContainer}>
          {gifUrl && <Image src={gifUrl} alt={title} fill />}
        </div>
        <p className={classes.description}>{descriptionJSX}</p>
      </div>
      <div
        className={`backdrop ${active ? "active" : ""} ${classes.backdrop}`}
        onClick={onClose}
      />
    </>
  );
}

export default PaymentResult;
