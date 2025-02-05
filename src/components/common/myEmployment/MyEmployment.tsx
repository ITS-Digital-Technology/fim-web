"use client";

import MePageTitleBar from "../../common/myPageTitleBar/MePageTitleBar";
import styles from "./MyEmployeement.module.scss";
import BasicEntry from "../../common/myBasics/BasicEntry";
import { Separator, Stack } from "@fluentui/react";
import { useContext } from "react";
import { UserContext } from "@/app/contexts/UserContext";
import ContentStack from "@/common/contentStack/contentStack";

export default function MyEmployment() {
  const { employment, isError, isLoading } = useContext(UserContext);

  return (
    <>
      <MePageTitleBar title="My Employment" />
      <ContentStack className={`${styles.basics}`}>
        {/* <div className={styles.main}> */}
        View Only
        <Separator />
        {employment && (
          <Stack
            className={`${styles.main} ${styles.hasBottomRow}`}
            role="list"
          >
            <BasicEntry
              title="Employment Type"
              content={[employment.employmentType]}
            />
            <Separator />
            <BasicEntry
              title="Academic Type"
              content={[employment.academicTitle]}
            />
            <BasicEntry title="Division" content={[employment.division]} />
            <Separator />
            <BasicEntry
              title="Department Affiliation"
              content={[employment.department]}
            />
            <Separator />
            <BasicEntry
              title="College Affiliation"
              content={[employment.college]}
            />
            <Separator />
            <BasicEntry title="Mail Drop" content={[employment.mailDrop]} />
            <Separator />

            <BasicEntry title="City" content={[employment.city]} />
            <Separator />
            <BasicEntry title="Postal Code" content={[employment.postalCode]} />
            <Separator />
            {/* update to return all degrees */}
            <BasicEntry title="Degrees" content={[employment.degrees[0]]} />
          </Stack>
        )}
      </ContentStack>
    </>
  );
}
