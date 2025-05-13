"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./Question.module.css";
import Image from "next/image";
import Link from "next/link";
import Score from "../../general/Score";
import Counter from "../../general/Counter";
import Issue from "../../../general/Issue";
import AudioPlayer from "../../../../general/AudioPlayer";
import VideoPlayer from "../../../../general/VideoPlayer";
import ImagePreviewer from "../../../general/ImagePreviewer";

import PlaygroundContext from "@/store/playground-ctx";

function Question() {
  const router = useRouter();
  const { currentQuestion } = useContext(PlaygroundContext);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isPreviewerVisible, setIsPreviewerVisible] = useState(false);
  const [previewerImage, setPreviewerImage] = useState("");

  const handleToggleImagePreviewer = (image) => {
    setIsPreviewerVisible((prev) => !prev);
    setPreviewerImage(prev => prev ? null : image);
  };

  const handleGoToAnswer = () => {
    router.push("/roab-playground/game/answer");
  };

  const handleShowQuestion = () => {
    setShowQuestion(true);
  };

  const handleQuestImageLoad = () => {
    setTimeout(() => {
      setShowQuestion(true);
    }, 10000);
  };

  return (
    <section className={classes.main}>
      <div className={classes.questionContainer}>
        {showQuestion ? (
          <p className={classes.questText}>{currentQuestion.question}</p>
        ) : (
          <div className={classes.questMedia}>
            {currentQuestion.link_type === "image" && currentQuestion.link_question ? (
              <Image
                src={currentQuestion.link_question}
                alt={currentQuestion.question}
                fill
                onLoad={handleQuestImageLoad}
                onClick={handleToggleImagePreviewer.bind(
                  this,
                  currentQuestion.link_question
                )}
              />
            ) : null}
            {currentQuestion.link_type === "voice" ? (
              <AudioPlayer
                src={currentQuestion.link_question}
                onEnded={handleShowQuestion}
              />
            ) : null}
            {currentQuestion.link_type === "video" ? (
              <VideoPlayer
                src={currentQuestion.link_question}
                onEnded={handleShowQuestion}
              />
            ) : null}
          </div>
        )}

        {/* = = = = = = = Absolutely Positioned Elements = = = = = = =  */}
        <Score
          scorePoints={currentQuestion.points}
          className={classes.questPoints}
        >
          {currentQuestion.points}
        </Score>
        <Issue />
        <span className={classes.questAnswerBtn} onClick={handleGoToAnswer}>
          الإجابة
        </span>
        {showQuestion ? <Counter /> : null}
      </div>

      <ImagePreviewer
        show={isPreviewerVisible}
        onToggle={handleToggleImagePreviewer}
        image={previewerImage}
      />
    </section>
  );
}

export default Question;
