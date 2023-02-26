import Image from "next/image";
import styles from "./commentBalloon.module.scss";

type Props = {
    comment: string
}

export const CommentBalloon = ({ comment }: Props) => {
    return (
        <div className={styles.commentBalloon}>
            <p className={styles.comment}>{comment}</p>
            <Image 
                src="/black_nikukyu.svg" 
                alt="にくきゅう"
                width={30}
                height={22}
            />
        </div>
    )
}