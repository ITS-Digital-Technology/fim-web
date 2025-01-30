import { Icon, Stack } from "@fluentui/react";
import styles from './Messages.module.scss';

const SavedMessage = () => {
    return (
      <Stack data-automation-id="save-status" horizontal>
        <Icon iconName="Accept" styles={{ root: styles.saved }} />
        <p className={styles.margin}>Changes Saved</p>
      </Stack>
    );
  };
  export default SavedMessage;