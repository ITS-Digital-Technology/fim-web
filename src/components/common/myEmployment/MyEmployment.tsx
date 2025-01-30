'use client';


import MePageTitleBar from '../../common/myPageTitleBar/MePageTitleBar'
import styles from './MyEmployeement.module.scss'
import BasicEntry from '../../common/myBasics/BasicEntry'
import { Icon, Separator, Stack } from '@fluentui/react'
import { Fragment, useContext, useEffect, useMemo } from 'react'
// import { MePageContext } from '@/app/contexts/MePageContext'
// import MyProfileContext from '@/app/contexts/MyProfileContext'
import {MockMeData} from '../../../mocks/User'


export default function MyEmployment() {
    // const {
    //     mePageData,
    //     fetchMePageData,
    //     fetchMePageDataError,
    //     fetchMePageDataLodaing,
    // } = useContext(MePageContext)

    const mePageData = MockMeData
   
    return (
   
            <div className={styles.contentWrapper}>
                {/* <div className={styles.main}> */}
                <MePageTitleBar title="My Employment" />
                View Only
                <Stack
                    className={`${styles.main} ${styles.hasBottomRow}`}
                    role="list"
                >
                    <BasicEntry
                        title="Employment Type"
                        content={[mePageData.id]}
                    />
                    <Separator />
                    <BasicEntry
                        title="Academic Type"
                        content={[mePageData.displayName]}
                    />
                     <BasicEntry
                        title="Division"
                        content={[mePageData.firstName]}
                    />
                    <Separator />
                    <BasicEntry
                        title="Department Affiliation"
                        content={[mePageData.lastName]}
                    />
                    <Separator />
                    <BasicEntry
                        title="College Affiliation"
                        content={[mePageData.prefix]}
                    />
                    <Separator />
                    <BasicEntry
                        title="Mail Drop"
                        content={[mePageData.studentInfo.studentEmail]}
                    />
                                        <Separator />

                     <BasicEntry
                        title="City"
                        content={[mePageData.prefix]}
                    />
                    <Separator />
                    <BasicEntry
                        title="Postal Code"
                        content={[mePageData.prefix]}
                    />
                    <Separator />
                    <Separator />
                    <BasicEntry
                        title="Degrees"
                        content={[mePageData.prefix]}
                    />
                </Stack>
         
                </div>
            // </div>
        
    )
}
