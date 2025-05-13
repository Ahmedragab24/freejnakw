"use client";

import { useContext } from "react";
import classes from "./Ferjan.module.css";
import Image from "next/image";
import Title from "../../general/SecTitle";
import Description from "../../general/SecDesc";
import Card from "./Card";

import GeneralContext from "@/store/general-ctx";

function Ferjan() {
  const { authData } = useContext(GeneralContext);

  return (
    <section className={classes.main}>
      <Title>الفرجان</Title>
      {authData.token ? null : (
        <Description>
          احصل على تجربة مجانية لفريج اليمعات أو فريج الرعب عند إنشاء حساب جديد
        </Description>
      )}
      <div className={classes.cardsContainer}>
        <Card
          gameName="yamaat"
          gameImage="/vectors/ferjan-1.svg"
          gameColor="#FFB81B"
          explanation="فريقين يتنافسون على 6 فئات و 36 سؤال مع فقرات خفيفة و وسائل مساعدة"
        />
        <Card
          gameName="roab"
          gameImage="/vectors/ferjan-2.svg"
          gameColor="#1A2626"
          explanation="24 مشهد , صوت و صورة مرعبة مع سؤال"
        />
        <Card
          gameName="tahadi"
          gameImage="/vectors/ferjan-3.svg"
          gameColor="#4EA9B4"
          isSoon
        />
        <Card
          gameName="enzeli"
          gameImage="/vectors/ferjan-4.svg"
          gameColor="#EAE1C5"
          isSoon
        />
        <Card
          gameName="yamaat plus"
          gameImage="/vectors/ferjan-5.svg"
          gameColor="#E04B20"
          isSoon
        />
      </div>
    </section>
  );
}

export default Ferjan;
