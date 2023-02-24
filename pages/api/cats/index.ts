import sqlite3 from 'sqlite3';
import type { NextApiRequest, NextApiResponse } from 'next'

export type CatData = {
  id: string,
  name: string,
  imagePath: string,
  comment: string,
}

// const selectAll = (db:sqlite3.Database,query:string) => {
//   return new Promise<Data>((resolve, reject) => {
//     db.all(query, (err:unknown, rows) => {
//       if(err) return reject(err)
//     })
//   })
// }

// APIのレスポンス型
export type CatsApiResponse = {
  // cat?: CatData[],
  cat?: CatData,
  debugMessage?: string,
}

const catData: CatData[] = [
  { id: "1", name: "neko1", imagePath: "https://today-pon.s3.ap-northeast-1.amazonaws.com/IMG_1898.jpg", comment: "今日もいい天気ですのにゃ"},
  { id: "2", name: "neko2", imagePath: "https://today-pon.s3.ap-northeast-1.amazonaws.com/IMG_1881.jpg", comment: "かわいいのにゃ〜"},
  { id: "3", name: "neko3", imagePath: "https://today-pon.s3.ap-northeast-1.amazonaws.com/IMG_1899.jpg", comment: "3なのにゃ"},
  { id: "4", name: "neko4", imagePath: "https://cdn2.thecatapi.com/images/eac.jpg", comment: "4なのにゃ"},
  { id: "5", name: "neko5", imagePath: "https://cdn2.thecatapi.com/images/eac.jpg", comment: "5なのにゃ"},
  { id: "6", name: "neko6", imagePath: "https://cdn2.thecatapi.com/images/eac.jpg", comment: "6なのにゃ"},
  { id: "7", name: "neko7", imagePath: "https://cdn2.thecatapi.com/images/eac.jpg", comment: "7なのにゃ"},
];

const randomCatData = (): CatData => {
  const index = Math.floor(Math.random() * catData.length);
  const result = catData[index];
  return result;
};

// apiのエントリポイント
// api Routesでは必ず関数をexportする必要がある
// ランダムな猫のデータを返すApiがほしい
export default async function catsApi(
  req: NextApiRequest,
  res: NextApiResponse<CatsApiResponse>
) {
  const cat = randomCatData();

  if(cat) {
    res.status(200).json({cat});
    return cat;
  }else {
    res.status(400).json({ debugMessage: `Not Found`})
  }
}
