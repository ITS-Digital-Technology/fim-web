// import NavigationLink from '@/components/navigationLink/NavigationLink'
import SignoutModal from './signoutModal/signoutModal'
import styles from './header.module.scss'

interface IProps {
    closeDropdown: () => void
}

const menuLinks = [
    { href: '/', text: 'Home', testId: 'link-home' },
    { href: '/me', text: 'Me', testId: 'link-me' },
    { href: '/discover', text: 'Discover', testId: 'link-discover' },
    {
        href: '/news-and-events',
        text: 'News and Events',
        testId: 'link-news-and-events',
    },
    { href: '/resources', text: 'Resources', testId: 'link-resources' },
]

export default function HeaderNavLinks({ closeDropdown }: Readonly<IProps>) {
    return (
        <>
            {/* {menuLinks.map(({ href, text, testId }) => (
                <li key={testId} aria-label='Student Hub'>
                    <NavigationLink
                        href={href}
                        testId={testId}
                        onClick={closeDropdown}
                        text={text}
                    >
                        {text}
                    </NavigationLink>
                </li>
            ))} */}
            <li className={styles.signoutLink}>
                <span className={styles.link}>
                    <SignoutModal
                        buttonClassName={styles.dropdownButton}
                        closeDropdown={closeDropdown}
                    />
                </span>
            </li>
        </>
    )
}
