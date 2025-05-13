import classes from "./About.module.css";
import Image from "next/image";
import Title from "../../general/SecTitle";

function About() {
  return (
    <section className={classes.main}>
      <div className={classes.grid}>
        <div className={classes.right}>
          <Title align="right">نبذة عن فريجنا</Title>
          <p className={classes.content}>
            فريجنا هي لعبة جماعية ممتعة، تحتوي على أكثر من فريج، ولكل فريج لعبة،
            قصة، وسالفة مختلفة، أحياناً تكون ثقافية اجتماعية، وأحياناً تأخذ
            طابعاً مرعباً، وفي أوضاع الرعب تكون شروط اللعبة هي الظلمة و التركيز
          </p>
        </div>
        <div className={classes.left}>
          <Image
            src="/images/laptop.png"
            alt="laptop"
            width="663"
            height="608"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
