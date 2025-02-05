'use client'

import Image from 'next/image'
import { useContext, useState, useEffect } from 'react'
import { ChevronDown20Filled, ChevronUp20Filled } from '@fluentui/react-icons'
import Logo from '@/images/logo.svg'
import Menu from '@/images/menu.svg'
import styles from './header.module.scss'
import {UserContext } from '../../../app/contexts/UserContext'
import { useMePhoto } from '@/hooks/useMsGraphPhoto'
import SignoutDropdown from './signoutDropdown/signoutDropdown'
import {
    Popover,
    PopoverTrigger,
    PopoverSurface,
    OnOpenChangeData,
    OpenPopoverEvents,
} from '@fluentui/react-components'
import HeaderNavLinks from './HeaderNavLinks'
import { useKeyDown } from '../../../hooks/useKeyDown'
import { FocusTrapZone } from '@fluentui/react'
import Link from 'next/link'

export default function Header() {
    const [isClient, setIsClient] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isSignoutDropdownOpen, setIsSignoutDropdownOpen] = useState(false)
    const mePhoto = useMePhoto()

    useKeyDown({
        keydownFn: () => {
            setIsOpen(false)
        },
        keyPressed: 'Escape',
    })

    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }

    const closeSignoutDropdown = () => {
        setIsSignoutDropdownOpen(false)
        setIsOpen(false)
    }

    const handleOpenChange = (_: OpenPopoverEvents, data: OnOpenChangeData) => {
        setIsSignoutDropdownOpen(data.open)
    }

    const { user } = useContext(UserContext)

    useEffect(() => {
        // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
        setIsClient(true)
    }, [])

    return (
        <>
            <header className={styles.header}>
                {isClient && (
                    <div
                        x-data="NUGlobalElements.header()"
                        x-init="init()"
                        style={{ height: '48px', backgroundColor: 'black' }}
                    ></div>
                )}
                <div className={styles.bottom}>
                    <div className={styles.logoAndMenu}>
                        <button
                            className={styles.menuButton}
                            onClick={toggleMenu}
                        >
                            <Image
                                src={Menu}
                                alt="menu"
                                className={styles.mobileMenu}
                            />
                        </button>
                        <Link
                            href="/"
                            aria-label="Northeastern University, Student Hub Home"
                            data-gtm-homelogo={true}
                            prefetch={false}
                        >
                            <Image
                                src={Logo}
                                alt="Northeastern University, Student Hub"
                                className={styles.logo}
                            />
                        </Link>
                    </div>
                    <div className={styles.menu}>
                        <div className={styles.navigation}>
                            <nav aria-label="Student Hub">
                                <ul>
                                    <HeaderNavLinks
                                        closeDropdown={closeSignoutDropdown}
                                    />
                                </ul>
                            </nav>
                            <div className={styles.profile}>
                                <div className={styles.profileImage}>
                                    {mePhoto ? (
                                        <Image
                                            src={mePhoto}
                                            alt="profile photo"
                                            height={36}
                                            width={36}
                                        />
                                    ) : (
                                        user &&
                                        `${user?.firstName[0]}${user?.lastName[0]}`
                                    )}
                                </div>
                                <div className={styles.desktopSettings}>
                                    {/* <Popover
                                        inline
                                        open={isSignoutDropdownOpen}
                                        onOpenChange={handleOpenChange}
                                        positioning="below-end"
                                    > */}
                                        {/* <PopoverTrigger> */}
                                            <button
                                                data-testid="open-desktop-settings"
                                                className={
                                                    styles.settingsButton
                                                }
                                                aria-labelledby="username"
                                                aria-expanded={
                                                    isSignoutDropdownOpen
                                                }
                                                data-gtm-account-dropdown={true}
                                            >
                                                <span
                                                    id="username"
                                                    className={
                                                        styles.buttonText
                                                    }
                                                    data-testid="user-name"
                                                >
                                                    {user
                                                        ? `${user.firstName} ${user.lastName}`
                                                        : ''}
                                                </span>
                                                {isSignoutDropdownOpen ? (
                                                    <ChevronUp20Filled />
                                                ) : (
                                                    <ChevronDown20Filled />
                                                )}
                                            </button>
                                        {/* </PopoverTrigger> */}
                                        {/* <PopoverSurface> */}
                                            <SignoutDropdown
                                                closeDropdown={
                                                    closeSignoutDropdown
                                                }
                                            />
                                        {/* </PopoverSurface> */}
                                    {/* </Popover> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {isOpen && (
                <FocusTrapZone isClickableOutsideFocusTrap={true}>
                    <ul className={styles.mobileLinks}>
                        <HeaderNavLinks closeDropdown={closeSignoutDropdown} />
                    </ul>
                </FocusTrapZone>
            )}
            {isOpen && (
                <button
                    className={styles.blanket}
                    onClick={toggleMenu}
                    aria-label="Close Menu"
                ></button>
            )}
        </>
    )
}
