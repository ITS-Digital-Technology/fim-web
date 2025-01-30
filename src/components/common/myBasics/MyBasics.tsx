'use client';


import MePageTitleBar from '../../common/myPageTitleBar/MePageTitleBar'
import styles from './MyBasics.module.scss'
import MyProfileStyles from './MyProfile.module.scss'
import BasicEntry from '../../common/myBasics/BasicEntry'
import { Icon, Separator, Stack } from '@fluentui/react'
import { Fragment, useContext, useEffect, useMemo } from 'react'
// import { MePageContext } from '@/app/contexts/MePageContext'
// import MyProfileContext from '@/app/contexts/MyProfileContext'
import {MockMeData} from '../../../mocks/User'


export default function MyProfile() {
    // const {
    //     mePageData,
    //     fetchMePageData,
    //     fetchMePageDataError,
    //     fetchMePageDataLodaing,
    // } = useContext(MePageContext)

    const mePageData = MockMeData
   
    return (
   
            <div >
                {/* <div className={styles.main}> */}
                <MePageTitleBar title="My Basics" />
                View Only
                <Stack
                    className={`${styles.main} ${styles.hasBottomRow}`}
                    role="list"
                >
                    <BasicEntry
                        title="ID"
                        content={[mePageData.id]}
                    />
                    <Separator />
                    <BasicEntry
                        title="Display Name"
                        content={[mePageData.displayName]}
                    />
                     <BasicEntry
                        title="First Name"
                        content={[mePageData.firstName]}
                    />
                    <Separator />
                    <BasicEntry
                        title="Last Name"
                        content={[mePageData.lastName]}
                    />
                    <Separator />
                    <BasicEntry
                        title="Prefix"
                        content={[mePageData.prefix]}
                    />
                    <Separator />
                    <BasicEntry
                        title="Email"
                        content={[mePageData.studentInfo.studentEmail]}
                    />
                </Stack>
         
                </div>
            // </div>
        
    )
}
