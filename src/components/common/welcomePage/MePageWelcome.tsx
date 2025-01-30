import styles from "./MePageWelcome.module.scss";
import useFetch from "@/hooks/useFetch";
import { apiPath, baseUrl } from "@/src/apiConfig";
import { Image } from "@fluentui/react-components";
import { Icon, Separator, Stack } from "@fluentui/react";
import BasicEntry from "../../common/myBasics/BasicEntry";
import { MockMeData } from "../../../mocks/User";

export default function MePageWelcome() {
  const mePageData = MockMeData;

  return (
    <div className={styles.contentWrapper}>
            <p>My Basics</p>

      <Stack className={`${styles.main} ${styles.hasBottomRow}`} role="list">
        {" "}
        <BasicEntry title="ID" content={[mePageData.id]} />
        <Separator />
        <BasicEntry title="Display Name" content={[mePageData.displayName]} />
        <Separator />
        <BasicEntry
          title="Email"
          content={[mePageData.studentInfo.studentEmail]}
        />
        <button> View All</button>
      </Stack>
      <p>My Employment</p>
      <Stack className={`${styles.main} ${styles.hasBottomRow}`} role="list">
        {" "}
        <BasicEntry title="Employment Type" content={[mePageData.id]} />
        <Separator />
        <BasicEntry title="Academic Title" content={[mePageData.displayName]} />
        <Separator />
        <BasicEntry
          title="Division"
          content={[mePageData.studentInfo.studentEmail]}
        />
         <Separator />
        <BasicEntry
          title="City"
          content={[mePageData.studentInfo.studentEmail]}
        />
        <button> View All</button>
      </Stack>
    </div>
  );
}
