// import React, { useContext, useEffect, useState } from 'react'
// import {
//     DirectionalHint,
//     Icon,
//     Separator,
//     Stack,
// } from '@fluentui/react'
// import ContentStack from '@/common/contentStack/contentStack'
// import { MessageState } from '@/common/Messages/MessageState'
// // import { MyProfileContext } from '@/app/contexts/MyProfileContext'
// import MessagesContainer from '@/common/Messages/MessagesContainer'
// import TextInputSection from './TextInputSection'
// import styles from './MyProfile.module.scss'
// // import { MePageContext } from '@/app/contexts/MePageContext'
// import {MockMeData} from '../../../mocks/User'
// import { UserContext } from '@/app/contexts/UserContext'

// const EditMyWork: React.FC = () => {
//     // const { profileInfo, updateProfileProperty } = useContext(MyProfileContext)
//     // const { fetchMePageData } = useContext(MePageContext)
//     const profileInfo = useContext(UserContext)
//     const [statement, setStatement] = useState(
//         profileInfo?.personalStatement ?? ''
//     )
//     const [messageState, setMessageState] = useState<MessageState>(
//         MessageState.Hidden
//     )
//     useEffect(() => {
//         if (profileInfo?.personalStatement) {
//             setStatement(profileInfo.aboutMe.personalStatement)
//         }
//     }, [profileInfo])

 

//     return (
//         <Stack>
//             <Stack className={styles.section} horizontal verticalAlign="end">
//                 <h2 className={styles.sectionTitle}>My Work</h2>
//             </Stack>
//             <Separator alignContent="start" className={styles.separator} />
//             <ContentStack>
//                 <Stack horizontal horizontalAlign="space-between">
//                     <MessagesContainer state={messageState} />
//                 </Stack>
//                 <Stack horizontal>
//                     <Stack grow>
//                         <Separator
//                             alignContent="start"
//                             className={styles.separator}
//                         />
//                         <TextInputSection
//                             title="Resume"
//                             textValue={statement}
//                             textPlaceholder="Resume URL..."
//                             // onTextInputBlur={saveInputChange}
//                         />
//                          <Separator
//                             alignContent="start"
//                             className={styles.separator}
//                         />
//                         <TextInputSection
//                             title="Area of Expertise"
//                             textValue={statement}
//                             textPlaceholder="List your area of expertise..."
//                             // onTextInputBlur={saveInputChange}
//                         />
//                          <Separator
//                             alignContent="start"
//                             className={styles.separator}
//                         />
//                         <TextInputSection
//                             title="Training & Certifications"
//                             textValue={statement}
//                             textPlaceholder="Resume URL..."
//                             // onTextInputBlur={saveInputChange}
//                         />
//                          <Separator
//                             alignContent="start"
//                             className={styles.separator}
//                         />
//                         <TextInputSection
//                             title="Links"
//                             textValue={statement}
//                             textPlaceholder="Resume URL..."
//                             // onTextInputBlur={saveInputChange}
//                         />
//                         <Separator
//                             alignContent="start"
//                             className={styles.separator}
//                         />
//                         <TextInputSection
//                             title="Articles"
//                             textValue={statement}
//                             textPlaceholder="Resume URL..."
//                             // onTextInputBlur={saveInputChange}
//                         />
//                         <Separator
//                             alignContent="start"
//                             className={styles.separator}
//                         />
//                         <TextInputSection
//                             title="Lab Websites"
//                             textValue={statement}
//                             textPlaceholder="Resume URL..."
//                             // onTextInputBlur={saveInputChange}
//                         />
//                         <Separator
//                             alignContent="start"
//                             className={styles.separator}
//                         />
//                         <TextInputSection
//                             title="Program"
//                             textValue={statement}
//                             textPlaceholder="Resume URL..."
//                             // onTextInputBlur={saveInputChange}
//                         />
//                     </Stack>
//                 </Stack>
//             </ContentStack>
//         </Stack>
//     )
// }

// export default EditMyWork
