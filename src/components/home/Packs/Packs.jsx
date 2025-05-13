"use client";

import { useContext } from "react";
import classes from "./Packs.module.css";
import Title from "../../general/SecTitle";
import Description from "../../general/SecDesc";
import Card from "./Card";

import GeneralContext from "@/store/general-ctx";

function Packs() {
  const { authData } = useContext(GeneralContext);

  return (
    <section className={classes.main}>
      <Title>باقات الألعاب</Title>
      {authData.token ? null : (
        <Description>لعبة مجانية لكل مستخدم .. جرب الآن !</Description>
      )}
      <div className={classes.cardsContainer}>
        <Card
          gamesCount="1"
          description="باقة تتيح لك انشاء (1) لعبة لفريج اليمعات و فريج الرعب"
          price="1.5"
          color="#4EA9B4"
        />
        <Card
          gamesCount="2"
          description="باقة تتيح لك انشاء (2) لعبة لفريج اليمعات و فريج الرعب"
          price="2.75"
          color="#EDB22E"
          // isDiscounted
          // discountBackground="/vectors/second-package-discount.svg"
          // discountPercentage="12.5"
        />
        <Card
          gamesCount="5"
          description="باقة تتيح لك انشاء (5) لعبة لفريج اليمعات و فريج الرعب"
          price="6.5"
          color="#E04B20"
          // isDiscounted
          // discountBackground="/vectors/third-package-discount.svg"
          // discountPercentage="15"
        />
        <Card
          gamesCount="10"
          description="باقة تتيح لك انشاء (10) لعبة لفريج اليمعات و فريج الرعب"
          price="12.75"
          color="#EAE1C5"
          // isDiscounted
          // discountBackground="/vectors/fourth-package-discount.svg"
          // discountPercentage="20"
        />
      </div>
    </section>
  );
}

export default Packs;
