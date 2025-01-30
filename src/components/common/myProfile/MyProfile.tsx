'use client';


import MePageTitleBar from '../../common/myPageTitleBar/MePageTitleBar'
import styles from './MyProfile.module.scss'
import MyProfileStyles from './MyProfile.module.scss'
import BasicEntry from '../../common/myBasics/BasicEntry'
import { Icon, Separator, Stack } from '@fluentui/react'
import { Fragment, useContext, useEffect, useMemo } from 'react'
// import { MePageContext } from '@/app/contexts/MePageContext'
// import MyProfileContext from '@/app/contexts/MyProfileContext'
import {MockMeData} from '../../../mocks/User'
import EditMyProfile from './EditMyProfile';
import EditMyWork from './EditMyWork'
 
export default function MyProfile() {
    // const {
    //     mePageData,
    //     fetchMePageData,
    //     fetchMePageDataError,
    //     fetchMePageDataLodaing,
    // } = useContext(MePageContext)
    const mePageData = MockMeData
   
    return (
            <div className={styles.contentWrapper}>
      <h2 className={styles.screenReaderText}>My Profile</h2>
            <Stack className={styles.contentWrapper}>
                <EditMyProfile />
                <EditMyWork />
            </Stack>
                </div>
    )
}
