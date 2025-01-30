import styles from './MePageTitleBar.module.scss'

interface IMePageTitleBarProps {
    title: string
}

export default function MePageTitleBar({
    title,
}: Readonly<IMePageTitleBarProps>) {
    return <h2 className={styles.title}>{title}</h2>
}
