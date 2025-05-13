"use client";

import { useState, useContext, useEffect } from "react";
import classes from "./ScoreModal.module.css";
import axios from "axios";
import Image from "next/image";

import LoadingSpinner from "../general/LoadingSpinner";

import GeneralContext from "@/store/general-ctx";

function ScoreModal({
  show,
  onCloseScoreModal,
  page = "score",
  initialNumOfGames = 1,
  initialChosenPrice = 1.5,
}) {
  const { authData } = useContext(GeneralContext);
  const [currentActiveContainer, setCurrentActiveContainer] = useState("score");
  const [numOfGames, setNumOfGames] = useState(1);
  const [chosenPrice, setChosenPrice] = useState(1.5);
  const [promoCode, setPromoCode] = useState("");
  const [submittingPromoCode, setSubmittingPromoCode] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [promoCodeFeedback, setPromoCodeFeedback] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    setCurrentActiveContainer(page);
    setNumOfGames(initialNumOfGames);
    setChosenPrice(initialChosenPrice);
  }, [page, initialNumOfGames, initialChosenPrice]);

  const changeCurrentActiveContainer = (containerChosen) => {
    setCurrentActiveContainer(containerChosen);
  };

  const handleChooseNumOfGames = (gamesNumber, price) => {
    setNumOfGames(gamesNumber);
    setChosenPrice(price);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePromoCodeSubmit = async (e) => {
    e.preventDefault();

    setSubmittingPromoCode(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/coupons/apply?code=${promoCode}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      const resData = response.data.coupon;

      if (resData.type === "free_games") {
        window.location.reload();
      }

      const discountValue = parseFloat(response.data.coupon.value);
      setPromoCodeFeedback(response.data.message);
      setIsCodeValid(true);
      setDiscount(discountValue);
    } catch ({ response }) {
      setIsCodeValid(false);
      setPromoCodeFeedback(response.data.error);
    }

    setSubmittingPromoCode(false);
  };

  const handlePay = async (e) => {
    e.preventDefault();

    setPaying(true);

    const amount = chosenPrice - chosenPrice * (discount / 100);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/create?amount=${amount}&num_of_games_he_pay=${numOfGames}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      window.open(response.data.data.link, "_self");
      // handle successful payment
    } catch (error) {
      console.error(error);
      // handle payment error
    }

    setPaying(false);
  };

  return (
    <>
      <div className={`${classes.main} ${show ? classes.active : ""}`}>
        <div
          className={`${classes.scoreContainer}  ${
            currentActiveContainer === "score" ? classes.active : ""
          }`}
        >
          <Image
            className={classes.logo}
            src="/icons/logo.svg"
            alt="logo"
            width="69"
            height="54"
          />

          <div className={classes.gamesNumberContainer}>
            <div className={classes.roabImgContainer}></div>
            <div className={classes.yamaatImgContainer}></div>
            <div className={classes.gamesNumber}>
              <span className={classes.number}>
                {authData.user ? authData.user.num_of_games : 0}
              </span>
              لعبة
            </div>
          </div>
        </div>

        {/* * ============== Packages ================ */}

        <div
          className={`${classes.packsContainer}  ${
            currentActiveContainer === "packs" ? classes.active : ""
          }`}
        >
          <Image
            className={classes.logo}
            src="/icons/logo.svg"
            alt="logo"
            width="69"
            height="54"
          />
          <div className={classes.packsAvailable}>
            <span
              className={`${classes.packChoice} ${
                numOfGames === 1 ? classes.active : ""
              }`}
              onClick={handleChooseNumOfGames.bind(this, 1, 1.5)}
            >
              1 لعبة = 1.5 د.ك
            </span>
            <span
              className={`${classes.packChoice} ${
                numOfGames === 2 ? classes.active : ""
              }`}
              onClick={handleChooseNumOfGames.bind(this, 2, 2.75)}
            >
              2 لعبتين = 2.75 د.ك
            </span>
            <span
              className={`${classes.packChoice} ${
                numOfGames === 5 ? classes.active : ""
              }`}
              onClick={handleChooseNumOfGames.bind(this, 5, 6.5)}
            >
              5 ألعاب = 6.5 د.ك
            </span>
            <span
              className={`${classes.packChoice} ${
                numOfGames === 10 ? classes.active : ""
              }`}
              onClick={handleChooseNumOfGames.bind(this, 10, 12.75)}
            >
              10 ألعاب = 12.75 د.ك
            </span>
          </div>
          <form className={classes.codeForm} onSubmit={handlePromoCodeSubmit}>
            <input
              className={classes.codeInput}
              type="text"
              placeholder="أدخل الكود"
              value={promoCode}
              onChange={handlePromoCodeChange}
            />
            <button className={classes.codeAddBtn}>
              {submittingPromoCode ? <LoadingSpinner /> : "أضف"}
            </button>
          </form>

          <p
            className={`${classes.promoCodeFeedback} ${
              !isCodeValid ? classes.error : ""
            }`}
          >
            {promoCodeFeedback}
          </p>

          <button type="button" className={classes.payBtn} onClick={handlePay}>
            دفع
            <span className={classes.totalPrice}>
              {discount ? (
                <span className={classes.priceBeforeDiscount}>
                  {chosenPrice}
                </span>
              ) : null}
              {chosenPrice - chosenPrice * (discount / 100)} د.ك
            </span>
          </button>
        </div>

        <div className={classes.actions}>
          <button
            type="button"
            className={`${classes.actionBtn} ${
              currentActiveContainer === "score" ? classes.active : ""
            }`}
            onClick={() => changeCurrentActiveContainer("score")}
          >
            حصالة الألعاب
          </button>
          <button
            type="button"
            className={`${classes.actionBtn} ${
              currentActiveContainer === "packs" ? classes.active : ""
            }`}
            onClick={() => changeCurrentActiveContainer("packs")}
          >
            باقات الألعاب
          </button>
        </div>
      </div>

      <div
        className={`backdrop ${show ? "active" : ""}`}
        onClick={onCloseScoreModal}
      />

      {paying ? <LoadingSpinner fullscreen /> : null}
    </>
  );
}

export default ScoreModal;
