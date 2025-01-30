import { MessageState } from '@/common/Messages/MessageState'
import { Stack } from '@fluentui/react'
import SavedMessage from './SavedMessage'
import NotSavedMessage from './NotSavedMessage'
import SavingMessage from './SavingMessage'

export interface MessagesContainerProps {
    state: MessageState
}

const MessagesContainer: React.FunctionComponent<MessagesContainerProps> = ({
    state = MessageState.Hidden,
}) => {
    return (
        <Stack verticalAlign="end">
            {state === MessageState.Success && <SavedMessage />}
            {state === MessageState.Failure && <NotSavedMessage />}
            {state === MessageState.Saving && <SavingMessage />}
            {state === MessageState.Hidden && (
                <div
                    data-automation-id="save-status"
                    style={{ height: '19px' }}
                ></div>
            )}
        </Stack>
    )
}
export default MessagesContainer
