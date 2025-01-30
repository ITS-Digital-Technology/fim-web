import SignoutModal from '../signoutModal/signoutModal'
import style from './signoutDropdown.module.scss'

interface ISignoutDropdown {
    closeDropdown: () => void
}

export default function SignoutDropdown({closeDropdown}:  Readonly<ISignoutDropdown>) {
    return (
        <div className={style.signoutDropdown} data-testid="signout-dropdown">
            <div className={style.row}>
                <SignoutModal buttonClassName={style.dropdownButton} closeDropdown={closeDropdown} />
            </div>
        </div>
    )
}
