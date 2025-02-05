"use client";

import MePageTitleBar from "../../common/myPageTitleBar/MePageTitleBar";
import styles from "./MyBasics.module.scss";
import BasicEntry from "../../common/myBasics/BasicEntry";
import { Separator, Stack } from "@fluentui/react";
import { useContext } from "react";
import { UserContext } from "../../../app/contexts/UserContext";
import ContentStack from "@/common/contentStack/contentStack";

export default function MyBasics() {
  const { user, fetchUserData, isLoading, isError } = useContext(UserContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data. Please try again later.</p>;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <>
      <MePageTitleBar title="My Basics" />
      <ContentStack className={`${styles.basics}`}>
        View Only
        <Separator />
        <Stack className={`${styles.main} ${styles.hasBottomRow}`} role="list">
          <BasicEntry title="ID" content={[user.nuId || "N/A"]} />
          <Separator />
          <BasicEntry
            title="Display Name"
            content={[user.displayName || "N/A"]}
          />
          <Separator />
          <BasicEntry title="First Name" content={[user.firstName || "N/A"]} />
          <Separator />
          <BasicEntry title="Last Name" content={[user.lastName || "N/A"]} />
          <Separator />
          <BasicEntry title="Prefix" content={[user.prefix || "N/A"]} />
          <Separator />
          <BasicEntry title="Email" content={[user.email || "N/A"]} />
        </Stack>
      </ContentStack>
    </>
  );
}
