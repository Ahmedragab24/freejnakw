import classes from "./Help.module.css";
import Title from "../../general/SecTitle";
import Card from "./Card";

function Help() {
  return (
    <section className={classes.main}>
      <Title>وسائل المساعدة</Title>
      <div className={classes.cardsContainer}>
        <Card
          vectorImage="/vectors/galeeb.svg"
          title="الجليب"
          description="جاوب صح، اضمن نقاطك، و اخصم عدد النقاط اللي ضمنتهم من الفريق الثاني"
          note="تستخدمها قبل ما يطلع لك السؤال"
          color="#EDB22E"
        />
        <Card
          vectorImage="/vectors/two-answers.svg"
          title="جاوب جوابين"
          description="اخذ راحتك وجاوب جوابين "
          note="تستخدمها بعد ما يطلع لك السؤال"
          color="#4EA9B4"
        />
        <Card
          vectorImage="/vectors/no-answer.svg"
          title="لا يجاوبون"
          description="امنع الفريق الثاني من الجواب على هالسؤال"
          note="تستخدمها بعد ما يطلع لك السؤال"
          color="#E04B20"
        />
      </div>
    </section>
  );
}

export default Help;
