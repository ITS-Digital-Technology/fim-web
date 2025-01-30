import { Icon, Stack } from "@fluentui/react";
import styles from './Messages.module.scss';

const NotSavedMessage = () => {
    return (
      <Stack data-automation-id="save-status" horizontal>
        <Icon iconName="Error" styles={{ root: styles.error }} />
        <p className={styles.margin}>Changes Not Saved</p>
      </Stack>
    );
  };
  export default NotSavedMessage;