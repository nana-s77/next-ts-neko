import styles from "./fetchButton.module.scss";

type Props = {
    onClick: () => void
}

export const FetchButton = ({ onClick }: Props) => {
    return (
        <button className={styles.button}>
            Click
        </button>
    )
}