import SignoutModal from "./signoutModal/signoutModal";
import styles from "./header.module.scss";

interface IProps {
  closeDropdown: () => void;
}

export default function HeaderNavLinks({ closeDropdown }: Readonly<IProps>) {
  return (
    <>
      <li className={styles.signoutLink}>
        <span className={styles.link}>
          <SignoutModal
            buttonClassName={styles.dropdownButton}
            closeDropdown={closeDropdown}
          />
        </span>
      </li>
    </>
  );
}
