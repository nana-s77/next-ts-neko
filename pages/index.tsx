import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect,useMemo,useState } from "react";
import styles from "../styles/Home.module.css";
import { CatData, CatsApiResponse } from "./api/cats";
import useSWR from 'swr';

const Home: NextPage = () => {
  const [catImageUrl, setCatImageUrl] = useState("https://cdn2.thecatapi.com/images/bpc.jpg");
  const [catComment, setCatComment] = useState("こんにちは");

  const fetchCatData =async (): Promise<CatData> => {
    const res = await fetch("/api/cats/");

    // CatsApiResponseで定義した{cat: CatData}の形になっている
    const result = await res.json();
    // CatDataのオブジェクトだけ必要
    const catData: CatData = result.cat;

    return catData;
  }

  const handleClick =async () => {
    const data = await fetchCatData();
    setCatImageUrl(data.imagePath);
    setCatComment(data.comment);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>猫画像アプリ一覧</h1>
      <img src={catImageUrl} />
      <p>{catComment}</p>
  
      
      <button type="button" style={{ marginTop: "20px" }} onClick={handleClick}>
        今日の猫さん
      </button>
    </div>
  );
};

export default Home;
