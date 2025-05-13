import classes from "./TeamsInfoPrompt.module.css";

import Form from "./Form";

function TeamsInfoPrompt({ show, onClosePrompt, onSubmitTeamsInfo }) {
  return (
    <>
      <div className={`modal ${classes.main} ${show ? "active" : ""}`}>
        <h2 className={classes.title}>حدد معلومات الفرق</h2>

        <Form onSubmit={onSubmitTeamsInfo} />
      </div>
      <div
        className={`backdrop ${show ? "active" : ""}`}
        onClick={onClosePrompt}
      />
    </>
  );
}

export default TeamsInfoPrompt;
