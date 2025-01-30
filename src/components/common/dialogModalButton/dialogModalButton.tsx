import DialogModal from '@/components/common/dialogModal/dialog'
import styles from './dialogModalButton.module.scss'
import { useEffect, useState } from 'react'

export interface DialogModalButtonProps {
    dialogTitle: string
    dialogCloseAriaLabel: string
    buttonText?: string
    buttonSubText?: React.ReactNode
    buttonClassName?: string
    buttonAriaLabel?: string
    testId?: string
    chevron?: React.ReactElement
    disabled?: boolean
    actionButtonText?: string
    actionButtonFn?: () => void
    cancelButtonText?: string
    centerContent?: boolean
    children: React.ReactElement | React.ReactElement[]
    position?: string
    onDialogOpened?: () => void
    onDialogClosed?: () => void
    textClassName?: string
    triggerCloseDialog?: boolean
    otherComponentButton?: React.ReactElement
}

const DialogModalButton = ({
    dialogTitle,
    dialogCloseAriaLabel,
    buttonText,
    buttonSubText,
    buttonClassName,
    buttonAriaLabel,
    disabled,
    testId,
    chevron,
    actionButtonText,
    actionButtonFn,
    cancelButtonText,
    centerContent,
    children,
    position,
    onDialogOpened,
    onDialogClosed,
    textClassName,
    otherComponentButton,
    triggerCloseDialog,
}: DialogModalButtonProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        if (triggerCloseDialog) {
            closeDialog()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerCloseDialog])

    const openDialog = () => {
        if (onDialogOpened) {
            onDialogOpened()
        }

        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        if (onDialogClosed) onDialogClosed()
        setIsDialogOpen(false)
    }
    
    return (
        <>
            <button
                className={buttonClassName}
                onClick={openDialog}
                aria-label={buttonAriaLabel}
                data-testid={testId}
                disabled={disabled}
            >
                {otherComponentButton}
                <span className={textClassName}>{buttonText}</span>
                {buttonSubText && <br />}
                <span className={styles.subText}> {buttonSubText}</span>

                {chevron}
            </button>
            <DialogModal
                dialogTitle={dialogTitle}
                dialogCloseAriaLabel={dialogCloseAriaLabel}
                centerContent={centerContent}
                closeDialog={closeDialog}
                className={styles.buttonFooter}
                isDialogOpen={isDialogOpen}
            >
                <>
                    <div className={styles.dialogWrapper}>{children}</div>
                    {(actionButtonText || cancelButtonText) && (
                        <div
                            className={
                                position === 'right'
                                    ? styles.buttonRowRight
                                    : styles.buttonRow
                            }
                        >
                            {actionButtonText && (
                                <button
                                    className={styles.actionButton}
                                    onClick={actionButtonFn ?? closeDialog}
                                >
                                    {actionButtonText}
                                </button>
                            )}
                            {cancelButtonText && (
                                <button
                                    className={styles.cancelButton}
                                    onClick={closeDialog}
                                >
                                    {cancelButtonText}
                                </button>
                            )}
                        </div>
                    )}
                </>
            </DialogModal>
        </>
    )
}

export default DialogModalButton
