import { Stack } from '@fluentui/react'
import IconBlob from '@/images/IconBlob.svg'
import styles from './MyBasics.module.scss'
import MePageStyles from './MePage.module.scss'
import { useId } from 'react'

interface IBasicEntry {
    icon?: React.ReactNode
    title: string
    content?: string[]
}

export default function BasicEntry({
    icon,
    title,
    content = [],
}: Readonly<IBasicEntry>) {
    const iconBackgroundWrapperStyle = {
        backgroundImage: `url(${IconBlob.src})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        width: '44px',
        height: '38px',
    }

    const id = useId()

    return (
        <Stack horizontal className={MePageStyles.row} role="listitem">
            {icon && (
                <Stack
                    role="presentation"
                    aria-hidden
                    verticalAlign="center"
                    horizontalAlign="center"
                >
                    <div
                        className={styles.iconContainer}
                        style={iconBackgroundWrapperStyle}
                    >
                        {icon}
                    </div>
                </Stack>
            )}
            <Stack grow className={icon ? styles.iconText : styles.text}>
                <Stack horizontal className={styles.rowTitle}>
                    <label id={id}>{title}</label>
                </Stack>
                <Stack className={styles.rowContent} aria-labelledby={title}>
                    {content.map((line) => {
                        return <p key={line}>{line}</p>
                    })}
                </Stack>
            </Stack>
        </Stack>
    )
}
