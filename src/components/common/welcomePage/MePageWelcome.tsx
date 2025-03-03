import styles from "./MePageWelcome.module.scss";
import { useState, useContext } from "react";
import { Separator, Stack } from "@fluentui/react";
import BasicEntry from "../../common/myBasics/BasicEntry";
import MePageTitleBar from "../../common/myPageTitleBar/MePageTitleBar";
import ContentStack from "@/common/contentStack/contentStack";
import MyBasics from "../myBasics/MyBasics";
import MyEmployment from "../myEmployment/MyEmployment";
import { UserContext } from "@/app/contexts/UserContext";

export default function MePageWelcome() {
  const { user } = useContext(UserContext);
  const [activeSection, setActiveSection] = useState(null); // 控制显示的组件
  if (!user) return null;
  return (
    <div className={styles.contentWrapper}>
      {activeSection === "basics" && (
        <>
          <MyBasics />
        </>
      )}

      {activeSection === "employment" && (
        <>
          <MyEmployment />
        </>
      )}

      {!activeSection && (
        <>
          <MePageTitleBar title="My Basics" />
          <ContentStack className={styles.basics}>
            <Stack
              className={`${styles.main} ${styles.hasBottomRow}`}
              role="list"
            >
              <BasicEntry title="ID" content={[user.nuId]} />
              <Separator />
              <BasicEntry title="Display Name" content={[user.displayName]} />
              <Separator />
              <BasicEntry title="Email" content={[user.email]} />
              <div className={styles.bottom}>
                <button
                  className={styles.actionBtn}
                  onClick={() => setActiveSection("basics")}
                >
                  View All
                </button>
              </div>
            </Stack>
          </ContentStack>

          <MePageTitleBar title="My Employment" />
          <ContentStack className={styles.basics}>
            <Stack
              className={`${styles.main} ${styles.hasBottomRow}`}
              role="list"
            >
              <BasicEntry title="Employment Type" content={[user.nuId]} />
              <Separator />
              <BasicEntry title="Academic Title" content={[user.displayName]} />
              <Separator />
              <BasicEntry title="Division" content={[user.email]} />
              <Separator />
              <BasicEntry title="City" content={[user.email]} />
              <div className={styles.bottom}>
                <button
                  className={styles.actionBtn}
                  onClick={() => setActiveSection("employment")}
                >
                  View All
                </button>
              </div>
            </Stack>
          </ContentStack>
        </>
      )}
    </div>
  );
}
