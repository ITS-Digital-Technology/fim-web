import React, { useEffect, useState } from 'react'
import { Stack, TextField } from '@fluentui/react'
// import { defaultTitles } from './editAboutMeCategories'
import { useId } from '@fluentui/react-hooks'

export interface TextInputSectionProps {
    title?: string
    textPlaceholder?: string
    textValue?: string
    onTextInputBlur?: (value: string) => void
    disabled?: boolean
}

const TextInputSection: React.FunctionComponent<TextInputSectionProps> = ({
    title = '',
    textValue = '',
    textPlaceholder = '',
    onTextInputBlur = (v: string) => {},
    disabled = false,
}) => {
    const [inputValue, setInputValue] = useState(textValue)
    const labelId = useId()

    useEffect(() => setInputValue(textValue), [textValue])

    const onInputChange = (
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        newValue?: string | undefined
    ) => setInputValue(newValue ?? '')

    const onInputBlur = () => {
        if (inputValue !== textValue) {
            onTextInputBlur(inputValue)
        }
    }


    return (
        <Stack grow>
            <Stack horizontal>
                <Stack grow>
                    <label id={labelId}>{title}</label>
                </Stack>
            </Stack>
            <Stack>
                <TextField
                    placeholder={textPlaceholder}
                    value={inputValue}
                    onChange={onInputChange}
                    multiline
                    rows={3}
                    maxLength={300}
                    resizable={false}
                    onBlur={onInputBlur}
                    disabled={disabled}
                    aria-labelledby={labelId}
                />
            </Stack>
        </Stack>
    )
}

export default TextInputSection
