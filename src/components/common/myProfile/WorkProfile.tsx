"use client";

import MePageTitleBar from "../myPageTitleBar/MePageTitleBar";
import styles from "./MyProfile.module.scss";
import MyProfileStyles from "./MyProfile.module.scss";
import BasicEntry from "../myBasics/BasicEntry";
import { Icon, Separator, Stack } from "@fluentui/react";
import { Fragment, useContext, useEffect, useMemo } from "react";
// import { MePageContext } from '@/app/contexts/MePageContext'
// import MyProfileContext from '@/app/contexts/MyProfileContext'
import { MockMeData } from "../../../mocks/User";
import MyProfile from "./MyProfile";
import MyWork from "./MyWork";
import { UserContext } from "@/app/contexts/UserContext";
import { MyPostsProvider } from "@/app/contexts/MyPostsContext";

export default function WorkProfile() {
  // const {
  //     mePageData,
  //     fetchMePageData,
  //     fetchMePageDataError,
  //     fetchMePageDataLodaing,
  // } = useContext(MePageContext)
  const workProfileData = useContext(UserContext);

  return (
    <MyPostsProvider>
      <div className={styles.contentWrapper}>
        <h2 className={styles.screenReaderText}>My Profile</h2>
        <Stack className={styles.contentWrapper}>
          <MyProfile />
          <MyWork />
        </Stack>
      </div>
    </MyPostsProvider>
  );
}
