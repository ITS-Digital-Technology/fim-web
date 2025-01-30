import React, { useContext } from 'react'
import styles from '@/components/mePage/MePage.module.scss'
import { Separator, Stack } from '@fluentui/react'
import { Mail16Regular, Phone16Regular } from '@fluentui/react-icons'
import BasicEntry from '@/components/mePage/myBasics/BasicEntry'
import { MePageContext } from '@/app/contexts/MePageContext'

const PersonalInfo = () => {
    const { mePageData } = useContext(MePageContext)

    return (
        mePageData && (
            <Stack className={styles.main} role="list">
                <BasicEntry
                    title="Phone"
                    content={[mePageData.studentInfo.phoneNumber]}
                    icon={<Phone16Regular />}
                />
                <Separator />
                <BasicEntry
                    title="Work Email"
                    content={[mePageData.studentInfo.workEmail]}
                    icon={<Mail16Regular />}
                />
                <Separator />
                <BasicEntry
                    title="Student Email"
                    content={[mePageData.studentInfo.studentEmail]}
                    icon={<Mail16Regular />}
                />
            </Stack>
        )
    )
}

export default PersonalInfo
