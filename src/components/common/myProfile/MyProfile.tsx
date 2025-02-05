import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/contexts/UserContext";
import styles from "./MyProfile.module.scss";
import BasicEntry from "../../common/myBasics/BasicEntry";
import { Separator, Stack, PrimaryButton, TextField } from "@fluentui/react";
import ContentStack from "@/common/contentStack/contentStack";
import BiographyDialog from "./BiographyDialog";
import MePageTitleBar from "../../common/myPageTitleBar/MePageTitleBar";

const MyProfile = () => {
  const { workProfile, user } = useContext(UserContext); 
  const [loading, setLoading] = useState(true);
  const [isBiographyOpen, setIsBiographyOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isEditFormOpened, setIsEditFormOpened] = useState(false);
  const [editValues, setEditValues] = useState({
    displayName: user?.displayName || "",
    shortDescription: user?.shortDescription || "",
    academicTitle: user?.academicTitle || "",
    biography: user?.biography || "",
    accomplishments: user?.accomplishments || "",
  });

  useEffect(() => {
    if (workProfile) {
      setLoading(false);
    }
  }, [workProfile]);

  const openEditForm = () => setIsEditFormOpened(true);
  const closeEditForm = () => setIsEditFormOpened(false);

  const handleSave = () => {
    //   updateUser(editValues);
    closeEditForm();
    closeEditForm();
  };

  if (loading) {
    return <p>Loading Work Profile...</p>;
  }

  return (
    <>
      <MePageTitleBar title="My Basics" />
      <ContentStack className={`${styles.basics}`}>
        {isEditFormOpened ? (
          <>
            <TextField
              label="Display Name"
              value={editValues.displayName}
              onChange={(e, newValue) =>
                setEditValues({ ...editValues, displayName: newValue || "" })
              }
            />
            <Separator />
            <TextField
              label="Short Description"
              value={editValues.shortDescription}
              onChange={(e, newValue) =>
                setEditValues({
                  ...editValues,
                  shortDescription: newValue || "",
                })
              }
            />
            <Separator />
            <TextField
              label="Academic Title"
              value={editValues.academicTitle}
              onChange={(e, newValue) =>
                setEditValues({ ...editValues, academicTitle: newValue || "" })
              }
            />
            <Separator />
            <TextField
              label="Biography"
              value={editValues.biography}
              onChange={(e, newValue) =>
                setEditValues({ ...editValues, biography: newValue || "" })
              }
              multiline
              rows={4} 
            />
            <Separator />
            <TextField
              label="Activities and Accomplishments"
              value={editValues.accomplishments}
              onChange={(e, newValue) =>
                setEditValues({
                  ...editValues,
                  accomplishments: newValue || "",
                })
              }
              multiline
              rows={4} 
            />
            <Separator />
            <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
            <PrimaryButton onClick={closeEditForm}>Cancel</PrimaryButton>
          </>
        ) : (
          <>
            <BasicEntry
              title="Display Name"
              content={[user?.displayName || "N/A"]}
            />
            <Separator />
            <BasicEntry
              title="Short Description"
              content={[user?.shortDescription || "N/A"]}
            />
            <Separator />
            <BasicEntry
              title="Academic Title"
              content={[user?.academicTitle || "N/A"]}
            />
            <Separator />
            <BasicEntry
              title="Biography"
              content={[
                <a key="bio" href="#" onClick={() => setIsBiographyOpen(true)}>
                  View your biography
                </a>,
              ]}
            />
            <Separator />
            <BasicEntry
              title="Activities and Accomplishments"
              content={[
                <a
                  key="activities"
                  href="#"
                  onClick={() => setIsActivitiesOpen(true)}
                >
                  View your Activities and Accomplishments
                </a>,
              ]}
            />
          </>
        )}

        {/* Biography Dialog */}
        <BiographyDialog
          hidden={!isBiographyOpen}
          onDismiss={() => setIsBiographyOpen(false)}
          dialogContentProps={{
            title: "Biography",
            subText: user?.biography,
          }}
        />

        {/* Activities Dialog */}
        <BiographyDialog
          hidden={!isActivitiesOpen}
          onDismiss={() => setIsActivitiesOpen(false)}
          dialogContentProps={{
            title: "Activities and Accomplishments",
            subText: user?.accomplishments,
          }}
        />

        {/* Edit Button */}
        {!isEditFormOpened && (
          <div className={styles.addLocationContainer}>
            <div>
              <PrimaryButton
                iconProps={{
                  iconName: "Edit",
                  styles: { root: { color: "white" } },
                }}
                className={styles.addLocationButton}
                styles={{
                  root: {
                    width: "50px !important",
                    minWidth: "50px",
                  },
                }}
                onClick={openEditForm}
                ariaLabel={`edit`}
              />
            </div>
          </div>
        )}
      </ContentStack>
    </>
  );
};

export default MyProfile;
