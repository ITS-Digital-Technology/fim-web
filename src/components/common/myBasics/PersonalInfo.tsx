import React, { useContext } from "react";
import styles from "@/components/mePage/MePage.module.scss";
import { Separator, Stack } from "@fluentui/react";
import { Mail16Regular, Phone16Regular } from "@fluentui/react-icons";
import BasicEntry from "../../../components/common/myBasics/BasicEntry";
import { UserContext } from "@/app/contexts/UserContext";

const PersonalInfo = () => {
  const { user } = useContext(UserContext);

  return (
    user && (
      <Stack className={styles.main} role="list">
        <BasicEntry
          title="Phone"
          content={[user.email]}
          icon={<Phone16Regular />}
        />
        <Separator />
        <BasicEntry
          title="Work Email"
          content={[user.email]}
          icon={<Mail16Regular />}
        />
        <Separator />
        <BasicEntry
          title="Student Email"
          content={[user.email]}
          icon={<Mail16Regular />}
        />
      </Stack>
    )
  );
};

export default PersonalInfo;
