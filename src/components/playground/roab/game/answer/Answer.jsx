"use client";

import { useContext, useState } from "react";
import classes from "./Answer.module.css";
import Image from "next/image";
import Link from "next/link";

import AudioPlayer from "../../../../general/AudioPlayer";
import VideoPlayer from "../../../../general/VideoPlayer";
import ImagePreviewer from "../../../general/ImagePreviewer";

import PlaygroundContext from "@/store/playground-ctx";

function Answer() {
  const { currentQuestion } = useContext(PlaygroundContext);
  const [isPreviewerVisible, setIsPreviewerVisible] = useState(false);
  const [previewerImage, setPreviewerImage] = useState("");

  const handleToggleImagePreviewer = (image) => {
    setIsPreviewerVisible((prev) => !prev);
    setPreviewerImage(prev => prev ? null : image);
  };

  return (
    <section className={classes.main}>
      <div className={classes.ansContainer}>
        <p className={classes.ansText}>{currentQuestion.answer}</p>
        <div className={classes.ansMedia}>
          {currentQuestion.link_answer_type === "image" && currentQuestion.link_answer ? (
            <Image
              src={currentQuestion.link_answer}
              alt={currentQuestion.answer}
              fill
              onClick={handleToggleImagePreviewer.bind(
                this,
                currentQuestion.link_answer
              )}
            />
          ) : null}
          {currentQuestion.link_answer_type === "voice" ? (
            <AudioPlayer src={currentQuestion.link_answer} />
          ) : null}
          {currentQuestion.link_answer_type === "video" ? (
            <VideoPlayer src={currentQuestion.link_answer} />
          ) : null}
        </div>

        {/* = = = = = = = Absolutely Positioned Elements = = = = = = =  */}
        <Link
          href="/roab-playground/game/who-answered"
          className={classes.whoAnswered}
        >
          منو جاوب ؟
        </Link>
        <Link href="/roab-playground/game" className={classes.returnToQuestion}>
          الرجوع للسؤال
        </Link>
      </div>

      <ImagePreviewer
        show={isPreviewerVisible}
        onToggle={handleToggleImagePreviewer}
        image={previewerImage}
      />
    </section>
  );
}

export default Answer;
