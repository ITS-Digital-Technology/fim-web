import { Spinner, SpinnerSize, Stack } from "@fluentui/react";
import styles from './Messages.module.scss';

const SavingMessage = () => {
    return (
      <Stack data-automation-id="save-status" horizontal>
        <Spinner size={SpinnerSize.small} />
        <p className={styles.margin}>Saving Changes</p>
      </Stack>
    );
  };
  export default SavingMessage;