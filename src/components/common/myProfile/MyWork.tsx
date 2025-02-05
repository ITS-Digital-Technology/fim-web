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
import { Add20Regular } from "@fluentui/react-icons";
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
      </ContentStack>
    </>
  );
};

export default MyWork;
