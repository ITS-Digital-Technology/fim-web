import { useEffect } from 'react'

type KeydownFn = () => void

type KeyDownProps = {
    keyPressed: 'Escape' | 'Enter'
    keydownFn: KeydownFn
}

export const useKeyDown = ({ keyPressed, keydownFn }: KeyDownProps) => {
    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === keyPressed) {
                event.preventDefault()
                keydownFn()
            }
        }

        window.document.addEventListener('keydown', keyDownHandler)

        return () => {
            window.document.removeEventListener('keydown', keyDownHandler)
        }
    }, [keyPressed, keydownFn])
}

export const useEscapeKeyDown = (keydownFn: KeydownFn) => {
    useKeyDown({ keyPressed: 'Escape', keydownFn })
}
