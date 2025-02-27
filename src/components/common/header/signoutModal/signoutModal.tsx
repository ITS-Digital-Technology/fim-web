import DialogModalButton from "@/components/common/dialogModalButton/dialogModalButton";
import { useMsal } from "@azure/msal-react";

interface IProps {
  buttonClassName: string;
  closeDropdown: () => void;
}

export default function SignoutModal({
  buttonClassName,
  closeDropdown,
}: Readonly<IProps>) {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => {
      console.error(`Logout redirect failed: ${e}`);
    });
  };

  return (
    <DialogModalButton
      dialogTitle="Sign out"
      dialogCloseAriaLabel="Close notification dialog."
      buttonText="Sign out"
      buttonClassName={buttonClassName}
      testId="signout-modal-button"
      actionButtonText="Sign out"
      actionButtonFn={handleLogout}
      cancelButtonText="Cancel"
      onDialogClosed={closeDropdown}
      centerContent
    >
      <p>Are you sure you want to sign out?</p>
    </DialogModalButton>
  );
}
