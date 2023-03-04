import type { NextPage } from "next";

// inputしたデータをfirebaseに登録する
// 画像はS3に保存する
// S3に保存した先をfirebaseに登録することはできる？

const Upload: NextPage = () => {
    return (
        <>
            <button type="submit">登録する</button>
        </>
    )
}

export default Upload;