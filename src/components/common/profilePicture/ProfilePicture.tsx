import Image from 'next/image'
import React from 'react'
import { PersonEdit48Regular } from '@fluentui/react-icons'
import ProfileBackground from '@/images/profile-background.svg'
import styles from './ProfilePicture.module.scss'
import { editProfileUrl } from '@/src/apiConfig'
// import { useMsGraphMe } from '@/hooks/useMsGraphMe'
// import { useMePhoto } from '@/hooks/useMsGraphPhoto'

export const ProfilePicture: React.FC = () => {
    // const me = useMsGraphMe()
    // const mePhoto = useMePhoto()
    return (
        <a
            className={styles.profilePicture}
            aria-label="Edit your profile. Opens in a new tab."
            href={`${editProfileUrl}&v=editprofile`}
            target="_blank"
            tabIndex={0}
            data-gtm-sh-user-photo={true}
        >
            <div className={styles.picture}>
             
                    <PersonEdit48Regular className={styles.noProfilePicture} />
                
            </div>
            <Image
                src={ProfileBackground}
                alt="Profile picture"
                className={styles.background}
            />
        </a>
    )
}
