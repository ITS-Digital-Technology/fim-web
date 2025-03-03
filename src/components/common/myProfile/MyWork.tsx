import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/contexts/UserContext";
import styles from "./MyProfile.module.scss";
import BasicEntry from "../../common/myBasics/BasicEntry";
import {
  Separator,
  Stack,
  PrimaryButton,
  TextField,
  Dialog,
  DialogFooter,
  DefaultButton,
} from "@fluentui/react";
import ContentStack from "@/common/contentStack/contentStack";
import MyPostsContext from "@/app/contexts/MyPostsContext";
import { Edit12Filled } from "@fluentui/react-icons";
import MePageTitleBar from "../../common/myPageTitleBar/MePageTitleBar";
import MyPosts from "../links/MyPost";
const MyWork = () => {
  const { workProfile, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isEditFormOpened, setIsEditFormOpened] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const { isGetBlogsError, openModal, openAddBlogModal } =
    useContext(MyPostsContext);
  const onCreatePost = () => openModal();

  const [editValues, setEditValues] = useState({
    resumeUrl: workProfile?.resumeUrl || "",
    areasOfExpertise: workProfile?.areasOfExpertise || [],
    trainingAndCertifications: workProfile?.trainingAndCertifications || [],
    links: workProfile?.links || [],
    articles: workProfile?.articles || [],
    labWebsites: workProfile?.labWebsites || [],
  });

  const [newLink, setNewLink] = useState({ linkText: "", url: "" });
  const openEditForm = () => setIsEditFormOpened(true);
  const closeEditForm = () => setIsEditFormOpened(false);
  const handleSave = () => {
    //   updateUser(editValues);
    closeEditForm();
    closeEditForm();
  };

  useEffect(() => {
    if (workProfile) {
      setLoading(false);
    }
  }, [workProfile]);

  const addLink = () => {
    setEditValues({
      ...editValues,
      links: [...editValues.links, newLink],
    });
    setIsLinkModalOpen(false);
    setNewLink({ linkText: "", url: "" });
  };

  if (loading) {
    return <p>Loading Work Profile...</p>;
  }

  const formatContent = (data: any) => {
    if (!data) return ["N/A"];
    if (Array.isArray(data)) {
      return data.map((item) =>
        typeof item === "string" ? item : item.linkText || item.url || "N/A"
      );
    }
    return [String(data)];
  };

  return (
    <>
      <MePageTitleBar title="My Work" />
      {isEditFormOpened ? (
        <>
          <TextField
            label="Resume"
            value={editValues.resumeUrl}
            onChange={(e, newValue) =>
              setEditValues({ ...editValues, resumeUrl: newValue || "" })
            }
          />
          <Separator />
          <TextField
            label="Area of Expertise"
            value={editValues.areasOfExpertise}
            onChange={(e, newValue) =>
              setEditValues({
                ...editValues,
                areasOfExpertise: newValue || "",
              })
            }
          />
          <Separator />
          <TextField
            label="Training & Certification"
            value={editValues.trainingAndCertifications}
            onChange={(e, newValue) =>
              setEditValues({
                ...editValues,
                trainingAndCertifications: newValue || "",
              })
            }
          />
          <Separator />
          <TextField
            label="Links"
            value={editValues.links}
            onChange={(e, newValue) =>
              setEditValues({ ...editValues, articles: newValue || "" })
            }
            multiline
            rows={4}
          />
          <Separator />
          <TextField
            label="Lab Websites"
            value={editValues.labWebsites}
            onChange={(e, newValue) =>
              setEditValues({
                ...editValues,
                labWebsites: newValue || "",
              })
            }
            multiline
            rows={4}
          />
          <Separator />

          <div className={styles.editBtn}>
            <button className={styles.resetBtn} onClick={closeEditForm}>
              Reset
            </button>
            <button className={styles.actionBtn} onClick={handleSave}>
              Save
            </button>
          </div>
        </>
      ) : (
        <ContentStack className={`${styles.basics}`}>
          <BasicEntry
            title="Resume"
            content={formatContent(workProfile?.resumeUrl)}
          />
          <Separator />
          <BasicEntry
            title="Area of Expertise"
            content={formatContent(workProfile?.areasOfExpertise)}
          />
          <Separator />
          <BasicEntry
            title="Training & Certification"
            content={formatContent(workProfile?.trainingAndCertifications)}
          />
          <Separator />
          <MyPosts />
          <Separator />
          <BasicEntry
            title="Articles"
            content={formatContent(workProfile?.articles)}
          />
          <Separator />
          <BasicEntry
            title="Lab Websites"
            content={formatContent(workProfile?.labWebsites)}
          />
          <BasicEntry
            title="Programs"
            content={formatContent(workProfile?.programs)}
          />
          {!isEditFormOpened && (
            <div className={styles.subContainer}>
              <button
                onClick={openEditForm}
                className={styles.actionBtn}
                aria-label="Add a link button"
              >
                Edit <Edit12Filled />
              </button>
            </div>
          )}
        </ContentStack>
      )}
    </>
  );
};

export default MyWork;
