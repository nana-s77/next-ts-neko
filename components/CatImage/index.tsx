import Image from "next/image";
import styles from "./catImage.module.scss";

type Props = {
    catImageUrl: string
}

export const CatImage =({ catImageUrl } : Props) => {
    return (
        <div className={styles.imageWrap}>
            <Image
                className={styles.image}
                src={catImageUrl}
                alt="ぽんずちゃんの写真"
                width={650}
                height={464}
            />
        </div>
    )
}
