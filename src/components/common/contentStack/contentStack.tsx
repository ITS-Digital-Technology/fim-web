import React from 'react'
import { Stack, IStackStyles } from '@fluentui/react'

export interface ContentStackProps {
    children?: React.ReactNode
    padding?: string
    dataAutomationId?: string
    boxShadow?: string
    margin?: string
    className?: string
    role?: string
}

const ContentStack = (props: ContentStackProps) => {
    const stackStyles: IStackStyles = {
        root: {
            background: '#fff',
            boxShadow: props.boxShadow
                ? props.boxShadow
                : '0px 0px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '3px',
            margin: props.margin ? props.margin : '20px 0',
            padding: props.padding ? props.padding : '15px 20px',
        },
    }

    return (
        <Stack
            data-automation-id={props.dataAutomationId}
            styles={stackStyles}
            className={props.className}
            role={props.role}
        >
            {props.children}
        </Stack>
    )
}

export default ContentStack
