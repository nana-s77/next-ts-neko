import type { NextPage } from "next";
import Head from "next/head";

import { useState } from "react";
import styles from "../styles/Home.module.scss";
import { CatData, CatsApiResponse } from "./api/cats";
import { CatImage } from "../components/CatImage";
import { FetchButton } from "../components/FetchButton";
import { Mv } from "../components/Mv";

const Home: NextPage = () => {
  const [catImageUrl, setCatImageUrl] = useState("https://today-pon.s3.ap-northeast-1.amazonaws.com/IMG_1899.jpg");
  const [catComment, setCatComment] = useState("こんにちは");

  const fetchCatData =async (): Promise<CatsApiResponse> => {
    // try {
      const res = await fetch("/api/cats/");
  
      // CatsApiResponseで定義した{cat: CatData}の形になっている
      const result: Promise<CatsApiResponse> = await res.json();
      // CatDataのオブジェクトだけ必要
      // const catData: CatData = result.cat;
      console.log(result);
      
  
      return result;
    // } 
  }

  const handleClick =async () => {
    console.log("click");
    const data = await fetchCatData();
    const catData = data.cat as CatData;
    // const data = await fetchCatData();
    setCatImageUrl(catData.image_path);
    setCatComment(catData.comment);
  }

  return (
    <div
      className={styles.page}
    >
      <h1>
        <Mv />
      </h1>
      <CatImage catImageUrl={catImageUrl} />
      <p>{catComment}</p>
      {/* {catImageUrl ? 
        <CatImage catImageUrl={catImageUrl} />
        : ""}
      {catComment ?
        <p>{catComment}</p>
        : ""
      } */}
  
      
      <FetchButton onClick={handleClick} />
    </div>
  );
};

export default Home;
