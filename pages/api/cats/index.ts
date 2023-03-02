import sqlite3 from 'sqlite3';
import type { NextApiRequest, NextApiResponse } from 'next'
import { open } from 'sqlite';

export type CatData = {
  id: number,
  name: string,
  image_url: string,
  comment: string,
}

// APIのレスポンス型
export type CatsApiResponse = {
  cat?: CatData,
  debugMessage?: string,
}

const randomCatData = (catData: CatData[]): CatData => {
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

  const db = await open(
    // プロジェクトルートからのpathを書く
    {filename: './cats.db',
    driver: sqlite3.Database}
  )
  
  // db接続 catテーブルから取得
  const catData:CatData[]  = await db.all('select * from cats');

  const cat = randomCatData(catData);

  if(cat) {
    res.status(200).json({cat});
    return cat;
  }else {
    res.status(400).json({ debugMessage: `Not Found`})
  }
}
