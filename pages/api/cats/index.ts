import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp, TARGET_COLLECTION_NAME } from '../../../libs/firebase';

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
  // firebaseからデータを取得
  const firebase =async () => {    
    const db = getFirestore(firebaseApp);
    const col = collection(db, TARGET_COLLECTION_NAME);
    const snapShot = await getDocs(col);
    const catDataArray: any = [];
    snapShot.forEach((doc) => {
      catDataArray.push(doc.data());
    })
    return catDataArray;
  }

  const catData: CatData[] = await firebase();

  const cat = randomCatData(catData);


  if(cat) {
    res.status(200).json({cat});
    return cat;
  }else {
    res.status(400).json({ debugMessage: `Not Found`})
  }
}
