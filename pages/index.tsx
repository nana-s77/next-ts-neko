import type { NextPage } from "next";
import Head from "next/head";

import { useState } from "react";
import styles from "../styles/Home.module.scss";
import { CatData, CatsApiResponse } from "./api/cats";
import { CatImage } from "../components/CatImage";
import { FetchButton } from "../components/FetchButton";
import { Mv } from "../components/Mv";
import { CommentBalloon } from "../components/CommentBalloon";

const Home: NextPage = () => {
  const [catImageUrl, setCatImageUrl] = useState("");
  const [catComment, setCatComment] = useState("");

  const fetchCatData =async (): Promise<CatsApiResponse> => {
    const res = await fetch("/api/cats/", {
      // body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      // method: "GET",
    });

    // CatsApiResponseで定義した{cat: CatData}の形になっている
    const result: Promise<CatsApiResponse> = await res.json();

    return result;
  }

  const handleClick =async () => {
    const data = await fetchCatData();
    const catData = data.cat;

    if(catData) {
      setCatImageUrl(catData.image_url);
      setCatComment(catData.comment);
    } else {
      console.log(`${data.debugMessage}`);
    }
  }


  return (
    <div
      className={styles.page}
    >
      <h1>
        <Mv />
      </h1>
      <div className={styles.buttonWrap}>
        <FetchButton onClick={handleClick} />
      </div>

      <div className={styles.fetchArea}>
        {catImageUrl ? 
          <CatImage catImageUrl={catImageUrl} />
          : ""}

        {catComment ?
          <CommentBalloon comment={catComment} />
          : ""
        }
      </div>
    </div>
  );
};

export default Home;
