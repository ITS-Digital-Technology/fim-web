import React, { useContext, useEffect, useState } from 'react'
import {
    DirectionalHint,
    Icon,
    Separator,
    Stack,
} from '@fluentui/react'
import ContentStack from '@/common/contentStack/contentStack'
import { MessageState } from '@/common/Messages/MessageState'
// import { MyProfileContext } from '@/app/contexts/MyProfileContext'
import MessagesContainer from '@/common/Messages/MessagesContainer'
import TextInputSection from './TextInputSection'
import styles from './MyProfile.module.scss'
// import { MePageContext } from '@/app/contexts/MePageContext'
import {MockMeData} from '../../../mocks/User'
import { UserContext } from '@/app/contexts/UserContext'

const EditMyProfile: React.FC = () => {
    // const { profileInfo, updateProfileProperty } = useContext(MyProfileContext)
    // const { fetchMePageData } = useContext(MePageContext)
    const profileInfo = useContext(UserContext)
    const [statement, setStatement] = useState(
        profileInfo?.email?? ''
    )
    const [messageState, setMessageState] = useState<MessageState>(
        MessageState.Hidden
    )
    useEffect(() => {
        if (profileInfo?.email) {
            setStatement(profileInfo.email)
        }
    }, [profileInfo])

    // const updateProperty = async (propertyPath: string, property: any) => {
    //     setMessageState(MessageState.Saving)
    //     const result = await updateProfileProperty(
    //         propertyPath,
    //         property.trim()
    //     )

    //     setMessageState(result ? MessageState.Success : MessageState.Failure)
    //     if (result) {
    //         await fetchMePageData()
    //     }
    //     setTimeout(() => setMessageState(MessageState.Hidden), 2000)
    // }

    // const saveInputChange = (input: string) =>
    //     updateProperty('aboutMe.personalStatement', input)

    return (
        <Stack>
            <Stack className={styles.section} horizontal verticalAlign="end">
                <h2 className={styles.sectionTitle}>My Basics</h2>
            </Stack>
            <Separator alignContent="start" className={styles.separator} />
            <ContentStack>
                <Stack horizontal horizontalAlign="space-between">
                    <MessagesContainer state={messageState} />
                </Stack>
                <Stack horizontal>
                    <Stack grow>
                        <Separator
                            alignContent="start"
                            className={styles.separator}
                        />
                        <TextInputSection
                            title="Display Name"
                            textValue={statement}
                            textPlaceholder="Enter a display name..."
                            // onTextInputBlur={saveInputChange}
                        />
                        <Separator
                            alignContent="start"
                            className={styles.separator}
                        />
                        <TextInputSection
                            title="Short Description"
                            textValue={statement}
                            textPlaceholder="Limit is 20 characters..."
                            // onTextInputBlur={saveInputChange}
                        />
                        <Separator
                            alignContent="start"
                            className={styles.separator}
                        />
                        <TextInputSection
                            title="Academic Title"
                            textValue={statement}
                            textPlaceholder="Enter your academic title..."
                            // onTextInputBlur={saveInputChange}
                        />
                        <Separator
                            alignContent="start"
                            className={styles.separator}
                        />
                        <TextInputSection
                            title="Biography"
                            textValue={statement}
                            textPlaceholder="Biography..."
                            // onTextInputBlur={saveInputChange}
                        />
                    </Stack>
                    <Separator
                            alignContent="start"
                            className={styles.separator}
                        />
                        {/* <TextInputSection
                            title="Activities & Accomplishments"
                            textValue={statement}
                            textPlaceholder="Biography..."
                            // onTextInputBlur={saveInputChange}
                        /> */}
                </Stack>
            </ContentStack>
        </Stack>
    )
}


export default EditMyProfile
