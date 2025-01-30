import styles from './dialog.module.scss'
import closeIcon from '@/images/close_icon.svg'
import Image from 'next/image'
import cn from 'classnames'
import { Modal } from '@fluentui/react'

export interface DialogModalProps {
    dialogTitle: string
    closeDialog: () => void
    dialogCloseAriaLabel: string
    centerContent?: boolean
    children: React.ReactElement
    isDialogOpen: boolean
    className?: string
}

const DialogModal = ({
    dialogTitle,
    closeDialog,
    dialogCloseAriaLabel,
    centerContent,
    children,
    isDialogOpen,
    className,
}: DialogModalProps) => {
    return (
        <Modal
            isOpen={isDialogOpen}
            onDismiss={closeDialog}
            allowTouchBodyScroll
        >
            <section
                className={`${styles.modalMain} ${className}`}
                role="dialog"
                aria-modal="true"
                aria-label={dialogTitle}
                data-testid="modal-open"
            >
                <div className={styles.row}>
                    <button
                        type="button"
                        className={styles.closeButton}
                        aria-label={dialogCloseAriaLabel}
                        onClick={closeDialog}
                        data-testid="close-modal-button"
                    >
                        <Image
                            src={closeIcon}
                            className={styles.closeIcon}
                            alt="Close icon"
                        />
                    </button>
                </div>
                <div
                    className={cn(
                        styles.container,
                        centerContent && styles.centerContent
                    )}
                >
                    <div className={styles.row}>
                        <h2 className={styles.dialogTitle}>{dialogTitle}</h2>
                    </div>
                    <div className={styles.row}>{children}</div>
                </div>
            </section>
        </Modal>
    )
}

export default DialogModal
